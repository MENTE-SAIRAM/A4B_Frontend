const API_BASE_URL = 'http://localhost:5000/api';

export async function fetchProducts(page = 1, limit = 10) {
    try {
        const response = await fetch(`${API_BASE_URL}/products?page=${page}&limit=${limit}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoic2FpcmFtIiwiaXNBZG1pbiI6dHJ1ZSwiaWF0IjoxNzQ3OTY4MTQwLCJleHAiOjE3NDc5NzE3NDB9.EyZiGeEK1QROAoemuRj-q4dGEL7zWpn8RQjS7EgoBfw`
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();  // 👈 Await the actual data
        console.log("Fetched Products:", data); // ✅ Now you can use it
        return data;
    } catch (err) {
        console.error("Failed to fetch products:", err.message);
    }
}

fetchProducts();
