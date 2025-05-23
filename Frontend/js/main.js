import { fetchProducts } from "./api.js";

const DEFAULT_IMAGE_URL = "https://www.aptronixindia.com/media/catalog/product/cache/31f0162e6f7d821d2237f39577122a8a/r/1/r1594_starlight_pdp_image_position-1a_avail__en-in-removebg-preview_1.png";

let currentPage = 1;
const limit = 6;
let totalPages = 1;

// Get login state
function getAuth() {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));
  return { token, user };
}

// Cart handling
function handleAddToCart(productId) {
  let cart = JSON.parse(localStorage.getItem("cart")) || {};

  if (cart[productId]) {
    cart[productId] += 1;
  } else {
    cart[productId] = 1;
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  alert("Item added to cart!");
}

// Attach click listeners to Add to Cart buttons
function attachAddToCartEvents() {
  const buttons = document.querySelectorAll(".add-to-cart");
  buttons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const { token, user } = getAuth();
      if (!token || !user) {
        e.preventDefault();
        alert("Please login to add items to cart.");
        window.location.href = "login.html";
        return;
      }

      const productId = btn.getAttribute("data-id");
      handleAddToCart(productId);
    });
  });
}

// Render product cards
function renderProducts(products) {
  const container = document.getElementById("productList");
  container.innerHTML = "";

  if (!Array.isArray(products) || products.length === 0) {
    container.innerHTML = "<p>No products available.</p>";
    return;
  }

  products.forEach(product => {
    const card = document.createElement("div");
    card.className = "product-card";
    card.innerHTML = `
      <img src="${DEFAULT_IMAGE_URL}" alt="${product.name}" class="product-card__image">
      <h3 class="product-card__name">${product.name}</h3>
      <p class="product-card__description">${product.description}</p>
      <div class="product-card__footer">
        <span class="product-card__price">Rs ${product.price}</span>
        <button class="add-to-cart" data-id="${product.id}">Add to Cart</button>
      </div>
    `;
    container.appendChild(card);
  });

  attachAddToCartEvents();
}

// Update pagination display
function updatePaginationControls() {
  const pageInfo = document.getElementById("pageInfo");
  pageInfo.textContent = `Page ${currentPage} of ${totalPages}`;
}

// Pagination
document.getElementById("prevPage").addEventListener("click", async () => {
  if (currentPage > 1) {
    currentPage--;
    const result = await fetchProducts(currentPage, limit);
    renderProducts(result.products);
    updatePaginationControls();
  }
});

document.getElementById("nextPage").addEventListener("click", async () => {
  currentPage++;
  const result = await fetchProducts(currentPage, limit);
  if (result.products.length === 0) {
    currentPage--; // Revert if no data
    return;
  }
  renderProducts(result.products);
  updatePaginationControls();
});

// Initial load
document.addEventListener("DOMContentLoaded", async () => {
  const result = await fetchProducts(currentPage, limit);
  renderProducts(result.products);
  totalPages = Math.ceil(result.total / limit);
  updatePaginationControls();
});
