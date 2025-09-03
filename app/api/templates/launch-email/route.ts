import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const { templateId, name, url } = await request.json();
    if (!templateId || !name || !url) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Fetch template details for image and description
    const template = await prisma.template.findUnique({
      where: { id: templateId }, // templateId is now a string, no need to parse
      select: { image: true, description: true },
    });
    const templateImage = template?.image || "";
    const templateDescription = template?.description || "";

    // Fetch all user emails
    const users = await prisma.user.findMany({
      select: { email: true, isEmailVerified: true },
      where: { isEmailVerified: true },
    });
    const emails = users.map((u) => u.email).filter(Boolean);
    if (emails.length === 0) {
      return NextResponse.json({ error: "No users to email" }, { status: 404 });
    }

    console.log("Sending launch email to these emails:", emails);

    // Email HTML
    const subject = `🚀 New Template Launched: ${name}`;

    const html = `
        <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" 
          "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
        <html lang="en">
          <head>
            <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
            <meta name="x-apple-disable-message-reformatting">
            <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
            <title>${name} Launch</title>
          </head>
          <body style="margin:0; padding:0; background-color:#f9fafb; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
            <!-- Preview text for inbox -->
            <div style="display:none; overflow:hidden; line-height:1px; opacity:0; max-height:0; max-width:0;">
              New template live: ${name}! View now →
            </div>
        
            <!-- Main card -->
            <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation"
              style="max-width: 600px; width: 100%; margin: 0 auto; background-color: #ffffff; border-radius: 12px; padding: 40px 24px; box-shadow: 0 4px 20px rgba(0,0,0,0.05);">
              <tr>
                <td style="text-align: center;">
                  <img src="https://yourdomain.com/brand/logo-light.svg" alt="Nextjsshop Logo" height="48" style="margin-bottom: 16px;" />
                </td>
              </tr>
        
              <tr>
                <td style="text-align: center;">
                  <h1 style="font-size: 24px; color: #111827; margin: 0 0 12px;">
                    Introducing <span style="color: #22c55e;">${name}</span> 🎉
                  </h1>
                  <p style="font-size: 16px; color: #4b5563; margin: 0 0 24px;">
                    ${templateDescription}
                  </p>
                </td>
              </tr>
        
              ${
                templateImage
                  ? `<tr>
                      <td style="text-align: center;">
                        <img src="${templateImage}" alt="${name}" 
                          style="width: 100%; max-width: 100%; border-radius: 8px; margin-bottom: 24px;" />
                      </td>
                    </tr>`
                  : ""
              }
        
              <tr>
                <td style="text-align: center;">
                  <a href="${url}" style="display: inline-block; background-color: #22c55e; color: #ffffff; font-weight: 600; font-size: 16px; padding: 14px 32px; border-radius: 8px; text-decoration: none; box-shadow: 0 2px 6px rgba(34,197,94,0.12);">
                    View Template
                  </a>
                </td>
              </tr>
        
              <tr>
                <td style="text-align: center; padding-top: 24px;">
                  <p style="font-size: 14px; color: #6b7280; margin: 0;">
                    Thank you for being part of the Nextjsshop community 💚<br/>
                    We're here to help you build faster and better.
                  </p>
                </td>
              </tr>
            </table>
        
            <!-- Footer -->
            <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation"
              style="max-width: 600px; margin: 0 auto; padding: 32px 24px 0;">
              <tr>
                <td style="text-align: center; color: #9ca3af; font-size: 12px; line-height: 1.5;">
                  <p style="margin: 0;">Nextjsshop · Wankaner, Gujarat, India</p>
                  <p style="margin: 0;">Need help? <a href="mailto:support@nextjsshop.com" style="color: #22c55e; text-decoration: none;">Contact Support</a></p>
                </td>
              </tr>
            </table>
          </body>
        </html>
        `;

    // Resend supports up to 1000 recipients per call
    const batchSize = 900;
    for (let i = 0; i < emails.length; i += batchSize) {
      const batch = emails.slice(i, i + batchSize);
      await resend.emails.send({
        from: "hello@nextjsshop.com",
        to: batch,
        subject,
        html,
      });
    }
    return NextResponse.json({
      success: true,
      message: "Launch email sent to all users.",
    });
  } catch (error: any) {
    console.error("Error sending launch email:", error);
    return NextResponse.json(
      { error: "Failed to send launch email", details: error.message },
      { status: 500 }
    );
  }
}
