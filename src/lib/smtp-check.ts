// SMTP Configuration Check - runs on server startup
export function checkSmtpConfig() {
  const isConfigured =
    process.env.SMTP_USER && process.env.SMTP_PASSWORD;

  if (process.env.NODE_ENV === "development") {
    console.log("\n" + "=".repeat(60));
    console.log("📧 SMTP EMAIL CONFIGURATION");
    console.log("=".repeat(60));

    if (isConfigured) {
      console.log("✅ SMTP is configured");
      console.log(`   Host: ${process.env.SMTP_HOST || "smtp.gmail.com"}`);
      console.log(`   Port: ${process.env.SMTP_PORT || "587"}`);
      console.log(`   User: ${process.env.SMTP_USER}`);
      console.log(`   Notification Email: ${process.env.NOTIFICATION_EMAIL || process.env.SMTP_USER}`);
      console.log("\n✉️  Email notifications will be sent for:");
      console.log("   - Contact form submissions (/contact)");
      console.log("   - Product inquiries (/product-inquiry)");
    } else {
      console.log("⚠️  SMTP is NOT configured");
      console.log("\n   Forms will work, but NO email notifications will be sent.");
      console.log("\n   To enable emails:");
      console.log("   1. Add SMTP credentials to .env file");
      console.log("   2. See SMTP_SETUP.md for detailed instructions");
      console.log("\n   Quick Gmail setup:");
      console.log("   - Get App Password: https://myaccount.google.com/apppasswords");
      console.log("   - Add to .env: SMTP_USER and SMTP_PASSWORD");
    }

    console.log("=".repeat(60) + "\n");
  }

  return isConfigured;
}
