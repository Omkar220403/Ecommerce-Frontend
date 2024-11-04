import React, { useContext } from "react";
import { CartContext } from "./CartContext"; // Adjust the path as necessary
import { Link } from "react-router-dom";

function Cart() {
  const { cartItems, removeFromCart, updateQuantity } = useContext(CartContext);

  const handleRemove = id => {
    removeFromCart(id);
  };

  const handleQuantityChange = (id, quantity) => {
    updateQuantity(id, quantity);
  };

  if (cartItems.length === 0) {
    return (
      <div className='text-center py-20'>
        <h2 className='text-2xl font-bold'>Your Cart is Empty</h2>
        <Link
          to='/'
          className='text-blue-500 hover:underline'
        >
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className='p-6'>
      <h1 className='text-3xl font-bold mb-6'>Shopping Cart</h1>
      <div className='grid grid-cols-1 gap-4'>
        {cartItems.map(item => (
          <div
            key={item.id}
            className='flex justify-between items-center border-b pb-4 mb-4'
          >
            <div className='flex items-center'>
              <img
                src={item.image}
                alt={item.title}
                className='w-20 h-20 object-cover mr-4'
              />
              <div>
                <h2 className='text-lg font-semibold'>{item.title}</h2>
                <p className='text-gray-700'>${item.price}</p>
                <div className='flex items-center mt-2'>
                  <button
                    onClick={() =>
                      handleQuantityChange(item.id, item.quantity - 1)
                    }
                    disabled={item.quantity <= 1}
                    className='bg-gray-200 p-1 rounded-l'
                  >
                    -
                  </button>
                  <span className='mx-2'>{item.quantity}</span>
                  <button
                    onClick={() =>
                      handleQuantityChange(item.id, item.quantity + 1)
                    }
                    className='bg-gray-200 p-1 rounded-r'
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
            <button
              onClick={() => handleRemove(item.id)}
              className='text-red-500 hover:text-red-700'
            >
              Remove
            </button>
          </div>
        ))}
      </div>
      <div className='flex justify-between mt-6'>
        <h2 className='text-xl font-bold'>Total:</h2>
        <p className='text-xl font-bold'>
          $
          {cartItems
            .reduce((total, item) => total + item.price * item.quantity, 0)
            .toFixed(2)}
        </p>
      </div>
      <div className='mt-6'>
        <Link
          to='/checkout'
          className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600'
        >
          Proceed to Checkout
        </Link>
      </div>
    </div>
  );
}

export default Cart;
