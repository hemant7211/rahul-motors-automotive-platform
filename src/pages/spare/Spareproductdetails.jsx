
import { Link, useParams } from "react-router-dom";
import Products from "./Productdata";
import "./SpareProductDetails.css";

function SpareProductDetails() {
  // Read product ID from URL
  const { id } = useParams();

  // Find the matching product
  const product = Products.find((item) => item.id === Number(id));

  // Handle invalid product URL
  if (!product) {
    return (
      <main className="sp-detail-page">
        <div className="sp-not-found">
          <h2>Product Not Found</h2>
          <Link to="/spare-parts">← Continue Shopping</Link>
        </div>
      </main>
    );
  }

  // Open WhatsApp with product details
  function enquireOnWhatsApp() {
    if (product.stock <= 0) {
      alert("This product is currently out of stock.");
      return;
    }

    const phone = "917027286512"; // Replace with Rahul Motors WhatsApp number

    const message = `Hello Rahul Motors, I want to enquire about:
Product: ${product.name}
Price: ₹${product.price}
Category: ${product.category}
Product ID: ${product.id}`;

    const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;

    window.open(url, "_blank", "noopener,noreferrer");
  }

  return (
    <main className="sp-detail-page">
      {/* Breadcrumb navigation */}
      <nav className="sp-breadcrumb">
        <Link to="/">Home</Link>
        <span>/</span>
        <Link to="/spare-parts">Spare Parts</Link>
        <span>/</span>
        <span>{product.name}</span>
      </nav>

      {/* Product image + information */}
      <section className="sp-detail-layout">
        <div className="sp-detail-image">
          <span className="sp-detail-badge">{product.category}</span>

          <img src={product.image} alt={product.name} />
        </div>

        <div className="sp-detail-info">
          <p className="sp-detail-eyebrow">
            RAHUL MOTORS • GENUINE PARTS
          </p>

          <h1>{product.name}</h1>

          <p className="sp-detail-price">
            ₹{product.price.toLocaleString("en-IN")}
          </p>

          <p className="sp-detail-description">
            {product.description}
          </p>

          {/* Compatibility information */}
          <div className="sp-detail-row">
            <span>Compatible Cars</span>
            <strong>{product.compatibleCars.join(", ")}</strong>
          </div>

          {/* Availability */}
          <div className="sp-detail-row">
            <span>Availability</span>

            <strong
              className={
                product.stock > 0
                  ? "sp-detail-available"
                  : "sp-detail-unavailable"
              }
            >
              {product.stock > 0 ? "In Stock" : "Out of Stock"}
            </strong>
          </div>

          {/* Quantity available */}
          <div className="sp-detail-row">
            <span>Available Quantity</span>
            <strong>{product.stock}</strong>
          </div>

          {/* WhatsApp enquiry */}
          <button
            className="sp-whatsapp-btn"
            onClick={enquireOnWhatsApp}
            disabled={product.stock <= 0}
          >
            Enquire on WhatsApp ↗
          </button>

          <Link to="/spare-parts" className="sp-continue-link">
            ← Continue Shopping
          </Link>
        </div>
      </section>
    </main>
  );
}

export default SpareProductDetails;
