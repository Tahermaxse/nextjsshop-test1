import { NextResponse } from 'next/server';
import { compare } from 'bcrypt';
import prisma from '@/lib/db';
import { signJwtAccessToken } from '@/lib/jwt';
import { strictRatelimit, getIp, rateLimitResponse } from '@/lib/rate-limit';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request) {
	try {
		// Apply rate limiting
		const ip = getIp(request);
		const { success, limit, remaining, reset } =
			await strictRatelimit.limit(ip);

		if (!success) {
			return rateLimitResponse(ip, limit, remaining, reset);
		}

		const body = await request.json();
		const { email, password } = body;

		if (!email || !password) {
			return NextResponse.json(
				{ success: false, error: 'Email and password are required' },
				{ status: 400 }
			);
		}

		const user = await prisma.user.findUnique({
			where: { email },
			select: {
				id: true,
				email: true,
				password: true,
				name: true,
				image: true,
				emailVerified: true,
				isEmailVerified: true,
				lastLogin: true,
			},
		});

		if (!user || !(await compare(password, user.password))) {
			return NextResponse.json(
				{ success: false, error: 'Invalid credentials' },
				{ status: 401 }
			);
		}

		// Check if email is verified using isEmailVerified field
		if (!user.isEmailVerified) {
			return NextResponse.json(
				{ success: false, error: 'Please verify your email before logging in' },
				{ status: 401 }
			);
		}

		const isFirstLogin = !user.lastLogin;
		if (isFirstLogin) {
			const logoUrl = 'https://Nextjsshop.com/brand/logo-light.svg';
			const docsUrl = 'https://Nextjsshop.com/docs';
			const templatesUrl = 'https://Nextjsshop.com/templates';
			const componentsUrl = 'https://Nextjsshop.com/components';
			const emailUrl =
				"mailto:nextjsshop@gmail.com?subject=Requesting Custom Pages&body=Hi Taher,%0D%0AI'm interested in adding more pages to a template I purchased. Can you help?";
			const ceoName = 'Taher, CEO & Karansinh, Co-Founder @ Nextjsshop';
			const html = `
         <div style="padding: 48px 0; background: linear-gradient(135deg, #f9fafb 0%, #f3f4f6 100%);">
                    <div style="max-width: 520px; margin: 0 auto; background: #ffffff; border-radius: 20px; box-shadow: 0 10px 25px -5px rgba(0,0,0,0.04), 0 10px 10px -5px rgba(0,0,0,0.02); padding: 48px 40px; font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
                      
                      <!-- Header with gradient border -->
                      <div style="border-bottom: 4px solid; border-image: linear-gradient(90deg, #6366f1 0%, #8b5cf6 100%) 1; padding-bottom: 24px; margin-bottom: 32px;">
                        <img src='${logoUrl}' alt='Nextjsshop Logo' style='height: 44px;' />
                      </div>
                      
                      <!-- Greeting -->
                      <h1 style="color: #111827; font-size: 28px; font-weight: 700; margin: 0 0 16px; letter-spacing: -0.5px;">
                        Welcome aboard${user.name ? ', ' + user.name : ''}!
                      </h1>
                      
                      <p style="color: #4b5563; font-size: 16px; line-height: 1.6; margin: 0 0 24px;">
                        <strong style="color: #111827;">Nextjsshop</strong> is your secret weapon for launching beautiful digital products faster. We're thrilled you're here!
                      </p>
                      
                      <!-- Main content card -->
                      <div style="background: #f9fafb; border-radius: 16px; padding: 24px; margin-bottom: 32px;">
                        <h2 style="color: #111827; font-size: 18px; font-weight: 600; margin: 0 0 16px; display: flex; align-items: center; gap: 8px;">
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style="color: #6366f1;">
                            <path d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                          </svg>
                          Get Started
                        </h2>
                        
                        <div style="display: grid; gap: 12px;">
                          <a href="${templatesUrl}" style="display: flex; align-items: center; gap: 12px; padding: 12px 16px; background: white; border-radius: 12px; text-decoration: none; transition: all 0.2s ease; border: 1px solid #e5e7eb;">
                            <div style="background: #eef2ff; width: 36px; height: 36px; border-radius: 8px; display: flex; align-items: center; justify-content: center;">
                              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M4 7.8C4 6.11984 4 5.27976 4.32698 4.63803C4.6146 4.07354 5.07354 3.6146 5.63803 3.32698C6.27976 3 7.11984 3 8.8 3H15.2C16.8802 3 17.7202 3 18.362 3.32698C18.9265 3.6146 19.3854 4.07354 19.673 4.63803C20 5.27976 20 6.11984 20 7.8V16.2C20 17.8802 20 18.7202 19.673 19.362C19.3854 19.9265 18.9265 20.3854 18.362 20.673C17.7202 21 16.8802 21 15.2 21H8.8C7.11984 21 6.27976 21 5.63803 20.673C5.07354 20.3854 4.6146 19.9265 4.32698 19.362C4 18.7202 4 17.8802 4 16.2V7.8Z" stroke="#6366f1" stroke-width="2"/>
                                <path d="M4 12H20" stroke="#6366f1" stroke-width="2" stroke-linecap="round"/>
                                <path d="M8 16H16" stroke="#6366f1" stroke-width="2" stroke-linecap="round"/>
                              </svg>
                            </div>
                            <div>
                              <div style="color: #111827; font-weight: 600; font-size: 15px;">Browse Templates</div>
                              <div style="color: #6b7280; font-size: 13px;">Ready-made layouts for any project</div>
                            </div>
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style="margin-left: auto; color: #9ca3af;">
                              <path d="M9 6L15 12L9 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                          </a>
                          
                          <a href="${componentsUrl}" style="display: flex; align-items: center; gap: 12px; padding: 12px 16px; background: white; border-radius: 12px; text-decoration: none; transition: all 0.2s ease; border: 1px solid #e5e7eb;">
                            <div style="background: #f0fdf4; width: 36px; height: 36px; border-radius: 8px; display: flex; align-items: center; justify-content: center;">
                              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M14 7L16 5M16 5L18 7M16 5V11M8 7L6 5M6 5L4 7M6 5V11M5 17H19C20.1046 17 21 16.1046 21 15V9C21 7.89543 20.1046 7 19 7H5C3.89543 7 3 7.89543 3 9V15C3 16.1046 3.89543 17 5 17Z" stroke="#22c55e" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                              </svg>
                            </div>
                            <div>
                              <div style="color: #111827; font-weight: 600; font-size: 15px;">Explore Components</div>
                              <div style="color: #6b7280; font-size: 13px;">Modular UI parts for rapid building</div>
                            </div>
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style="margin-left: auto; color: #9ca3af;">
                              <path d="M9 6L15 12L9 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                          </a>
                          
                          <a href="${docsUrl}" style="display: flex; align-items: center; gap: 12px; padding: 12px 16px; background: white; border-radius: 12px; text-decoration: none; transition: all 0.2s ease; border: 1px solid #e5e7eb;">
                            <div style="background: #eff6ff; width: 36px; height: 36px; border-radius: 8px; display: flex; align-items: center; justify-content: center;">
                              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12 6.25278V19.2528M12 6.25278C10.8324 5.47686 9.24649 5 7.5 5C5.75351 5 4.16756 5.47686 3 6.25278V19.2528C4.16756 18.4769 5.75351 18 7.5 18C9.24649 18 10.8324 18.4769 12 19.2528M12 6.25278C13.1676 5.47686 14.7535 5 16.5 5C18.2465 5 19.8324 5.47686 21 6.25278V19.2528C19.8324 18.4769 18.2465 18 16.5 18C14.7535 18 13.1676 18.4769 12 19.2528" stroke="#3b82f6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                              </svg>
                            </div>
                            <div>
                              <div style="color: #111827; font-weight: 600; font-size: 15px;">Documentation</div>
                              <div style="color: #6b7280; font-size: 13px;">Implementation guides & examples</div>
                            </div>
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style="margin-left: auto; color: #9ca3af;">
                              <path d="M9 6L15 12L9 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                          </a>
                        </div>
                      </div>
                      
                      <!-- CTA Section -->
                      <div style="text-align: center; margin-bottom: 32px;">
                        <p style="color: #4b5563; font-size: 16px; margin: 0 0 16px;">Need something custom? We've got you covered.</p>
                        <a href="${emailUrl}" style="display: inline-block; background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%); color: white; font-weight: 600; padding: 14px 28px; border-radius: 12px; text-decoration: none; box-shadow: 0 4px 6px -1px rgba(99, 102, 241, 0.3); transition: transform 0.2s ease; font-size: 15px;">
                          Request Custom Design
                        </a>
                      </div>
                      
                      <!-- Signature -->
                      <div style="border-top: 1px dashed #e5e7eb; padding-top: 24px; margin-bottom: 32px;">
                        <p style="color: #111827; font-size: 16px; margin: 0 0 4px;">Happy building,</p>
                        <p style="color: #111827; font-size: 16px; font-weight: 600; margin: 0;">${ceoName}</p>
                        <p style="color: #6b7280; font-size: 14px; margin: 4px 0 0;">CEO & Founder, Nextjsshop</p>
                      </div>
                      
                      <!-- Social & Footer -->
                      <div style="text-align: center;">
                        <div style="display: flex; justify-content: center; gap: 20px; margin-bottom: 24px;">
                          <a href="https://x.com/yourhandle" target="_blank" style="color: #6b7280; transition: color 0.2s ease;">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M18 6L6 18M6 6L18 18M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                          </a>
                          <a href="https://instagram.com/yourhandle" target="_blank" style="color: #6b7280; transition: color 0.2s ease;">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8C9.79086 8 8 9.79086 8 12C8 14.2091 9.79086 16 12 16Z" stroke="currentColor" stroke-width="2"/>
                              <path d="M3 16V8C3 5.23858 5.23858 3 8 3H16C18.7614 3 21 5.23858 21 8V16C21 18.7614 18.7614 21 16 21H8C5.23858 21 3 18.7614 3 16Z" stroke="currentColor" stroke-width="2"/>
                              <path d="M17.5 6.51L17.51 6.49889" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                          </a>
                          <a href="https://dribbble.com/yourhandle" target="_blank" style="color: #6b7280; transition: color 0.2s ease;">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M12 21C13.0609 21 14.0783 20.5786 14.8284 19.8284C15.5786 19.0783 16 18.0609 16 17C16 15.9391 15.5786 14.9217 14.8284 14.1716C14.0783 13.4214 13.0609 13 12 13C10.9391 13 9.92172 13.4214 9.17157 14.1716C8.42143 14.9217 8 15.9391 8 17C8 18.0609 8.42143 19.0783 9.17157 19.8284C9.92172 20.5786 10.9391 21 12 21Z" stroke="currentColor" stroke-width="2"/>
                              <path d="M5 3.127C7.5 5.5 8 9.5 8 12C8 14.5 7.5 18.5 5 20.873" stroke="currentColor" stroke-width="2"/>
                              <path d="M19 3.127C16.5 5.5 16 9.5 16 12C16 14.5 16.5 18.5 19 20.873" stroke="currentColor" stroke-width="2"/>
                              <path d="M2 12H22" stroke="currentColor" stroke-width="2"/>
                            </svg>
                          </a>
                        </div>
                        
                        <div style="color: #9ca3af; font-size: 13px; line-height: 1.5;">
                          <p style="margin: 0 0 8px;">Nextjsshop Inc, Vadodara, Gujarat, India</p>
                          <div style="margin-bottom: 8px;">
                            <a href="https://nextjsshop.com/privacy" style="color: #9ca3af; text-decoration: none; margin: 0 8px;">Privacy</a>
                            <span style="color: #d1d5db;">•</span>
                            <a href="https://nextjsshop.com/terms" style="color: #9ca3af; text-decoration: none; margin: 0 8px;">Terms</a>
                            <span style="color: #d1d5db;">•</span>
                            <a href="https://nextjsshop.com/about" style="color: #9ca3af; text-decoration: none; margin: 0 8px;">About</a>
                          </div>
                          <p style="margin: 0;">© ${new Date().getFullYear()} Nextjsshop. All rights reserved.</p>
                        </div>
                      </div>
                    </div>
                </div>
      `;
			try {
				const result = await resend.emails.send({
					from: 'onboarding@resend.dev',
					to: 'nextjslandingpage@gmail.com', // for testing, change to user.email for production
					// to: user.email,
					subject: 'Welcome to Nextjsshop! 🎉',
					html,
				});
			} catch (emailError) {
				console.error('Failed to send welcome email:', emailError);
			}
			// Update lastLogin
			try {
				const updateResult = await prisma.user.update({
					where: { email },
					data: { lastLogin: new Date() },
				});
			} catch (err) {
				console.error('Error updating lastLogin:', err);
			}
		}

		const { password: _, ...userWithoutPass } = user;
		const accessToken = signJwtAccessToken(userWithoutPass);

		return NextResponse.json({
			success: true,
			user: userWithoutPass,
			accessToken,
		});
	} catch (error) {
		console.error('Login error:', error);
		return NextResponse.json(
			{ success: false, error: 'An error occurred during login' },
			{ status: 500 }
		);
	}
}
