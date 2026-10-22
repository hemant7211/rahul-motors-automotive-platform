
import { useMemo, useState } from "react";
import "./Usedcars.css";

// Demo listings: apni actual car details aur image filenames yahan update karna.
const usedCars = [
  {
    id: 1,
    name: "Maruti Suzuki Swift",
    variant: "VXI",
    year: 2022,
    km: 28000,
    fuel: "Petrol",
    transmission: "Manual",
    owners: 1,
    price: 450000,
    image: "/used/swift.webp",
    description:
      "Compact hatchback, city driving aur daily use ke liye suitable.",
    features: ["Power Steering", "Air Conditioning", "Central Locking"],
  },
  {
    id: 2,
    name: "Hyundai i20",
    variant: "Sportz",
    year: 2021,
    km: 35000,
    fuel: "Petrol",
    transmission: "Manual",
    owners: 1,
    price: 520000,
    image: "/used/i20.webp",
    description:
      "Premium hatchback with a comfortable cabin and modern styling.",
    features: ["Touchscreen", "Rear Camera", "Power Windows"],
  },
  {
    id: 3,
    name: "Maruti Suzuki Baleno",
    variant: "Delta",
    year: 2023,
    km: 18000,
    fuel: "Petrol",
    transmission: "Manual",
    owners: 1,
    price: 620000,
    image: "/used/baleno.webp",
    description:
      "Practical hatchback with spacious seating and good everyday usability.",
    features: ["Air Conditioning", "ABS", "Power Windows"],
  },
  {
    id: 4,
    name: "Hyundai Creta",
    variant: "S",
    year: 2021,
    km: 42000,
    fuel: "Diesel",
    transmission: "Manual",
    owners: 1,
    price: 950000,
    image: "/used/creta.webp",
    description:
      "SUV-style vehicle with a spacious cabin and elevated seating.",
    features: ["Rear Camera", "Alloy Wheels", "Air Conditioning"],
  },
  {
    id: 5,
    name: "Honda City",
    variant: "V",
    year: 2020,
    km: 48000,
    fuel: "Petrol",
    transmission: "Manual",
    owners: 2,
    price: 700000,
    image: "/used/thar.webp",
    description:
      "Comfortable sedan suitable for family and highway journeys.",
    features: ["Climate Control", "Power Steering", "ABS"],
  },
  {
    id: 6,
    name: "Mahindra Scorpio",
    variant: "S",
    year: 2022,
    km: 32000,
    fuel: "Diesel",
    transmission: "Manual",
    owners: 1,
    price: 1250000,
    image: "/used/scorpio.webp",
    description:
      "A spacious SUV-style vehicle for buyers who prefer a bold design.",
    features: ["Power Steering", "Air Conditioning", "Central Locking"],
  },
];

const formatPrice = (price) =>
  `₹${price.toLocaleString("en-IN")}`;

function UsedCars() {
  const [search, setSearch] = useState("");
  const [fuel, setFuel] = useState("All");
  const [sort, setSort] = useState("featured");
  const [maxBudget, setMaxBudget] = useState("all");
  const [selectedCar, setSelectedCar] = useState(null);

  const [customer, setCustomer] = useState({
    name: "",
    mobile: "",
    message: "",
  });

  const [formMessage, setFormMessage] = useState("");
  const [formError, setFormError] = useState("");

  // Search, fuel aur budget ke according cars filter hongi.
  const filteredCars = useMemo(() => {
    let result = usedCars.filter((car) => {
      const searchText = search.toLowerCase().trim();

      const matchesSearch =
        car.name.toLowerCase().includes(searchText) ||
        car.variant.toLowerCase().includes(searchText) ||
        String(car.year).includes(searchText);

      const matchesFuel =
        fuel === "All" || car.fuel === fuel;

      const matchesBudget =
        maxBudget === "all" || car.price <= Number(maxBudget);

      return matchesSearch && matchesFuel && matchesBudget;
    });

    if (sort === "low") {
      result.sort((a, b) => a.price - b.price);
    } else if (sort === "high") {
      result.sort((a, b) => b.price - a.price);
    } else if (sort === "newest") {
      result.sort((a, b) => b.year - a.year);
    }

    return result;
  }, [search, fuel, sort, maxBudget]);

  function openDetails(car) {
    setSelectedCar(car);
    setCustomer({
      name: "",
      mobile: "",
      message: "",
    });
    setFormMessage("");
    setFormError("");
  }

  function closeDetails() {
    setSelectedCar(null);
    setFormMessage("");
    setFormError("");
  }

  function handleCustomerChange(event) {
    const { name, value } = event.target;

    setCustomer((previous) => ({
      ...previous,
      [name]: value,
    }));

    setFormError("");
    setFormMessage("");
  }

  function handleEnquirySubmit(event) {
    event.preventDefault();
    setFormError("");
    setFormMessage("");

    if (!customer.name.trim()) {
      setFormError("Please enter your name.");
      return;
    }

    if (!/^[6-9]\d{9}$/.test(customer.mobile)) {
      setFormError("Please enter a valid 10-digit mobile number.");
      return;
    }

    // Frontend demo only: enquiry database mein save nahi hoti.
    setFormMessage(
      `Demo enquiry ready for ${selectedCar.name}. Connect the backend to send and save this enquiry.`
    );
  }

  return (
    <main className="used-page">
      {/* Hero */}
      <section className="used-hero">
        <div className="used-hero-content">
          <span className="used-eyebrow">
            RAHUL MOTORS BY GLS GROUP
          </span>

          <h1>
            Find Your Next
            <span> Pre-Owned Car.</span>
          </h1>

          <p>
            Explore pre-owned cars, compare prices and enquire
            about a vehicle that fits your needs.
          </p>

          <a href="#used-inventory" className="used-hero-button">
            Explore Cars
          </a>
        </div>

        <div className="used-hero-decoration" aria-hidden="true">
          <span>PRE-OWNED</span>
          <strong>YOUR NEXT DRIVE</strong>
        </div>
      </section>

      {/* Inventory */}
      <section className="used-inventory" id="used-inventory">
        <div className="used-section-heading">
          <div>
            <span className="used-eyebrow">OUR COLLECTION</span>
            <h2>Explore Used Cars</h2>
            <p>
              Search and compare vehicles before making an enquiry.
            </p>
          </div>

          <span className="used-results-count">
            {filteredCars.length} Cars
          </span>
        </div>

        {/* Search and filters */}
        <div className="used-filters">
          <label className="used-search">
            <span>Search Cars</span>
            <input
              type="search"
              placeholder="Search brand, model or year..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
          </label>

          <label>
            <span>Fuel Type</span>
            <select
              value={fuel}
              onChange={(event) => setFuel(event.target.value)}
            >
              <option value="All">All Fuel Types</option>
              <option value="Petrol">Petrol</option>
              <option value="Diesel">Diesel</option>
            </select>
          </label>

          <label>
            <span>Maximum Budget</span>
            <select
              value={maxBudget}
              onChange={(event) => setMaxBudget(event.target.value)}
            >
              <option value="all">Any Budget</option>
              <option value="500000">Up to ₹5 Lakh</option>
              <option value="750000">Up to ₹7.5 Lakh</option>
              <option value="1000000">Up to ₹10 Lakh</option>
              <option value="1500000">Up to ₹15 Lakh</option>
            </select>
          </label>

          <label>
            <span>Sort By</span>
            <select
              value={sort}
              onChange={(event) => setSort(event.target.value)}
            >
              <option value="featured">Featured</option>
              <option value="low">Price: Low to High</option>
              <option value="high">Price: High to Low</option>
              <option value="newest">Newest First</option>
            </select>
          </label>
        </div>

        {/* Car listing cards */}
        <div className="used-car-grid">
          {filteredCars.map((car) => (
            <article className="used-car-card" key={car.id}>
              <button
                type="button"
                className="used-image-button"
                onClick={() => openDetails(car)}
                aria-label={`View details of ${car.name}`}
              >
                <img
                  className="used-car-image"
                  src={car.image}
                  alt={car.name}
                  loading="lazy"
                  onError={(event) => {
                    event.currentTarget.style.display = "none";
                    event.currentTarget.nextElementSibling.style.display =
                      "flex";
                  }}
                />

                <div
                  className="used-image-fallback"
                  aria-hidden="true"
                >
                  <span>RAHUL MOTORS</span>
                  <strong>{car.name}</strong>
                  <small>CAR IMAGE</small>
                </div>

                <span className="used-year-badge">
                  {car.year}
                </span>
              </button>

              <div className="used-card-content">
                <div className="used-card-title">
                  <div>
                    <h3>{car.name}</h3>
                    <p>{car.variant}</p>
                  </div>
                </div>

                <div className="used-car-specs">
                  <span>{car.km.toLocaleString("en-IN")} km</span>
                  <span>{car.fuel}</span>
                  <span>{car.transmission}</span>
                </div>

                <div className="used-card-bottom">
                  <div>
                    <span className="used-price-label">
                      Asking Price
                    </span>
                    <strong className="used-car-price">
                      {formatPrice(car.price)}
                    </strong>
                  </div>

                  <button
                    type="button"
                    className="used-details-button"
                    onClick={() => openDetails(car)}
                  >
                    View Details
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

        {filteredCars.length === 0 && (
          <div className="used-empty">
            <h3>No matching cars found</h3>
            <p>Try changing your search, budget or fuel filters.</p>

            <button
              type="button"
              onClick={() => {
                setSearch("");
                setFuel("All");
                setMaxBudget("all");
                setSort("featured");
              }}
            >
              Clear Filters
            </button>
          </div>
        )}
      </section>

      {/* Details popup */}
      {selectedCar && (
        <div
          className="used-modal-overlay"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              closeDetails();
            }
          }}
        >
          <section
            className="used-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="used-modal-title"
          >
            <div className="used-modal-header">
              <div>
                <span className="used-eyebrow">VEHICLE DETAILS</span>
                <h2 id="used-modal-title">
                  {selectedCar.name}
                </h2>
              </div>

              <button
                type="button"
                className="used-modal-close"
                onClick={closeDetails}
                aria-label="Close vehicle details"
              >
                &times;
              </button>
            </div>

            <div className="used-modal-body">
              <div className="used-modal-car">
                <div className="used-modal-image-wrap">
                  <img
                    src={selectedCar.image}
                    alt={selectedCar.name}
                    onError={(event) => {
                      event.currentTarget.style.display = "none";
                      event.currentTarget.nextElementSibling.style.display =
                        "flex";
                    }}
                  />

                  <div className="used-image-fallback" aria-hidden="true">
                    <span>RAHUL MOTORS</span>
                    <strong>{selectedCar.name}</strong>
                    <small>CAR IMAGE</small>
                  </div>
                </div>

                <div className="used-modal-price">
                  <span>Asking Price</span>
                  <strong>{formatPrice(selectedCar.price)}</strong>
                </div>

                <p className="used-modal-description">
                  {selectedCar.description}
                </p>

                <div className="used-detail-grid">
                  <div>
                    <span>Model Year</span>
                    <strong>{selectedCar.year}</strong>
                  </div>

                  <div>
                    <span>Kilometres Driven</span>
                    <strong>
                      {selectedCar.km.toLocaleString("en-IN")} km
                    </strong>
                  </div>

                  <div>
                    <span>Fuel Type</span>
                    <strong>{selectedCar.fuel}</strong>
                  </div>

                  <div>
                    <span>Transmission</span>
                    <strong>{selectedCar.transmission}</strong>
                  </div>

                  <div>
                    <span>Previous Owners</span>
                    <strong>{selectedCar.owners}</strong>
                  </div>

                  <div>
                    <span>Variant</span>
                    <strong>{selectedCar.variant}</strong>
                  </div>
                </div>

                <h3 className="used-features-title">
                  Features
                </h3>

                <div className="used-feature-list">
                  {selectedCar.features.map((feature) => (
                    <span key={feature}>
                      {feature}
                    </span>
                  ))}
                </div>

                <p className="used-disclaimer">
                  Vehicle details and asking price must be verified
                  with Rahul Motors. Availability is subject to confirmation.
                </p>
              </div>

              {/* Enquiry form */}
              <div className="used-enquiry-panel">
                <span className="used-eyebrow">INTERESTED?</span>
                <h3>Enquire About This Car</h3>

                <p>
                  Share your details to prepare an enquiry for
                  Rahul Motors.
                </p>

                <form
                  className="used-enquiry-form"
                  onSubmit={handleEnquirySubmit}
                >
                  <label>
                    Your Name
                    <input
                      type="text"
                      name="name"
                      value={customer.name}
                      onChange={handleCustomerChange}
                      placeholder="Enter your full name"
                      required
                    />
                  </label>

                  <label>
                    Mobile Number
                    <input
                      type="tel"
                      name="mobile"
                      value={customer.mobile}
                      onChange={handleCustomerChange}
                      placeholder="10-digit mobile number"
                      inputMode="numeric"
                      maxLength={10}
                      required
                    />
                  </label>

                  <label>
                    Message (Optional)
                    <textarea
                      name="message"
                      value={customer.message}
                      onChange={handleCustomerChange}
                      placeholder="Ask about price, condition or a test drive..."
                      rows={4}
                    />
                  </label>

                  {formError && (
                    <p className="used-form-error" role="alert">
                      {formError}
                    </p>
                  )}

                  {formMessage && (
                    <p className="used-form-success" role="status">
                      {formMessage}
                    </p>
                  )}

                  <button
                    type="submit"
                    className="used-submit-button"
                  >
                    Submit Enquiry
                  </button>

                  <p className="used-form-note">
                    Demo form only. Your details are not sent or
                    stored until a backend is connected.
                  </p>
                </form>
              </div>
            </div>
          </section>
        </div>
      )}
    </main>
  );
}

export default UsedCars;
