import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
import ProductCard from "../components/ProductCard";

function ProductListingScreen() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then(response => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then(data => {
        setProducts(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className='text-center'>Loading products...</div>;
  }

  if (error) {
    return <div className='text-red-500 text-center'>{error}</div>;
  }

  return (
    <div className='p-6'>
      <h1 className='text-3xl font-bold mb-6'>Our Products</h1>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
        {products.length === 0 ? (
          <div className='text-center'>No products available.</div>
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
  );
}

export default ProductListingScreen;
