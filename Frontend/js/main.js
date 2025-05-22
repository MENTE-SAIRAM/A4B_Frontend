import { mockProducts } from "./mock-data.js";

const PRODUCTS_PER_PAGE = 6;
let currentPage = 1;

function renderProducts(page = 1) {
  const start = (page - 1) * PRODUCTS_PER_PAGE;
  const end = start + PRODUCTS_PER_PAGE;
  const productList = document.getElementById("productList");
  productList.innerHTML = "";

  const productsToShow = mockProducts.slice(start, end);

  productsToShow.forEach((product) => {
    const card = document.createElement("article");
    card.className = "product-card";
    card.innerHTML = `
      <img src="${product.image}" alt="${product.name}" class="product-card__image" />
      <h2 class="product-card__name">${product.name}</h2>
      <p class="product-card__brand">${product.brand}</p>
      <p class="product-card__price">$${product.price}</p>
      <button class="product-card__button" data-id="${product.id}">Add to Cart</button>
    `;
    productList.appendChild(card);
  });

  attachCartEvents();
}

function renderPagination() {
  const totalPages = Math.ceil(mockProducts.length / PRODUCTS_PER_PAGE);
  const pagination = document.getElementById("pagination");
  pagination.innerHTML = "";

  for (let i = 1; i <= totalPages; i++) {
    const btn = document.createElement("button");
    btn.className = "pagination__btn";
    btn.textContent = i;
    btn.addEventListener("click", () => {
      currentPage = i;
      renderProducts(i);
    });
    pagination.appendChild(btn);
  }
}

function attachCartEvents() {
  document.querySelectorAll(".product-card__button").forEach((btn) => {
    btn.addEventListener("click", () => {
      const token = localStorage.getItem("token");
      if (!token) {
        window.location.href = "login.html";
      } else {
        const productId = btn.dataset.id;
        const cart = JSON.parse(localStorage.getItem("cart") || "[]");
        cart.push(productId);
        localStorage.setItem("cart", JSON.stringify(cart));
        alert("Product added to cart!");
      }
    });
  });
}

// Run on page load
renderProducts(currentPage);
renderPagination();
