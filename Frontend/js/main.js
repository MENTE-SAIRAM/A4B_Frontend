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
  updatePaginationControls();
}

function attachCartEvents() {
  document.querySelectorAll(".product-card__button").forEach((btn) => {
    btn.addEventListener("click", () => {
      const token = localStorage.getItem("token");
      if (!token) {
        window.location.href = "login.html";
        return;
      }

      const productId = btn.dataset.id;
      let cart = JSON.parse(localStorage.getItem("cart") || "[]");

      const existingItem = cart.find(item => item.id === productId);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        cart.push({ id: productId, quantity: 1 });
      }

      localStorage.setItem("cart", JSON.stringify(cart));
      alert("Product added to cart!");
    });
  });
}

function renderPaginationControls() {
  const pagination = document.getElementById("pagination");
  pagination.innerHTML = `
    <button id="prevBtn" class="pagination__btn">Prev</button>
    <span id="pageInfo" class="pagination__info"></span>
    <button id="nextBtn" class="pagination__btn">Next</button>
  `;

  document.getElementById("prevBtn").addEventListener("click", () => {
    if (currentPage > 1) {
      currentPage--;
      renderProducts(currentPage);
    }
  });

  document.getElementById("nextBtn").addEventListener("click", () => {
    const totalPages = Math.ceil(mockProducts.length / PRODUCTS_PER_PAGE);
    if (currentPage < totalPages) {
      currentPage++;
      renderProducts(currentPage);
    }
  });
}

function updatePaginationControls() {
  const totalPages = Math.ceil(mockProducts.length / PRODUCTS_PER_PAGE);
  const pageInfo = document.getElementById("pageInfo");
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");

  if (!pageInfo || !prevBtn || !nextBtn) return;

  pageInfo.textContent = `Page ${currentPage} of ${totalPages}`;
  prevBtn.disabled = currentPage === 1;
  nextBtn.disabled = currentPage === totalPages;
}

// Initialize everything
renderPaginationControls();  // Render pagination buttons first
renderProducts(currentPage); // Then load products and update controls
