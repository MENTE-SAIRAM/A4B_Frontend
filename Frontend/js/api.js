
const API_BASE_URL = 'http://13.53.214.239:5000/api';

export async function fetchProducts(page = 1, limit = 6) {
  try {
    const response = await fetch(`${API_BASE_URL}/products?page=${page}&limit=${limit}`);
    if (!response.ok) throw new Error("Failed to fetch products");
    return await response.json();
  } catch (error) {
    console.error("Error fetching products:", error);
    return { products: [], total: 0 };
  }
}



export async function fetchProduct(id) {
    const response = await fetch(`${API_BASE_URL}/products/${id}`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token') || ''}`
        }
    });
    return response.json();
}

export async function createProduct(data) {
    const response = await fetch(`${API_BASE_URL}/products`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(data)
    });
    return response.json();
}

export async function updateProduct(id, data) {
    const response = await fetch(`${API_BASE_URL}/products/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(data)
    });
    return response.json();
}

export async function deleteProduct(id) {
    const response = await fetch(`${API_BASE_URL}/products/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
    });
    return response.json();
}

export async function login(user_id, password) {
    const response = await fetch(`${API_BASE_URL}/users/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user_id, password })
    });
    return response.json();
}

export async function register(user_id, password, isAdmin) {
    const response = await fetch(`${API_BASE_URL}/users/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user_id, password, isAdmin })
    });
    return response.json();
}

export async function fetchCart() {
    const response = await fetch(`${API_BASE_URL}/cart`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
    });
    return response.json();
}

export async function addToCart(productId, quantity) {
    const response = await fetch(`${API_BASE_URL}/cart/add`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ productId, quantity })
    });
    return response.json();
}

export async function removeFromCart(productId) {
    const response = await fetch(`${API_BASE_URL}/cart/remove`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ productId })
    });
    return response.json();
}

export async function placeOrder(cart) {
  const response = await fetch(`${API_BASE_URL}/orders`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    },
    body: JSON.stringify({ cart })  // Send cart data
  });

  return response.json();
}

export async function fetchOrders(page = 1, limit = 10) {
    const response = await fetch(`${API_BASE_URL}/orders/orderhistory?page=${page}&limit=${limit}`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
    });
    return response.json();
}

export async function fetchUsers() {
    const response = await fetch(`${API_BASE_URL}/users/getallusers`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
    });
    return response.json();
}