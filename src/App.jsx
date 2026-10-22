import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar/Navbar";

import Home from "./pages/home/Home";
import Services from "./pages/services/Services";
import Washing from "./pages/washing/Washing";
import Modification from "./pages/modification/Modification";
import SpareParts from "./pages/spare/Spareparts.jsx";
import SpareProductDetails from "./pages/spare/Spareproductdetails";
import Checkout from "./pages/spare/Checkout";
import Cart from "./pages/spare/Cart";

import RentalCars from "./pages/rental/RentalCars";
import UsedCars from "./pages/used/UsedCars";

import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";

import { CartProvider } from "./context/CartContext";

function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <Navbar />

        <Routes>
          {/* Main pages */}
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/washing" element={<Washing />} />
          <Route path="/modification" element={<Modification />} />

          {/* Spare parts */}
          <Route path="/spare-parts" element={<SpareParts />} />
          <Route
            path="/spare-parts/:category/:id"
            element={<SpareProductDetails />}
          />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />

          {/* Car rental and used cars */}
          <Route path="/rental-cars" element={<RentalCars />} />
          <Route path="/used-cars" element={<UsedCars />} />

          {/* Authentication */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </CartProvider>
    </BrowserRouter>
  );
}

export default App;