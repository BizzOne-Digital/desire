# ONLY COLLECTION Luxury E-Commerce

A production-ready Next.js App Router storefront for Desire, currently branded as **ONLY COLLECTION**. The design uses a black, gold, and ivory luxury system with editorial imagery, smooth motion, cart and checkout flow, database-ready admin management, and SEO structure.

## Logo Placement

Place the final uploaded logo at:

```txt
public/logo.png
```

The provided logo has already been copied there. Replace `public/logo.png` anytime to update the intro loader, header, metadata logo URL, and admin setting default.

## Stack

- Next.js App Router + TypeScript
- Tailwind CSS 3.4
- Framer Motion
- Prisma ORM
- MongoDB, viewable/manageable in MongoDB Compass
- Custom secure admin auth with bcrypt and signed HTTP-only cookies
- React Hook Form + Zod
- Stripe-ready checkout layer
- Cloudinary-ready media upload layer

## Setup

```bash
npm install
copy .env.example .env
npm run db:push
npm run db:seed
npm run dev
```

Open `http://localhost:3000`. In MongoDB Compass, connect to `mongodb://127.0.0.1:27017` and open the `only_collection` database after seeding.

## Admin Login

After seeding:

- Email: `admin@onlycollection.local`
- Password: `ChangeMe123!`

Change this password before production launch.

## Required Environment Variables

Set these in `.env`:

```env
DATABASE_URL="mongodb://127.0.0.1:27017/only_collection"
AUTH_SECRET="replace-with-a-long-random-secret"
NEXT_PUBLIC_SITE_URL="https://your-domain.com"
```

For production media uploads:

```env
CLOUDINARY_CLOUD_NAME=""
CLOUDINARY_API_KEY=""
CLOUDINARY_API_SECRET=""
```

For live payments:

```env
STRIPE_SECRET_KEY=""
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=""
STRIPE_WEBHOOK_SECRET=""
```

The checkout route creates a mock order without storing raw card details. Add Stripe keys to activate the PaymentIntent integration layer.

## Main Routes

- `/`
- `/shop`
- `/products/[slug]`
- `/services`
- `/pricing`
- `/gallery`
- `/about`
- `/contact`
- `/cart`
- `/checkout`
- `/order-confirmation`
- `/privacy-policy`
- `/terms-and-conditions`
- `/shipping-and-returns`
- `/admin/login`
- `/admin/dashboard`

## Admin Features

The admin dashboard includes routed pages for:

- Dashboard overview
- Product management
- Category management
- Order management
- Website content management
- Media library
- Contact submissions
- Newsletter subscribers
- Settings

Product CRUD is wired to `/api/admin/products` and persists once MongoDB is configured. Contact, newsletter, checkout, settings, authentication, and media validation routes are also implemented.

## Deployment

1. Create a MongoDB database locally or in MongoDB Atlas.
2. Set all production environment variables.
3. Run `npm install`.
4. Run `npm run db:push`.
5. Run `npm run db:seed` once.
6. Run `npm run build`.
7. Deploy to Vercel or another Node-compatible host.

## Final Launch Notes

- Replace demo product images and copy from the admin panel.
- Review privacy, terms, and shipping policy copy with the client.
- Add Stripe credentials before accepting live payments.
- Add Cloudinary credentials before production image uploads.
- Change the seeded admin password.
- Set `NEXT_PUBLIC_SITE_URL` to the final domain.
