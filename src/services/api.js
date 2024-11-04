import axios from "axios";

const api = axios.create({
  baseURL: `http://localhost:5000/api/products`, // Update to your backend URL
});

// Fetch all products from your backend
export const fetchProducts = () => api.get("/");

// Fetch product by ID
export const fetchProductById = id => api.get(`/${id}`); // Use backticks for template strings

// Fetch all categories
export const fetchCategories = () => api.get("/categories");

// Fetch products by category
export const fetchProductsByCategory = category =>
  api.get(`/category/${category}`);

// Add product to cart (function to be implemented)
export const addToCart = product => {
  // Implementation for adding product to cart goes here
};

const apiService = {
  fetchProducts,
  fetchProductById,
  fetchCategories,
  fetchProductsByCategory,
  addToCart,
};

export default apiService;
