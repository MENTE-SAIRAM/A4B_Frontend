// document.addEventListener("DOMContentLoaded", () => {
//   const user = JSON.parse(localStorage.getItem("user"));
//   const token = localStorage.getItem("token");
//   const cartContainer = document.getElementById("cartItems");

//   if (!user || !token) {
//     alert("Please login to view your cart.");
//     window.location.href = "login.html";
//     return;
//   }
//   const cartItems = [
//     {
//       title: "iPhone 14 Pro",
//       price: 1199,
//       image: "https://viahttps://www.aptronixindia.com/media/catalog/product/cache/31f0162e6f7d821d2237f39577122a8a/r/1/r1594_starlight_pdp_image_position-1a_avail__en-in-removebg-preview_1.png.plahttps://www.aptronixindia.com/media/catalog/product/cache/31f0162e6f7d821d2237f39577122a8a/r/1/r1594_starlight_pdp_image_position-1a_avail__en-in-removebg-preview_1.pngceholder.com/100"
//     },
//     {
//       title: "Samsung Galaxy S24",
//       price: 999,
//       image: "https://via.plahttps:/https://www.aptronixindia.com/media/catalog/product/cache/31f0162e6f7d821d2237f39577122a8a/r/1/r1594_starlight_pdp_image_position-1a_avail__en-in-removebg-preview_1.png/www.aptronixindia.com/media/catalog/product/cache/31f0162e6f7d821d2237f39577122a8a/r/1/r1594_starlight_pdp_image_position-1a_avail__en-in-removebg-preview_1.pngceholder.com/100"
//     }
//   ];

//   cartItems.forEach((item) => {
//     const div = document.createElement("div");
//     div.className = "product-card";
//     div.innerHTML = `
//       <img src="${item.image}" alt="${item.title}" class="product-card__img" />
//       <h3 class="product-card__title">${item.title}</h3>
//       <p class="product-card__price">$${item.price}</p>
//     `;
//     cartContainer.appendChild(div);
//   });
// });

// document.addEventListener("DOMContentLoaded", () => {
//   const cartItemsContainer = document.getElementById("cartItems");
//   const cartTotalElement = document.getElementById("cartTotal");

//   const cart = JSON.parse(localStorage.getItem("cart")) || [];
//   console.log(JSON.parse(localStorage.getItem("cart")));

//   if (cart.length === 0) {
//     cartItemsContainer.innerHTML = "<p>Your cart is empty.</p>";
//     cartTotalElement.textContent = "0.00";
//     return;
//   }

//   let total = 0;

//   cartItemsContainer.innerHTML = cart.map(item => {
//     total += parseFloat(item.price);
//     return `
//       <div class="product-card">
//         <img src="${item.image}" alt="${item.name}" class="product-card__image" />
//         <div class="product-card__info">
  //         <h3>${item.name}</h3>
  //         <p>Brand: ${item.brand}</p>
  //         <p>Price: $${item.price}</p>
  //       </div>
  //     </div>
  //   `;
  // }).join("");

  // cartTotalElement.textContent = total.toFixed(2);
// });
import { fetchProducts } from "./api.js";

document.addEventListener("DOMContentLoaded", async () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");

  if (!user || !token) {
    alert("Please login to view your cart.");
    window.location.href = "login.html";
    return;
  }

  const cartItemsContainer = document.getElementById("cartItems");
  const cartTotalElement = document.getElementById("cartTotal");

  const cart = JSON.parse(localStorage.getItem("cart")) || {};
  const productIds = Object.keys(cart);

  if (productIds.length === 0) {
    cartItemsContainer.innerHTML = "<p>Your cart is empty.</p>";
    cartTotalElement.textContent = "0.00";
    return;
  }

  try {
    // Use your exported fetchProducts function
    const data = await fetchProducts();
    const products = data.products || [];

    let total = 0;

    const html = productIds.map(id => {
      const product = products.find(p => p.id === id);
      if (!product) return "";

      const quantity = cart[id];
      const subtotal = product.price * quantity;
      total += subtotal;

      return `
        <div class="product-card">
          <img src="https://www.aptronixindia.com/media/catalog/product/cache/31f0162e6f7d821d2237f39577122a8a/r/1/r1594_starlight_pdp_image_position-1a_avail__en-in-removebg-preview_1.png" alt="${product.name}" class="product-card__image" />
          <div class="product-card__info">
            <h3>${product.name}</h3>
            <p>Brand: ${product.name || "N/A"}</p>
            <p>Price: Rs ${product.price}</p>
            <p>Quantity: ${quantity}</p>
            <p><strong>Subtotal:</strong> Rs ${subtotal.toFixed(2)}</p>
          </div>
        </div>
      `;
    }).join("");

    cartItemsContainer.innerHTML = html;
    cartTotalElement.textContent = total.toFixed(2);
  } catch (error) {
    console.error("Error loading products:", error);
    cartItemsContainer.innerHTML = "<p>Failed to load cart items.</p>";
    cartTotalElement.textContent = "0.00";
  }
});
