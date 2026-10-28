import { editorialImages, galleryItems, policyContent, services } from "@/lib/content";
import { catalogs } from "@/lib/catalogs";
import type { Catalog } from "@/lib/catalogs";
import type { GalleryItem, Service } from "@/lib/content";

export type FieldType = "text" | "textarea" | "image";

export type ContentField = {
  key: string;
  label: string;
  type: FieldType;
  defaultValue: string;
};

export type ContentSection = {
  page: string;
  title: string;
  fields: ContentField[];
};

type FieldTuple = [key: string, label: string, type: FieldType, defaultValue: string];

function section(page: string, title: string, fields: FieldTuple[]): ContentSection {
  return {
    page,
    title,
    fields: fields.map(([key, label, type, defaultValue]) => ({ key, label, type, defaultValue }))
  };
}

const strip = (page: string, title: string): FieldTuple => [`${page}.strip.title`, "Image strip title", "text", title];

const sharedStripImages = [
  "/gallery/gallery-1.png",
  "/gallery/gallery-2.png",
  "/gallery/gallery-3.png",
  "/gallery/gallery-4.png",
  "/gallery/gallery-5.png",
  "/gallery/gallery-6.png"
];

export const contentSections: ContentSection[] = [
  // ---------------------------------------------------------------- Home
  section("Home", "Hero", [
    ["home.hero.image", "Hero background image", "image", "/hero-background.png"],
    ["home.hero.kicker", "Small label above headline", "text", "Premium Athletic Catalogs"],
    ["home.hero.line1", "Headline line 1", "text", "Authentic"],
    ["home.hero.line2", "Headline line 2", "text", "Sports"],
    ["home.hero.line3", "Headline line 3", "text", "Merchandise"],
    ["home.hero.accent", "Headline gold line", "text", "Sport Only."],
    [
      "home.hero.text",
      "Hero paragraph",
      "textarea",
      "Browse our curated catalogs featuring sneakers, bags, watches, accessories, and premium athletic gear from trusted suppliers."
    ],
    ["home.hero.cta1", "Primary button label", "text", "Browse Catalogs"],
    ["home.hero.cta2", "Secondary button label", "text", "How to Order"]
  ]),
  section("Home", "Featured catalogs", [
    ["home.catalogs.eyebrow", "Eyebrow", "text", "Featured Catalogs"],
    ["home.catalogs.title", "Title", "text", "Start exploring our premium collections"],
    [
      "home.catalogs.text",
      "Text",
      "textarea",
      "Browse authentic athletic merchandise from verified suppliers. Each catalog opens in a new window for your convenience."
    ],
    ["home.catalogs.button", "Button label", "text", "View All Catalogs"]
  ]),
  section("Home", "Brand story", [
    ["home.story.image", "Story image", "image", "/pages/about-hero.png"],
    ["home.story.pills", "Four tags (comma separated)", "text", "Curated, Refined, Elevated, Timeless"],
    ["home.story.eyebrow", "Eyebrow", "text", "Brand Story"],
    ["home.story.title", "Title", "text", "Fashion designed to feel personal and polished."],
    [
      "home.story.text",
      "Text",
      "textarea",
      "ONLY COLLECTION focuses on elevated style, careful presentation, and a calm shopping experience built around confidence and clarity."
    ],
    ["home.story.link", "Link label", "text", "Explore Brand"]
  ]),
  section("Home", "Services block", [
    ["home.services.eyebrow", "Eyebrow", "text", "Services"],
    ["home.services.title", "Title", "text", "Support shaped around a refined customer experience."]
  ]),
  section("Home", "Quote banner", [
    ["home.quote.image", "Background image", "image", "/pages/gallery-hero.png"],
    ["home.quote.text", "Quote", "text", "“Designed to make you feel extraordinary.”"]
  ]),
  section("Home", "Gallery block", [
    ["home.gallery.eyebrow", "Eyebrow", "text", "Gallery"],
    ["home.gallery.title", "Title", "text", "A refined visual world."],
    ["home.gallery.button", "Button label", "text", "View Gallery"]
  ]),
  section("Home", "Contact banner", [
    ["home.contact.eyebrow", "Eyebrow", "text", "Stay Connected"],
    ["home.contact.title", "Title", "text", "Reach out for styling guidance and collection questions."],
    ["home.contact.button", "Button label", "text", "Contact Us"]
  ]),
  section("Home", "Image strip", [
    strip("home", "Homepage Editorial Set"),
    ...editorialImages.map((image, index): FieldTuple => [`home.strip.${index + 1}`, `Image ${index + 1}`, "image", image])
  ]),

  // --------------------------------------------------------------- About
  section("About", "Hero", [
    ["about.hero.image", "Hero image", "image", "/pages/about-hero.png"],
    ["about.hero.eyebrow", "Eyebrow", "text", "About"],
    ["about.hero.title", "Title", "text", "A brand built for confidence and quiet luxury."],
    [
      "about.hero.text",
      "Text",
      "textarea",
      "ONLY COLLECTION is shaped around refined style, careful presentation, and a calm customer experience."
    ]
  ]),
  section("About", "Our story", [
    ["about.story.image", "Image", "image", "/gallery/gallery-6.png"],
    ["about.story.eyebrow", "Eyebrow", "text", "Our Story"],
    ["about.story.title", "Title", "text", "Designed to feel personal and polished."],
    [
      "about.story.text",
      "Text",
      "textarea",
      "The brand focuses on elevated fashion details, clear communication, and a premium visual world that feels intentional from first glance."
    ],
    ["about.story.button", "Button label", "text", "Explore Shop"]
  ]),
  section("About", "Mission, vision, promise", [
    ["about.mission.title", "Card 1 title", "text", "Mission"],
    [
      "about.mission.text",
      "Card 1 text",
      "textarea",
      "To help people feel extraordinary through refined fashion and thoughtful presentation."
    ],
    ["about.vision.title", "Card 2 title", "text", "Vision"],
    [
      "about.vision.text",
      "Card 2 text",
      "textarea",
      "To become a trusted destination for elevated style and a calm luxury experience."
    ],
    ["about.promise.title", "Card 3 title", "text", "Promise"],
    [
      "about.promise.text",
      "Card 3 text",
      "textarea",
      "Every detail is handled with care, clarity, and a premium sense of finish."
    ]
  ]),
  section("About", "Values", [
    ["about.values.eyebrow", "Eyebrow", "text", "Values"],
    ["about.values.title", "Title", "text", "The details that guide the brand."],
    ["about.values.1", "Value 1", "text", "Warmth"],
    ["about.values.2", "Value 2", "text", "Confidence"],
    ["about.values.3", "Value 3", "text", "Refinement"],
    ["about.values.4", "Value 4", "text", "Care"]
  ]),
  section("About", "Customer journey", [
    ["about.journey.eyebrow", "Eyebrow", "text", "Journey"],
    ["about.journey.title", "Title", "text", "How customers experience ONLY COLLECTION."],
    ["about.journey.1", "Step 1", "text", "Discover the collections"],
    ["about.journey.2", "Step 2", "text", "Explore the visual world"],
    ["about.journey.3", "Step 3", "text", "Ask for guidance"],
    ["about.journey.4", "Step 4", "text", "Stay connected with the brand"]
  ]),
  section("About", "Image strip", [strip("about", "About Editorial Set")]),

  // ------------------------------------------------------------ Services
  section("Services", "Hero", [
    ["services.hero.image", "Hero image", "image", "/pages/services-hero.png"],
    ["services.hero.eyebrow", "Eyebrow", "text", "Services"],
    ["services.hero.title", "Title", "text", "Support shaped around a refined experience."],
    [
      "services.hero.text",
      "Text",
      "textarea",
      "From styling guidance to personal support, every service is designed to feel calm, clear, and premium."
    ],
    ["services.hero.cta", "Button label", "text", "Contact Us"]
  ]),
  section("Services", "Services list heading", [
    ["services.offer.eyebrow", "Eyebrow", "text", "What We Offer"],
    ["services.offer.title", "Title", "text", "Careful support for every customer journey."]
  ]),
  section("Services", "Process", [
    ["services.process.eyebrow", "Eyebrow", "text", "Process"],
    ["services.process.title", "Title", "text", "A calm path from discovery to support."],
    ["services.process.1", "Step 1", "text", "Explore collections"],
    ["services.process.2", "Step 2", "text", "Review details"],
    ["services.process.3", "Step 3", "text", "Ask for guidance"],
    ["services.process.4", "Step 4", "text", "Stay connected"]
  ]),
  section("Services", "FAQ", [
    ["services.faq.eyebrow", "Eyebrow", "text", "FAQ"],
    ["services.faq.title", "Title", "text", "Helpful details."],
    ["services.faq.1.q", "Question 1", "text", "How can I ask about a collection?"],
    [
      "services.faq.1.a",
      "Answer 1",
      "textarea",
      "Use the Contact page to share your questions and we will respond with clear guidance."
    ],
    ["services.faq.2.q", "Question 2", "text", "Is online checkout available right now?"],
    [
      "services.faq.2.a",
      "Answer 2",
      "textarea",
      "Direct online checkout is currently unavailable. Contact us for pricing and availability details."
    ],
    ["services.faq.3.q", "Question 3", "text", "Can I request styling advice?"],
    [
      "services.faq.3.a",
      "Answer 3",
      "textarea",
      "Yes. Reach out with the collection or look you have in mind and we will help guide the next step."
    ],
    ["services.faq.button", "Button label", "text", "Contact Us"]
  ]),
  section("Services", "Image strip", [strip("services", "Services Editorial Set")]),

  // ---------------------------------------------------------------- Shop
  section("Shop", "Hero", [
    ["shop.hero.image", "Hero image", "image", "/pages/shop-hero.png"],
    ["shop.hero.eyebrow", "Eyebrow", "text", "Browse Catalogs"],
    ["shop.hero.title", "Title", "text", "Premium Athletic Collections"],
    [
      "shop.hero.text",
      "Text",
      "textarea",
      "Explore our curated catalogs featuring authentic sneakers, bags, watches, and sports accessories. Each catalog opens in a new window for your convenience."
    ],
    ["shop.hero.cta", "Button label", "text", "How to Order"]
  ]),
  section("Shop", "Catalog list heading", [
    ["shop.list.eyebrow", "Eyebrow", "text", "Our Catalogs"],
    ["shop.list.title", "Title", "text", "Choose a catalog to explore."],
    [
      "shop.list.text",
      "Text",
      "textarea",
      "Browse authentic athletic and sports merchandise. Some catalogs require access codes - we've provided them for your convenience."
    ]
  ]),
  section("Shop", "Help banner", [
    ["shop.help.eyebrow", "Eyebrow", "text", "Need Help?"],
    ["shop.help.title", "Title", "text", "Questions about our catalogs or how to order?"],
    [
      "shop.help.text",
      "Text",
      "textarea",
      "Our catalogs are hosted externally on Yupoo. Browse freely and contact us with any product inquiries or questions about ordering."
    ]
  ]),
  section("Shop", "Image strip", [strip("shop", "Shop Inspiration")]),

  // ------------------------------------------------------------- Gallery
  section("Gallery", "Hero", [
    ["gallery.hero.image", "Hero image", "image", "/pages/gallery-hero.png"],
    ["gallery.hero.eyebrow", "Eyebrow", "text", "Gallery"],
    ["gallery.hero.title", "Title", "text", "A refined visual world."],
    [
      "gallery.hero.text",
      "Text",
      "textarea",
      "Explore fashion and lifestyle imagery that supports the ONLY COLLECTION black-and-gold aesthetic."
    ]
  ]),

  // ------------------------------------------------------------- Contact
  section("Contact", "Hero", [
    ["contact.hero.image", "Hero image", "image", "/pages/contact-hero.png"],
    ["contact.hero.eyebrow", "Eyebrow", "text", "Contact"],
    ["contact.hero.title", "Title", "text", "We would love to hear from you."],
    [
      "contact.hero.text",
      "Text",
      "textarea",
      "Reach out for collection questions, styling guidance, or general brand support."
    ]
  ]),
  section("Contact", "Details block", [
    ["contact.reach.eyebrow", "Eyebrow", "text", "Reach Us"],
    ["contact.reach.title", "Title", "text", "Clear support for every message."],
    [
      "contact.reach.text",
      "Text",
      "textarea",
      "Share your question and we will respond with helpful, carefully considered guidance."
    ]
  ]),
  section("Contact", "Image strip", [strip("contact", "Contact Editorial Set")]),

  // ------------------------------------------------------- How to order
  section("How to Order", "Hero", [
    ["order.hero.image", "Hero image", "image", "/pages/services-hero.png"],
    ["order.hero.eyebrow", "Eyebrow", "text", "Ordering Process"],
    ["order.hero.title", "Title", "text", "How to Order from Sport Only"],
    [
      "order.hero.text",
      "Text",
      "textarea",
      "Our catalog-based ordering process ensures you get authentic athletic merchandise with personalized service. Browse, inquire, and order with confidence."
    ],
    ["order.hero.cta", "Button label", "text", "Browse Catalogs"]
  ]),
  section("How to Order", "Steps heading", [
    ["order.steps.eyebrow", "Eyebrow", "text", "Simple Process"],
    ["order.steps.title", "Title", "text", "Four easy steps to get your authentic gear"],
    [
      "order.steps.text",
      "Text",
      "textarea",
      "Our streamlined ordering process connects you directly with premium athletic merchandise."
    ]
  ]),
  section("How to Order", "Step 1", [
    ["order.step1.title", "Title", "text", "Browse Our Catalogs"],
    [
      "order.step1.text",
      "Description",
      "textarea",
      "Explore our curated Yupoo catalogs featuring sneakers, bags, watches, accessories, and more. Some catalogs require access codes - we provide them for your convenience."
    ],
    [
      "order.step1.details",
      "Bullet points (one per line)",
      "textarea",
      "Visit our Shop Catalogs page\nClick on any catalog to open it in a new window\nUse provided access codes for password-protected catalogs\nBrowse products and note items you're interested in"
    ]
  ]),
  section("How to Order", "Step 2", [
    ["order.step2.title", "Title", "text", "Note Product Details"],
    [
      "order.step2.text",
      "Description",
      "textarea",
      "When you find products you like, save the important details. You'll need this information when contacting us."
    ],
    [
      "order.step2.details",
      "Bullet points (one per line)",
      "textarea",
      "Product name or description\nYupoo album link or product code\nSize, color, or variant preferences\nQuantity needed"
    ]
  ]),
  section("How to Order", "Step 3", [
    ["order.step3.title", "Title", "text", "Contact Us"],
    [
      "order.step3.text",
      "Description",
      "textarea",
      "Reach out to us with your product inquiry. We'll provide current pricing, availability, and shipping information."
    ],
    [
      "order.step3.details",
      "Bullet points (one per line). {email} and {phone} are filled in from Settings.",
      "textarea",
      "Email us at {email}\nCall or text {phone}\nUse our Product Inquiry form\nInclude all product details from Step 2"
    ]
  ]),
  section("How to Order", "Step 4", [
    ["order.step4.title", "Title", "text", "Complete Your Order"],
    [
      "order.step4.text",
      "Description",
      "textarea",
      "We'll work with you to confirm details, arrange payment, and coordinate delivery of your authentic athletic merchandise."
    ],
    [
      "order.step4.details",
      "Bullet points (one per line)",
      "textarea",
      "Receive pricing and availability confirmation\nDiscuss shipping options and timeline\nComplete payment through agreed method\nTrack your order until delivery"
    ]
  ]),
  section("How to Order", "Before you order", [
    ["order.info.eyebrow", "Eyebrow", "text", "Important Information"],
    ["order.info.title", "Title", "text", "Before You Order"],
    ["order.info.1.title", "Note 1 title", "text", "External Catalogs"],
    [
      "order.info.1.text",
      "Note 1 text",
      "textarea",
      "Our catalogs are hosted on Yupoo, an external platform. We don't control inventory or pricing directly - we act as your connection to verified suppliers."
    ],
    ["order.info.2.title", "Note 2 title", "text", "Pricing & Availability"],
    [
      "order.info.2.text",
      "Note 2 text",
      "textarea",
      "Prices and stock levels change frequently. Contact us for current pricing, availability, and shipping costs before placing your order."
    ],
    ["order.info.3.title", "Note 3 title", "text", "Delivery Timeline"],
    [
      "order.info.3.text",
      "Note 3 text",
      "textarea",
      "Most orders ship within 3-7 business days, with delivery taking 10-21 days depending on your location and selected shipping method."
    ]
  ]),
  section("How to Order", "Help box", [
    ["order.help.eyebrow", "Eyebrow", "text", "Need Help?"],
    ["order.help.title", "Title", "text", "We're Here to Assist"],
    [
      "order.help.text",
      "Text",
      "textarea",
      "Have questions about a product, catalog, or the ordering process? Our team is ready to help."
    ]
  ]),
  section("How to Order", "Bottom banner", [
    ["order.cta.image", "Background image", "image", "/pages/contact-hero.png"],
    ["order.cta.eyebrow", "Eyebrow", "text", "Ready to Start?"],
    ["order.cta.title", "Title", "text", "Browse Our Catalogs"],
    [
      "order.cta.text",
      "Text",
      "textarea",
      "Explore authentic athletic merchandise from verified suppliers. Find your perfect gear and reach out to place your order."
    ],
    ["order.cta.button", "Button label", "text", "View Catalogs"]
  ]),

  // ------------------------------------------------------------ Policies
  section("Policies", "Privacy Policy", [
    ["privacy.hero.image", "Hero image", "image", "/pages/about-hero.png"],
    ["privacy.hero.text", "Hero text", "text", "How customer information is handled, protected, and used."],
    ["privacy.body", "Policy text", "textarea", policyContent.privacy],
    strip("privacy", "Privacy Policy Editorial Set")
  ]),
  section("Policies", "Terms and Conditions", [
    ["terms.hero.image", "Hero image", "image", "/pages/about-hero.png"],
    ["terms.hero.text", "Hero text", "text", "Clear expectations for using the website and purchasing products."],
    ["terms.body", "Policy text", "textarea", policyContent.terms],
    strip("terms", "Terms and Conditions Editorial Set")
  ]),
  section("Policies", "Shipping and Returns", [
    ["shipping.hero.image", "Hero image", "image", "/pages/services-hero.png"],
    ["shipping.hero.text", "Hero text", "text", "Helpful delivery timing, return expectations, and care for each order."],
    ["shipping.body", "Policy text", "textarea", policyContent.shipping],
    strip("shipping", "Shipping and Returns Editorial Set")
  ]),

  // -------------------------------------------------------------- Footer
  section("Footer & Shared", "Footer", [
    [
      "footer.about",
      "Footer description",
      "textarea",
      "Your premier destination for authentic athletic and sports catalogs. Browse our curated collection of premium sports merchandise."
    ],
    [
      "footer.notice",
      "Footer notice",
      "textarea",
      "Our catalogs are hosted on external platforms. All products are subject to availability. Contact us for current pricing and shipping information."
    ],
    ["footer.newsletter", "Newsletter text", "textarea", "Receive new arrivals, editorial notes, and brand announcements."],
    ["footer.tagline", "Bottom line", "text", "Sport Only - Premium Athletic Catalogs"]
  ]),
  section("Footer & Shared", "Shared image strip (inner pages)", [
    ["strip.eyebrow", "Eyebrow", "text", "Imagery"],
    [
      "strip.text",
      "Text",
      "textarea",
      "Each page includes rich editorial imagery so the experience feels visual, premium, and complete across desktop and mobile."
    ],
    ...sharedStripImages.map((image, index): FieldTuple => [`strip.${index + 1}`, `Image ${index + 1}`, "image", image])
  ])
];

export const contentDefaults: Record<string, string> = Object.fromEntries(
  contentSections.flatMap((item) => item.fields.map((field) => [field.key, field.defaultValue]))
);

export const contentPages = Array.from(new Set(contentSections.map((item) => item.page)));

export type ListKey = "services" | "gallery" | "catalogs";
export const LIST_KEYS: ListKey[] = ["services", "gallery", "catalogs"];

export const listDefaults: { services: Service[]; gallery: GalleryItem[]; catalogs: Catalog[] } = {
  services,
  gallery: galleryItems,
  catalogs
};
