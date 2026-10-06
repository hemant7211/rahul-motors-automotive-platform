import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";

import Home from "./pages/home/Home";
import Services from "./pages/services/Services";
import Washing from "./pages/washing/Washing";
import Modification from "./pages/modification/Modification";
import SpareParts from "./pages/spare/SpareParts";
// import SpareProductDetails from "./pages/spare/SpareProductDetails";

// function UsedCars() {
//   return <h1>Used Cars Page</h1>;
// }

// function SpareParts() {
//   return <h1>Spare Parts Page</h1>;
// }

function RentalCars() {
  return <h1>Rental Cars Page</h1>;
}

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<Services />} />
        <Route path="/washing" element={<Washing />} />
        <Route path="/spare-parts" element={<SpareParts />} />
      {/* <Route
        path="/spare-parts/:id"
        element={<SpareProductDetails />}
      /> */}
        <Route path="/rental-cars" element={<RentalCars />} />
        <Route path="/modification" element={<Modification />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;