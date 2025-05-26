const API_BASE_URL = 'http://13.53.214.239:5000/api';

document.addEventListener("DOMContentLoaded", async () => {
  const token = localStorage.getItem("token");
  const orderList = document.getElementById("orderList");

  if (!token) {
    alert("Please login to view your order history.");
    window.location.href = "login.html";
    return;
  }

  try {
    const response = await fetch(`${API_BASE_URL}/orders/orderhistory`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (!response.ok) throw new Error("Failed to fetch order history.");

    const data = await response.json();
    const orders = data.orders || [];
    console.log(orders);

    if (orders.length === 0) {
      orderList.innerHTML = "<p>No orders found.</p>";
      return;
    }

    // Group orders by date
    const groupedByDate = {};

    orders.forEach(order => {
      const date = new Date(order.created_at).toLocaleDateString();
      if (!groupedByDate[date]) {
        groupedByDate[date] = [];
      }
      groupedByDate[date].push(...order.items);
    });

    const html = Object.entries(groupedByDate).map(([date, items]) => {
      const productCards = items.map(item => {
        const name = item.name || "Iphone 11";
        const price = item.price || "999";
        const quantity = item.quantity || 0;
        const subtotal = (parseFloat(price) * quantity).toFixed(2);

        return `
          <div class="product-card">
            <img src="https://www.aptronixindia.com/media/catalog/product/cache/31f0162e6f7d821d2237f39577122a8a/r/1/r1594_starlight_pdp_image_position-1a_avail__en-in-removebg-preview_1.png" alt="${name}" class="product-card__image" />
            <div class="product-card__info">
              <h3>${name}</h3>
              <p>Quantity: ${quantity}</p>
              <p>Price: Rs ${price}</p>
              <p><strong>Subtotal:</strong> Rs ${subtotal}</p>
            </div>
          </div>
        `;
      }).join("");

      return `
        <div class="order-day-box">
          <h3 class="order-day-title">Orders on ${date}</h3>
          <div class="product-list">${productCards}</div>
        </div>
      `;
    }).join("");

    orderList.innerHTML = html;

  } catch (error) {
    console.error("Error loading orders:", error);
    orderList.innerHTML = "<p>Failed to load order history.</p>";
  }
});
