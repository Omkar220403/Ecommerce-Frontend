import React from "react";
import { Link } from "react-router-dom";

function ProductCard({ product }) {
  return (
    <Link
      to={`/product/${product.id}`}
      className='block bg-white rounded-lg shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-xl'
    >
      <img
        src={product.image}
        alt={product.title}
        className='w-full h-48 object-contain p-4' // Make the image responsive
      />
      <div className='p-4'>
        <h3 className='text-lg font-semibold'>{product.title}</h3>
        <p className='text-gray-700'>${product.price.toFixed(2)}</p>
      </div>
    </Link>
  );
}

export default ProductCard;
