import { JewelleryProduct, JewelleryCategory } from "../models/jewellery.model";

export const JEWELLERY_CATEGORIES: JewelleryCategory[] = [
  { slug: "engagement-rings", name: "Engagement Rings", description: "Timeless designs for the moment you ask." },
  { slug: "wedding-bands", name: "Wedding Bands", description: "Symbols of commitment, crafted to last." },
  { slug: "earrings", name: "Earrings", description: "From everyday studs to evening drops." },
  { slug: "necklaces", name: "Necklaces", description: "Elegant chains and pendants." },
  { slug: "pendants", name: "Pendants", description: "A single diamond, close to the heart." },
  { slug: "bracelets", name: "Bracelets", description: "Delicate diamond bracelets and bangles." },
  { slug: "bangles", name: "Bangles", description: "Traditional and contemporary diamond bangles." },
];

export const JEWELLERY_PRODUCTS: JewelleryProduct[] = [
  { id: "jr-001", slug: "solitaire-engagement-ring", name: "Classic Solitaire Ring", category: "engagement-rings", price: 185000, metal: "18K White Gold", diamondCarat: 0.72, diamondShape: "Round", diamondColor: "G", diamondClarity: "VS1", description: "A timeless solitaire with a brilliant round diamond.", certification: "GIA", available: true },
  { id: "jr-002", slug: "halo-engagement-ring", name: "Halo Diamond Ring", category: "engagement-rings", price: 245000, metal: "18K White Gold", diamondCarat: 0.9, diamondShape: "Cushion", diamondColor: "F", diamondClarity: "VS1", description: "A cushion diamond surrounded by a halo of brilliance.", certification: "GIA", available: true },
  { id: "jr-003", slug: "three-stone-ring", name: "Three Stone Ring", category: "engagement-rings", price: 320000, metal: "Platinum", diamondCarat: 1.2, diamondShape: "Round", diamondColor: "E", diamondClarity: "VVS2", description: "Past, present, future � three exquisite diamonds.", certification: "GIA", available: true },
  { id: "jr-004", slug: "classic-wedding-band", name: "Classic Wedding Band", category: "wedding-bands", price: 68000, metal: "18K Yellow Gold", description: "A classic band of warm yellow gold.", certification: "BIS", available: true },
  { id: "jr-005", slug: "diamond-wedding-band", name: "Diamond Pav� Band", category: "wedding-bands", price: 125000, metal: "Platinum", diamondCarat: 0.3, diamondShape: "Round", diamondColor: "G", diamondClarity: "VS2", description: "A platinum band set with pav� diamonds.", certification: "IGI", available: true },
  { id: "jr-006", slug: "round-stud-earrings", name: "Round Diamond Studs", category: "earrings", price: 95000, metal: "18K White Gold", diamondCarat: 0.5, diamondShape: "Round", diamondColor: "F", diamondClarity: "VS1", description: "Classic round diamond studs.", certification: "GIA", available: true },
  { id: "jr-007", slug: "drop-earrings", name: "Diamond Drop Earrings", category: "earrings", price: 175000, metal: "18K White Gold", diamondCarat: 0.8, diamondShape: "Pear", diamondColor: "G", diamondClarity: "VS2", description: "Elegant pear-shaped diamond drops.", certification: "IGI", available: true },
  { id: "jr-008", slug: "solitaire-pendant", name: "Solitaire Pendant", category: "pendants", price: 78000, metal: "18K White Gold", diamondCarat: 0.4, diamondShape: "Round", diamondColor: "G", diamondClarity: "VS1", description: "A single solitaire diamond on a delicate chain.", certification: "GIA", available: true },
  { id: "jr-009", slug: "heart-pendant", name: "Heart Diamond Pendant", category: "pendants", price: 92000, metal: "18K Rose Gold", diamondCarat: 0.35, diamondShape: "Heart", diamondColor: "F", diamondClarity: "VS2", description: "A heart-shaped diamond in warm rose gold.", certification: "IGI", available: true },
  { id: "jr-010", slug: "tennis-bracelet", name: "Tennis Bracelet", category: "bracelets", price: 285000, metal: "18K White Gold", diamondCarat: 3.0, diamondShape: "Round", diamondColor: "G", diamondClarity: "VS2", description: "A continuous line of brilliant round diamonds.", certification: "IGI", available: true },
  { id: "jr-011", slug: "chain-necklace", name: "Diamond Chain Necklace", category: "necklaces", price: 145000, metal: "18K Yellow Gold", diamondCarat: 0.5, diamondShape: "Round", diamondColor: "G", diamondClarity: "VS1", description: "A yellow gold chain with bezel-set diamonds.", certification: "IGI", available: true },
  { id: "jr-012", slug: "vintage-engagement-ring", name: "Vintage Inspired Ring", category: "engagement-rings", price: 275000, metal: "18K Rose Gold", diamondCarat: 1.0, diamondShape: "Oval", diamondColor: "G", diamondClarity: "VS1", description: "An oval diamond in a vintage-inspired setting.", certification: "GIA", available: true },
  { id: "jr-013", slug: "diamond-bangle", name: "Diamond Tennis Bangle", category: "bangles", price: 195000, metal: "18K White Gold", diamondCarat: 1.2, diamondShape: "Round", diamondColor: "G", diamondClarity: "VS2", description: "A sleek bangle set with round brilliant diamonds.", certification: "IGI", available: true },
  { id: "jr-014", slug: "gold-bangle", name: "Traditional Gold Bangle", category: "bangles", price: 85000, metal: "22K Yellow Gold", description: "A classic gold bangle with subtle diamond accents.", certification: "BIS", available: true },
  { id: "jr-015", slug: "rose-gold-bangle", name: "Rose Gold Diamond Bangle", category: "bangles", price: 165000, metal: "18K Rose Gold", diamondCarat: 0.8, diamondShape: "Round", diamondColor: "F", diamondClarity: "VS1", description: "Warm rose gold set with sparkling round diamonds.", certification: "GIA", available: true },
];
