import { NextResponse } from 'next/server';
import prisma from '@/lib/db';
import { criticalRatelimit, getIp, rateLimitResponse } from "@/lib/rate-limit";

export async function GET(request) {
    // Rate limiting
        const ip = getIp(request);
        const { success, limit, remaining, reset } = await criticalRatelimit.limit(ip);
        if (!success) {
            return rateLimitResponse(ip, limit, remaining, reset);
        }
    try {
        const { searchParams } = new URL(request.url);
        const token = searchParams.get('token');

        if (!token) {
            return NextResponse.json(
                { success: false, error: 'Token is required' },
                { status: 400 }
            );
        }

        // Find the verification token
        const verificationToken = await prisma.verificationToken.findUnique({
            where: { token },
        });

        if (!verificationToken) {
            return NextResponse.json(
                { success: false, error: 'Invalid token' },
                { status: 400 }
            );
        }

        // Check if token is expired
        if (verificationToken.expires < new Date()) {
            return NextResponse.json(
                { success: false, error: 'Token has expired' },
                { status: 400 }
            );
        }

        // Update user's email verification status
        await prisma.user.update({
            where: { email: verificationToken.identifier },
            data: { 
                emailVerified: new Date(),
                isEmailVerified: true 
            },
        });

        // Delete the used token
        await prisma.verificationToken.delete({
            where: { token },
        });

        return NextResponse.json({
            success: true,
            message: 'Email verified successfully',
        });
    } catch (error) {
        console.error('Error during email verification:', error);
        return NextResponse.json(
            { success: false, error: 'An error occurred during verification' },
            { status: 500 }
        );
    }
} 