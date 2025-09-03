// @ts-nocheck
import NextAuth, { NextAuthOptions, Session, User } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import prisma from '@/lib/prisma';
import { compare } from 'bcrypt';
import { Resend } from 'resend';
import { strictRatelimit, getIp, rateLimitResponse } from '@/lib/rate-limit';
import { validateCSRFToken, getCSRFTokenFromHeaders, getCSRFTokenFromBody } from '@/lib/csrf';

interface CustomUser extends Omit<User, 'id'> {
  id: number;
  role: string;
}

const resend = new Resend(process.env.RESEND_API_KEY);

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email', placeholder: 'your@email.com' },
        password: {
          label: 'Password',
          type: 'password',
          placeholder: '********',
        },
      },
      async authorize(credentials, req) {
        // Rate limiting logic
        let ip = null;
        try {
          // Try to extract IP from NextAuth request context
          ip = req?.headers?.['x-forwarded-for']?.split(',')[0] || req?.headers?.['x-real-ip'] || null;
        } catch (e) {
          ip = null;
        }
        if (!ip && typeof window === 'undefined') {
          // Fallback: try to get IP from process.env or default
          ip = process.env.REMOTE_ADDR || '127.0.0.1';
        }
        console.log('Login attempt from IP:', ip);
        const { success, limit, remaining, reset } = await strictRatelimit.limit(ip);
        console.log('Rate limit status:', { success, limit, remaining, reset });
        if (!success) {
          throw new Error('Too many login attempts. Please try again later.');
        }

        if (!credentials?.email || !credentials?.password) {
          throw new Error('Missing email or password');
        }

        // CSRF protection for login - make it optional for now to avoid breaking existing functionality
        try {
          const headerToken = getCSRFTokenFromHeaders(req?.headers);
          const bodyToken = getCSRFTokenFromBody(credentials);
          const providedToken = headerToken || bodyToken;
          
          // For now, we'll log if no CSRF token is provided but not block the login
          if (!providedToken) {
            console.warn('No CSRF token provided for login attempt');
            // In production, you might want to throw an error here
            // throw new Error('CSRF token required');
          }
        } catch (error) {
          console.warn('CSRF token validation error:', error);
          // Continue with login even if CSRF validation fails
        }

        // Server-side password validation for login
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/;
        if (!passwordRegex.test(credentials.password)) {
          throw new Error('Invalid password format');
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
          select: {
            id: true,
            email: true,
            password: true,
            name: true,
            image: true,
            role: true,
            emailVerified: true,
            isEmailVerified: true,
          },
        });

        if (!user?.password || !(await compare(credentials.password, user.password))) {
          throw new Error('Invalid email or password');
        }

        if (!user.isEmailVerified) {
          throw new Error('Please verify your email before logging in');
        }

        const { password: _, ...userWithoutPass } = user;
        return userWithoutPass as CustomUser;
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === 'google' || account?.provider === 'credentials') {
        try {
          if (account?.provider === 'google') {
            // Mark email as verified for Google
            await prisma.user.update({
              where: { email: user.email },
              data: {
                emailVerified: new Date(),
                isEmailVerified: true,
              },
            });
          }

          // Check if this is the user's first login (lastLogin is null or undefined)
          const dbUser = await prisma.user.findUnique({
            where: { email: user.email },
            select: { lastLogin: true, name: true, email: true },
          });
          const isFirstLogin = !dbUser?.lastLogin;
          if (isFirstLogin) {
            console.log('Sending welcome email to:', dbUser?.email);
            // Send welcome email
            const logoUrl = 'https://nextjsshop.com/brand/logo-light.svg';
            const docsUrl = 'https://nextjsshop.com/docs';
            const templatesUrl = 'https://nextjsshop.com/templates';
            const componentsUrl = 'https://nextjsshop.com/components';
            const emailUrl = "mailto:nextjsshop@gmail.com?subject=Requesting%20Custom%20Pages&body=Hi%20Taher,%0D%0AI'm%20interested%20in%20adding%20more%20pages%20to%20a%20template%20I%20purchased.%20Can%20you%20help?";
            const ceoName = 'Taher, CEO and Karansinh, Co-Founder @Nextjsshop';
            const html = `
              <div style="padding: 48px 16px; background-color: #f9fafb; font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
  <!-- Main Card Container -->
  <div style="max-width: 520px; margin: 0 auto; background: #ffffff; border-radius: 16px; box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05); padding: 40px 32px;">
    
    <!-- Logo Header -->
    <div style="text-align: center; margin-bottom: 32px;">
      <img src='${logoUrl}' alt='Nextjsshop Logo' style='height: 44px;' />
    </div>
    
    <!-- Greeting Section -->
    <div style="margin-bottom: 24px;">
      <h1 style="color: #111827; font-size: 24px; font-weight: 700; margin: 0 0 16px; line-height: 1.3;">
        Hey${user.name ? ' ' + user.name : ''}, welcome to Nextjsshop!
      </h1>
      <p style="color: #4b5563; font-size: 16px; line-height: 1.6; margin: 0;">
        Your one-stop destination for high-quality templates and UI components that will accelerate your development process.
      </p>
    </div>
    
    <!-- Benefits Section -->
    <div style="background-color: #f8fafc; border-radius: 12px; padding: 20px; margin-bottom: 24px;">
      <p style="color: #111827; font-size: 16px; font-weight: 600; margin: 0 0 12px;">
        With Nextjsshop you can:
      </p>
      <ul style="color: #4b5563; font-size: 15px; line-height: 1.6; margin: 0; padding-left: 20px;">
        <li style="margin-bottom: 8px;">Launch projects faster with ready-made templates</li>
        <li style="margin-bottom: 8px;">Build beautiful interfaces with modular components</li>
        <li>Save hundreds of hours in development time</li>
      </ul>
    </div>
    
    <!-- Quick Links -->
    <div style="margin-bottom: 32px;">
      <h2 style="color: #111827; font-size: 18px; font-weight: 600; margin: 0 0 16px;">
        Get started:
      </h2>
      <div style="display: grid; gap: 12px;">
        <a href="${templatesUrl}" style="display: block; background-color: #f3f4f6; margin-top: 10px; color: #111827; font-weight: 500; font-size: 15px; padding: 14px 16px; border-radius: 8px; text-decoration: none; transition: background-color 0.2s ease;">
          🎨 Browse Templates
        </a>
        <a href="${componentsUrl}" style="display: block; background-color: #f3f4f6; margin-top: 10px; color: #111827; font-weight: 500; font-size: 15px; padding: 14px 16px; border-radius: 8px; text-decoration: none; transition: background-color 0.2s ease;">
          🧩 Explore Components
        </a>
        <a href="${docsUrl}" style="display: block; background-color: #f3f4f6; margin-top: 10px; color: #111827; font-weight: 500; font-size: 15px; padding: 14px 16px; border-radius: 8px; text-decoration: none; transition: background-color 0.2s ease;">
          📚 Read Documentation
        </a>
      </div>
    </div>
    
    <!-- CTA Section -->
    <div style="text-align: center; margin-bottom: 32px;">
      <a href="${emailUrl}" style="display: inline-block; background-color: #22c55e; color: #ffffff; font-weight: 600; font-size: 15px; padding: 14px 28px; border-radius: 8px; text-decoration: none; box-shadow: 0 4px 6px -1px rgba(34, 197, 94, 0.3);">
        Request Custom Design
      </a>
    </div>
    
    <!-- Signature -->
    <div style="border-top: 1px solid #e5e7eb; padding-top: 24px; margin-bottom: 32px;">
      <p style="color: #111827; font-size: 16px; margin: 0 0 4px;">Happy building,</p>
      <p style="color: #111827; font-size: 16px; font-weight: 600; margin: 0;">${ceoName}</p>
      <p style="color: #6b7280; font-size: 14px; margin: 4px 0 0;">CEO & Founder, Nextjsshop</p>
    </div>
    
    <!-- Social Links -->
    <div style="display: flex; justify-content: center; gap: 20px; margin-bottom: 24px;">
      <a href="https://x.com/yourhandle" target="_blank" style="color: #6b7280; transition: color 0.2s ease;">
        <img src="https://cdn.simpleicons.org/x/6b7280" alt="X" width="20" height="20" />
      </a>
      <a href="https://www.threads.net/@yourhandle" target="_blank" style="color: #6b7280; transition: color 0.2s ease;">
        <img src="https://cdn.simpleicons.org/threads/6b7280" alt="Threads" width="20" height="20" />
      </a>
      <a href="https://instagram.com/yourhandle" target="_blank" style="color: #6b7280; transition: color 0.2s ease;">
        <img src="https://cdn.simpleicons.org/instagram/6b7280" alt="Instagram" width="20" height="20" />
      </a>
      <a href="https://dribbble.com/yourhandle" target="_blank" style="color: #6b7280; transition: color 0.2s ease;">
        <img src="https://cdn.simpleicons.org/dribbble/6b7280" alt="Dribbble" width="20" height="20" />
      </a>
    </div>
    
    <!-- Footer -->
    <div style="text-align: center;">
      <p style="color: #9ca3af; font-size: 13px; margin: 0 0 8px;">
        Nextjsshop Inc, Vadodara, Gujarat, India
      </p>
      <div style="margin-bottom: 8px;">
        <a href="https://nextjsshop.com/privacy" style="color: #9ca3af; text-decoration: none; margin: 0 8px; font-size: 13px;">Privacy</a>
        <span style="color: #d1d5db;">•</span>
        <a href="https://nextjsshop.com/terms" style="color: #9ca3af; text-decoration: none; margin: 0 8px; font-size: 13px;">Terms</a>
        <span style="color: #d1d5db;">•</span>
        <a href="https://nextjsshop.com/about" style="color: #9ca3af; text-decoration: none; margin: 0 8px; font-size: 13px;">About</a>
      </div>
      <p style="color: #9ca3af; font-size: 13px; margin: 0;">
        © ${new Date().getFullYear()} Nextjsshop. All rights reserved.
      </p>
    </div>
  </div>
</div>
            `;
            try {
              const result = await resend.emails.send({
                from: 'hello@nextjsshop.com',
                to: dbUser?.email,
                subject: 'Welcome to Nextjsshop! 🎉',
                html,
              });
              console.log('Welcome email sent result:', result);
            } catch (emailError) {
              console.error('Failed to send welcome email:', emailError);
            }
            // Update lastLogin
            try {
              console.log('Updating lastLogin for:', dbUser?.email);
              const updateResult = await prisma.user.update({
                where: { email: user.email },
                data: { lastLogin: new Date() },
              });
              console.log('lastLogin update result:', updateResult);
            } catch (err) {
              console.error('Error updating lastLogin:', err);
            }
          }
        } catch (error) {
          console.log('User not found during email verification update, will be created by adapter');
        }
      }
      return true;
    },

    async jwt({ token, user }) {
      if (user) {
        token.id = (user as CustomUser).id;
        token.email = user.email;
        token.name = user.name;
        token.picture = user.image;
        token.role = (user as CustomUser).role;
      }

      // If we don't have the role in the token yet, fetch it from the database
      if (!token.role && token.email) {
        const dbUser = await prisma.user.findUnique({
          where: { email: token.email },
          select: { role: true },
        });
        if (dbUser) {
          token.role = dbUser.role;
        }
      }

      return token;
    },

    async session({ session, token }): Promise<Session> {
      if (!token?.email) return session;

      const dbUser = await prisma.user.findUnique({
        where: { email: token.email },
        select: {
          id: true,
          email: true,
          name: true,
          image: true,
          role: true,
        },
      });

      if (dbUser) {
        session.user = {
          id: dbUser.id,
          email: dbUser.email,
          name: dbUser.name,
          image: dbUser.image,
          role: dbUser.role,
        };
      }

      return session;
    },
  },
  events: {
    async createUser({ user }) {
      try {
        console.log('createUser event triggered for:', user.email);
        // Only send if lastLogin is null (should always be for new user)
        if (!user.lastLogin) {
          console.log('Sending welcome email to (createUser):', user.email);
          const logoUrl = 'https://mintlifyuii.vercel.app/brand/logo-light.svg';
          const docsUrl = 'https://mintlifyuii.vercel.app/docs';
          const templatesUrl = 'https://mintlifyuii.vercel.app/templates';
          const componentsUrl = 'https://mintlifyuii.vercel.app/components';
          const emailUrl = 'mailto:nextjsshop@gmail.com?subject=Requesting Custom Pages&body=Hi Taher,%0D%0AI\'m interested in adding more pages to a template I purchased. Can you help?';
          const ceoName = 'Taher, CEO & Co-Founder @ Nextjsshop';

          const html = `
  <div style="padding: 32px 0; background: #fff;">
    <div style="max-width: 480px; margin: 0 auto; background: #fff; border-radius: 18px; box-shadow: 0 4px 24px rgba(0,0,0,0.07); padding: 32px 24px; font-family: 'Inter', Arial, sans-serif;">
      <div style="text-align: left; margin-bottom: 24px;">
        <img src='${logoUrl}' alt='Nextjsshop Logo' style='height: 40px; margin-bottom: 24px;' />
      </div>
      <p style="color: #18181b; font-size: 1.1rem; margin-bottom: 16px;">Hey${user.name ? ' ' + user.name : ''},</p>
      <p style="color: #18181b; font-size: 1.1rem; margin-bottom: 16px;"><strong>Welcome to Nextjsshop</strong> – your one-stop destination for high-quality templates and UI components.</p>
      <p style="color: #52525b; font-size: 1.1rem; margin-bottom: 24px;">Whether you're launching a SaaS, portfolio, or landing page – we've got everything ready-made to save you hours of work.</p>
      <p style="color: #18181b; font-size: 1.1rem; margin-bottom: 12px;">Get started by exploring:</p>
      <ul style="margin-bottom: 24px; color: #18181b; font-size: 1.1rem;">
        <li><a href="${docsUrl}" style="color: #22c55e; text-decoration: underline;">Documentation</a> – See how to implement our templates.</li>
        <li><a href="${templatesUrl}" style="color: #22c55e; text-decoration: underline;">Browse Templates</a> – Choose a ready-made layout for your product.</li>
        <li><a href="${componentsUrl}" style="color: #22c55e; text-decoration: underline;">Explore Components</a> – Use modular UI parts to build fast.</li>
        <li><a href="${emailUrl}" style="color: #22c55e; text-decoration: underline;">Request Custom Pages</a> – Need more pages? Contact us directly.</li>
      </ul>
      <p style="color: #18181b; font-size: 1.1rem; margin-bottom: 24px;">We're excited to help you build faster and better. Let's create something amazing.</p>
      <p style="color: #18181b; font-size: 1.1rem;">${ceoName}</p>
      
      <div style="color: #a1a1aa; font-size: 0.95rem; margin-top: 32px;">Nextjsshop Inc, Gujarat, India</div>

      <div style="margin-top: 28px; display: flex; justify-content: center; gap: 16px;">
        <a href="https://x.com/yourhandle" target="_blank"><img src="https://cdn.simpleicons.org/x" alt="X" width="24" height="24" /></a>
        <a href="https://www.threads.net/@yourhandle" target="_blank"><img src="https://cdn.simpleicons.org/threads" alt="Threads" width="24" height="24" /></a>
        <a href="https://instagram.com/yourhandle" target="_blank"><img src="https://cdn.simpleicons.org/instagram" alt="Instagram" width="24" height="24" /></a>
        <a href="https://pinterest.com/yourhandle" target="_blank"><img src="https://cdn.simpleicons.org/pinterest" alt="Pinterest" width="24" height="24" /></a>
        <a href="https://dribbble.com/yourhandle" target="_blank"><img src="https://cdn.simpleicons.org/dribbble" alt="Dribbble" width="24" height="24" /></a>
      </div>

      <div style="margin-top: 24px; text-align: center; font-size: 0.95rem;">
        <a href="https://mintlifyuii.vercel.app/privacy" style="margin: 0 8px; color: #6b7280; text-decoration: underline;">Privacy</a> |
        <a href="https://mintlifyuii.vercel.app/terms" style="margin: 0 8px; color: #6b7280; text-decoration: underline;">Terms</a> |
        <a href="https://mintlifyuii.vercel.app/about" style="margin: 0 8px; color: #6b7280; text-decoration: underline;">About</a>
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
            console.log('Welcome email sent result (createUser):', result);
          } catch (emailError) {
            console.error('Failed to send welcome email (createUser):', emailError);
          }
          // Update lastLogin
          try {
            console.log('Updating lastLogin for (createUser):', user.email);
            const updateResult = await prisma.user.update({
              where: { email: user.email },
              data: { lastLogin: new Date() },
            });
            console.log('lastLogin update result (createUser):', updateResult);
          } catch (err) {
            console.error('Error updating lastLogin (createUser):', err);
          }
        }
      } catch (err) {
        console.error('Error in createUser event:', err);
      }
    }
  },
  pages: {
    signIn: '/login',
  },
  session: {
    strategy: 'jwt',
    maxAge: 7 * 24 * 60 * 60, // 7 days
  },
  debug: process.env.NODE_ENV === 'development',
  secret: process.env.NEXTAUTH_SECRET,
};
