import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useCart } from "../components/CartContext";

function ProductDetailPage() {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [successMessage, setSuccessMessage] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then(response => {
        if (!response.ok) {
          throw new Error("Failed to fetch product details");
        }
        return response.json();
      })
      .then(data => {
        setProduct(data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching product: ", error);
        setError("Failed to load product details. Please try again later");
        setLoading(false);
      });
  }, [id]);

  const handleAddToCart = () => {
    addToCart(product);
    setSuccessMessage("Product added to cart!"); // Set success message
    setTimeout(() => setSuccessMessage(""), 3000); // Clear message after 3 seconds
  };

  if (loading) {
    return <div className='text-center'>Loading product details....</div>;
  }
  if (error) {
    return <div className='text-red-500 text-center'>{error}</div>;
  }

  return (
    <div className='container mx-auto p-6'>
      {/* Display the success message */}
      {successMessage && (
        <div className='text-green-500 text-center mb-4'>{successMessage}</div>
      )}
      <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
        <div className='flex justify-center'>
          <img
            src={product.image}
            alt={product.title}
            className='w-full h-80 object-contain'
          />
        </div>
        <div>
          <h1 className='text-3xl font-bold mb-2'>{product.title}</h1>
          <p className='text-lg text-gray-700 mb-4'>{product.description}</p>
          <p className='text-xl font-semibold text-gray-800 mb-4'>
            ${product.price.toFixed(2)}
          </p>
          <button
            onClick={handleAddToCart}
            className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600'
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetailPage;
