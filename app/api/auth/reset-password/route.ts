import { NextResponse } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import { strictRatelimit, getIp } from '@/lib/rate-limit';

// Validation schema for the request body
const resetPasswordSchema = z.object({
    token: z.string().min(1, 'Reset token is required'),
    password: z
        .string()
        .min(8, 'Password must be at least 8 characters long')
        .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
        .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
        .regex(/[0-9]/, 'Password must contain at least one number'),
});

export async function POST(request: Request) {

    // Extract IP for rate limiting
    const ip = getIp(request);
    console.log('Reset password attempt from IP:', ip);

    // Check rate limit
    const { success, limit, remaining, reset } = await strictRatelimit.limit(`reset-password:${ip}`);
    console.log('Rate limit status:', { success, limit, remaining, reset });

    if (!success) {
        console.log('Rate limit exceeded for IP:', ip);
        return NextResponse.json(
            { error: 'Too many password reset attempts. Please try again later.' },
            {
                status: 429,
                headers: {
                    'X-RateLimit-Limit': limit.toString(),
                    'X-RateLimit-Remaining': remaining.toString(),
                    'X-RateLimit-Reset': reset.toString(),
                },
            }
        );
    }

    try {
        // Parse and validate request body
        const body = await request.json();
        const { token, password } = resetPasswordSchema.parse(body);

        // Find token in DB
        const resetToken = await prisma.passwordResetToken.findUnique({
            where: { token },
            include: { user: true },
        });
        if (!resetToken || resetToken.expiresAt < new Date()) {
            // Delete token if expired
            if (resetToken) await prisma.passwordResetToken.delete({ where: { token } });
            return NextResponse.json(
                { error: 'Invalid or expired reset token' },
                { status: 400 }
            );
        }
        const user = resetToken.user;

        // Hash the new password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Update user with new password
        await prisma.user.update({
            where: { id: user.id },
            data: {
                password: hashedPassword,
                updatedAt: new Date(),
            },
        });

        // Delete the token after use
        await prisma.passwordResetToken.delete({ where: { token } });

        // Log successful password reset
        console.log(`Password reset successful for user: ${user.email}`);

        return NextResponse.json(
            { message: 'Password reset successfully' },
            { status: 200 }
        );
    } catch (error) {
        // Handle validation errors
        if (error instanceof z.ZodError) {
            console.error('Validation error:', error.errors);
            return NextResponse.json(
                { error: error.errors[0].message },
                { status: 400 }
            );
        }

        // Log and handle unexpected errors
        console.error('Reset password error:', error);
        return NextResponse.json(
            { error: 'An error occurred while resetting the password' },
            { status: 500 }
        );
    }
}