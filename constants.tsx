
import type { Vendor, Equipment, LaborTeam, Contractor, InteriorDesigner } from './types';

export const VENDORS: Vendor[] = [
  {
    id: 1,
    name: 'Bangalore Steel Traders',
    rating: 4.8,
    materials: [
      { name: 'TMT Steel Bars (Fe 500D)', price: '₹65,000/tonne' },
      { name: 'Structural Steel', price: '₹72,000/tonne' },
    ],
    contactPerson: 'Mr. Kumar',
    phoneNumber: '9876543210',
  },
  {
    id: 2,
    name: 'Hubli Cement Corp',
    rating: 4.5,
    materials: [
      { name: 'OPC 53 Grade Cement', price: '₹420/bag' },
      { name: 'PPC Cement', price: '₹380/bag' },
    ],
    contactPerson: 'Mrs. Patil',
    phoneNumber: '9876543211',
  },
  {
    id: 3,
    name: 'Deccan Aggregates',
    rating: 4.6,
    materials: [
      { name: 'Coarse Aggregate (20mm)', price: '₹1,500/tonne' },
      { name: 'Fine Aggregate (River Sand)', price: '₹2,200/tonne' },
    ],
    contactPerson: 'Mr. Reddy',
    phoneNumber: '9876543212',
  },
];

export const EQUIPMENT_CATEGORIES: { [key: string]: Equipment[] } = {
  "Earthmoving Equipment": [
    { id: 1, name: 'JCB 3DX Backhoe Loader', rate: '₹1,200/hour', specs: ['Engine Power: 76 HP', 'Max Dig Depth: 4.77 m'], operatorIncluded: true },
    { id: 2, name: 'Excavator', rate: '₹1,800/hour', specs: ['Operating Weight: 20 Ton', 'Bucket Capacity: 1.0 m³'], operatorIncluded: true },
  ],
  "Transportation": [
    { id: 3, name: 'Tipper Truck (10-wheeler)', rate: '₹4,000/trip', specs: ['Capacity: 16 Tonnes', 'Diesel Engine'], operatorIncluded: true },
    { id: 4, name: 'Truck (6-wheeler)', rate: '₹2,500/trip', specs: ['Capacity: 9 Tonnes', 'Diesel Engine'], operatorIncluded: true },
  ],
  "Compaction Equipment": [
    { id: 5, name: 'Vibratory Roller (10-ton)', rate: '₹2,500/hour', specs: ['Drum Width: 2140 mm', 'Centrifugal Force: 250 kN'], operatorIncluded: true },
  ],
  "Concrete Equipment": [
    { id: 6, name: 'Concrete Mixer Machine', rate: '₹3,000/day', specs: ['Capacity: 10/7 cft', 'Electric Motor'], operatorIncluded: false },
    { id: 7, name: 'Concrete Pump', rate: '₹15,000/day', specs: ['Output: 30 m³/hr', 'Max Pressure: 70 bar'], operatorIncluded: true },
  ],
  "Lifting Equipment": [
    { id: 8, name: 'Tower Crane', rate: '₹80,000/month', specs: ['Max Jib Length: 50m', 'Max Lift: 5 Ton'], operatorIncluded: true },
    { id: 9, name: 'Mobile Crane (Hydra)', rate: '₹2,000/hour', specs: ['Capacity: 14 Ton', 'Max Height: 12m'], operatorIncluded: true },
  ],
};


export const LABOR_CATEGORIES: { [key: string]: LaborTeam[] } = {
  "Bar Bending & Fixing": [
    { id: 1, trade: 'Bar Bending & Fixing', teamSize: 4, rate: '₹4,000/day', rating: 4.9, teamLeader: 'Ramesh', contactNumber: '9123456780' },
    { id: 2, trade: 'Bar Bending & Fixing', teamSize: 6, rate: '₹5,800/day', rating: 4.7, teamLeader: 'Suresh', contactNumber: '9123456781' },
  ],
  "Shuttering & Formwork": [
    { id: 3, trade: 'Shuttering & Formwork', teamSize: 6, rate: '₹6,000/day', rating: 4.6, teamLeader: 'Ganesh', contactNumber: '9123456782' },
  ],
  "Masonry": [
    { id: 4, trade: 'Masonry', teamSize: 5, rate: '₹4,500/day', rating: 4.7, teamLeader: 'Ali', contactNumber: '9123456783' },
    { id: 5, trade: 'Masonry', teamSize: 3, rate: '₹2,800/day', rating: 4.5, teamLeader: 'John', contactNumber: '9123456784' },
  ],
  "Tiling": [
     { id: 6, trade: 'Tiling', teamSize: 2, rate: '₹2,500/day', rating: 4.8, teamLeader: 'Krishna', contactNumber: '9123456785' },
  ],
  "Painting": [
    { id: 7, trade: 'Painting', teamSize: 3, rate: '₹2,700/day', rating: 4.8, teamLeader: 'David', contactNumber: '9123456786' },
  ],
  "Plumbing": [
     { id: 8, trade: 'Plumbing', teamSize: 2, rate: '₹2,800/day', rating: 4.9, teamLeader: 'Anand', contactNumber: '9123456787' },
  ],
  "Electrical Work": [
     { id: 9, trade: 'Electrical Work', teamSize: 2, rate: '₹3,000/day', rating: 4.8, teamLeader: 'Peter', contactNumber: '9123456788' },
  ]
};

export const CONTRACTORS: Contractor[] = [
  {
    id: 1,
    name: 'BuildRight Constructions',
    rating: 4.9,
    specialties: ['Residential High-Rise', 'Commercial Complexes', 'Turnkey Projects'],
  },
  {
    id: 2,
    name: 'Deccan Heritage Builders',
    rating: 4.8,
    specialties: ['Luxury Villas', 'Custom Homes', 'Renovations'],
  },
  {
    id: 3,
    name: 'Modern Infra Solutions',
    rating: 4.7,
    specialties: ['Industrial Sheds', 'Warehouses', 'Pre-Engineered Buildings'],
  },
   {
    id: 4,
    name: 'GreenScape Homes',
    rating: 4.6,
    specialties: ['Sustainable Buildings', 'Eco-friendly Materials', 'Green Certified'],
  },
];

export const INTERIOR_DESIGNERS: InteriorDesigner[] = [
  {
    id: 1,
    name: 'UrbanAura Designs',
    rating: 4.9,
    specialties: ['Modern & Minimalist', 'Residential Apartments'],
    imageUrl: 'https://images.unsplash.com/photo-1618220179428-22790b461013?q=80&w=300&auto=format&fit=crop',
  },
  {
    id: 2,
    name: 'The Design Atelier',
    rating: 4.8,
    specialties: ['Luxury Residential', 'Boutique Commercial'],
    imageUrl: 'https://images.unsplash.com/photo-1616046229478-9901c5536a45?q=80&w=300&auto=format&fit=crop',
  },
  {
    id: 3,
    name: 'Creative Spaces Inc.',
    rating: 4.7,
    specialties: ['Corporate Offices', 'Retail Spaces'],
    imageUrl: 'https://images.unsplash.com/photo-1554995207-c18c203602cb?q=80&w=300&auto=format&fit=crop',
  },
  {
    id: 4,
    name: 'VastuCraft Interiors',
    rating: 4.6,
    specialties: ['Vastu Compliant', 'Traditional Indian Homes'],
    imageUrl: 'https://images.unsplash.com/photo-1600121848594-d8644e57abab?q=80&w=300&auto=format&fit=crop',
  },
];