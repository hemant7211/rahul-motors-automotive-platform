
import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// import { Link } from "react-router-dom";
import Footer from "../../components/footer/Footer";
import Products from "./Productdata";
import Spareproductdetails from "./Spareproductdetails.jsx";
import { useCart } from "../../context/CartContext";
import CartDrawer from "./CartDrawer";
import "./Spareparts.css";

// ==================== CUSTOM DROPDOWN ====================

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

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const selected = options.find((opt) => opt.value === value);

  return (
    <div className="custom-select" ref={ref}>
      <button
        type="button"
        className="custom-select-btn"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
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

// ==================== CATEGORY OPTIONS ====================

const categoryOptions = [
  { value: "All", label: "All Categories" },
  ...Array.from(
    new Set(Products.map((product) => product.category))
  ).map((cat) => ({
    value: cat,
    label: cat,
  })),
];

// ==================== SORT OPTIONS ====================

const sortOptions = [
  { value: "default", label: "Default" },
  { value: "low", label: "Price: Low to High" },
  { value: "high", label: "Price: High to Low" },
];

// ==================== PRICE OPTIONS ====================

const priceOptions = [
  { value: "all", label: "All Prices" },
  { value: "under500", label: "Under ₹500" },
  { value: "500to1000", label: "₹500–₹1,000" },
  { value: "1000to5000", label: "₹1,000–₹5,000" },
  { value: "above5000", label: "Above ₹5,000" },
];

// ==================== AVAILABILITY OPTIONS ====================

const availabilityOptions = [
  { value: "all", label: "All Products" },
  { value: "inStock", label: "In Stock" },
  { value: "outOfStock", label: "Out of Stock" },
];

// ==================== SPARE PARTS PAGE ====================

function SpareParts() {
  const { addToCart } = useCart();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("default");
  const [priceRange, setPriceRange] = useState("all");
  const [availability, setAvailability] = useState("all");

  // Mobile filter panel
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // ==================== ALL CATEGORIES ====================

  const categories = useMemo(
    () => [...new Set(Products.map((product) => product.category))],
    []
  );

  // ==================== SEARCH AND FILTER ====================

  const filteredProducts = useMemo(() => {
    let result = Products.filter((product) => {
      const searchText = search.toLowerCase();

      const matchesSearch =
        product.name.toLowerCase().includes(searchText) ||
        product.category.toLowerCase().includes(searchText);

      const matchesCategory =
        category === "All" || product.category === category;

      const matchesPrice =
        priceRange === "all" ||
        (priceRange === "under500" && product.price < 500) ||
        (priceRange === "500to1000" &&
          product.price >= 500 &&
          product.price <= 1000) ||
        (priceRange === "1000to5000" &&
          product.price > 1000 &&
          product.price <= 5000) ||
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

    // Price sorting
    if (sort === "low") {
      result.sort((a, b) => a.price - b.price);
    } else if (sort === "high") {
      result.sort((a, b) => b.price - a.price);
    }

    return result;
  }, [search, category, sort, priceRange, availability]);

  // ==================== BUY NOW ====================
 const navigate = useNavigate();
  function buyNow(product) {
  if (product.stock <= 0) {
    alert("This product is currently out of stock.");
    return;
  }

  const category = encodeURIComponent(
    product.category.toLowerCase()
  );

  navigate(
    `/spare-parts/${category}/${product.id}`
  );
}

  // ==================== CLEAR FILTERS ====================

  function clearFilters() {
    setSearch("");
    setCategory("All");
    setSort("default");
    setPriceRange("all");
    setAvailability("all");
  }

  // ==================== PAGE UI ====================

  return (
    <>
      <main className="spare-page">
        {/* HERO SECTION */}
        <section className="spare-hero">
          <p className="spare-eyebrow">
            Built For The Road
          </p>

          <h1>
            Find The Right <span>Parts</span>
          </h1>

          <p className="spare-subtitle">
            Quality spare parts for your car, all in one place.
          </p>
        </section>

        {/* SEARCH + MOBILE FILTER ICON */}
        <div className="spare-search-row">
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

          {/* Mobile-only filter button */}
          <button
            type="button"
            className="mobile-filter-btn"
            onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
            aria-label="Toggle filters"
            aria-expanded={mobileFilterOpen}
          >
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M4 7h16" />
              <path d="M7 12h10" />
              <path d="M10 17h4" />
            </svg>

            <span>Filter</span>
          </button>
        </div>

        {/* ALL PRODUCT FILTERS */}
        <div
          className={`spare-filters ${
            mobileFilterOpen ? "mobile-filters-open" : ""
          }`}
        >
          {/* Category filter */}
          <div className="spare-filter-field">
            Category

            <CustomSelect
              value={category}
              onChange={setCategory}
              options={categoryOptions}
            />
          </div>

          {/* Sort filter */}
          <div className="spare-filter-field">
            Sort By

            <CustomSelect
              value={sort}
              onChange={setSort}
              options={sortOptions}
            />
          </div>

          {/* Price filter */}
          <div className="spare-filter-field spare-price-filter">
            Price Range

            <CustomSelect
              value={priceRange}
              onChange={setPriceRange}
              options={priceOptions}
            />
          </div>

          {/* Availability filter */}
          <div className="spare-filter-field spare-availability-filter">
            Availability

            <CustomSelect
              value={availability}
              onChange={setAvailability}
              options={availabilityOptions}
            />
          </div>
        </div>

        {/* ==================== PRODUCT COLLECTIONS ==================== */}

        <section className="spare-collection">
          <p className="products">ALL PRODUCTS</p>

          {categories
            .filter(
              (cat) => category === "All" || category === cat
            )
            .map((cat) => {
              const categoryProducts = filteredProducts.filter(
                (product) => product.category === cat
              );

              // Empty category section show nahi hoga.
              if (categoryProducts.length === 0) {
                return null;
              }

              return (
                <div
                  className="spare-category-section"
                  key={cat}
                >
                  {/* Category heading */}
                  <div className="spare-section-heading">
                    <div>
                      <h2>{cat} -</h2>
                    </div>

                    <span>
                      {categoryProducts.length} Products Found
                    </span>
                  </div>

                  {/* Product cards */}
                  <div className="spare-product-grid">
                    {categoryProducts.map((product) => (
                      <article
                        className="spare-card"
                        key={`${product.category}-${product.id}`}
                      >
                        {/* Product image */}
                        <Link
                          to={`/spare-parts/${encodeURIComponent(
                            product.category
                          )}/${product.id}`}
                          className="spare-card-image"
                        >
                          <img
                            src={product.image}
                            alt={product.name}
                          />
                        </Link>

                        <div className="spare-card-info">
                          {/* Product name */}
                          <Link
                            to={`/spare-parts/${encodeURIComponent(
                              product.category
                            )}/${product.id}`}
                            className="spare-product-name"
                          >
                            {product.name}
                          </Link>

                          {/* Description */}
                          <p className="spare-description">
                            {product.description}
                          </p>

                          {/* Price */}
                          <p className="spare-product-price">
                            ₹{product.price.toLocaleString("en-IN")}
                          </p>

                          {/* Stock status */}
                          <p
                            className={
                              product.stock > 0
                                ? "sp-in-stock"
                                : "sp-out-stock"
                            }
                          >
                            {product.stock > 0
                              ? "In Stock"
                              : "Out of Stock"}
                          </p>

                          {/* Action buttons */}
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

                  {/* Existing marquee */}
                  {categories.indexOf(cat) === 4 && (
                    <div className="spare-marquee">
                      <div className="spare-marquee-track">
                        <span>
                          RAHUL MOTORS ✦ QUALITY CAR PARTS ✦ TRUSTED
                          AUTOMOTIVE SOLUTIONS ✦ GENUINE CARE FOR YOUR CAR ✦
                        </span>

                        <span aria-hidden="true">
                          RAHUL MOTORS ✦ QUALITY CAR PARTS ✦ TRUSTED
                          AUTOMOTIVE SOLUTIONS ✦ GENUINE CARE FOR YOUR CAR ✦
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}

          {/* Empty search result */}
          {filteredProducts.length === 0 && (
            <div className="spare-empty">
              <h2>No products found</h2>

              <p>
                Try another product name or select a different category.
              </p>

              <button onClick={clearFilters}>
                Clear Filters
              </button>
            </div>
          )}
        </section>
      </main>

      <Footer />
       <CartDrawer />
    </>
  );
}

export default SpareParts;
