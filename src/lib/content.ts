export type Category = {
  id: string;
  name: string;
  slug: string;
  description: string;
  imageUrl: string;
};

export type Product = {
  id: string;
  title: string;
  slug: string;
  category: string;
  description: string;
  price: number;
  salePrice?: number;
  sku: string;
  stock: number;
  tags: string[];
  featured: boolean;
  isNew?: boolean;
  bestSeller?: boolean;
  popularity: number;
  images: string[];
  variants: { name: string; values: string[]; required?: boolean }[];
  details: { title: string; body: string }[];
};

export type Service = {
  title: string;
  slug: string;
  description: string;
  imageUrl: string;
  features: string[];
};

export type PricingPlan = {
  name: string;
  price: string;
  description: string;
  features: string[];
  highlighted?: boolean;
};

export type GalleryItem = {
  title: string;
  description: string;
  imageUrl: string;
  category: string;
};

export type Testimonial = {
  name: string;
  rating: number;
  review: string;
};

export const siteConfig = {
  businessName: "ONLY COLLECTION",
  editableBusinessName: "ONLY COLLECTION",
  fallbackBusinessName: "Velorian Collection",
  phone: "(514) 709-8704",
  email: "onlycollection21@gmail.com",
  currency: "CAD",
  logoUrl: "/logo.png",
  currentWebsite: "veloriancollection.myshopify.com",
  description:
    "A premium catalog inquiry service for customers browsing external fashion supplier catalogs.",
  address: "",
  businessHours: "",
  socialLinks: {
    instagram: "",
    facebook: "",
    tiktok: "",
    pinterest: "",
  },
};

export const editorialImages = [
  "/gallery/gallery-1.png",
  "/gallery/gallery-2.png",
  "/gallery/gallery-3.png",
  "/gallery/gallery-4.png",
  "/gallery/gallery-5.png",
];

const productImageSets = {
  auricVeil: [
    "/products/auric-veil-1.png",
    "/products/auric-veil-2.png",
    "/products/auric-veil-3.png",
    "/products/auric-veil-4.png",
    "/products/auric-veil-5.png",
  ],
  gildedHour: [
    "/products/gilded-hour-1.png",
    "/products/gilded-hour-2.png",
    "/products/gilded-hour-3.png",
    "/products/gilded-hour-4.png",
    "/products/gilded-hour-5.png",
  ],
  noirSilk: [
    "/products/noir-silk-1.png",
    "/products/noir-silk-2.png",
    "/products/noir-silk-3.png",
    "/products/noir-silk-4.png",
    "/products/noir-silk-5.png",
  ],
  ivoryRitual: [
    "/products/ivory-ritual-1.png",
    "/products/ivory-ritual-2.png",
    "/products/ivory-ritual-3.png",
    "/products/ivory-ritual-4.png",
    "/products/ivory-ritual-5.png",
  ],
  champagneDrape: [
    "/products/champagne-drape-1.png",
    "/products/champagne-drape-2.png",
    "/products/champagne-drape-3.png",
    "/products/champagne-drape-4.png",
    "/products/champagne-drape-5.png",
  ],
  velvetKeepsake: [
    "/products/velvet-keepsake-1.png",
    "/products/velvet-keepsake-2.png",
    "/products/velvet-keepsake-3.png",
    "/products/velvet-keepsake-4.png",
    "/products/velvet-keepsake-5.png",
  ],
  goldenMist: [
    "/products/golden-mist-1.png",
    "/products/golden-mist-2.png",
    "/products/golden-mist-3.png",
    "/products/golden-mist-4.png",
    "/products/golden-mist-5.png",
  ],
  midnightGiftSet: [
    "/products/midnight-gift-set-1.png",
    "/products/midnight-gift-set-2.png",
    "/products/midnight-gift-set-3.png",
    "/products/midnight-gift-set-4.png",
    "/products/midnight-gift-set-5.png",
  ],
};

export const categories: Category[] = [
  {
    id: "cat-fragrance",
    name: "Signature Fragrance",
    slug: "signature-fragrance",
    description: "Warm, polished scent profiles made for lasting presence.",
    imageUrl: "/categories/signature-fragrance.png",
  },
  {
    id: "cat-accessories",
    name: "Elevated Accessories",
    slug: "elevated-accessories",
    description: "Finishing touches with a quiet, high-end confidence.",
    imageUrl: "/categories/elevated-accessories.png",
  },
  {
    id: "cat-care",
    name: "Body & Ritual",
    slug: "body-and-ritual",
    description: "Daily essentials designed to feel personal and indulgent.",
    imageUrl: "/categories/body-and-ritual.png",
  },
];

export const products: Product[] = [
  {
    id: "prod-auric-veil",
    title: "Auric Veil Eau de Parfum",
    slug: "auric-veil-eau-de-parfum",
    category: "Signature Fragrance",
    description:
      "A soft amber fragrance layered with neroli, vanilla woods, and a luminous musk finish.",
    price: 128,
    salePrice: 112,
    sku: "OC-FRG-001",
    stock: 18,
    tags: ["fragrance", "amber", "featured"],
    featured: true,
    isNew: true,
    popularity: 98,
    images: productImageSets.auricVeil,
    variants: [
      { name: "Size", values: ["30ml", "50ml", "100ml"], required: true },
    ],
    details: [
      {
        title: "Scent Notes",
        body: "Neroli, warm amber, vanilla woods, brushed musk.",
      },
      {
        title: "Shipping",
        body: "Ships in 2-4 business days with premium protective packaging.",
      },
      {
        title: "Returns",
        body: "Unopened products may be returned within 14 days of delivery.",
      },
    ],
  },
  {
    id: "prod-gilded-hour",
    title: "Gilded Hour Bracelet",
    slug: "gilded-hour-bracelet",
    category: "Elevated Accessories",
    description:
      "A refined gold-tone bracelet with a sculptural silhouette and adjustable clasp.",
    price: 86,
    sku: "OC-ACC-002",
    stock: 9,
    tags: ["accessory", "gold", "best-seller"],
    featured: true,
    bestSeller: true,
    popularity: 91,
    images: productImageSets.gildedHour,
    variants: [
      {
        name: "Finish",
        values: ["Polished Gold", "Soft Champagne"],
        required: true,
      },
    ],
    details: [
      {
        title: "Material",
        body: "Gold-tone plated stainless steel with a high-polish finish.",
      },
      {
        title: "Care",
        body: "Store dry, avoid perfume contact, and wipe gently after wear.",
      },
      {
        title: "Packaging",
        body: "Arrives in a reusable black gift box with gold detailing.",
      },
    ],
  },
  {
    id: "prod-noir-silk",
    title: "Noir Silk Body Oil",
    slug: "noir-silk-body-oil",
    category: "Body & Ritual",
    description:
      "A lightweight body oil with soft sheen, botanical emollients, and a warm clean scent.",
    price: 62,
    sku: "OC-RIT-003",
    stock: 24,
    tags: ["body", "ritual", "new"],
    featured: true,
    isNew: true,
    popularity: 83,
    images: productImageSets.noirSilk,
    variants: [{ name: "Size", values: ["100ml", "200ml"], required: true }],
    details: [
      {
        title: "Texture",
        body: "Fast absorbing, non-greasy, and softly luminous.",
      },
      {
        title: "Ritual",
        body: "Apply after showering while skin is still slightly damp.",
      },
      {
        title: "Ingredients",
        body: "A demo formulation placeholder editable from admin.",
      },
    ],
  },
  {
    id: "prod-ivory-ritual",
    title: "Ivory Ritual Candle",
    slug: "ivory-ritual-candle",
    category: "Body & Ritual",
    description:
      "A slow-burning candle with creamy sandalwood, smoked fig, and cashmere warmth.",
    price: 74,
    sku: "OC-RIT-004",
    stock: 14,
    tags: ["home", "candle", "gift"],
    featured: true,
    popularity: 77,
    images: productImageSets.ivoryRitual,
    variants: [
      {
        name: "Scent",
        values: ["Sandalwood Fig", "Amber Rose"],
        required: true,
      },
    ],
    details: [
      {
        title: "Burn Time",
        body: "Approximately 45 hours with a properly trimmed wick.",
      },
      {
        title: "Vessel",
        body: "Reusable glass vessel with a minimal black and gold label.",
      },
      {
        title: "Gift Ready",
        body: "Designed for thoughtful gifting and elevated self-care.",
      },
    ],
  },
  {
    id: "prod-champagne-scarf",
    title: "Champagne Drape Scarf",
    slug: "champagne-drape-scarf",
    category: "Elevated Accessories",
    description:
      "A soft satin-finish scarf made to add polish to daily looks and evening styling.",
    price: 94,
    sku: "OC-ACC-005",
    stock: 16,
    tags: ["scarf", "style", "gift"],
    featured: false,
    popularity: 72,
    images: productImageSets.champagneDrape,
    variants: [
      {
        name: "Color",
        values: ["Champagne", "Obsidian", "Ivory"],
        required: true,
      },
    ],
    details: [
      {
        title: "Feel",
        body: "Smooth, lightweight drape with a luminous finish.",
      },
      {
        title: "Styling",
        body: "Wear around the neck, hair, handbag, or shoulders.",
      },
      {
        title: "Care",
        body: "Hand wash cold or dry clean for the longest life.",
      },
    ],
  },
  {
    id: "prod-velvet-pouch",
    title: "Velvet Keepsake Pouch",
    slug: "velvet-keepsake-pouch",
    category: "Elevated Accessories",
    description:
      "A compact velvet pouch for jewelry, fragrance minis, or small daily treasures.",
    price: 38,
    salePrice: 30,
    sku: "OC-ACC-006",
    stock: 31,
    tags: ["pouch", "travel", "sale"],
    featured: false,
    popularity: 63,
    images: productImageSets.velvetKeepsake,
    variants: [
      { name: "Color", values: ["Black", "Champagne"], required: true },
    ],
    details: [
      {
        title: "Use",
        body: "Ideal for travel, gifting, and storing small pieces.",
      },
      {
        title: "Finish",
        body: "Soft velvet exterior with a subtle gold drawstring.",
      },
      {
        title: "Availability",
        body: "Seasonal colors can be added from admin variants.",
      },
    ],
  },
  {
    id: "prod-golden-mist",
    title: "Golden Mist Hair Perfume",
    slug: "golden-mist-hair-perfume",
    category: "Signature Fragrance",
    description:
      "A delicate finishing mist that leaves hair lightly scented with rose, vanilla, and suede.",
    price: 58,
    sku: "OC-FRG-007",
    stock: 22,
    tags: ["fragrance", "hair", "gift"],
    featured: false,
    isNew: true,
    popularity: 69,
    images: productImageSets.goldenMist,
    variants: [{ name: "Size", values: ["50ml"], required: true }],
    details: [
      {
        title: "Scent",
        body: "Rose water, vanilla silk, and a soft suede drydown.",
      },
      { title: "How To Use", body: "Mist lightly from mid-length to ends." },
      { title: "Note", body: "Avoid eyes and freshly heat-styled hair." },
    ],
  },
  {
    id: "prod-midnight-set",
    title: "Midnight Gift Set",
    slug: "midnight-gift-set",
    category: "Body & Ritual",
    description:
      "A polished gift set pairing fragrance, body oil, and a keepsake pouch in premium packaging.",
    price: 182,
    sku: "OC-RIT-008",
    stock: 6,
    tags: ["gift", "bundle", "best-seller"],
    featured: true,
    bestSeller: true,
    popularity: 95,
    images: productImageSets.midnightGiftSet,
    variants: [
      {
        name: "Gift Wrap",
        values: ["Classic Black", "Ivory Ribbon"],
        required: true,
      },
    ],
    details: [
      {
        title: "Included",
        body: "A curated demo bundle, editable from product management.",
      },
      {
        title: "Presentation",
        body: "Premium box, tissue, ribbon, and message card.",
      },
      { title: "Shipping", body: "Gift sets ship boxed and protected." },
    ],
  },
];

export const services: Service[] = [
  {
    title: "Catalog Browsing Support",
    slug: "catalog-browsing-support",
    description:
      "Guidance for customers comparing supplier catalog links, albums, and product references.",
    imageUrl: "/services/services-1.png",
    features: [
      "Catalog navigation help",
      "Product reference checks",
      "Inquiry preparation",
    ],
  },
  {
    title: "Product Inquiry Review",
    slug: "product-inquiry-review",
    description:
      "Support for organizing product links, codes, sizes, colors, quantities, and delivery details.",
    imageUrl: "/services/services-2.png",
    features: [
      "Link or code review",
      "Size and color notes",
      "Country-specific details",
    ],
  },
  {
    title: "Availability Confirmation",
    slug: "availability-confirmation",
    description:
      "Confirmation-focused support before a customer commits to an order or payment.",
    imageUrl: "/services/services-3.png",
    features: [
      "Price confirmation",
      "Availability check",
      "Delivery time estimate",
    ],
  },
  {
    title: "Sourcing Requests",
    slug: "sourcing-requests",
    description:
      "Help with multi-item requests and catalog references across fashion categories.",
    imageUrl: "/services/services-4.png",
    features: [
      "Multiple item inquiries",
      "Category guidance",
      "Direct customer support",
    ],
  },
];

export const pricingPlans: PricingPlan[] = [
  {
    name: "Gift Styling",
    price: "From $45",
    description: "For customers who want a polished, guided gift experience.",
    features: [
      "Product shortlist",
      "Packaging recommendation",
      "Personal note guidance",
    ],
  },
  {
    name: "Premium Bundle",
    price: "From $125",
    description:
      "A curated product bundle built around scent, style, or self-care.",
    highlighted: true,
    features: [
      "Three to five products",
      "Premium packaging",
      "Editable recipient profile",
    ],
  },
  {
    name: "Custom Consultation",
    price: "Custom",
    description:
      "For larger orders, special events, and highly personalized requests.",
    features: [
      "Direct consultation",
      "Custom sourcing structure",
      "Flexible fulfilment plan",
    ],
  },
];

export const galleryItems: GalleryItem[] = [
  {
    title: "Amber Editorial",
    description:
      "A warm still life focused on texture, shine, and evening glow.",
    category: "Editorial",
    imageUrl: "/gallery/gallery-1.png",
  },
  {
    title: "Catalog Mood",
    description: "A refined visual reference for browsing fashion categories.",
    category: "Editorial",
    imageUrl: "/gallery/gallery-2.png",
  },
  {
    title: "Quiet Detail",
    description:
      "Subtle accessories that add confidence without overwhelming the look.",
    category: "Accessories",
    imageUrl: "/gallery/gallery-3.png",
  },
  {
    title: "Style Reference",
    description:
      "Neutral styling details for a clean catalog browsing experience.",
    category: "Fashion",
    imageUrl: "/gallery/gallery-4.png",
  },
  {
    title: "Evening Detail",
    description: "Polished accessories and finish for customer inspiration.",
    category: "Accessories",
    imageUrl: "/gallery/gallery-5.png",
  },
  {
    title: "Ivory Light",
    description:
      "Minimal, luminous styling with a premium black and gold palette.",
    category: "Editorial",
    imageUrl: "/gallery/gallery-6.png",
  },
];

export const testimonials: Testimonial[] = [];

export const policyContent = {
  privacy:
    "ONLY COLLECTION respects your privacy. Customer information is used to respond to inquiries, confirm requested product details, and send updates only when consent is provided.",
  terms:
    "By using this website, customers agree to use the catalog inquiry service lawfully, provide accurate inquiry information, and understand that external catalog products, prices, sizes, colors, and availability require confirmation.",
  shipping:
    "Delivery timing, shipping options, and return eligibility must be confirmed for each inquiry before payment. Direct online checkout is not currently available.",
};
