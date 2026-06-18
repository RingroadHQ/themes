import type { Product, ProductVariant, Collection, NavLink } from "../types";

// ============================================================================
// Helper to generate placeholder images via Lorem Picsum
// Each photo ID returns a consistent, real photograph
// ============================================================================
function img(seed: number, w = 800, h = 600): string {
  const picsumIds = [
    10, 11, 20, 21, 30, 31, 40, 41, 50, 51, 60, 61, 70, 71, 80, 81, 90, 91, 100,
    101,
  ];
  const photoId = picsumIds[seed % picsumIds.length];
  return `https://picsum.photos/id/${photoId}/${w}/${h}`;
}

// ============================================================================
// Product Variant Builders
// ============================================================================

function makeVariants(
  productId: string,
  options: { name: string; values: string[] }[],
  basePrice: number,
  imageOffset = 0,
): ProductVariant[] {
  const variants: ProductVariant[] = [];
  const [opt1, opt2] = options;

  opt1.values.forEach((v1, i) => {
    const subOptions = opt2?.values ?? [null];
    subOptions.forEach((v2, j) => {
      const idx = variants.length;
      const priceMod = j > 0 ? 5 : 0; // slight price variation
      variants.push({
        id: `${productId}-variant-${idx}`,
        title: v2 ? `${v1} / ${v2}` : v1,
        option1: v1,
        option2: v2 ?? null,
        option3: null,
        sku: `${productId.toUpperCase()}-${idx.toString().padStart(2, "0")}`,
        price: basePrice + priceMod,
        compareAtPrice: idx % 2 === 0 ? basePrice + priceMod + 15 : null,
        available: idx !== 2,
        imageId: `${productId}-img-${(i + imageOffset) % 4}`,
      });
    });
  });

  return variants;
}

// ============================================================================
// The 20 Wallet Products
// ============================================================================

export const mockProducts: Product[] = [
  // 1. Classic Leather Bifold
  {
    id: "prod-001",
    handle: "classic-leather-bifold",
    title: "Classic Leather Bifold",
    description:
      "Our signature bifold wallet crafted from full-grain Italian leather that ages beautifully over time.",
    descriptionHtml: `<p>Our <strong>signature bifold wallet</strong> is crafted from full-grain Italian leather, sourced from the finest tanneries in Tuscany. Each wallet is hand-stitched by skilled artisans and features:</p><ul><li>6 card slots with RFID blocking</li><li>2 hidden pockets for receipts</li><li>Full-length bill compartment</li><li>Premium nylon stitching for durability</li></ul><p>The leather develops a rich patina with age, making each wallet uniquely yours. Designed to last a lifetime.</p>`,
    vendor: "elora",
    type: "Bifold",
    tags: ["leather", "bifold", "classic", "bestseller"],
    images: [
      {
        id: "prod-001-img-0",
        src: img(0),
        alt: "Classic Leather Bifold front view",
        width: 800,
        height: 600,
        position: 0,
      },
      {
        id: "prod-001-img-1",
        src: img(1),
        alt: "Classic Leather Bifold open with cards",
        width: 800,
        height: 600,
        position: 1,
      },
      {
        id: "prod-001-img-2",
        src: img(2),
        alt: "Classic Leather Bifold side view",
        width: 800,
        height: 600,
        position: 2,
      },
      {
        id: "prod-001-img-3",
        src: img(3),
        alt: "Classic Leather Bifold detail stitching",
        width: 800,
        height: 600,
        position: 3,
      },
    ],
    variants: [],
    options: [
      { name: "Color", position: 1, values: ["Brown", "Black", "Tan"] },
      { name: "Material", position: 2, values: ["Full-Grain", "Top-Grain"] },
    ],
    priceRange: { min: 79, max: 89 },
    compareAtPriceRange: { min: 99, max: 109 },
    available: true,
    createdAt: "2026-01-15T00:00:00Z",
    updatedAt: "2026-06-01T00:00:00Z",
    reviews: [
      {
        id: "rev-001",
        rating: 5,
        title: "Best wallet I've ever owned",
        body: "The leather quality is incredible. After 6 months it's developed a beautiful patina and still looks brand new. Worth every penny.",
        author: "Michael R.",
        createdAt: "2026-05-20T00:00:00Z",
      },
      {
        id: "rev-002",
        rating: 4,
        title: "Great craftsmanship",
        body: "Beautiful wallet, very well made. Only wish it had one more card slot, but overall very happy.",
        author: "Sarah K.",
        createdAt: "2026-04-15T00:00:00Z",
      },
      {
        id: "rev-003",
        rating: 5,
        title: "Perfect gift",
        body: "Bought this for my husband and he loves it. The packaging was beautiful too.",
        author: "Jennifer T.",
        createdAt: "2026-06-05T00:00:00Z",
      },
    ],
    averageRating: 4.7,
    reviewCount: 3,
    seo: {
      title: "Classic Leather Bifold - Premium Handcrafted Wallet",
      description:
        "Handcrafted full-grain Italian leather bifold wallet with RFID blocking. 6 card slots, bill compartment. Ages beautifully. Free shipping over $75.",
    },
  },
  // 2. Slim Cardholder
  {
    id: "prod-002",
    handle: "slim-cardholder",
    title: "Slim Cardholder",
    description:
      "A minimalist's dream. Carry up to 8 cards in this sleek, pocket-friendly cardholder with a central pull-tab.",
    descriptionHtml: `<p>The <strong>Slim Cardholder</strong> is designed for those who carry light. Made from premium vegetable-tanned leather, it features:</p><ul><li>Quick-access front slot for your most-used card</li><li>Central pull-tab pocket for 5-7 additional cards</li><li>Ultra-thin 4mm profile when loaded</li><li>RFID-blocking layer</li></ul><p>Disappears into any pocket. Perfect for front-pocket carry.</p>`,
    vendor: "elora",
    type: "Cardholder",
    tags: ["minimalist", "cardholder", "slim", "rfid"],
    images: [
      {
        id: "prod-002-img-0",
        src: img(4),
        alt: "Slim Cardholder front",
        width: 800,
        height: 600,
        position: 0,
      },
      {
        id: "prod-002-img-1",
        src: img(5),
        alt: "Slim Cardholder with cards",
        width: 800,
        height: 600,
        position: 1,
      },
      {
        id: "prod-002-img-2",
        src: img(6),
        alt: "Slim Cardholder side profile",
        width: 800,
        height: 600,
        position: 2,
      },
    ],
    variants: [],
    options: [
      {
        name: "Color",
        position: 1,
        values: ["Brown", "Black", "Burgundy", "Navy"],
      },
    ],
    priceRange: { min: 49, max: 49 },
    compareAtPriceRange: { min: 65, max: 65 },
    available: true,
    createdAt: "2026-02-01T00:00:00Z",
    updatedAt: "2026-06-01T00:00:00Z",
    reviews: [],
    averageRating: 5,
    reviewCount: 0,
    seo: {
      title: "Slim Cardholder - Minimalist Leather Wallet",
      description:
        "Ultra-slim leather cardholder for 8 cards with RFID blocking. 4mm thin profile. Perfect front-pocket minimalist wallet.",
    },
  },
  // 3. Travel Wallet
  {
    id: "prod-003",
    handle: "travel-wallet",
    title: "Travel Wallet",
    description:
      "Keep your passport, boarding pass, cards, and currency organized in our full-featured travel wallet.",
    descriptionHtml: `<p>The <strong>Travel Wallet</strong> is your ultimate travel companion. Crafted from durable saffiano leather, it includes:</p><ul><li>Dedicated passport pocket</li><li>Boarding pass sleeve</li><li>8 card slots</li><li>Zippered coin pocket</li><li>Multiple currency compartments</li><li>Pen loop</li></ul><p>Stay organized on every journey. RFID-blocking throughout for peace of mind.</p>`,
    vendor: "elora",
    type: "Travel",
    tags: ["travel", "passport", "rfid", "organization"],
    images: [
      {
        id: "prod-003-img-0",
        src: img(6),
        alt: "Travel Wallet open",
        width: 800,
        height: 600,
        position: 0,
      },
      {
        id: "prod-003-img-1",
        src: img(7),
        alt: "Travel Wallet with passport",
        width: 800,
        height: 600,
        position: 1,
      },
      {
        id: "prod-003-img-2",
        src: img(8),
        alt: "Travel Wallet zipped closed",
        width: 800,
        height: 600,
        position: 2,
      },
      {
        id: "prod-003-img-3",
        src: img(0),
        alt: "Travel Wallet interior pockets",
        width: 800,
        height: 600,
        position: 3,
      },
    ],
    variants: [],
    options: [
      { name: "Color", position: 1, values: ["Brown", "Black", "Navy"] },
    ],
    priceRange: { min: 119, max: 119 },
    compareAtPriceRange: { min: 149, max: 149 },
    available: true,
    createdAt: "2026-01-20T00:00:00Z",
    updatedAt: "2026-05-15T00:00:00Z",
    reviews: [],
    averageRating: 4.5,
    reviewCount: 0,
    seo: {
      title: "Travel Wallet - Passport & Boarding Pass Organizer",
      description:
        "Full-featured travel wallet with passport pocket, boarding pass sleeve, 8 card slots, and RFID blocking. Saffiano leather.",
    },
  },
  // 4. Money Clip Wallet
  {
    id: "prod-004",
    handle: "money-clip-wallet",
    title: "Money Clip Wallet",
    description:
      "The perfect fusion of a cardholder and money clip. Carry your cards and cash with confidence.",
    descriptionHtml: `<p>The <strong>Money Clip Wallet</strong> combines the best of both worlds. Features:</p><ul><li>Magnetic money clip for secure cash holding</li><li>4 card slots on the reverse</li><li>ID window</li><li>Full-grain leather construction</li><li>Slim 8mm profile</li></ul><p>Perfect for those who still carry cash but want a minimalist solution.</p>`,
    vendor: "elora",
    type: "Money Clip",
    tags: ["money-clip", "minimalist", "compact"],
    images: [
      {
        id: "prod-004-img-0",
        src: img(9),
        alt: "Money Clip Wallet front",
        width: 800,
        height: 600,
        position: 0,
      },
      {
        id: "prod-004-img-1",
        src: img(10),
        alt: "Money Clip Wallet with cash",
        width: 800,
        height: 600,
        position: 1,
      },
      {
        id: "prod-004-img-2",
        src: img(11),
        alt: "Money Clip Wallet back cards",
        width: 800,
        height: 600,
        position: 2,
      },
    ],
    variants: [],
    options: [
      { name: "Color", position: 1, values: ["Brown", "Black"] },
      { name: "Clip Finish", position: 2, values: ["Silver", "Gunmetal"] },
    ],
    priceRange: { min: 59, max: 64 },
    compareAtPriceRange: null,
    available: true,
    createdAt: "2026-03-01T00:00:00Z",
    updatedAt: "2026-06-01T00:00:00Z",
    reviews: [],
    averageRating: 0,
    reviewCount: 0,
    seo: {
      title: "Money Clip Wallet - Magnetic Cash & Card Holder",
      description:
        "Full-grain leather money clip wallet with magnetic clip, 4 card slots, and ID window. Slim 8mm profile.",
    },
  },
  // 5. RFID Blocking Bifold
  {
    id: "prod-005",
    handle: "rfid-blocking-bifold",
    title: "RFID Blocking Bifold",
    description:
      "All the elegance of our classic bifold with advanced RFID-blocking technology throughout.",
    descriptionHtml: `<p>Our <strong>RFID Blocking Bifold</strong> offers complete digital protection without compromising on style. Features:</p><ul><li>Full RFID-blocking lining in all card slots</li><li>8 card slots with quick-access thumb slot</li><li>2 hidden compartments</li><li>Bill compartment with divider</li><li>Premium top-grain leather</li></ul><p>Tested and certified to block 13.56MHz signals including credit cards, debit cards, and ID cards.</p>`,
    vendor: "elora",
    type: "Bifold",
    tags: ["rfid", "bifold", "security", "leather"],
    images: [
      {
        id: "prod-005-img-0",
        src: img(11),
        alt: "RFID Bifold front",
        width: 800,
        height: 600,
        position: 0,
      },
      {
        id: "prod-005-img-1",
        src: img(12),
        alt: "RFID Bifold open",
        width: 800,
        height: 600,
        position: 1,
      },
      {
        id: "prod-005-img-2",
        src: img(13),
        alt: "RFID Bifold RFID layer detail",
        width: 800,
        height: 600,
        position: 2,
      },
      {
        id: "prod-005-img-3",
        src: img(14),
        alt: "RFID Bifold with cards",
        width: 800,
        height: 600,
        position: 3,
      },
    ],
    variants: [],
    options: [
      { name: "Color", position: 1, values: ["Brown", "Black", "Tan"] },
    ],
    priceRange: { min: 89, max: 89 },
    compareAtPriceRange: { min: 110, max: 110 },
    available: true,
    createdAt: "2026-02-15T00:00:00Z",
    updatedAt: "2026-06-01T00:00:00Z",
    reviews: [],
    averageRating: 5,
    reviewCount: 0,
    seo: {
      title: "RFID Blocking Bifold - Secure Leather Wallet",
      description:
        "Premium RFID-blocking bifold wallet with 8 card slots, full signal protection. Top-grain leather. Certified secure.",
    },
  },
  // 6. Minimalist Front Pocket
  {
    id: "prod-006",
    handle: "minimalist-front-pocket-wallet",
    title: "Minimalist Front Pocket Wallet",
    description:
      "Designed for front-pocket carry. Ultra-thin, lightweight, and made from premium leather.",
    descriptionHtml: `<p>The <strong>Minimalist Front Pocket Wallet</strong> is our thinnest wallet yet at just 3mm. Features:</p><ul><li>Holds up to 6 cards plus folded bills</li><li>Elastic band closure</li><li>Vegetable-tanned leather</li><li>Pull-tab for quick card access</li><li>Weighs only 45 grams</li></ul><p>You'll forget it's in your pocket - until you need it.</p>`,
    vendor: "elora",
    type: "Minimalist",
    tags: ["minimalist", "front-pocket", "slim", "lightweight"],
    images: [
      {
        id: "prod-006-img-0",
        src: img(15),
        alt: "Minimalist Front Pocket Wallet",
        width: 800,
        height: 600,
        position: 0,
      },
      {
        id: "prod-006-img-1",
        src: img(16),
        alt: "Front Pocket Wallet with cards",
        width: 800,
        height: 600,
        position: 1,
      },
      {
        id: "prod-006-img-2",
        src: img(17),
        alt: "Front Pocket Wallet size comparison",
        width: 800,
        height: 600,
        position: 2,
      },
    ],
    variants: [],
    options: [
      {
        name: "Color",
        position: 1,
        values: ["Brown", "Black", "Tan", "Olive"],
      },
    ],
    priceRange: { min: 39, max: 39 },
    compareAtPriceRange: null,
    available: true,
    createdAt: "2026-04-01T00:00:00Z",
    updatedAt: "2026-06-01T00:00:00Z",
    reviews: [],
    averageRating: 0,
    reviewCount: 0,
    seo: {
      title: "Minimalist Front Pocket Wallet - Ultra-Thin 3mm",
      description:
        "Ultra-thin 3mm front pocket wallet. Holds 6 cards. Vegetable-tanned leather. Only 45g. The lightest wallet you'll ever carry.",
    },
  },
  // 7. Vintage Leather Bifold
  {
    id: "prod-007",
    handle: "vintage-leather-bifold",
    title: "Vintage Leather Bifold",
    description:
      "Pre-distressed leather with old-world character. Each wallet tells its own unique story.",
    descriptionHtml: `<p>The <strong>Vintage Leather Bifold</strong> is crafted from specially treated full-grain leather that has the character of a decades-old wallet from day one. Features:</p><ul><li>Pre-distressed leather with unique grain patterns</li><li>Hand-burnished edges</li><li>6 card slots</li><li>2 receipt pockets</li><li>Bill compartment</li><li>Each piece is one-of-a-kind</li></ul><p>No two wallets are exactly alike. Yours will be unique.</p>`,
    vendor: "elora",
    type: "Bifold",
    tags: ["vintage", "bifold", "distressed", "unique"],
    images: [
      {
        id: "prod-007-img-0",
        src: img(18),
        alt: "Vintage Leather Bifold front",
        width: 800,
        height: 600,
        position: 0,
      },
      {
        id: "prod-007-img-1",
        src: img(19),
        alt: "Vintage Leather Bifold close up patina",
        width: 800,
        height: 600,
        position: 1,
      },
      {
        id: "prod-007-img-2",
        src: img(0),
        alt: "Vintage Leather Bifold open",
        width: 800,
        height: 600,
        position: 2,
      },
    ],
    variants: [],
    options: [
      {
        name: "Color",
        position: 1,
        values: ["Antique Brown", "Distressed Black"],
      },
    ],
    priceRange: { min: 99, max: 99 },
    compareAtPriceRange: { min: 129, max: 129 },
    available: true,
    createdAt: "2026-03-15T00:00:00Z",
    updatedAt: "2026-06-01T00:00:00Z",
    reviews: [],
    averageRating: 0,
    reviewCount: 0,
    seo: {
      title: "Vintage Leather Bifold - Pre-Distressed Unique Wallet",
      description:
        "One-of-a-kind vintage leather bifold. Pre-distressed full-grain leather. Each wallet is unique. Hand-burnished edges.",
    },
  },
  // 8. Executive Card Case
  {
    id: "prod-008",
    handle: "executive-card-case",
    title: "Executive Card Case",
    description:
      "A sophisticated card case for the modern professional. Holds cards and folded bills elegantly.",
    descriptionHtml: `<p>The <strong>Executive Card Case</strong> is the refined way to carry your essentials. Made from Italian calfskin leather:</p><ul><li>Central card slot holds 4-6 cards</li><li>Two side pockets for quick access</li><li>Folded bill sleeve on the back</li><li>Hand-painted edges</li><li>Comes in a gift box</li></ul><p>The perfect accessory for the boardroom or dinner out.</p>`,
    vendor: "elora",
    type: "Card Case",
    tags: ["card-case", "executive", "professional", "gift"],
    images: [
      {
        id: "prod-008-img-0",
        src: img(5),
        alt: "Executive Card Case front",
        width: 800,
        height: 600,
        position: 0,
      },
      {
        id: "prod-008-img-1",
        src: img(7),
        alt: "Executive Card Case with cards",
        width: 800,
        height: 600,
        position: 1,
      },
      {
        id: "prod-008-img-2",
        src: img(13),
        alt: "Executive Card Case in box",
        width: 800,
        height: 600,
        position: 2,
      },
    ],
    variants: [],
    options: [
      {
        name: "Color",
        position: 1,
        values: ["Black", "Dark Brown", "Burgundy"],
      },
    ],
    priceRange: { min: 69, max: 69 },
    compareAtPriceRange: null,
    available: true,
    createdAt: "2026-02-20T00:00:00Z",
    updatedAt: "2026-06-01T00:00:00Z",
    reviews: [],
    averageRating: 0,
    reviewCount: 0,
    seo: {
      title: "Executive Card Case - Italian Calfskin Professional Wallet",
      description:
        "Italian calfskin executive card case. Holds 6 cards plus folded bills. Hand-painted edges. Gift box included.",
    },
  },
  // 9. RFID Travel Passport Holder
  {
    id: "prod-009",
    handle: "rfid-passport-holder",
    title: "RFID Passport Holder",
    description:
      "Keep your passport and cards safe from digital theft with this sleek RFID-blocking passport holder.",
    descriptionHtml: `<p>The <strong>RFID Passport Holder</strong> is a sleek, focused travel essential:</p><ul><li>Fits any standard passport</li><li>2 external card slots for quick access</li><li>RFID-blocking lining</li><li>Slim profile slips into any bag</li><li>Water-resistant leather</li></ul><p>Your passport deserves better than a plastic sleeve.</p>`,
    vendor: "elora",
    type: "Travel",
    tags: ["passport", "rfid", "travel", "slim"],
    images: [
      {
        id: "prod-009-img-0",
        src: img(7),
        alt: "RFID Passport Holder with passport",
        width: 800,
        height: 600,
        position: 0,
      },
      {
        id: "prod-009-img-1",
        src: img(8),
        alt: "RFID Passport Holder open",
        width: 800,
        height: 600,
        position: 1,
      },
      {
        id: "prod-009-img-2",
        src: img(12),
        alt: "RFID Passport Holder back card slots",
        width: 800,
        height: 600,
        position: 2,
      },
    ],
    variants: [],
    options: [
      {
        name: "Color",
        position: 1,
        values: ["Black", "Brown", "Navy", "Burgundy"],
      },
    ],
    priceRange: { min: 45, max: 45 },
    compareAtPriceRange: null,
    available: true,
    createdAt: "2026-04-10T00:00:00Z",
    updatedAt: "2026-06-01T00:00:00Z",
    reviews: [],
    averageRating: 0,
    reviewCount: 0,
    seo: {
      title: "RFID Passport Holder - Secure Travel Essential",
      description:
        "Slim RFID-blocking passport holder with card slots. Water-resistant leather. Fits standard passports. Travel security made elegant.",
    },
  },
  // 10. Handmade Leather Zip Wallet
  {
    id: "prod-010",
    handle: "handmade-zip-wallet",
    title: "Handmade Leather Zip Wallet",
    description:
      "Full-zip closure keeps everything secure. Handmade by our master craftsmen in small batches.",
    descriptionHtml: `<p>The <strong>Handmade Zip Wallet</strong> is our most secure design. Each one takes 3 hours to craft:</p><ul><li>Full YKK zipper closure</li><li>10 card slots</li><li>Zippered coin pocket</li><li>Multiple bill compartments</li><li>Detachable wrist strap</li><li>Hand-painted edges</li></ul><p>Made in small batches by master leather workers. When it's gone, it's gone.</p>`,
    vendor: "elora",
    type: "Zip Wallet",
    tags: ["zip", "handmade", "artisan", "secure"],
    images: [
      {
        id: "prod-010-img-0",
        src: img(12),
        alt: "Handmade Zip Wallet closed",
        width: 800,
        height: 600,
        position: 0,
      },
      {
        id: "prod-010-img-1",
        src: img(13),
        alt: "Handmade Zip Wallet open interior",
        width: 800,
        height: 600,
        position: 1,
      },
      {
        id: "prod-010-img-2",
        src: img(14),
        alt: "Handmade Zip Wallet craft detail",
        width: 800,
        height: 600,
        position: 2,
      },
      {
        id: "prod-010-img-3",
        src: img(15),
        alt: "Handmade Zip Wallet with wrist strap",
        width: 800,
        height: 600,
        position: 3,
      },
    ],
    variants: [],
    options: [
      { name: "Color", position: 1, values: ["Brown", "Black", "Tan"] },
    ],
    priceRange: { min: 129, max: 129 },
    compareAtPriceRange: { min: 159, max: 159 },
    available: true,
    createdAt: "2026-01-10T00:00:00Z",
    updatedAt: "2026-05-20T00:00:00Z",
    reviews: [],
    averageRating: 0,
    reviewCount: 0,
    seo: {
      title: "Handmade Leather Zip Wallet - YKK Zip Around",
      description:
        "Artisan-crafted zip-around wallet with 10 card slots, coin pocket, and detachable wrist strap. Made in small batches.",
    },
  },
  // 11. AirTag Wallet
  {
    id: "prod-011",
    handle: "airtag-wallet",
    title: "AirTag Compatible Bifold",
    description:
      "Never lose your wallet again. Built-in AirTag pocket discreetly integrated into the design.",
    descriptionHtml: `<p>The <strong>AirTag Compatible Bifold</strong> features a precision-cut AirTag pocket:</p><ul><li>Discreet AirTag pocket (AirTag sold separately)</li><li>No bulge - sits flush within the leather</li><li>6 card slots with RFID blocking</li><li>Full bill compartment</li><li>Full-grain leather</li></ul><p>Peace of mind without compromising style.</p>`,
    vendor: "elora",
    type: "Bifold",
    tags: ["airtag", "tracking", "rfid", "tech"],
    images: [
      {
        id: "prod-011-img-0",
        src: img(14),
        alt: "AirTag Wallet front",
        width: 800,
        height: 600,
        position: 0,
      },
      {
        id: "prod-011-img-1",
        src: img(15),
        alt: "AirTag Wallet with AirTag inserted",
        width: 800,
        height: 600,
        position: 1,
      },
      {
        id: "prod-011-img-2",
        src: img(16),
        alt: "AirTag Wallet open",
        width: 800,
        height: 600,
        position: 2,
      },
    ],
    variants: [],
    options: [{ name: "Color", position: 1, values: ["Brown", "Black"] }],
    priceRange: { min: 89, max: 89 },
    compareAtPriceRange: null,
    available: true,
    createdAt: "2026-05-01T00:00:00Z",
    updatedAt: "2026-06-01T00:00:00Z",
    reviews: [],
    averageRating: 0,
    reviewCount: 0,
    seo: {
      title: "AirTag Compatible Bifold Wallet - Find My Wallet",
      description:
        "Never lose your wallet. Discreet AirTag pocket in a full-grain leather bifold with RFID blocking. Compatible with Apple AirTag.",
    },
  },
  // 12. Carbon Fiber Minimalist
  {
    id: "prod-012",
    handle: "carbon-fiber-minimalist-wallet",
    title: "Carbon Fiber Minimalist Wallet",
    description:
      "Ultra-modern carbon fiber construction. Incredibly strong, impossibly light.",
    descriptionHtml: `<p>The <strong>Carbon Fiber Minimalist</strong> is our most technically advanced wallet:</p><ul><li>3K carbon fiber face plates</li><li>Holds 4-12 cards</li><li>RFID-blocking aluminum core</li><li>Elastic band retention</li><li>Weighs only 28 grams</li><li>Scratch-resistant finish</li></ul><p>For those who demand cutting-edge materials.</p>`,
    vendor: "elora",
    type: "Minimalist",
    tags: ["carbon-fiber", "minimalist", "tech", "lightweight"],
    images: [
      {
        id: "prod-012-img-0",
        src: img(16),
        alt: "Carbon Fiber Wallet front",
        width: 800,
        height: 600,
        position: 0,
      },
      {
        id: "prod-012-img-1",
        src: img(17),
        alt: "Carbon Fiber Wallet with cards",
        width: 800,
        height: 600,
        position: 1,
      },
      {
        id: "prod-012-img-2",
        src: img(3),
        alt: "Carbon Fiber Wallet weave detail",
        width: 800,
        height: 600,
        position: 2,
      },
    ],
    variants: [],
    options: [
      { name: "Color", position: 1, values: ["Black", "Forged Carbon"] },
    ],
    priceRange: { min: 69, max: 79 },
    compareAtPriceRange: null,
    available: true,
    createdAt: "2026-05-15T00:00:00Z",
    updatedAt: "2026-06-01T00:00:00Z",
    reviews: [],
    averageRating: 0,
    reviewCount: 0,
    seo: {
      title: "Carbon Fiber Minimalist Wallet - 28g Ultra-Light",
      description:
        "3K carbon fiber minimalist wallet. RFID-blocking aluminum core. Weighs only 28g. Holds up to 12 cards.",
    },
  },
  // 13. Premium Gift Set
  {
    id: "prod-013",
    handle: "premium-wallet-gift-set",
    title: "Premium Wallet Gift Set",
    description:
      "The ultimate gift. A classic bifold, matching key case, and leather care kit in a beautiful gift box.",
    descriptionHtml: `<p>The <strong>Premium Wallet Gift Set</strong> is the complete package:</p><ul><li>Classic Leather Bifold (choice of color)</li><li>Matching leather key case</li><li>Leather care balm (30ml)</li><li>Polishing cloth</li><li>Premium gift box with magnetic closure</li><li>Personalized gift message card</li></ul><p>The perfect gift for any occasion. Free gift wrapping included.</p>`,
    vendor: "elora",
    type: "Gift Set",
    tags: ["gift", "set", "premium", "bundle"],
    images: [
      {
        id: "prod-013-img-0",
        src: img(10),
        alt: "Premium Gift Set box",
        width: 800,
        height: 600,
        position: 0,
      },
      {
        id: "prod-013-img-1",
        src: img(11),
        alt: "Premium Gift Set contents",
        width: 800,
        height: 600,
        position: 1,
      },
      {
        id: "prod-013-img-2",
        src: img(13),
        alt: "Premium Gift Set wrapping",
        width: 800,
        height: 600,
        position: 2,
      },
      {
        id: "prod-013-img-3",
        src: img(14),
        alt: "Premium Gift Set card",
        width: 800,
        height: 600,
        position: 3,
      },
    ],
    variants: [],
    options: [
      { name: "Color", position: 1, values: ["Brown", "Black", "Tan"] },
    ],
    priceRange: { min: 149, max: 149 },
    compareAtPriceRange: { min: 189, max: 189 },
    available: true,
    createdAt: "2026-04-20T00:00:00Z",
    updatedAt: "2026-06-01T00:00:00Z",
    reviews: [],
    averageRating: 5,
    reviewCount: 0,
    seo: {
      title: "Premium Wallet Gift Set - Complete Leather Bundle",
      description:
        "Bifold wallet + matching key case + leather care kit in a premium gift box. Free gift wrapping. The perfect present.",
    },
  },
  // 14. Slim Bifold
  {
    id: "prod-014",
    handle: "slim-bifold",
    title: "Slim Bifold",
    description:
      "All the functionality of a traditional bifold in a slimmer, modern profile. Less bulk, same utility.",
    descriptionHtml: `<p>The <strong>Slim Bifold</strong> redefines the classic. Thin where it counts:</p><ul><li>4 card slots (holds 1-2 cards each)</li><li>2 hidden pockets</li><li>Slim bill compartment</li><li>12mm thick when loaded with 8 cards</li><li>Vegetable-tanned leather</li><li>Hand-stitched details</li></ul><p>The classic bifold, evolved for the modern pocket.</p>`,
    vendor: "elora",
    type: "Bifold",
    tags: ["slim", "bifold", "modern", "compact"],
    images: [
      {
        id: "prod-014-img-0",
        src: img(17),
        alt: "Slim Bifold front",
        width: 800,
        height: 600,
        position: 0,
      },
      {
        id: "prod-014-img-1",
        src: img(18),
        alt: "Slim Bifold side profile",
        width: 800,
        height: 600,
        position: 1,
      },
      {
        id: "prod-014-img-2",
        src: img(19),
        alt: "Slim Bifold open",
        width: 800,
        height: 600,
        position: 2,
      },
    ],
    variants: [],
    options: [
      {
        name: "Color",
        position: 1,
        values: ["Tan", "Brown", "Black", "Olive"],
      },
    ],
    priceRange: { min: 69, max: 69 },
    compareAtPriceRange: { min: 85, max: 85 },
    available: true,
    createdAt: "2026-05-10T00:00:00Z",
    updatedAt: "2026-06-01T00:00:00Z",
    reviews: [],
    averageRating: 0,
    reviewCount: 0,
    seo: {
      title: "Slim Bifold - Modern Thin Leather Wallet",
      description:
        "Slim bifold at just 12mm thick. Vegetable-tanned leather with 4 card slots and hidden pockets. Modern profile.",
    },
  },
  // 15. Weekender Wallet
  {
    id: "prod-015",
    handle: "weekender-wallet",
    title: "Weekender Wallet",
    description:
      "The anything wallet. Holds everything you need for a weekend away - cards, cash, coins, keys.",
    descriptionHtml: `<p>The <strong>Weekender</strong> is our most versatile wallet. Built for those who need to carry more:</p><ul><li>12 card slots across two panels</li><li>Two bill compartments</li><li>Large zippered coin pocket</li><li>External quick-access slot</li><li>Detachable key ring</li><li>Reinforced stitching at all stress points</li></ul><p>When you need to carry it all, carry the Weekender.</p>`,
    vendor: "elora",
    type: "Large",
    tags: ["large", "capacity", "versatile", "weekend"],
    images: [
      {
        id: "prod-015-img-0",
        src: img(1),
        alt: "Weekender Wallet front",
        width: 800,
        height: 600,
        position: 0,
      },
      {
        id: "prod-015-img-1",
        src: img(2),
        alt: "Weekender Wallet open full",
        width: 800,
        height: 600,
        position: 1,
      },
      {
        id: "prod-015-img-2",
        src: img(3),
        alt: "Weekender Wallet interior detail",
        width: 800,
        height: 600,
        position: 2,
      },
    ],
    variants: [],
    options: [{ name: "Color", position: 1, values: ["Brown", "Black"] }],
    priceRange: { min: 109, max: 109 },
    compareAtPriceRange: null,
    available: true,
    createdAt: "2026-03-20T00:00:00Z",
    updatedAt: "2026-06-01T00:00:00Z",
    reviews: [],
    averageRating: 0,
    reviewCount: 0,
    seo: {
      title: "Weekender Wallet - Large Capacity Leather Organizer",
      description:
        "Large capacity wallet with 12 card slots, 2 bill compartments, zip coin pocket, and key ring. Built for the weekend.",
    },
  },
  // 16. Woven Leather Cardholder
  {
    id: "prod-016",
    handle: "woven-leather-cardholder",
    title: "Woven Leather Cardholder",
    description:
      "Hand-woven leather in a distinctive basketweave pattern. Art meets function in this statement cardholder.",
    descriptionHtml: `<p>The <strong>Woven Leather Cardholder</strong> showcases our most intricate craftsmanship:</p><ul><li>Hand-woven Italian leather exterior</li><li>Smooth leather interior lining</li><li>Central slot holds 4-6 cards</li><li>Two quick-access side slots</li><li>Each weave takes 2 hours to complete</li></ul><p>A true conversation piece. No two weaves are identical.</p>`,
    vendor: "elora",
    type: "Cardholder",
    tags: ["woven", "cardholder", "artisan", "unique"],
    images: [
      {
        id: "prod-016-img-0",
        src: img(19),
        alt: "Woven Leather Cardholder front",
        width: 800,
        height: 600,
        position: 0,
      },
      {
        id: "prod-016-img-1",
        src: img(5),
        alt: "Woven Leather Cardholder weave detail",
        width: 800,
        height: 600,
        position: 1,
      },
      {
        id: "prod-016-img-2",
        src: img(8),
        alt: "Woven Leather Cardholder with cards",
        width: 800,
        height: 600,
        position: 2,
      },
    ],
    variants: [],
    options: [
      {
        name: "Color",
        position: 1,
        values: ["Brown & Tan", "Black & Gray", "Navy & Brown"],
      },
    ],
    priceRange: { min: 79, max: 79 },
    compareAtPriceRange: { min: 99, max: 99 },
    available: true,
    createdAt: "2026-05-20T00:00:00Z",
    updatedAt: "2026-06-01T00:00:00Z",
    reviews: [],
    averageRating: 0,
    reviewCount: 0,
    seo: {
      title: "Woven Leather Cardholder - Hand-Woven Italian Leather",
      description:
        "Hand-woven Italian leather cardholder. Each weave is unique. Basketweave pattern. Holds 4-6 cards. Artisan craftsmanship.",
    },
  },
  // 17. Tactical EDC Wallet
  {
    id: "prod-017",
    handle: "tactical-edc-wallet",
    title: "Tactical EDC Wallet",
    description:
      "Built for everyday carry. Rugged construction with integrated multi-tool card and bottle opener.",
    descriptionHtml: `<p>The <strong>Tactical EDC Wallet</strong> is built for those who need more from their gear:</p><ul><li>1000D Cordura nylon body</li><li>RFID-blocking card slots</li><li>Integrated stainless steel multi-tool card</li><li>Bottle opener edge</li><li>Paracord zipper pulls</li><li>Water-resistant coating</li></ul><p>Not your grandfather's wallet. Built for action.</p>`,
    vendor: "elora",
    type: "EDC",
    tags: ["tactical", "edc", "rugged", "multi-tool"],
    images: [
      {
        id: "prod-017-img-0",
        src: img(4),
        alt: "Tactical EDC Wallet front",
        width: 800,
        height: 600,
        position: 0,
      },
      {
        id: "prod-017-img-1",
        src: img(9),
        alt: "Tactical EDC Wallet with multi-tool",
        width: 800,
        height: 600,
        position: 1,
      },
      {
        id: "prod-017-img-2",
        src: img(3),
        alt: "Tactical EDC Wallet back",
        width: 800,
        height: 600,
        position: 2,
      },
    ],
    variants: [],
    options: [
      {
        name: "Color",
        position: 1,
        values: ["Black", "Coyote Brown", "Olive Drab"],
      },
    ],
    priceRange: { min: 59, max: 59 },
    compareAtPriceRange: null,
    available: true,
    createdAt: "2026-04-25T00:00:00Z",
    updatedAt: "2026-06-01T00:00:00Z",
    reviews: [],
    averageRating: 0,
    reviewCount: 0,
    seo: {
      title: "Tactical EDC Wallet - Rugged Everyday Carry",
      description:
        "1000D Cordura tactical wallet with integrated multi-tool, bottle opener, and RFID blocking. Water-resistant. Built for EDC.",
    },
  },
  // 18. Engraved Monogram Wallet
  {
    id: "prod-018",
    handle: "engraved-monogram-wallet",
    title: "Engraved Monogram Bifold",
    description:
      "Make it personal. Our classic bifold with custom monogram engraving - up to 3 initials.",
    descriptionHtml: `<p>The <strong>Engraved Monogram Bifold</strong> adds a personal touch to our bestselling classic:</p><ul><li>Custom monogram up to 3 characters</li><li>Choice of font style (Classic, Modern, Script)</li><li>Blind deboss or gold foil stamping</li><li>Full-grain Italian leather</li><li>6 card slots, 2 hidden pockets</li><li>Gift box included</li></ul><p>Makes an unforgettable gift. Production time: +2 days.</p>`,
    vendor: "elora",
    type: "Bifold",
    tags: ["monogram", "personalized", "engraved", "gift"],
    images: [
      {
        id: "prod-018-img-0",
        src: img(0),
        alt: "Engraved Monogram Bifold with initials",
        width: 800,
        height: 600,
        position: 0,
      },
      {
        id: "prod-018-img-1",
        src: img(1),
        alt: "Engraved Monogram close up",
        width: 800,
        height: 600,
        position: 1,
      },
      {
        id: "prod-018-img-2",
        src: img(2),
        alt: "Engraved Monogram open interior",
        width: 800,
        height: 600,
        position: 2,
      },
      {
        id: "prod-018-img-3",
        src: img(10),
        alt: "Engraved Monogram gift box",
        width: 800,
        height: 600,
        position: 3,
      },
    ],
    variants: [],
    options: [
      { name: "Color", position: 1, values: ["Brown", "Black", "Tan"] },
      {
        name: "Font Style",
        position: 2,
        values: ["Classic", "Modern", "Script"],
      },
    ],
    priceRange: { min: 99, max: 109 },
    compareAtPriceRange: { min: 119, max: 129 },
    available: true,
    createdAt: "2026-04-15T00:00:00Z",
    updatedAt: "2026-06-01T00:00:00Z",
    reviews: [],
    averageRating: 0,
    reviewCount: 0,
    seo: {
      title: "Engraved Monogram Bifold - Personalized Leather Wallet",
      description:
        "Custom monogram bifold wallet. Up to 3 initials, choice of font and stamping. Full-grain Italian leather. Perfect gift.",
    },
  },
  // 19. Copper RFID Card Sleeve
  {
    id: "prod-019",
    handle: "copper-rfid-card-sleeve",
    title: "Copper RFID Card Sleeve",
    description:
      "Industrial-chic copper construction with RFID shielding. A unique, patina-developing card sleeve.",
    descriptionHtml: `<p>The <strong>Copper RFID Card Sleeve</strong> is a work of industrial art:</p><ul><li>Solid copper body with RFID shielding</li><li>Develops a natural patina over time</li><li>Holds 4-6 cards snugly</li><li>Elastic retention system</li><li>Weighs 62g - satisfyingly substantial</li></ul><p>Each sleeve starts bright copper and develops its own unique character.</p>`,
    vendor: "elora",
    type: "Card Sleeve",
    tags: ["copper", "rfid", "metal", "patina"],
    images: [
      {
        id: "prod-019-img-0",
        src: img(2),
        alt: "Copper RFID Card Sleeve new",
        width: 800,
        height: 600,
        position: 0,
      },
      {
        id: "prod-019-img-1",
        src: img(18),
        alt: "Copper RFID Card Sleeve with patina",
        width: 800,
        height: 600,
        position: 1,
      },
      {
        id: "prod-019-img-2",
        src: img(3),
        alt: "Copper RFID Card Sleeve with cards",
        width: 800,
        height: 600,
        position: 2,
      },
    ],
    variants: [],
    options: [
      {
        name: "Finish",
        position: 1,
        values: ["Polished Copper", "Brushed Copper"],
      },
    ],
    priceRange: { min: 49, max: 54 },
    compareAtPriceRange: null,
    available: true,
    createdAt: "2026-06-01T00:00:00Z",
    updatedAt: "2026-06-01T00:00:00Z",
    reviews: [],
    averageRating: 0,
    reviewCount: 0,
    seo: {
      title: "Copper RFID Card Sleeve - Solid Copper EDC",
      description:
        "Solid copper RFID-blocking card sleeve. Develops unique patina. Holds 4-6 cards. 62g of industrial elegance.",
    },
  },
  // 20. Heritage Leather Bifold
  {
    id: "prod-020",
    handle: "heritage-leather-bifold",
    title: "Heritage Leather Bifold",
    description:
      "Our flagship wallet. Made from the finest shell cordovan leather - the king of leathers.",
    descriptionHtml: `<p>The <strong>Heritage Bifold</strong> represents the pinnacle of our craft. Made from rare Horween Shell Cordovan:</p><ul><li>Genuine Horween Shell Cordovan leather</li><li>Sourced from the historic Chicago tannery</li><li>8 card slots with rolled edges</li><li>2 hidden pockets with silk lining</li><li>Full bill compartment</li><li>Individually numbered</li><li>Comes with certificate of authenticity</li></ul><p>Shell Cordovan doesn't crease - it rolls. This wallet will outlast you.</p>`,
    vendor: "elora",
    type: "Bifold",
    tags: ["cordovan", "heritage", "premium", "flagship", "heirloom"],
    images: [
      {
        id: "prod-020-img-0",
        src: img(13),
        alt: "Heritage Bifold front",
        width: 800,
        height: 600,
        position: 0,
      },
      {
        id: "prod-020-img-1",
        src: img(14),
        alt: "Heritage Bifold shell cordovan close up",
        width: 800,
        height: 600,
        position: 1,
      },
      {
        id: "prod-020-img-2",
        src: img(15),
        alt: "Heritage Bifold open interior",
        width: 800,
        height: 600,
        position: 2,
      },
      {
        id: "prod-020-img-3",
        src: img(16),
        alt: "Heritage Bifold numbered plate",
        width: 800,
        height: 600,
        position: 3,
      },
      {
        id: "prod-020-img-4",
        src: img(17),
        alt: "Heritage Bifold certificate",
        width: 800,
        height: 600,
        position: 4,
      },
    ],
    variants: [],
    options: [
      {
        name: "Color",
        position: 1,
        values: ["Color #8 (Burgundy)", "Black", "Dark Cognac"],
      },
    ],
    priceRange: { min: 249, max: 249 },
    compareAtPriceRange: null,
    available: true,
    createdAt: "2026-01-01T00:00:00Z",
    updatedAt: "2026-06-01T00:00:00Z",
    reviews: [],
    averageRating: 0,
    reviewCount: 0,
    seo: {
      title: "Heritage Bifold - Horween Shell Cordovan Wallet",
      description:
        "Our flagship wallet in genuine Horween Shell Cordovan. Individually numbered. The finest leather wallet available. Heirloom quality.",
    },
  },
];

// ============================================================================
// Post-process: generate variants from options
// ============================================================================
for (const product of mockProducts) {
  product.variants = makeVariants(
    product.id,
    product.options,
    product.priceRange.min,
    0,
  );
}

// ============================================================================
// Collections
// ============================================================================

export const mockCollections: Collection[] = [
  {
    id: "col-001",
    handle: "leather-wallets",
    title: "Leather Wallets",
    description:
      "Our full collection of handcrafted leather wallets. Each piece is made from the finest Italian and American leathers.",
    descriptionHtml:
      "<p>From full-grain Italian leather to rare Horween Shell Cordovan, our leather wallets represent the finest materials on earth.</p>",
    image: {
      id: "col-001-img",
      src: img(0),
      alt: "Leather Wallets collection",
      width: 1200,
      height: 800,
      position: 0,
    },
    products: mockProducts.filter(
      (p) =>
        p.tags.includes("leather") ||
        p.tags.includes("bifold") ||
        p.tags.includes("cordovan"),
    ),
    seo: {
      title: "Leather Wallets - Premium Handcrafted Collection",
      description:
        "Handcrafted leather wallets from Italian and American leathers. Bifolds, cardholders, and more.",
    },
  },
  {
    id: "col-002",
    handle: "minimalist",
    title: "Minimalist Wallets",
    description:
      "Slim, lightweight wallets for those who carry only the essentials. Front-pocket friendly designs.",
    descriptionHtml:
      "<p>Our minimalist collection proves that less is more. Each wallet is 8mm or thinner, designed for front-pocket carry.</p>",
    image: {
      id: "col-002-img",
      src: img(4),
      alt: "Minimalist Wallets collection",
      width: 1200,
      height: 800,
      position: 0,
    },
    products: mockProducts.filter(
      (p) =>
        p.tags.includes("minimalist") ||
        p.tags.includes("slim") ||
        p.tags.includes("cardholder"),
    ),
    seo: {
      title: "Minimalist Wallets - Slim & Lightweight Collection",
      description:
        "Ultra-slim minimalist wallets under 8mm thick. Front-pocket designs for essential carry only.",
    },
  },
  {
    id: "col-003",
    handle: "travel-wallets",
    title: "Travel Wallets",
    description:
      "Stay organized on the go. Passport holders, travel wallets, and adventure-ready accessories.",
    descriptionHtml:
      "<p>From weekend getaways to international adventures, our travel wallets keep your essentials secure and organized.</p>",
    image: {
      id: "col-003-img",
      src: img(6),
      alt: "Travel Wallets collection",
      width: 1200,
      height: 800,
      position: 0,
    },
    products: mockProducts.filter((p) => p.tags.includes("travel")),
    seo: {
      title: "Travel Wallets - Passport Holders & Organizers",
      description:
        "RFID-blocking travel wallets, passport holders, and travel organizers. Stay secure on every journey.",
    },
  },
  {
    id: "col-004",
    handle: "rfid-safe",
    title: "RFID Safe Wallets",
    description:
      "Advanced RFID-blocking technology woven into every wallet. Protection without compromise.",
    descriptionHtml:
      "<p>All wallets in this collection feature certified RFID-blocking technology to protect your cards from digital theft.</p>",
    image: {
      id: "col-004-img",
      src: img(11),
      alt: "RFID Safe Wallets collection",
      width: 1200,
      height: 800,
      position: 0,
    },
    products: mockProducts.filter((p) => p.tags.includes("rfid")),
    seo: {
      title: "RFID Safe Wallets - Digital Protection Collection",
      description:
        "Certified RFID-blocking wallets. Protect your credit cards and ID from digital skimming.",
    },
  },
  {
    id: "col-005",
    handle: "gifts",
    title: "Gifts",
    description:
      "The perfect present. Every wallet comes in a premium gift box with free gift wrapping available.",
    descriptionHtml:
      "<p>Give the gift of craftsmanship. All wallets come beautifully packaged and ready to delight.</p>",
    image: {
      id: "col-005-img",
      src: img(10),
      alt: "Gift Wallets collection",
      width: 1200,
      height: 800,
      position: 0,
    },
    products: mockProducts.filter(
      (p) => p.tags.includes("gift") || p.tags.includes("monogram"),
    ),
    seo: {
      title: "Gift Wallets - Premium Gift-Ready Collection",
      description:
        "Beautifully packaged wallets perfect for gifting. Premium gift boxes included. Free gift wrapping available.",
    },
  },
  {
    id: "col-006",
    handle: "new-arrivals",
    title: "New Arrivals",
    description:
      "The latest additions to our collection. Fresh designs just in from our workshop.",
    descriptionHtml:
      "<p>Be the first to own our newest creations. Fresh from the workshop.</p>",
    image: {
      id: "col-006-img",
      src: img(15),
      alt: "New Arrivals collection",
      width: 1200,
      height: 800,
      position: 0,
    },
    products: mockProducts.filter((p) =>
      ["prod-011", "prod-012", "prod-014", "prod-016", "prod-019"].includes(
        p.id,
      ),
    ),
    seo: {
      title: "New Arrivals - Latest Wallet Designs",
      description:
        "Discover our newest wallet designs. Fresh from the workshop and ready to ship.",
    },
  },
  {
    id: "col-007",
    handle: "best-sellers",
    title: "Best Sellers",
    description:
      "Our most loved wallets. Tried, tested, and highly rated by our community.",
    descriptionHtml:
      "<p>The wallets our customers love most. Proven designs that stand the test of time.</p>",
    image: {
      id: "col-007-img",
      src: img(1),
      alt: "Best Sellers collection",
      width: 1200,
      height: 800,
      position: 0,
    },
    products: mockProducts.filter((p) =>
      ["prod-001", "prod-002", "prod-006", "prod-005", "prod-020"].includes(
        p.id,
      ),
    ),
    seo: {
      title: "Best Sellers - Most Popular Wallets",
      description:
        "Our most loved wallets. The Classic Bifold, Slim Cardholder, and more customer favorites.",
    },
  },
];

// ============================================================================
// Navigation
// ============================================================================

export const mockNavigation: NavLink[] = [
  {
    title: "Shop",
    url: "/products",
    children: [
      { title: "All Wallets", url: "/products" },
      { title: "Leather Wallets", url: "/collections/leather-wallets" },
      { title: "Minimalist", url: "/collections/minimalist" },
      { title: "Travel Wallets", url: "/collections/travel-wallets" },
      { title: "RFID Safe", url: "/collections/rfid-safe" },
      { title: "Gifts", url: "/collections/gifts" },
    ],
  },
  { title: "New Arrivals", url: "/collections/new-arrivals" },
  { title: "Best Sellers", url: "/collections/best-sellers" },
  { title: "Our Story", url: "/pages/about" },
  { title: "Blog", url: "/blog" },
];
