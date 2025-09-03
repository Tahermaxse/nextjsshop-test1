import { hash } from 'bcrypt';
import { NextResponse } from 'next/server';
import prisma from '@/lib/db';
import { Resend } from 'resend';
import crypto from 'crypto';
import { criticalRatelimit, getIp, rateLimitResponse } from '@/lib/rate-limit';
import { validateCSRFToken, getCSRFTokenFromHeaders, getCSRFTokenFromBody } from '@/lib/csrf';

// Initialize Resend with API key
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request) {
	try {
		// Apply rate limiting
		const ip = getIp(request);
		const { success, limit, remaining, reset } =
			await criticalRatelimit.limit(ip);

		if (!success) {
			return rateLimitResponse(ip, limit, remaining, reset);
		}

		const body = await request.json();
		const { email, password, name, csrfToken } = body;

		// CSRF protection
		try {
			const headerToken = getCSRFTokenFromHeaders(request.headers);
			const bodyToken = getCSRFTokenFromBody(body);
			const providedToken = headerToken || bodyToken;
			
			// For now, we'll log if no CSRF token is provided but not block the signup
			if (!providedToken) {
				console.warn('No CSRF token provided for signup attempt');
				// In production, you might want to return an error here
				// return NextResponse.json(
				// 	{ success: false, error: 'CSRF token required' },
				// 	{ status: 403 }
				// );
			}
		} catch (error) {
			console.warn('CSRF token validation error:', error);
			// Continue with signup even if CSRF validation fails
		}

		if (!email || !password) {
			return NextResponse.json(
				{ success: false, error: 'Email and password are required' },
				{ status: 400 }
			);
		}

		// Server-side password validation
		const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/;
		if (!passwordRegex.test(password)) {
			return NextResponse.json(
				{ 
					success: false, 
					error: 'Password must be at least 8 characters long and contain uppercase, lowercase, number, and special character' 
				},
				{ status: 400 }
			);
		}

		const existingUser = await prisma.user.findUnique({
			where: { email },
		});

		if (existingUser) {
			return NextResponse.json(
				{ success: false, error: 'User already exists' },
				{ status: 400 }
			);
		}

		const hashedPassword = await hash(password, 10);
		const user = await prisma.user.create({
			data: {
				email,
				name,
				password: hashedPassword,
				emailVerified: null, // Explicitly set emailVerified to null
			},
			select: {
				id: true,
				email: true,
				name: true,
				image: true,
			},
		});

		if (!user) {
			return NextResponse.json(
				{ success: false, error: 'User creation failed' },
				{ status: 500 }
			);
		}

		// Generate verification token
		const token = crypto.randomBytes(32).toString('hex');
		const expires = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours

		// Save verification token
		await prisma.verificationToken.create({
			data: {
				identifier: email,
				token,
				expires,
			},
		});

		// Send verification email
		const verificationUrl = `${process.env.NEXT_PUBLIC_APP_URL}/verify?token=${token}`;

		try {
			const emailResult = await resend.emails.send({
				from: 'hello@nextjsshop.com',
				to: email,
				subject: 'Verify your email address',
				html: `
                    <!DOCTYPE html>
                    <html lang="en">

                    <head>
                    <meta charset="UTF-8" />
                    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                    <title>Verify Your Email - Nextjsshop</title>
                    <style>
                        a:hover {
                        opacity: 0.9 !important;
                        }

                        @media only screen and (max-width: 600px) {
                        .container {
                            padding: 24px !important;
                        }

                        h1 {
                            font-size: 22px !important;
                        }
                        }
                    </style>
                    </head>

                    <body style="margin:0; padding:0; background-color:#f9fafb; font-family:Arial, sans-serif;">

                    <!-- Preview text for inbox -->
                    <div style="display:none; max-height:0; overflow:hidden; opacity:0; line-height:1px;">
                        Confirm your email to activate your Nextjsshop account 🎉
                    </div>

                    <!-- Email Container -->
                    <table role="presentation" cellpadding="0" cellspacing="0" border="0" align="center" width="100%" style="background-color:#f9fafb;">
                        <tr>
                        <td align="center">
                            <table class="container" role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="max-width:600px; background-color:#ffffff; border-radius:12px; box-shadow:0 4px 20px rgba(0,0,0,0.05); padding:40px 32px; margin: 40px auto;">
                            
                            <!-- Logo -->
                            <tr>
                                <td align="center" style="padding-bottom: 24px;">
                                <img src="https://nextjsshop.com/logo-light.svg" alt="Nextjsshop Logo" width="120" height="auto" style="margin-bottom: 12px;" />
                                </td>
                            </tr>

                            <!-- Heading -->
                            <tr>
                                <td align="center">
                                <h1 style="font-size:26px; font-weight:700; color:#111827; margin:0 0 16px;">Welcome to Nextjsshop!</h1>
                                <p style="font-size:16px; color:#4b5563; margin:0 0 24px;">
                                    Please verify your email address to activate your account.
                                </p>
                                </td>
                            </tr>

                            <!-- CTA Button -->
                            <tr>
                                <td align="center" style="padding: 24px 0;">
                                <a href="${verificationUrl}" 
                                    style="background-color: #4CAF50; color: #ffffff; padding: 14px 32px; font-size: 16px; font-weight: 600;
                                            border-radius: 8px; text-decoration: none; display: inline-block; box-shadow: 0 4px 12px rgba(76,175,80,0.3);">
                                    ✅ Verify Email
                                </a>
                                </td>
                            </tr>

                            <!-- Expiration & Message -->
                            <tr>
                                <td style="text-align: center; padding: 0 0 16px;">
                                <p style="font-size:14px; color:#6b7280; margin-bottom:8px;">This link will expire in 24 hours.</p>
                                <p style="font-size:14px; color:#6b7280; margin:0;">If you didn’t sign up for Nextjsshop, you can safely ignore this email.</p>
                                </td>
                            </tr>

                            <!-- Divider -->
                            <tr>
                                <td style="border-top: 1px solid #e5e7eb; padding-top: 24px;"></td>
                            </tr>

                            <!-- Footer -->
                            <tr>
                                <td align="center" style="padding: 24px 16px 0; font-size:12px; color:#9ca3af;">
                                <p style="margin:0 0 8px;">This message was sent by Nextjsshop.</p>
                                <p style="margin:0;">Nextjsshop · Vadodara, Gujarat, India</p>
                                <p style="margin:8px 0 0;">
                                    <a href="https://nextjsshop.com/legal/privacy" style="color:#4CAF50; text-decoration:none;">Privacy Policy</a> |
                                    <a href="https://nextjsshop.com/legal/terms" style="color:#4CAF50; text-decoration:none;">Terms of Service</a>
                                </p>
                                </td>
                            </tr>

                            </table>
                        </td>
                        </tr>
                    </table>

                    </body>
                    </html>
                `,
			});

		} catch (emailError) {
			// Delete the user and token if email sending fails
			await prisma.verificationToken.delete({
				where: { token },
			});
			await prisma.user.delete({
				where: { id: user.id },
			});

			return NextResponse.json(
				{
					success: false,
					error: 'Failed to send verification email',
					details: emailError.message,
				},
				{ status: 500 }
			);
		}

		return NextResponse.json({
			success: true,
			message: 'Please check your email to verify your account',
		});
	} catch (error) {
		console.error('Error during signup process:', error);
		return NextResponse.json(
			{
				success: false,
				error: 'An error occurred during signup',
				details: error.message,
			},
			{ status: 500 }
		);
	}
}