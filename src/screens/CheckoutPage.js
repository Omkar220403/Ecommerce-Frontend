import React, { useContext, useState } from "react";
import { CartContext } from "../components/CartContext";

function CheckoutPage() {
  const { cartItems, removeFromCart, updateQuantity, clearCart } =
    useContext(CartContext);
  const [userDetails, setUserDetails] = useState({
    firstName: "",
    lastName: "",
    address: "",
    apt: "",
    city: "",
    province: "",
    postalCode: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleQuantityChange = (id, quantity) => {
    updateQuantity(id, quantity);
  };

  const handleInputChange = e => {
    const { name, value } = e.target;
    setUserDetails({ ...userDetails, [name]: value });
  };

  const isFormValid = () => {
    return Object.values(userDetails).every(field => field.trim() !== "");
  };

  const handleCheckout = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        "http://localhost:5000/api/orders/checkout",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userDetails, products: cartItems }),
        }
      );
      if (response.ok) {
        setMessage("Order placed successfully!");
        clearCart(); // Clear the cart after successful order
        setUserDetails({
          firstName: "",
          lastName: "",
          address: "",
          apt: "",
          city: "",
          province: "",
          postalCode: "",
        });

        // Clear the success message after 3 seconds
        setTimeout(() => setMessage(""), 3000);
      } else {
        setMessage("Failed to place order. Please try again.");
      }
    } catch (error) {
      console.error("Error during checkout:", error);
      setMessage("An error occurred. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='flex flex-col lg:flex-row max-w-7xl mx-auto p-6 space-y-6 lg:space-y-0 lg:space-x-12'>
      {/* Left Section - Shipping Form */}
      <div className='w-full lg:w-2/3 bg-white p-6 shadow-md rounded-md'>
        <h2 className='text-2xl font-bold mb-6'>Checkout</h2>
        <div className='mb-4'>
          <h3 className='text-lg font-semibold'>Shipping Address</h3>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mt-4'>
            {/* Input Fields */}
            <input
              type='text'
              name='firstName'
              placeholder='First Name'
              className='border p-3 rounded-md'
              onChange={handleInputChange}
              value={userDetails.firstName}
            />
            <input
              type='text'
              name='lastName'
              placeholder='Last Name'
              className='border p-3 rounded-md'
              onChange={handleInputChange}
              value={userDetails.lastName}
            />
            <input
              type='text'
              name='address'
              placeholder='Street Address'
              className='border p-3 rounded-md col-span-2'
              onChange={handleInputChange}
              value={userDetails.address}
            />
            <input
              type='text'
              name='apt'
              placeholder='Apt / Suite / Unit (Optional)'
              className='border p-3 rounded-md col-span-2'
              onChange={handleInputChange}
              value={userDetails.apt}
            />
            <input
              type='text'
              name='city'
              placeholder='City'
              className='border p-3 rounded-md'
              onChange={handleInputChange}
              value={userDetails.city}
            />
            <select
              name='province'
              className='border p-3 rounded-md'
              onChange={handleInputChange}
              value={userDetails.province}
            >
              <option value=''>Select Province</option>
              <option value='Province1'>Province 1</option>
              <option value='Province2'>Province 2</option>
            </select>
            <input
              type='text'
              name='postalCode'
              placeholder='Postal Code'
              className='border p-3 rounded-md'
              onChange={handleInputChange}
              value={userDetails.postalCode}
            />
          </div>
        </div>

        {/* Other Sections */}
        <div className='mt-6'>
          <h3 className='text-lg font-semibold'>Shipping Method</h3>
          <p className='text-sm text-gray-500 mt-2'>
            Enter a shipping address to see accurate shipping options for your
            order.
          </p>
        </div>
        <button
          onClick={handleCheckout}
          disabled={loading || !isFormValid()}
          className='bg-black text-white w-full py-3 rounded-md mt-6'
        >
          {loading ? "Processing..." : "Continue"}
        </button>
        {message && <div className='mt-4 text-green-500'>{message}</div>}
      </div>

      {/* Right Section - Order Summary */}
      <div className='w-full lg:w-1/3 bg-white p-6 shadow-md rounded-md'>
        <h3 className='text-lg font-semibold mb-4'>Order Summary</h3>
        <div className='space-y-2'>
          <div className='flex justify-between text-sm'>
            <span>Subtotal</span>
            <span>
              ${" "}
              {cartItems
                .reduce((total, item) => total + item.price * item.quantity, 0)
                .toFixed(2)}
            </span>
          </div>
          <div className='flex justify-between text-sm'>
            <span>Taxes</span>
            <span>—</span>
          </div>
          <div className='flex justify-between text-sm'>
            <span>Shipping</span>
            <span>—</span>
          </div>
          <div className='flex justify-between font-bold text-lg'>
            <span>Total</span>
            <span>
              ${" "}
              {cartItems
                .reduce((total, item) => total + item.price * item.quantity, 0)
                .toFixed(2)}
            </span>
          </div>
        </div>
        <div className='mt-6'>
          <h4 className='text-lg font-semibold'>Bag Summary</h4>
          <div className='flex justify-between text-sm mt-2'>
            <span>Arrives in 4-7 days</span>
          </div>
          <div className='border-t mt-2 pt-4'>
            {cartItems.map(item => (
              <div
                key={item.id}
                className='flex items-center justify-between mt-4'
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className='w-16 h-16 object-cover rounded-md'
                />
                <div className='flex flex-col flex-grow ml-4'>
                  <span className='font-semibold'>{item.title}</span>
                  <span className='text-sm text-gray-600'>{item.details}</span>
                  <span className='text-sm font-bold text-red-500'>
                    ${(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>
                <div className='flex items-center space-x-2'>
                  <button
                    onClick={() =>
                      handleQuantityChange(item.id, item.quantity - 1)
                    }
                    disabled={item.quantity === 1}
                    className='bg-gray-200 p-1 rounded-full'
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    onClick={() =>
                      handleQuantityChange(item.id, item.quantity + 1)
                    }
                    className='bg-gray-200 p-1 rounded-full'
                  >
                    +
                  </button>
                </div>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className='text-red-500 ml-4'
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CheckoutPage;
