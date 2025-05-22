document.addEventListener("DOMContentLoaded", () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");
  const cartContainer = document.getElementById("cartItems");

  if (!user || !token) {
    alert("Please login to view your cart.");
    window.location.href = "login.html";
    return;
  }
  const cartItems = [
    {
      title: "iPhone 14 Pro",
      price: 1199,
      image: "https://via.plahttps://www.aptronixindia.com/media/catalog/product/cache/31f0162e6f7d821d2237f39577122a8a/r/1/r1594_starlight_pdp_image_position-1a_avail__en-in-removebg-preview_1.pngceholder.com/100"
    },
    {
      title: "Samsung Galaxy S24",
      price: 999,
      image: "https://via.plahttps://www.aptronixindia.com/media/catalog/product/cache/31f0162e6f7d821d2237f39577122a8a/r/1/r1594_starlight_pdp_image_position-1a_avail__en-in-removebg-preview_1.pngceholder.com/100"
    }
  ];

  cartItems.forEach((item) => {
    const div = document.createElement("div");
    div.className = "product-card";
    div.innerHTML = `
      <img src="${item.image}" alt="${item.title}" class="product-card__img" />
      <h3 class="product-card__title">${item.title}</h3>
      <p class="product-card__price">$${item.price}</p>
    `;
    cartContainer.appendChild(div);
  });
});
