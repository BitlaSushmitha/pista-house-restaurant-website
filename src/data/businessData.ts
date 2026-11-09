import { MenuItem, ReviewItem } from '../types';
import heroBiryaniImg from '../assets/images/hero_pista_house_biryani_1793977955483.jpg';
import haleemImg from '../assets/images/dish_hyderabadi_haleem_1793977955961.jpg';
import osmaniaImg from '../assets/images/dish_bakery_osmania_1793977955921.jpg';
import dessertImg from '../assets/images/dish_qubani_dessert_1793977956566.jpg';

export const BUSINESS_INFO = {
  name: 'Pista House',
  legalName: 'Pista House Bakery & Restaurant Private Limited',
  tagline: "Hyderabad's Royal Gastronomy & Artisanal Heritage Since 1997",
  rating: 4.3,
  reviewCount: 8450,
  phonePrimary: '+91 93965 00786',
  phoneLandline: '+91 40 2452 4679',
  phoneRaw: '919396500786',
  email: 'reservations@pistahouse.in',
  address: '2-18-26, Zahid Nagar Main Road, Boduppal / Uppal Corridor, Hyderabad, Telangana 500092',
  landmark: 'Near Warangal Highway & Uppal Express Corridor',
  mapsUrl: 'https://maps.app.goo.gl/ux5sFWi4Yk1VfRFR6',
  openHour: 11, // 11 AM
  closeHour: 23, // 11 PM
  hoursDisplay: '11:00 AM – 11:00 PM (Daily)',
  bakeryHours: '08:00 AM – 11:30 PM (Daily)',
  priceRange: '₹300 – ₹1,200 for two',
  features: [
    'GI-Tag Certified Hyderabadi Haleem',
    'Authentic Zafrani Dum Pukht Biryani',
    '100% Halal Certified Meats',
    'Pure Desi Ghee Preparations',
    'Multi-Story AC Family Dining & Banquet',
    'Ample Valet Parking & Swift Takeaway'
  ]
};

export const MENU_ITEMS: MenuItem[] = [
  {
    id: 'zafrani-mutton-biryani',
    name: 'Zafrani Mutton Dum Biryani',
    category: 'biryani',
    categoryLabel: 'Royal Biryani',
    description: 'Tender prime cut goat meat marinated in royal spices, layered with aged Daawat basmati rice, saffron, and pure cow ghee, slow-cooked in a sealed copper handi.',
    price: 420,
    durationOrPortion: 'Serves 1–2 (850g) · Prep 20 min',
    isBestseller: true,
    highlights: ['Pure Cow Ghee', 'Prime Tender Mutton', 'Served with Mirchi Ka Salan & Dahi Raita'],
    image: heroBiryaniImg
  },
  {
    id: 'zafrani-chicken-biryani',
    name: 'Zafrani Special Chicken Dum Biryani',
    category: 'biryani',
    categoryLabel: 'Royal Biryani',
    description: 'Classic Nizami delicacy featuring juicy marinated chicken pieces cooked on low fire (dum) with long aromatic basmati grains, caramelized golden onions, and fresh mint.',
    price: 360,
    durationOrPortion: 'Serves 1–2 (800g) · Prep 15 min',
    isBestseller: true,
    highlights: ['Juicy Farm-Fresh Chicken', 'Kashmiri Saffron Infused', 'Includes Boiled Egg & Gravy'],
    image: heroBiryaniImg
  },
  {
    id: 'world-famous-haleem',
    name: 'World-Famous Hyderabadi Haleem',
    category: 'haleem',
    categoryLabel: 'World-Famous Haleem',
    description: 'Pista House’s legendary, GI-tagged authentic recipe of pounded meat, lentils, broken wheat, and exotic Hyderabadi spices simmered for 12 hours with generous pure desi ghee.',
    price: 320,
    durationOrPortion: 'Single Portion (450g) · Ready to Serve',
    isBestseller: true,
    highlights: ['GI-Tagged Heritage Recipe', 'Fried Onions & Roasted Cashews', 'Pure Desi Ghee Crown'],
    image: haleemImg
  },
  {
    id: 'chicken-65-biryani',
    name: 'Chicken 65 Dum Biryani',
    category: 'biryani',
    categoryLabel: 'Royal Biryani',
    description: 'Fiery and crunchy boneless chicken 65 bites tossed with curry leaves and green chilies, served over a bed of fragrant Zafrani Biryani rice.',
    price: 380,
    durationOrPortion: 'Serves 1–2 (800g) · Prep 15 min',
    highlights: ['Spicy Boneless Chicken 65', 'Curry Leaf & Yogurt Tempered', 'Rich Flavor Contrast'],
    image: heroBiryaniImg
  },
  {
    id: 'zafrani-paneer-biryani',
    name: 'Zafrani Paneer Dum Biryani',
    category: 'biryani',
    categoryLabel: 'Royal Biryani',
    description: 'Succulent malai paneer cubes marinated in saffron yogurt and freshly ground Nizami garam masala, dum-cooked with aromatic basmati rice.',
    price: 310,
    durationOrPortion: 'Serves 1–2 (750g) · Prep 15 min',
    isVegetarian: true,
    highlights: ['Fresh Malai Paneer', '100% Vegetarian Preparation', 'Mint & Crispy Fried Shallots'],
    image: heroBiryaniImg
  },
  {
    id: 'pista-house-tandoori-platter',
    name: 'Grand Royal Tandoori Platter',
    category: 'kebabs',
    categoryLabel: 'Kebabs & Tandoor',
    description: 'Chef’s assortment of Murgh Malai Tikka, spiced Chicken Seekh Kebab, Tandoori Tangdi, and Garlic Naan served with mint coriander relish.',
    price: 520,
    durationOrPortion: 'Sharing Platter (12 pcs) · Prep 20 min',
    isBestseller: true,
    highlights: ['Clay Oven Charcoal Roasted', 'Tender & Smoky', 'Includes 2 Butter Naans'],
    image: heroBiryaniImg
  },
  {
    id: 'dum-ka-chicken',
    name: 'Royal Dum Ka Chicken',
    category: 'kebabs',
    categoryLabel: 'Kebabs & Tandoor',
    description: 'Traditional slow-cooked chicken in an opulent gravy of roasted cashew nuts, almonds, fried onions, and whole spices.',
    price: 390,
    durationOrPortion: 'Serves 2 (500g) · Prep 15 min',
    highlights: ['Rich Cashew & Poppyseed Gravy', 'Slow Pukht Cooking', 'Pairs Best with Rumali Roti'],
    image: haleemImg
  },
  {
    id: 'osmania-biscuits-box',
    name: 'Authentic Osmania Biscuits (Box of 400g)',
    category: 'bakery',
    categoryLabel: 'Bakery & Irani Chai',
    description: 'The quintessential Hyderabadi teatime biscuit. Flaky, buttery, and uniquely balanced with a hint of cardamom and sea salt, baked fresh daily.',
    price: 180,
    durationOrPortion: '400g Sealed Tin · Freshly Baked Daily',
    isBestseller: true,
    isVegetarian: true,
    highlights: ['Signature 1997 Recipe', 'Melt-in-Mouth Flaky Texture', 'Eggless Preparation'],
    image: osmaniaImg
  },
  {
    id: 'irani-chai-combo',
    name: 'Irani Dum Chai & 4 Osmania Biscuits',
    category: 'bakery',
    categoryLabel: 'Bakery & Irani Chai',
    description: 'Freshly brewed Hyderabadi dum tea made with reduced thick milk and Assam tea dust in a brass samovar, served hot with 4 crisp Osmania biscuits.',
    price: 90,
    durationOrPortion: 'Traditional Glass (200ml) + 4 Biscuits',
    isVegetarian: true,
    highlights: ['Brewed in Copper Samovar', 'Thick Malai Mawa Base', 'Classic Hyderabad Pairing'],
    image: osmaniaImg
  },
  {
    id: 'karachi-fruit-biscuits',
    name: 'Pista House Special Fruit Biscuits (400g)',
    category: 'bakery',
    categoryLabel: 'Bakery & Irani Chai',
    description: 'Crisp and buttery cookies studded with candied papaya (tutty fruity) and roasted cashew pieces, infused with royal cardamom.',
    price: 190,
    durationOrPortion: '400g Premium Box',
    isVegetarian: true,
    highlights: ['Loaded with Candied Fruit & Cashews', 'Golden Crust Baked', 'Eggless'],
    image: osmaniaImg
  },
  {
    id: 'qubani-ka-meetha',
    name: 'Hyderabadi Qubani Ka Meetha with Malai',
    category: 'desserts',
    categoryLabel: 'Heritage Desserts',
    description: 'Nizami delicacy of sun-dried Turkish apricots simmered to perfection in sugar syrup with apricot kernels, crowned with thick chilled dairy cream.',
    price: 190,
    durationOrPortion: '250g Bowl · Ready to Serve',
    isBestseller: true,
    isVegetarian: true,
    highlights: ['Pure Turkish Dried Apricots', 'Chilled Fresh Malai Topping', 'Rich in Apricot Kernels'],
    image: dessertImg
  },
  {
    id: 'apricot-delight-slice',
    name: 'Signature Apricot Delight Cake',
    category: 'desserts',
    categoryLabel: 'Heritage Desserts',
    description: 'Pista House’s legendary modern dessert sensation—soft sponge cake drenched in sweet apricot compote and layered with vanilla cream and slivered pistachios.',
    price: 220,
    durationOrPortion: 'Generous Dessert Cup · Chilled',
    isBestseller: true,
    isVegetarian: true,
    highlights: ['Pista House Signature Hit', 'Velvety Layered Texture', 'Topped with Iranian Pistachios'],
    image: dessertImg
  }
];

export const REVIEWS_DATA: ReviewItem[] = [
  {
    id: 'rev-1',
    authorName: 'Syed Farhan Ali',
    role: 'Google Local Guide · Level 7',
    rating: 5,
    date: '3 weeks ago',
    reviewText: 'The Zafrani Mutton Biryani here has that authentic Old City aroma without being overly greasy. The mutton was fall-off-the-bone tender. Definitely the finest dining spot on the Boduppal-Uppal highway corridor. Excellent AC family hall.',
    verified: true
  },
  {
    id: 'rev-2',
    authorName: 'Ananya Reddy',
    role: 'Verified Customer',
    rating: 5,
    date: '1 month ago',
    reviewText: 'Pista House Haleem needs no introduction, but tasting it fresh out of the handi at this outlet with crisp fried onions and roasted cashews is unbeatable! Prompt table service even on busy weekend evenings.',
    verified: true
  },
  {
    id: 'rev-3',
    authorName: 'Mohammed Ather',
    role: 'Food Blogger & Critic',
    rating: 5,
    date: '2 months ago',
    reviewText: 'Clean family atmosphere, ample seating on the first floor AC dining, and the bakery on the ground floor has the freshest Osmania biscuits and Apricot Delight. Highly recommended for family dinners and celebratory gatherings.',
    verified: true
  },
  {
    id: 'rev-4',
    authorName: 'Vikramaditya Rao',
    role: 'Local Guide · 128 Reviews',
    rating: 4,
    date: '3 months ago',
    reviewText: 'Prompt online reservation booking and very polite floor managers. The Tandoori Platter and Zafrani Chicken Dum Biryani were piping hot, flavorful, and portions were very generous. Valet parking made entry painless.',
    verified: true
  }
];

export const SEATING_AREAS = [
  { id: 'Main AC Family Hall', name: 'Main AC Family Hall', desc: 'Spacious, air-conditioned seating suited for families & groups' },
  { id: 'Royal Diwan Seating', name: 'Royal Diwan Seating', desc: 'Traditional elevated low-table seating with plush carpets & cushions' },
  { id: 'Terrace Garden', name: 'Terrace Garden', desc: 'Open-air ambient evening rooftop dining under fairy lights' },
  { id: 'Quick Bakery & Tea Lounge', name: 'Quick Bakery & Tea Lounge', desc: 'Casual ground-floor tables for tea, quick snacks & bakery bites' }
] as const;

export const TIME_SLOTS = [
  '11:30 AM', '12:00 PM', '12:30 PM', '01:00 PM', '01:30 PM',
  '02:00 PM', '02:30 PM', '03:00 PM', '03:30 PM', '04:00 PM',
  '07:00 PM', '07:30 PM', '08:00 PM', '08:30 PM', '09:00 PM',
  '09:30 PM', '10:00 PM', '10:30 PM'
];
