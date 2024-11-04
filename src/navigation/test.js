import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { CartProvider } from "../components/CartContext";
import HomeScreen from "../screens/HomeScreen";
import ProductListingScreen from "../screens/ProductListingScreen";
import ProductDetailPage from "../screens/ProductDetailPage";
import CheckoutPage from "../screens/CheckoutPage";
// import PaymentStatusPage from "../screens/PaymentStatusPage";
import NavBar from "../components/NavBar";
import Cart from "../components/Cart";

function App() {
  return (
    <CartProvider>
      <Router>
        <NavBar />
        <Routes>
          <Route
            path='/'
            element={<HomeScreen />}
          />{" "}
          {/* Use element instead of component */}
          <Route
            path='/products'
            element={<ProductListingScreen />}
          />{" "}
          {/* Use element instead of component */}
          <Route
            path='/product/:id'
            element={<ProductDetailPage />}
          />{" "}
          <Route
            path='/checkout'
            element={<CheckoutPage />}
          />{" "}
          {/* <Route
            path='/payment-status'
            element={<PaymentStatusPage />}
          />{" "} */}
          <Route
            path='/cart'
            element={<Cart />}
          />
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;
