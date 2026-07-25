# SMTP Email Setup Guide

This application uses Nodemailer to send emails for contact forms and product inquiries.

## Quick Setup

### 1. Configure Environment Variables

Add these variables to your `.env` file:

```env
# SMTP Configuration
SMTP_HOST="smtp.gmail.com"
SMTP_PORT="587"
SMTP_SECURE="false"
SMTP_USER="onlycollection21@gmail.com"
SMTP_PASSWORD="your-app-password-here"
NOTIFICATION_EMAIL="onlycollection21@gmail.com"
```

### 2. Gmail Setup (Recommended)

#### Step 1: Enable 2-Factor Authentication
1. Go to your Google Account: https://myaccount.google.com/
2. Click on "Security" in the left sidebar
3. Under "Signing in to Google", enable "2-Step Verification"

#### Step 2: Generate App Password
1. Go to: https://myaccount.google.com/apppasswords
2. Select "Mail" as the app
3. Select "Other (Custom name)" as the device
4. Enter "Sport Only Website" as the name
5. Click "Generate"
6. Copy the 16-character password (remove spaces)
7. Paste it in your `.env` file as `SMTP_PASSWORD`

**Example:**
```env
SMTP_PASSWORD="abcd efgh ijkl mnop"  # Remove spaces → "abcdefghijklmnop"
```

### 3. Alternative Email Providers

#### SendGrid
```env
SMTP_HOST="smtp.sendgrid.net"
SMTP_PORT="587"
SMTP_SECURE="false"
SMTP_USER="apikey"
SMTP_PASSWORD="your-sendgrid-api-key"
```

#### Outlook/Hotmail
```env
SMTP_HOST="smtp-mail.outlook.com"
SMTP_PORT="587"
SMTP_SECURE="false"
SMTP_USER="your-email@outlook.com"
SMTP_PASSWORD="your-password"
```

#### Yahoo Mail
```env
SMTP_HOST="smtp.mail.yahoo.com"
SMTP_PORT="587"
SMTP_SECURE="false"
SMTP_USER="your-email@yahoo.com"
SMTP_PASSWORD="your-app-password"
```

#### Custom SMTP Server
```env
SMTP_HOST="mail.yourdomain.com"
SMTP_PORT="465"
SMTP_SECURE="true"
SMTP_USER="noreply@yourdomain.com"
SMTP_PASSWORD="your-password"
```

## Features

### Email Notifications Sent For:

1. **Contact Form Submissions** (`/contact`)
   - Customer name, email, phone, subject, and message
   - Stored in database (if configured)
   - Email notification to admin

2. **Product Inquiries** (`/product-inquiry`)
   - Customer info, catalog selection, product details
   - Quantity, size, color preferences
   - Additional notes
   - Email notification to admin

### Email Templates

All emails include:
- Professional HTML formatting
- Gold and black Sport Only branding
- Responsive design
- Plain text fallback
- Structured data presentation

## Testing

### Test SMTP Connection

Create a test file `test-email.js`:

```javascript
require('dotenv').config();
const { verifySmtpConnection } = require('./src/lib/email');

async function test() {
  const result = await verifySmtpConnection();
  console.log(result);
}

test();
```

Run: `node test-email.js`

### Send Test Email

Test the contact form at: `http://localhost:3000/contact`
Test product inquiry at: `http://localhost:3000/product-inquiry`

## Troubleshooting

### "SMTP not configured" Warning
- Check that `SMTP_USER` and `SMTP_PASSWORD` are set in `.env`
- Restart your development server after changing `.env`

### "Authentication failed"
- **Gmail**: Make sure you're using an App Password, not your regular password
- **Gmail**: Verify 2-Factor Authentication is enabled
- Check that email and password are correct

### "Connection timeout"
- Check firewall settings
- Try different SMTP ports (587, 465, 25)
- For port 465, set `SMTP_SECURE="true"`

### "Self-signed certificate"
For development with self-signed certificates, add to email.ts:
```javascript
tls: {
  rejectUnauthorized: false
}
```

### Emails Going to Spam
1. Use a verified domain email (not Gmail)
2. Set up SPF, DKIM, and DMARC records
3. Use a dedicated SMTP service like SendGrid or AWS SES
4. Warm up your sending IP gradually

## Production Recommendations

### Use Professional Email Service
For production, consider using:
- **SendGrid** (Free: 100 emails/day)
- **AWS SES** (Very affordable, high limits)
- **Mailgun** (Good for transactional emails)
- **Postmark** (Focus on deliverability)

### Security Best Practices
1. Never commit `.env` file to Git
2. Use environment variables in production
3. Rotate passwords regularly
4. Monitor email sending logs
5. Implement rate limiting for forms
6. Add CAPTCHA to prevent spam

### Environment Variables (Production)
Set these in your hosting platform (Vercel, Netlify, etc.):
```
SMTP_HOST
SMTP_PORT
SMTP_SECURE
SMTP_USER
SMTP_PASSWORD
NOTIFICATION_EMAIL
```

## Support

For issues or questions:
- Email: onlycollection21@gmail.com
- Phone: (514) 709-8704

## License

Proprietary - Sport Only © 2025
