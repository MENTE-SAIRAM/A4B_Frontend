const API_BASE_URL = 'http://13.53.214.239:5000/api';

document.addEventListener("DOMContentLoaded", () => {
  const orderNowBtn = document.getElementById("placeOrderBtn");

  if (!orderNowBtn) {
    console.error("Order button not found");
    return;
  }

  orderNowBtn.addEventListener("click", async () => {
    const token = localStorage.getItem("token");
    const cart = JSON.parse(localStorage.getItem("cart")) || {};

    if (!token || Object.keys(cart).length === 0) {
      alert("Please log in and add items to cart.");
      return;
    }

    try {
      // 1. Send each cart item to backend individually
      for (const [productId, qty] of Object.entries(cart)) {
        const quantity = parseInt(qty); // Ensure quantity is number

        const res = await fetch(`${API_BASE_URL}/cart/add`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({ productId, quantity })
        });

        if (!res.ok) {
          const errMsg = await res.text();
          console.error("Add to cart failed:", errMsg);
          throw new Error(`Failed to add product ${productId} to cart`);
        }
      }

      // 2. Place the order
      const orderResponse = await fetch(`${API_BASE_URL}/orders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });

      if (!orderResponse.ok) throw new Error("Order placement failed");

      // 3. Clear cart and redirect
      localStorage.removeItem("cart");
      alert("Order placed successfully!");
      window.location.href = "index.html";
    } catch (error) {
      console.error("Order error:", error);
      alert("Something went wrong while placing the order.");
    }
  });
});
