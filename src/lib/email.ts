import nodemailer from "nodemailer";

// Create reusable transporter
const createTransporter = () => {
  const smtpConfig = {
    host: process.env.SMTP_HOST || "smtp.gmail.com",
    port: parseInt(process.env.SMTP_PORT || "587"),
    secure: process.env.SMTP_SECURE === "true", // true for 465, false for other ports
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
    },
  };

  // Validate SMTP configuration
  if (!smtpConfig.auth.user || !smtpConfig.auth.pass) {
    console.warn(
      "⚠️  SMTP credentials not configured. Emails will not be sent. Please set SMTP_USER and SMTP_PASSWORD in .env"
    );
    return null;
  }

  return nodemailer.createTransport(smtpConfig);
};

// Email templates
export const emailTemplates = {
  contactForm: (data: {
    name: string;
    email: string;
    phone?: string;
    subject: string;
    message: string;
  }) => ({
    subject: `New Contact Form: ${data.subject}`,
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #D7B56D 0%, #B8954A 100%); color: #000; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
            .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 8px 8px; }
            .field { margin-bottom: 20px; }
            .label { font-weight: bold; color: #D7B56D; margin-bottom: 5px; }
            .value { background: #fff; padding: 12px; border-radius: 4px; border-left: 3px solid #D7B56D; }
            .footer { text-align: center; margin-top: 30px; color: #666; font-size: 12px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1 style="margin: 0;">Sport Only</h1>
              <p style="margin: 5px 0 0 0;">New Contact Form Submission</p>
            </div>
            <div class="content">
              <div class="field">
                <div class="label">Name:</div>
                <div class="value">${data.name}</div>
              </div>
              <div class="field">
                <div class="label">Email:</div>
                <div class="value"><a href="mailto:${data.email}">${data.email}</a></div>
              </div>
              ${
                data.phone
                  ? `
              <div class="field">
                <div class="label">Phone:</div>
                <div class="value"><a href="tel:${data.phone}">${data.phone}</a></div>
              </div>
              `
                  : ""
              }
              <div class="field">
                <div class="label">Subject:</div>
                <div class="value">${data.subject}</div>
              </div>
              <div class="field">
                <div class="label">Message:</div>
                <div class="value">${data.message.replace(/\n/g, "<br>")}</div>
              </div>
            </div>
            <div class="footer">
              <p>This email was sent from Sport Only website contact form</p>
              <p>© ${new Date().getFullYear()} Sport Only. All rights reserved.</p>
            </div>
          </div>
        </body>
      </html>
    `,
    text: `
New Contact Form Submission

Name: ${data.name}
Email: ${data.email}
${data.phone ? `Phone: ${data.phone}` : ""}
Subject: ${data.subject}

Message:
${data.message}

---
This email was sent from Sport Only website contact form
    `,
  }),

  productInquiry: (data: {
    name: string;
    email: string;
    phone?: string;
    catalogName: string;
    productDetails: string;
    additionalInfo?: string;
  }) => ({
    subject: `Product Inquiry - ${data.catalogName}`,
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #D7B56D 0%, #B8954A 100%); color: #000; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
            .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 8px 8px; }
            .field { margin-bottom: 20px; }
            .label { font-weight: bold; color: #D7B56D; margin-bottom: 5px; }
            .value { background: #fff; padding: 12px; border-radius: 4px; border-left: 3px solid #D7B56D; }
            .footer { text-align: center; margin-top: 30px; color: #666; font-size: 12px; }
            .badge { display: inline-block; background: #D7B56D; color: #000; padding: 4px 12px; border-radius: 12px; font-size: 11px; font-weight: bold; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1 style="margin: 0;">Sport Only</h1>
              <p style="margin: 5px 0 0 0;">New Product Inquiry</p>
            </div>
            <div class="content">
              <div class="field">
                <div class="label">Catalog:</div>
                <div class="value"><span class="badge">${data.catalogName}</span></div>
              </div>
              <div class="field">
                <div class="label">Customer Name:</div>
                <div class="value">${data.name}</div>
              </div>
              <div class="field">
                <div class="label">Email:</div>
                <div class="value"><a href="mailto:${data.email}">${data.email}</a></div>
              </div>
              ${
                data.phone
                  ? `
              <div class="field">
                <div class="label">Phone:</div>
                <div class="value"><a href="tel:${data.phone}">${data.phone}</a></div>
              </div>
              `
                  : ""
              }
              <div class="field">
                <div class="label">Product Details:</div>
                <div class="value">${data.productDetails.replace(/\n/g, "<br>")}</div>
              </div>
              ${
                data.additionalInfo
                  ? `
              <div class="field">
                <div class="label">Additional Information:</div>
                <div class="value">${data.additionalInfo.replace(/\n/g, "<br>")}</div>
              </div>
              `
                  : ""
              }
            </div>
            <div class="footer">
              <p>This email was sent from Sport Only product inquiry form</p>
              <p>© ${new Date().getFullYear()} Sport Only. All rights reserved.</p>
            </div>
          </div>
        </body>
      </html>
    `,
    text: `
New Product Inquiry

Catalog: ${data.catalogName}
Customer Name: ${data.name}
Email: ${data.email}
${data.phone ? `Phone: ${data.phone}` : ""}

Product Details:
${data.productDetails}

${data.additionalInfo ? `Additional Information:\n${data.additionalInfo}` : ""}

---
This email was sent from Sport Only product inquiry form
    `,
  }),
};

// Send email function
export async function sendEmail({
  to,
  subject,
  html,
  text,
}: {
  to: string;
  subject: string;
  html: string;
  text: string;
}) {
  const transporter = createTransporter();

  if (!transporter) {
    console.warn("Email not sent - SMTP not configured");
    return {
      success: false,
      error: "SMTP not configured",
    };
  }

  try {
    const info = await transporter.sendMail({
      from: `"Sport Only" <${process.env.SMTP_USER}>`,
      to,
      subject,
      html,
      text,
    });

    console.log("✅ Email sent successfully:", info.messageId);
    return {
      success: true,
      messageId: info.messageId,
    };
  } catch (error) {
    console.error("❌ Error sending email:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

// Verify SMTP connection
export async function verifySmtpConnection() {
  const transporter = createTransporter();

  if (!transporter) {
    return {
      success: false,
      error: "SMTP not configured",
    };
  }

  try {
    await transporter.verify();
    console.log("✅ SMTP connection verified successfully");
    return {
      success: true,
      message: "SMTP connection verified",
    };
  } catch (error) {
    console.error("❌ SMTP connection failed:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}
