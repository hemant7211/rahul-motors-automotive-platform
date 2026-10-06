import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Products from "./Productdata";
import "./Spareparts.css";

// Custom dropdown (native select ka white rectangle bug hatane ke liye)
function CustomSelect({ value, onChange, options }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selected = options.find((opt) => opt.value === value);

  return (
    <div className="custom-select" ref={ref}>
      <button
        type="button"
        className="custom-select-btn"
        onClick={() => setOpen(!open)}
      >
        <span>{selected ? selected.label : ""}</span>
        <span className="custom-select-arrow">▾</span>
      </button>

      {open && (
        <ul className="custom-select-list">
          {options.map((opt) => (
            <li
              key={opt.value}
              className={
                opt.value === value
                  ? "custom-select-item active"
                  : "custom-select-item"
              }
              onClick={() => {
                onChange(opt.value);
                setOpen(false);
              }}
            >
              {opt.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

const categoryOptions = [
  { value: "All", label: "All Categories" },
  { value: "Brake", label: "Brake Parts" },
  { value: "Oil", label: "Engine Oil" },
  { value: "Paint", label: "Car Paint" },
];

const sortOptions = [
  { value: "default", label: "Default" },
  { value: "low", label: "Price: Low to High" },
  { value: "high", label: "Price: High to Low" },
];

const priceOptions = [
  { value: "all", label: "All Prices" },
  { value: "under500", label: "Under ₹500" },
  { value: "500to1000", label: "₹500–₹1,000" },
  { value: "1000to5000", label: "₹1,000–₹5,000" },
  { value: "above5000", label: "Above ₹5,000" },
];

const availabilityOptions = [
  { value: "all", label: "All Products" },
  { value: "inStock", label: "In Stock" },
  { value: "outOfStock", label: "Out of Stock" },
];

function SpareParts() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("default");  
  const [priceRange, setPriceRange] = useState("all");
  const [availability, setAvailability] = useState("all");


  // Search + category filter + price sorting
  const filteredProducts = useMemo(() => {
    let result = Products.filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(search.toLowerCase()) ||
        product.category.toLowerCase().includes(search.toLowerCase());

      const matchesCategory =
        category === "All" || product.category === category;
// price range and availability
 
const matchesPrice =
  priceRange === "all" ||
  (priceRange === "under500" && product.price < 500) ||
  (priceRange === "500to1000" && product.price >= 500 && product.price <= 1000) ||
  (priceRange === "1000to5000" && product.price > 1000 && product.price <= 5000) ||
  (priceRange === "above5000" && product.price > 5000);

const matchesAvailability =
  availability === "all" ||
  (availability === "inStock" && product.stock > 0) ||
  (availability === "outOfStock" && product.stock <= 0);

      return (
  matchesSearch &&
  matchesCategory &&
  matchesPrice &&
  matchesAvailability
);
    });

    if (sort === "low") {
      result.sort((a, b) => a.price - b.price);
    } else if (sort === "high") {
      result.sort((a, b) => b.price - a.price);
    }

    return result;
 }, [search, category, sort, priceRange, availability]);

  // Separate products into category sections
  const categories = ["Brake", "Oil", "Paint"];

  // Add item to browser's local cart
  function addToCart(product) {
    if (product.stock <= 0) {
      alert("Sorry, this product is out of stock.");
      return;
    }

    const cart = JSON.parse(localStorage.getItem("rahulCart") || "[]");
    const existing = cart.find((item) => item.id === product.id);

    if (existing) {
      existing.quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem("rahulCart", JSON.stringify(cart));
    alert(`${product.name} added to cart!`);
  }

  // Buy Now opens the product detail page
  function buyNow(product) {
    if (product.stock <= 0) {
      alert("This product is currently out of stock.");
      return;
    }

    window.location.href = `/spare-parts/${product.id}`;
  }

  return (
    <main className="spare-page">
      {/* HERO + SEARCH */}
      <section className="spare-hero">
        <p className="spare-eyebrow">RAHUL MOTORS • SPARE PARTS</p>

        <h1>
          Find The Right <span>Parts</span>
        </h1>

        <p className="spare-subtitle">
          Quality spare parts for your car, all in one place.
        </p>

        {/* Search box */}
        <div className="spare-search">
          <span className="search-icon">⌕</span>

          <input
            type="text"
            placeholder="Search brake pad, disc, oil..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <button type="button" onClick={() => {}}>
            Search
          </button>
        </div>

        {/* Category and sorting options */}
        
        
        {/* All product filters */}
        <div className="spare-filters">

          {/* 1. Category Filter */}
          <div className="spare-filter-field">
            Category
            <CustomSelect
              value={category}
              onChange={setCategory}
              options={categoryOptions}
            />
          </div>

          {/* 2. Sort By Filter */}
          <div className="spare-filter-field">
            Sort By
            <CustomSelect
              value={sort}
              onChange={setSort}
              options={sortOptions}
            />
          </div>

          {/* 3. Price Range Filter */}
          <div className="spare-filter-field spare-price-filter">
            Price Range
            <CustomSelect
              value={priceRange}
              onChange={setPriceRange}
              options={priceOptions}
            />
          </div>

          {/* 4. Availability Filter */}
          <div className="spare-filter-field spare-availability-filter">
            Availability
            <CustomSelect
              value={availability}
              onChange={setAvailability}
              options={availabilityOptions}
            />
          </div>
        </div>
      </section>

      {/* PRODUCT COLLECTIONS */}
      <section className="spare-collection">
        {categories
          .filter((cat) => category === "All" || category === cat)
          .map((cat) => {
            const categoryProducts = filteredProducts.filter(
              (product) => product.category === cat
            );

            if (categoryProducts.length === 0) return null;

            return (
              <div className="spare-category-section" key={cat}>
                <div className="spare-section-heading">
                  <div>
                    <p className="spare-eyebrow">OUR COLLECTION</p>
                    <h2>
                      {cat === "Brake"
                        ? "Brake Parts"
                        : cat === "Oil"
                        ? "Engine Oil"
                        : "Car Paint"}
                    </h2>
                  </div>

                  <span>{categoryProducts.length} Products Found</span>
                </div>

                <div className="spare-product-grid">
                  {categoryProducts.map((product) => (
                    <article className="spare-card" key={product.id}>
                      {/* Product image opens details */}
                      <Link
                        to={`/spare-parts/${product.id}`}
                        className="spare-card-image"
                      >
                        <span className="spare-category-badge">
                          {product.category}
                        </span>

                        <img src={product.image} alt={product.name} />
                      </Link>

                      <div className="spare-card-info">
                        <Link
                          to={`/spare-parts/${product.id}`}
                          className="spare-product-name"
                        >
                          {product.name}
                        </Link>

                        <p className="spare-product-price">
                          ₹{product.price.toLocaleString("en-IN")}
                        </p>

                        <p
                          className={
                            product.stock > 0
                              ? "sp-in-stock"
                              : "sp-out-stock"
                          }
                        >
                          {product.stock > 0 ? "In Stock" : "Out of Stock"}
                        </p>

                        <div className="spare-card-actions">
                          <button
                            className="spare-add-btn"
                            onClick={() => addToCart(product)}
                            disabled={product.stock <= 0}
                          >
                            Add to Cart
                          </button>

                          <button
                            className="spare-buy-btn"
                            onClick={() => buyNow(product)}
                            disabled={product.stock <= 0}
                          >
                            Buy Now
                          </button>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            );
          })}

        {/* Empty search result */}
        {filteredProducts.length === 0 && (
          <div className="spare-empty">
            <h2>No products found</h2>
            <p>Try another product name or select a different category.</p>
            <button
              onClick={() => {
                setSearch("");
                setCategory("All");
                setSort("default");
                setPriceRange("all");
setAvailability("all");
              }}
            >
              Clear Filters
            </button>
          </div>
        )}
      </section>
    </main>
  );
}

export default SpareParts;