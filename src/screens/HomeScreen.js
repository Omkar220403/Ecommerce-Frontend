import React, { useEffect, useState } from "react";
import apiService from "../services/api"; // Import the apiService
import ProductCard from "../components/ProductCard";

function HomeScreen() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const response = await apiService.fetchProducts(); // Call the API service
        setProducts(response.data.slice(0, 8)); // Assuming the response is an array of products
      } catch (error) {
        console.error("Error Fetching Products", error);
        setError("Failed to load products. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    loadProducts(); // Execute the function to load products
  }, []);

  if (loading) {
    return (
      <div className='flex justify-center items-center h-screen'>
        <div className='loader'></div>
      </div>
    );
  }

  if (error) {
    return <div className='text-red-500 text-center'>{error}</div>;
  }

  return (
    <div className='bg-background min-h-screen'>
      <div className='bg-primary text-white py-12'>
        <div className='container mx-auto text-center'>
          <h1 className='text-4xl font-bold mb-2 text-accent'>
            Welcome to Shopee
          </h1>
          <p className='text-lg text-accent'>
            Your one-stop shop for the best products.
          </p>
        </div>
      </div>
      <div className='px-6 py-10'>
        <h2 className='text-3xl font-bold text-center mb-8 text-textPrimary'>
          Featured Products
        </h2>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8'>
          {products.length === 0 ? (
            <div className='text-center text-gray-500'>
              No products available.
            </div>
          ) : (
            products.map(product => (
              <ProductCard
                key={product.id}
                product={product}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default HomeScreen;
