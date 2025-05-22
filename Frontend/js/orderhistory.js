document.addEventListener("DOMContentLoaded", () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");
  const orderList = document.getElementById("orderList");

  if (!user || !token) {
    alert("Please login to view your order history.");
    window.location.href = "login.html";
    return;
  }

  const orders = [
    {
      id: 1001,
      date: "2025-05-10",
      items: [
        { title: "Pixel 7", price: 799, image: "https://via.placeholder.com/100" },
        { title: "iPhone 14 Pro", price: 1199, image: "https://via.placeholder.com/100" }
      ]
    },
    {
      id: 1002,
      date: "2025-05-05",
      items: [
        { title: "Samsung Galaxy S24", price: 999, image: "https://via.placeholder.com/100" }
      ]
    }
  ];

  orders.forEach((order) => {
    const section = document.createElement("section");
    section.className = "order";
    section.innerHTML = `<h3>Order #${order.id} — ${order.date}</h3>`;

    order.items.forEach((item) => {
      const div = document.createElement("div");
      div.className = "product-card";
      div.innerHTML = `
        <img src="${item.image}" alt="${item.title}" class="product-card__img" />
        <h3 class="product-card__title">${item.title}</h3>
        <p class="product-card__price">$${item.price}</p>
      `;
      section.appendChild(div);
    });

    orderList.appendChild(section);
  });
});
