const API_BASE_URL = 'http://localhost:5000/api';

export async function fetchProducts(page = 1, limit = 10) {
    const response = await fetch(`${API_BASE_URL}/products`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoic2FpcmFtIiwiaXNBZG1pbiI6dHJ1ZSwiaWF0IjoxNzQ3OTY4MTQwLCJleHAiOjE3NDc5NzE3NDB9.EyZiGeEK1QROAoemuRj-q4dGEL7zWpn8RQjS7EgoBfw`
        }
    });
    console.log("hi")
    console.log(response)
    return response.json();
}