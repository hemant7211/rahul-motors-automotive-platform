
 // ==================== BRAKE PARTS ====================
const BrakeProducts = [
  {
    id: 1,
    name: "Brake Pad Set",
    category: "Brake",
    price: 1200,
    image: "/spare/brake pads/brakepad.webp",
    description:
      "Reliable braking performance for everyday driving.Reliable braking performance for everyday driving.Reliable braking performance for everyday driving.",
    compatibleCars: ["Maruti Swift", "Hyundai i20"],
    stock: 10,
  },
  {
    id: 2,
    name: "Brake Disc",
    category: "Brake",
    price: 1800,
    image: "/spare/brake pads/brakepad.webp",
    description: "Durable brake disc for smooth and consistent braking.",
    compatibleCars: ["Maruti Baleno", "Hyundai i20"],
    stock: 8,
  },
  {
    id: 3,
    name: "Brake Caliper",
    category: "Brake",
    price: 2200,
    image: "/spare/brake pads/brakepad.webp",
    description: "Reliable braking performance and secure fitment.",
    compatibleCars: ["Maruti Swift", "Honda City"],
    stock: 10,
  },
  {
    id: 4,
    name: "Brake Shoe",
    category: "Brake",
    price: 950,
    image: "/spare/brake pads/brakepad.webp",
    description: "Quality brake shoes for dependable stopping power.",
    compatibleCars: ["Maruti Alto", "Maruti WagonR"],
    stock: 6,
  },
  {
    id: 5,
    name: "Brake Fluid",
    category: "Brake",
    price: 350,
    image: "/spare/brake pads/brakepad.webp",
    description: "Brake fluid for reliable hydraulic braking systems.",
    compatibleCars: ["Maruti Swift", "Hyundai i20"],
    stock: 0,
  },
];

// ==================== ENGINE OIL ====================
const OilProducts = [
  {
    id: 1,
    name: "Engine Oil 5W-30",
    category: "Oil",
    price: 950,
    image: "/spare/engine oil/veedol1.webp",
    description: "Engine oil designed to support engine protection.",
    compatibleCars: ["Maruti Swift", "Hyundai i20"],
    stock: 12,
  },
  {
    id: 2,
    name: "Engine Oil 10W-40",
    category: "Oil",
    price: 850,
    image: "/spare/engine oil/vedool2.webp",
    description: "Engine oil for suitable petrol and diesel vehicles.",
    compatibleCars: ["Honda City", "Maruti Baleno"],
    stock: 7,
  },
  {
    id: 3,
    name: "Oil Filter",
    category: "Oil",
    price: 300,
    image: "/spare/engine oil/veedol3.webp",
    description: "Helps filter contaminants from engine oil.",
    compatibleCars: ["Maruti Swift", "Maruti Alto"],
    stock: 15,
  },
];

// ==================== FILTER / PAINT PRODUCTS ====================
const FilterProducts = [
  {
    id: 1,
    name: "Automotive Paint",
    category: "Filter",
    price: 750,
    image: "/images/car-paint.png",
    description: "Automotive paint for vehicle refinishing work.",
    compatibleCars: ["Multiple models - confirm shade"],
    stock: 9,
  },
  {
    id: 2,
    name: "Clear Coat",
    category: "Filter",
    price: 1100,
    image: "/images/clear-coat.png",
    description: "Clear coat for a protective automotive finish.",
    compatibleCars: ["Multiple models"],
    stock: 5,
  },
];

// ==================== ALL PRODUCTS ====================
const Products = [
  ...BrakeProducts,
  ...OilProducts,
  ...FilterProducts,
];

export default Products;
