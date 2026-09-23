import { Product } from '../types/ecommerce';
import heroOnyxImg from '../assets/images/hero_hoodie_onyx_1790185336316.jpg';
import hoodieGreyImg from '../assets/images/hoodie_mist_grey_1790185350591.jpg';
import crewneckImg from '../assets/images/product_terry_crewneck_1790185363959.jpg';
import teeImg from '../assets/images/product_heavyweight_tee_1790185375788.jpg';
import sweatpantsImg from '../assets/images/product_cargo_sweatpants_1790185386693.jpg';

export const FEATURED_HOODIE: Product = {
  id: 'hoodie-01',
  name: 'Heavyweight Studio Hoodie',
  category: 'Apparel / Hoodies',
  subtitle: 'Our signature 520 GSM French terry fleece in an engineered boxy drape.',
  price: 55.00,
  originalPrice: 75.00,
  cashbackOffered: 5.00,
  isBestseller: true,
  rating: 4.9,
  reviewsCount: 1248,
  colors: [
    {
      id: 'c-onyx',
      name: 'Washed Onyx',
      hex: '#1E1E1E',
      image: heroOnyxImg,
      inStock: true,
    },
    {
      id: 'c-grey',
      name: 'Heather Mist',
      hex: '#9A9CA1',
      image: hoodieGreyImg,
      inStock: true,
    },
    {
      id: 'c-pine',
      name: 'Forest Pine',
      hex: '#3E4F42',
      image: crewneckImg,
      inStock: true,
    },
    {
      id: 'c-sand',
      name: 'Warm Oat',
      hex: '#D7CEC7',
      image: teeImg,
      inStock: true,
    },
  ],
  sizes: ['XS', 'S', 'M', 'L', 'XL', '2XL'],
  description:
    'Meticulously crafted from bespoke 520 GSM diagonal loopback French terry. Pre-shrunk with a double-layered structured hood that holds its shape, seamless drop shoulders, and reinforced side ribbing. Finished with discrete matte metal aglets and garment dye wash for a vintage broken-in hand feel.',
  fabricDetails: [
    '100% GOTS-certified organic ring-spun cotton',
    'Heavyweight 520 GSM diagonal loopback fleece',
    'Pre-shrunk with double enzyme vintage wash',
    'Custom dyed 2x2 heavy ribbed cuffs and hem',
  ],
  features: [
    'Substantial architectural hood with zero drawstring sag',
    'Relaxed drop-shoulder cut with ergonomic side gussets',
    'Concealed interior kangaroo passport pocket',
    'Reinforced cover-stitch seams throughout',
  ],
  careInstructions: [
    'Machine wash cold inside out with like colors',
    'Gentle cycle, mild detergent only',
    'Hang dry or tumble dry low',
    'Do not iron directly on graphics',
  ],
};

export const RECOMMENDED_PRODUCTS: Product[] = [
  {
    id: 'crew-02',
    name: 'French Terry Relaxed Crewneck',
    category: 'Apparel / Sweatshirts',
    subtitle: 'Minimalist 460 GSM loopback cotton pullover with drop-shoulder silhouette.',
    price: 48.00,
    originalPrice: 62.00,
    cashbackOffered: 4.50,
    isBestseller: false,
    rating: 4.8,
    reviewsCount: 432,
    colors: [
      {
        id: 'c-pine',
        name: 'Forest Pine',
        hex: '#3E4F42',
        image: crewneckImg,
        inStock: true,
      },
      {
        id: 'c-onyx',
        name: 'Washed Onyx',
        hex: '#1E1E1E',
        image: heroOnyxImg,
        inStock: true,
      },
      {
        id: 'c-grey',
        name: 'Heather Mist',
        hex: '#9A9CA1',
        image: hoodieGreyImg,
        inStock: true,
      },
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    description:
      'A timeless everyday luxury staple. Built with high-density loopback cotton, seamless collar tape, and relaxed vintage proportions.',
    fabricDetails: ['100% Organic Cotton', '460 GSM Loopback Terry', 'Garment dyed'],
    features: ['Ribbed triangle insert at collar', 'Drop-shoulder taper', 'Anti-pilling treatment'],
    careInstructions: ['Machine wash cold', 'Lay flat to dry'],
  },
  {
    id: 'tee-03',
    name: 'Heavyweight Boxy Drop-Shoulder Tee',
    category: 'Apparel / T-Shirts',
    subtitle: 'Heavy 300 GSM combed cotton with high-rib collar and relaxed boxy drape.',
    price: 32.00,
    originalPrice: 42.00,
    cashbackOffered: 3.00,
    isBestseller: true,
    rating: 4.9,
    reviewsCount: 885,
    colors: [
      {
        id: 'c-sand',
        name: 'Warm Oat',
        hex: '#D7CEC7',
        image: teeImg,
        inStock: true,
      },
      {
        id: 'c-onyx',
        name: 'Washed Onyx',
        hex: '#1E1E1E',
        image: heroOnyxImg,
        inStock: true,
      },
      {
        id: 'c-grey',
        name: 'Heather Mist',
        hex: '#9A9CA1',
        image: hoodieGreyImg,
        inStock: true,
      },
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL', '2XL'],
    description:
      'Engineered to hold its structure wash after wash. Features a 1.2-inch tight crew collar, clean hem split, and ultra-soft combed cotton yarns.',
    fabricDetails: ['100% Combed Cotton', '300 GSM Heavyweight Jersey'],
    features: ['High-ribbed crew collar', 'Extended sleeve drop', 'Pre-washed against shrinkage'],
    careInstructions: ['Cold machine wash', 'Tumble dry low'],
  },
  {
    id: 'pant-04',
    name: 'Relaxed Tapered Cargo Sweatpants',
    category: 'Apparel / Bottoms',
    subtitle: '480 GSM thermal fleece with waterproof zippered cargo compartments.',
    price: 58.00,
    originalPrice: 78.00,
    cashbackOffered: 5.50,
    isBestseller: false,
    rating: 4.7,
    reviewsCount: 319,
    colors: [
      {
        id: 'c-charcoal',
        name: 'Charcoal Black',
        hex: '#222326',
        image: sweatpantsImg,
        inStock: true,
      },
      {
        id: 'c-grey',
        name: 'Heather Mist',
        hex: '#9A9CA1',
        image: hoodieGreyImg,
        inStock: true,
      },
      {
        id: 'c-pine',
        name: 'Forest Pine',
        hex: '#3E4F42',
        image: crewneckImg,
        inStock: true,
      },
    ],
    sizes: ['S', 'M', 'L', 'XL', '2XL'],
    description:
      'Combining lounge comfort with utility aesthetics. Includes deep cargo pockets, concealed zip ankle gussets, and an encased elastic drawstring waist.',
    fabricDetails: ['100% French Terry Cotton', '480 GSM Heavyweight', 'DWR coated cargo panels'],
    features: ['Concealed YKK metal zips', 'Dual cargo pouches', 'Elasticated bungee ankle cinch'],
    careInstructions: ['Machine wash cold inside out', 'Line dry recommended'],
  },
];

export interface SizeMeasurement {
  size: string;
  chestIn: string;
  chestCm: string;
  lengthIn: string;
  lengthCm: string;
  shoulderIn: string;
  shoulderCm: string;
  sleeveIn: string;
  sleeveCm: string;
}

export const HOODIE_SIZE_CHART: SizeMeasurement[] = [
  { size: 'XS', chestIn: '44"', chestCm: '112 cm', lengthIn: '26"', lengthCm: '66 cm', shoulderIn: '20.5"', shoulderCm: '52 cm', sleeveIn: '23"', sleeveCm: '58.5 cm' },
  { size: 'S', chestIn: '46"', chestCm: '117 cm', lengthIn: '27"', lengthCm: '68.5 cm', shoulderIn: '21.5"', shoulderCm: '54.5 cm', sleeveIn: '23.5"', sleeveCm: '60 cm' },
  { size: 'M', chestIn: '48"', chestCm: '122 cm', lengthIn: '28"', lengthCm: '71 cm', shoulderIn: '22.5"', shoulderCm: '57 cm', sleeveIn: '24.5"', sleeveCm: '62 cm' },
  { size: 'L', chestIn: '50"', chestCm: '127 cm', lengthIn: '29"', lengthCm: '73.5 cm', shoulderIn: '23.5"', shoulderCm: '59.5 cm', sleeveIn: '25"', sleeveCm: '63.5 cm' },
  { size: 'XL', chestIn: '53"', chestCm: '134.5 cm', lengthIn: '30"', lengthCm: '76 cm', shoulderIn: '24.5"', shoulderCm: '62 cm', sleeveIn: '25.5"', sleeveCm: '65 cm' },
  { size: '2XL', chestIn: '56"', chestCm: '142 cm', lengthIn: '31"', lengthCm: '78.5 cm', shoulderIn: '25.5"', shoulderCm: '65 cm', sleeveIn: '26"', sleeveCm: '66 cm' },
];
