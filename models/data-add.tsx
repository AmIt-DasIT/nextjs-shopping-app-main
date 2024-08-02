// Data add to firebase

// const generateProduct = (index: number) => {
//     const price = parseFloat((Math.random() * 100).toFixed(2));
//     const discountPercentage = parseFloat((Math.random() * 50).toFixed(2));
//     return {
//       _id: index,
//       title: `Product ${index}`,
//       description: `Description for product ${index}`,
//       price: price,
//       discountPercentage: discountPercentage,
//       rating: parseFloat((Math.random() * 5).toFixed(2)),
//       type: `Type ${index % 10}`,
//       stock: Math.floor(Math.random() * 1000),
//       brand: `Brand ${index % 5}`,
//       category: `Category ${index % 10}`,
//       thumbnail: `https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8c25lYWtlcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60`,
//       images: [
//         `https://source.unsplash.com/random/300x300?sig=${index}a`,
//         `https://source.unsplash.com/random/300x300?sig=${index}b`,
//       ],
//       colors: [
//         { color: "Red", code: "#FF0000" },
//         { color: "Blue", code: "#0000FF" },
//       ],
//       sizes: [
//         { size: "S", measurements: { chest: 34, length: 28 } },
//         { size: "M", measurements: { chest: 38, length: 29 } },
//       ],
//       highlights: [
//         `Highlight 1 for product ${index}`,
//         `Highlight 2 for product ${index}`,
//       ],
//       discountPrice: parseFloat(
//         (price * (1 - discountPercentage / 100)).toFixed(2)
//       ),
//     };
//   };

//   // Function to add products to Firestore
//   const addProducts = async () => {
//     for (let i = 1; i <= 100; i++) {
//       const product = generateProduct(i);
//       await setDoc(
//         doc(doc(db, "data", "products"), "garments", i.toString()),
//         product
//       );
//     }
//   };