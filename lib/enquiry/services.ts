export type EnquiryService = {
  id: string
  label: string
}

export type EnquiryCategory = {
  id: string
  label: string
  description?: string
  services: EnquiryService[]
  hasOther?: boolean
}

export const ENQUIRY_CATEGORIES: EnquiryCategory[] = [
  {
    id: "herbal",
    label: "Herbal Treatments",
    services: [
      { id: "root-touch-up", label: "Root Touch Up" },
      { id: "herbal-protein-hair-pack", label: "Herbal Protein Hair Pack" },
      {
        id: "iyura-hot-oil-60",
        label: "Signature IYURA Hot Oil Head Spa - 60 minutes",
      },
      {
        id: "iyura-hot-oil-90",
        label: "Signature IYURA Hot Oil Head Spa - 90 minutes",
      },
    ],
  },
  {
    id: "nail-foot-spa",
    label: "Nail & Foot Spa",
    services: [
      { id: "soak-off-gel-hands", label: "Soak Off Gel - Hands" },
      { id: "soak-off-gel-feet", label: "Soak Off Gel - Feet" },
      { id: "express-manicure", label: "Express Manicure" },
      { id: "express-pedicure", label: "Express Pedicure" },
      { id: "classic-manicure", label: "Classic Manicure" },
      { id: "classic-pedicure", label: "Classic Pedicure" },
      { id: "gel-express-manicure", label: "Gel Express Manicure" },
      { id: "gel-express-pedicure", label: "Gel Express Pedicure" },
      { id: "classic-gel-manicure", label: "Classic Gel Manicure" },
      { id: "classic-gel-pedicure", label: "Classic Gel Pedicure" },
      { id: "nail-extension-full-set", label: "Nail Extension - Full Set" },
      { id: "paraffin-wax", label: "Paraffin Wax - Hands & Feet" },
      { id: "hand-spa", label: "Hand Spa" },
      { id: "signature-foot-spa", label: "Signature Foot Spa" },
      { id: "milk-wine-honey-spa", label: "Milk, Wine & Honey Spa" },
    ],
  },
  {
    id: "facials",
    label: "Facial Services",
    services: [
      { id: "advanced-clinicals-basic", label: "Advanced Clinicals Basic" },
      { id: "vitamin-c-brightening", label: "Vitamin C Brightening" },
      { id: "akoia-gold-24k", label: "Akoia Gold 24K" },
      { id: "hydra-calm", label: "Hydra Calm" },
      { id: "collagen-hlayu", label: "Collagen Hlayu" },
      { id: "carboxy-lift", label: "Carboxy Lift" },
      { id: "ayurvedic-facial-60", label: "Ayurvedic Facial - 60 minutes" },
      { id: "ayurvedic-facial-90", label: "Ayurvedic Facial - 90 minutes" },
    ],
  },
  {
    id: "waxing",
    label: "Waxing",
    services: [
      { id: "wax-sideburns", label: "Sideburns" },
      { id: "wax-upper-lip-chin", label: "Upper Lip / Chin" },
      { id: "wax-eyebrows", label: "Eyebrows" },
      { id: "wax-full-face", label: "Full Face" },
      { id: "wax-cheeks", label: "Cheeks" },
      { id: "wax-half-arms", label: "Half Arms" },
      { id: "wax-full-arms", label: "Full Arms" },
      { id: "wax-underarms", label: "Underarms" },
      { id: "wax-half-legs", label: "Half Legs" },
      { id: "wax-full-legs", label: "Full Legs" },
      { id: "wax-bikini-line", label: "Bikini Line" },
      { id: "wax-brazilian", label: "Brazilian" },
    ],
  },
  {
    id: "threading",
    label: "Threading",
    services: [
      { id: "thread-eyebrows", label: "Eyebrows" },
      { id: "thread-upper-lip", label: "Upper Lip" },
      { id: "thread-chin", label: "Chin" },
      { id: "thread-forehead", label: "Forehead" },
      { id: "thread-cheeks", label: "Cheeks" },
      { id: "thread-full-face", label: "Full Face" },
    ],
  },
  {
    id: "henna-art",
    label: "Henna Art",
    services: [
      { id: "henna-simple-one-hand", label: "Simple Henna - One Hand" },
      { id: "henna-bridal", label: "Bridal Henna - Hands & Feet" },
      { id: "henna-customised", label: "Customised Henna Design" },
    ],
  },
  {
    id: "bridal",
    label: "Bridal Services",
    services: [
      { id: "bridal-makeup-hair", label: "Bridal Makeup & Hair" },
      { id: "bridal-facial", label: "Bridal Facial" },
      { id: "bridal-full-package", label: "Full Bridal Package" },
    ],
  },
  {
    id: "aft",
    label: "AFT Hair-Removal Treatment",
    services: [
      { id: "aft-upper-lip", label: "Upper Lip" },
      { id: "aft-chin", label: "Chin" },
      { id: "aft-sideburns", label: "Sideburns" },
      { id: "aft-full-face", label: "Full Face" },
      { id: "aft-neck", label: "Neck - Front or Back" },
      { id: "aft-underarms", label: "Underarms" },
      { id: "aft-half-arms", label: "Half Arms" },
      { id: "aft-full-arms", label: "Full Arms" },
      { id: "aft-hands-fingers", label: "Hands & Fingers" },
      { id: "aft-chest", label: "Chest" },
      { id: "aft-areola", label: "Areola" },
      { id: "aft-abdomen", label: "Abdomen" },
      { id: "aft-full-back", label: "Full Back" },
      { id: "aft-lower-back", label: "Lower Back" },
      { id: "aft-bikini-line", label: "Bikini Line" },
      { id: "aft-brazilian-crack", label: "Brazilian + Crack" },
      { id: "aft-buttocks", label: "Buttocks" },
      { id: "aft-half-legs", label: "Half Legs" },
      { id: "aft-full-legs", label: "Full Legs" },
      { id: "aft-feet-toes", label: "Feet & Toes" },
    ],
  },
  {
    id: "general",
    label: "General Enquiry",
    description: "Not sure yet? Tell us what you're looking for.",
    hasOther: true,
    services: [
      { id: "general-not-sure", label: "Not sure which service to choose" },
      { id: "general-package", label: "Package enquiry" },
      { id: "general-price", label: "Price enquiry" },
      { id: "general-consultation", label: "Consultation request" },
      { id: "general-other", label: "Other" },
    ],
  },
]

export const ENQUIRY_CATEGORY_BY_ID = Object.fromEntries(
  ENQUIRY_CATEGORIES.map((c) => [c.id, c]),
) as Record<string, EnquiryCategory>

export const ENQUIRY_SERVICE_BY_ID = Object.fromEntries(
  ENQUIRY_CATEGORIES.flatMap((c) =>
    c.services.map((s) => [s.id, { ...s, categoryId: c.id, categoryLabel: c.label }]),
  ),
) as Record<
  string,
  EnquiryService & { categoryId: string; categoryLabel: string }
>
