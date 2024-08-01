export const Products = [
  {
    _id: "1",
    title: "Product 1",
    description: "Description for product 1.",
    price: 19.99,
    discountPercentage: 5,
    rating: 4.0,
    type: "Home",
    stock: 50,
    brand: "Brand1",
    category: "HomeGoods",
    thumbnail:
      "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8c25lYWtlcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
    images: [
      "https://example.com/product1-1.jpg",
      "https://example.com/product1-2.jpg",
    ],
    colors: [
      { name: "green", hexCode: "#00ff00" },
      { name: "blue", hexCode: "#0000ff" },
    ],
    sizes: [
      { name: "M", measurement: "cm" },
      { name: "L", measurement: "cm" },
    ],
    highlights: ["Eco-friendly", "Durable"],
    discountPrice: 18.99,
  },
  {
    _id: "2",
    title: "Product 2",
    description: "Description for product 2.",
    price: 99.99,
    discountPercentage: 15,
    rating: 4.8,
    type: "Electronics",
    stock: 20,
    brand: "Brand2",
    category: "Tech",
    thumbnail:
      "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8c25lYWtlcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
    images: [
      "https://example.com/product2-1.jpg",
      "https://example.com/product2-2.jpg",
    ],
    colors: [
      { name: "green", hexCode: "#00ff00" },
      { name: "blue", hexCode: "#0000ff" },
    ],
    sizes: [
      { name: "M", measurement: "cm" },
      { name: "L", measurement: "cm" },
    ],
    highlights: ["High performance", "Warranty included"],
    discountPrice: 84.99,
  },
];
