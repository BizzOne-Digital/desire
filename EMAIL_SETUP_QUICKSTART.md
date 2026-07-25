# 📧 Email Setup Quick Start

## What This Does

Your Sport Only website now sends email notifications for:
- ✉️ Contact form submissions → Sends to your email
- 🛍️ Product inquiries → Sends to your email

## 🚀 Quick Setup (5 Minutes)

### Step 1: Get Gmail App Password

1. Visit: https://myaccount.google.com/apppasswords
2. If prompted, enable 2-Factor Authentication first
3. Select **"Mail"** as the app
4. Select **"Other"** as device, name it "Sport Only"
5. Click **Generate**
6. **COPY the 16-character password** (it looks like: `abcd efgh ijkl mnop`)

### Step 2: Update .env File

Open your `.env` file and add:

```env
SMTP_HOST="smtp.gmail.com"
SMTP_PORT="587"
SMTP_SECURE="false"
SMTP_USER="onlycollection21@gmail.com"
SMTP_PASSWORD="abcdefghijklmnop"
NOTIFICATION_EMAIL="onlycollection21@gmail.com"
```

⚠️ **Important**: Remove spaces from the App Password!
- Gmail gives you: `abcd efgh ijkl mnop`
- You need: `abcdefghijklmnop`

### Step 3: Restart Server

```bash
npm run dev
```

Look for this message:
```
✅ SMTP is configured
   Email notifications will be sent for:
   - Contact form submissions (/contact)
   - Product inquiries (/product-inquiry)
```

## ✅ Test It

1. Visit: http://localhost:3000/contact
2. Fill out the form
3. Submit
4. Check your email: **onlycollection21@gmail.com**
5. You should receive the contact form submission!

## 🎨 Email Features

Emails include:
- ✨ Professional gold & black Sport Only branding
- 📱 Mobile-responsive design
- 📋 All form details nicely formatted
- 🔗 Clickable email/phone links

## 🔧 Troubleshooting

### "SMTP not configured" Warning
- Make sure you added all SMTP variables to `.env`
- Restart your dev server: `npm run dev`

### "Authentication failed"
- Double-check you're using the **App Password**, not your regular Gmail password
- Make sure 2-Factor Authentication is enabled on your Google Account
- Remove any spaces from the password

### Emails Not Arriving
- Check spam folder
- Verify `NOTIFICATION_EMAIL` is correct in `.env`
- Check server console for error messages

### Still Not Working?
1. Stop the server (Ctrl+C)
2. Delete `.next` folder
3. Run `npm run dev` again
4. Try testing the form again

## 📚 Advanced Setup

For production or other email providers, see:
- **Full Guide**: `SMTP_SETUP.md`
- Includes SendGrid, AWS SES, Outlook, and more

## 🔒 Security Notes

- ✅ `.env` file is in `.gitignore` (credentials are safe)
- ✅ Never commit your App Password to Git
- ✅ Use different passwords for dev and production
- ✅ Rotate passwords regularly

## 📞 Support

Having issues? Contact:
- Email: onlycollection21@gmail.com
- Phone: (514) 709-8704

---

**That's it!** Your email notifications are now working! 🎉
