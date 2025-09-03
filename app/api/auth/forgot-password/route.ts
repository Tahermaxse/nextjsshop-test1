import { NextResponse } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { Resend } from 'resend';
import crypto from 'crypto';
import { strictRatelimit, getIp } from '@/lib/rate-limit';

// Initialize Resend
const resend = new Resend(process.env.RESEND_API_KEY);

// Validation schema
const forgotPasswordSchema = z.object({
    email: z.string().email({ message: 'Invalid email address' }),
});

export async function POST(request: Request) {
    // Extract IP for rate limiting
    const ip = getIp(request);
    console.log('Forgot password attempt from IP:', ip);

    // Check rate limit
    const { success, limit, remaining, reset } = await strictRatelimit.limit(`forgot-password:${ip}`);
    console.log('Rate limit status:', { success, limit, remaining, reset });

    if (!success) {
        console.log('Rate limit exceeded for IP:', ip);
        return NextResponse.json(
            { error: 'Too many password reset requests. Please try again later.' },
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
        const body = await request.json();
        const { email } = forgotPasswordSchema.parse(body);

        // Find user
        const user = await prisma.user.findUnique({
            where: { email },
            select: { id: true, email: true },
        });

        console.log('User lookup for email:', email, 'Result:', user ? 'Found' : 'Not found');

        if (!user) {
            return NextResponse.json(
                { error: 'User does not exist' },
                { status: 404 }
            );
        }

        // Generate secure random token
        const token = crypto.randomBytes(32).toString('hex');
        const expiresAt = new Date(Date.now() + 60 * 60 * 1000); // 1 hour expiry
        // Store token in DB (delete old tokens for this user first)
        await prisma.passwordResetToken.deleteMany({ where: { userId: user.id } });
        await prisma.passwordResetToken.create({
            data: {
                token,
                userId: user.id,
                expiresAt,
            },
        });
        // Generate reset link
        const resetLink = `${process.env.NEXT_PUBLIC_APP_URL}/reset-password?token=${encodeURIComponent(token)}`;

        // Send reset email
        // Enhanced password reset email template
        const html = `
      <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN"
      "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
      <html lang="en" xmlns="http://www.w3.org/1999/xhtml">
      <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="x-apple-disable-message-reformatting">
        <title>Password Reset - Nextjsshop</title>
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
      <body style="margin:0; padding:0; background-color:#f9fafb; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
        <!-- Inbox preview -->
        <div style="display:none; max-height:0; overflow:hidden; opacity:0; line-height:1px;">
          Reset your password securely - link expires in 1 hour.
        </div>
        <!-- Main Container -->
        <table role="presentation" cellpadding="0" cellspacing="0" border="0" align="center" width="100%" style="background-color:#f9fafb;">
          <tr>
            <td align="center">
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="max-width:600px; background-color:#ffffff; border-radius:12px; box-shadow:0 4px 20px rgba(0,0,0,0.05); margin:40px 0;" class="container" padding="40px 32px;">
                <tr>
                  <td align="center" style="padding-top: 32px;">
                    <img src="https://Nextjsshop.com/brand/logo-light.svg" alt="Nextjsshop Logo" width="120" height="auto" style="margin-bottom: 24px;" />
                  </td>
                </tr>
                <tr>
                  <td align="center">
                    <div style="background:linear-gradient(135deg, #ef4444 0%, #dc2626 100%); width:64px; height:64px; border-radius:50%; display:flex; align-items:center; justify-content:center; margin-bottom:24px;">
                      <span style="font-size:28px; color:#fff;">🔒</span>
                    </div>
                    <h1 style="font-size:26px; font-weight:700; color:#111827; margin:0 0 12px;">Password Reset Request</h1>
                    <p style="font-size:16px; color:#4b5563; line-height:1.5; margin:0 0 24px;">
                      You requested to reset your password. Click the button below to securely set a new one.
                    </p>
                  </td>
                </tr>
                <tr>
                  <td style="background:#fff7ed; border-left:4px solid #f97316; border-radius:8px; padding:16px; margin:24px 0;">
                    <p style="margin:0; font-size:14px; color:#92400e;">
                      ⚠️ <strong>Note:</strong> This link expires in 1 hour to keep your account safe.
                    </p>
                  </td>
                </tr>
                <tr>
                  <td align="center" style="padding: 24px 0;">
                    <a href="${resetLink}" style=" shabby:linear-gradient(135deg, #22c55e 0%, #16a34a 100%); color:#ffffff; padding:14px 32px; font-size:16px; font-weight:600; border-radius:8px; text-decoration:none; display:inline-block; text-transform:uppercase; box-shadow:0 4px 12px rgba(34,197,94,0.3);">
                      🔐 Reset My Password
                    </a>
                  </td>
                </tr>
                <!-- Fallback URL -->
                <tr>
                  <td align="center" style="padding:16px 0; border-top:1px solid #e5e7eb;">
                    <p style="font-size:14px; color:#6b7280; margin-bottom:8px;">
                      Or copy and paste this URL into your browser:
                    </p>
                    <p style="font-size:13px; word-break:break-all; background:#f3f4f6; padding:10px; border-radius:6px; color:#065f46; margin:0;">
                      ${resetLink}
                    </p>
                  </td>
                </tr>
                <!-- Security Tips -->
                <tr>
                  <td style="background:#f0f9ff; border-radius:8px; padding:20px; margin-top:24px;">
                    <h3 style="font-size:16px; color:#1e40af; margin:0 0 12px;">🛡️ Security Tips:</h3>
                    <ul style="margin:0; padding-left:20px; font-size:14px; color:#1e40af;">
                      <li>Use a strong, unique password</li>
                      <li>Don't share your password with anyone</li>
                      <li>If you didn’t request this, ignore this email</li>
                    </ul>
                  </td>
                </tr>
                <!-- Support Contact -->
                <tr>
                  <td align="center" style="padding-top:32px;">
                    <p style="font-size:14px; color:#6b7280; margin:0 0 6px;">
                      Need help? Our support team is here for you 💚
                    </p>
                    <p style="font-size:14px; color:#6b7280; margin:0;">
                      <a href="mailto:support@nextjsshop.com" style="color:#22c55e; text-decoration:none; font-weight:500;">Contact Support</a>
                    </p>
                  </td>
                </tr>
                <!-- Footer -->
                <tr>
                  <td align="center" style="padding:32px 24px 16px; font-size:12px; color:#9ca3af; text-align:center;">
                    <p style="margin:0 0 6px;">This message was sent from a secure server. Please don’t reply.</p>
                    <p style="margin:0;">Nextjsshop · Vadodara, Gujarat, India</p>
                    <p style="margin:8px 0 0;">
                      <a href="#" style="color:#22c55e; text-decoration:none;">Privacy Policy</a> | 
                      <a href="#" style="color:#22c55e; text-decoration:none;">Terms of Service</a>
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
      </html>
    `;

        const result = await resend.emails.send({
            from: 'hello@nextjsshop.com',
            to : user.email,
            subject: 'Reset Your Nextjsshop Password',
            html,
        });

        console.log('Reset email sent to:', user.email, 'Result:', result);
        console.log('Reset link:', resetLink);

        return NextResponse.json(
            { message: 'Reset link sent successfully.' },
            { status: 200 }
        );
    } catch (error) {
        console.error('Forgot password error:', error);
        if (error instanceof z.ZodError) {
            return NextResponse.json({ error: error.errors[0].message }, { status: 400 });
        }
        return NextResponse.json({ error: 'An error occurred. Please try again later.' }, { status: 500 });
    }
}