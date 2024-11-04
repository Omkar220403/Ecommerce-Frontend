import React from "react";
import { Link } from "react-router-dom";

function NavBar() {
  return (
    <header className='bg-background shadow-md py-4 px-6 flex justify-between items-center'>
      <Link
        to='/'
        className='text-xl font-bold text-accent'
      >
        Shopee
      </Link>

      <div className='flex-grow mx-8'>
        <input
          type='text'
          placeholder='Search...'
          className='border border-primary p-2 rounded-md w-full max-w-md md:max-w-lg mx-auto text-primary placeholder-gray-500'
        />
      </div>

      <nav className='flex space-x-6'>
        <Link
          to='/products'
          className='text-textPrimary hover:text-primary'
        >
          Shop
        </Link>
      </nav>

      <div className='flex space-x-4 items-center ml-6'>
        <Link
          to='/login'
          className='text-textPrimary hover:text-primary'
        >
          Log In
        </Link>

        <Link
          to='/cart'
          className='text-accent hover:text-primary text-xl'
        >
          🛒
        </Link>
      </div>
    </header>
  );
}

export default NavBar;
