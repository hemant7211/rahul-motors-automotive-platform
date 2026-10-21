
import { useMemo, useState } from "react";
import "./RentalCars.css";

const cars = [
  {
    id: 1,
    name: "Maruti Swift",
    category: "Hatchback",
    fuel: "Petrol",
    price: 1800,
    seats: 5,
    image: "/rental/swift.webp",
  },
  {
    id: 2,
    name: "Honda City",
    category: "Sedan",
    fuel: "Petrol",
    price: 2800,
    seats: 5,
    image: "/rental/honda-city.webp",
  },
  {
    id: 3,
    name: "Hyundai Creta",
    category: "SUV",
    fuel: "Diesel",
    price: 3200,
    seats: 5,
    image: "/rental/creta.webp",
  },
  {
    id: 4,
    name: "Toyota Innova Crysta",
    category: "MUV",
    fuel: "Diesel",
    price: 3500,
    seats: 7,
    image: "/rental/innova.webp",
  },
  {
    id: 5,
    name: "Toyota Fortuner",
    category: "Luxury",
    fuel: "Diesel",
    price: 6500,
    seats: 7,
    image: "/rental/fortuner.webp",
  },
];

const categories = [
  "All",
  "Hatchback",
  "Sedan",
  "SUV",
  "MUV",
  "Luxury",
];

function getToday() {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function calculateDays(pickupDate, returnDate) {
  if (!pickupDate || !returnDate) return 0;

  const pickup = new Date(`${pickupDate}T00:00:00`);
  const returning = new Date(`${returnDate}T00:00:00`);

  const difference = returning.getTime() - pickup.getTime();

  if (difference <= 0) return 0;

  return Math.ceil(difference / (1000 * 60 * 60 * 24));
}

function formatPrice(price) {
  return `₹${price.toLocaleString("en-IN")}`;
}

function RentalCars() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("default");

  const [selectedCar, setSelectedCar] = useState(null);
  const [bookingMessage, setBookingMessage] = useState("");
  const [error, setError] = useState("");

  const [customer, setCustomer] = useState({
    name: "",
    mobile: "",
    pickupDate: "",
    returnDate: "",
    location: "",
  });

  const today = getToday();

  // Rental days automatically calculate honge.
  const rentalDays = useMemo(
    () =>
      calculateDays(
        customer.pickupDate,
        customer.returnDate
      ),
    [customer.pickupDate, customer.returnDate]
  );

  // Selected car ki daily rate ke according total calculate hoga.
  const estimatedTotal = selectedCar
    ? rentalDays * selectedCar.price
    : 0;

  // Search, category filter aur sorting.
  const filteredCars = useMemo(() => {
    let result = cars.filter((car) => {
      const matchesSearch =
        car.name.toLowerCase().includes(search.toLowerCase()) ||
        car.category.toLowerCase().includes(search.toLowerCase()) ||
        car.fuel.toLowerCase().includes(search.toLowerCase());

      const matchesCategory =
        category === "All" || car.category === category;

      return matchesSearch && matchesCategory;
    });

    if (sort === "low-high") {
      result.sort((a, b) => a.price - b.price);
    }

    if (sort === "high-low") {
      result.sort((a, b) => b.price - a.price);
    }

    return result;
  }, [search, category, sort]);

  function openBooking(car) {
    setSelectedCar(car);
    setBookingMessage("");
    setError("");

    setCustomer({
      name: "",
      mobile: "",
      pickupDate: "",
      returnDate: "",
      location: "",
    });
  }

  function closeBooking() {
    setSelectedCar(null);
    setBookingMessage("");
    setError("");
  }

  function handleCustomerChange(event) {
    const { name, value } = event.target;

    setCustomer((previous) => {
      const updated = {
        ...previous,
        [name]: value,
      };

      // Return date pickup date se pehle ho toh clear kar do.
      if (
        name === "pickupDate" &&
        updated.returnDate &&
        updated.returnDate <= value
      ) {
        updated.returnDate = "";
      }

      return updated;
    });

    setError("");
    setBookingMessage("");
  }

  function handleBookingSubmit(event) {
    event.preventDefault();
    setError("");
    setBookingMessage("");

    if (!selectedCar) return;

    if (!/^[6-9]\d{9}$/.test(customer.mobile)) {
      setError("Please enter a valid 10-digit mobile number.");
      return;
    }

    if (!customer.pickupDate || !customer.returnDate) {
      setError("Please select pickup and return dates.");
      return;
    }

    if (customer.pickupDate < today) {
      setError("Pickup date cannot be in the past.");
      return;
    }

    if (customer.returnDate <= customer.pickupDate) {
      setError("Return date must be after pickup date.");
      return;
    }

    if (!customer.name.trim() || !customer.location.trim()) {
      setError("Please enter your name and pickup location.");
      return;
    }

    // Abhi frontend demo hai; backend booking save nahi hoti.
    setBookingMessage(
      `Demo request ready! ${selectedCar.name} for ${rentalDays} days. Estimated total: ${formatPrice(estimatedTotal)}. Final charges and availability will be confirmed by Rahul Motors.`
    );
  }

  return (
    <main className="rental-page">
      {/* Hero section */}
      <section className="rental-hero">
        <img
          className="rental-hero-image"
          src="/rental/hero-car.webp"
          alt="Rental car"
        />

        <div className="rental-hero-overlay" />

        <div className="rental-hero-content">
          <span className="rental-eyebrow">
            RAHUL MOTORS BY GLS GROUP
          </span>

          <h1>
            Find the Right Car
            <br />
            for Your <span>Next Journey.</span>
          </h1>

          <p>
            Comfortable rides, flexible rental options and
            cars for every journey.
          </p>

          <a href="#rental-list" className="rental-hero-button">
            Explore Rental Cars
          </a>
        </div>
      </section>

      {/* Car listing section */}
      <section className="rental-list-section" id="rental-list">
        <div className="rental-section-heading">
          <div>
            <span className="rental-eyebrow">OUR FLEET</span>
            <h2>Choose Your Ride</h2>
            <p>
              Select a car and submit a rental enquiry.
            </p>
          </div>

          <span className="rental-car-count">
            {filteredCars.length} Cars
          </span>
        </div>

        {/* Search and sort */}
        <div className="rental-toolbar">
          <input
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search car, category or fuel..."
            aria-label="Search rental cars"
          />

          <select
            value={sort}
            onChange={(event) => setSort(event.target.value)}
            aria-label="Sort rental cars by price"
          >
            <option value="default">Sort by: Default</option>
            <option value="low-high">Price: Low to High</option>
            <option value="high-low">Price: High to Low</option>
          </select>
        </div>

        {/* Category filters */}
        <div className="rental-categories">
          {categories.map((item) => (
            <button
              key={item}
              type="button"
              className={
                category === item
                  ? "rental-category active"
                  : "rental-category"
              }
              onClick={() => setCategory(item)}
            >
              {item}
            </button>
          ))}
        </div>

        {/* Car cards */}
        <div className="rental-car-grid">
          {filteredCars.map((car) => (
            <article className="rental-car-card" key={car.id}>
              <div className="rental-car-image-wrap">
                <img
                  src={car.image}
                  alt={car.name}
                  className="rental-car-image"
                  loading="lazy"
                />

                <span className="rental-car-category">
                  {car.category}
                </span>
              </div>

              <div className="rental-car-info">
                <h3>{car.name}</h3>

                <div className="rental-car-specs">
                  <span>{car.seats} Seats</span>
                  <span>{car.fuel}</span>
                </div>

                <div className="rental-card-bottom">
                  <div>
                    <strong>{formatPrice(car.price)}</strong>
                    <span className="rental-per-day"> / day</span>
                  </div>

                  <button
                    type="button"
                    className="rental-book-button"
                    onClick={() => openBooking(car)}
                  >
                    Book Now
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

        {filteredCars.length === 0 && (
          <div className="rental-empty">
            <h3>No cars found</h3>
            <p>Try another search or category.</p>
          </div>
        )}
      </section>

      {/* Booking drawer */}
      {selectedCar && (
        <div
          className="rental-drawer-overlay"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              closeBooking();
            }
          }}
        >
          <aside
            className="rental-drawer"
            role="dialog"
            aria-modal="true"
            aria-labelledby="rental-drawer-title"
          >
            <div className="rental-drawer-header">
              <div>
                <span className="rental-eyebrow">RENTAL ENQUIRY</span>
                <h2 id="rental-drawer-title">Book Your Car</h2>
              </div>

              <button
                type="button"
                className="rental-close-button"
                onClick={closeBooking}
                aria-label="Close booking form"
              >
                &times;
              </button>
            </div>

            <div className="rental-selected-car">
              <img src={selectedCar.image} alt={selectedCar.name} />

              <div>
                <h3>{selectedCar.name}</h3>
                <p>
                  {selectedCar.category} · {selectedCar.fuel}
                </p>
                <strong>
                  {formatPrice(selectedCar.price)} / day
                </strong>
              </div>
            </div>

            <form
              className="rental-booking-form"
              onSubmit={handleBookingSubmit}
            >
              <label>
                Full Name
                <input
                  type="text"
                  name="name"
                  value={customer.name}
                  onChange={handleCustomerChange}
                  placeholder="Enter your name"
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

              <div className="rental-date-grid">
                <label>
                  Pickup Date
                  <input
                    type="date"
                    name="pickupDate"
                    value={customer.pickupDate}
                    min={today}
                    onChange={handleCustomerChange}
                    required
                  />
                </label>

                <label>
                  Return Date
                  <input
                    type="date"
                    name="returnDate"
                    value={customer.returnDate}
                    min={customer.pickupDate || today}
                    onChange={handleCustomerChange}
                    required
                  />
                </label>
              </div>

              {/* Automatically updating rental price */}
              <div className="rental-price-summary">
                <div>
                  <span>Price Per Day</span>
                  <strong>
                    {formatPrice(selectedCar.price)}
                  </strong>
                </div>

                <div>
                  <span>Rental Duration</span>
                  <strong>
                    {rentalDays > 0
                      ? `${rentalDays} ${rentalDays === 1 ? "Day" : "Days"}`
                      : "Select dates"}
                  </strong>
                </div>

                <div className="rental-total">
                  <span>Estimated Total</span>
                  <strong>
                    {formatPrice(estimatedTotal)}
                  </strong>
                </div>

                <p>
                  Estimated base rental only. Additional charges,
                  if applicable, will be confirmed by Rahul Motors.
                </p>
              </div>

              <label>
                Pickup Location
                <input
                  type="text"
                  name="location"
                  value={customer.location}
                  onChange={handleCustomerChange}
                  placeholder="Enter pickup location"
                  required
                />
              </label>

              {error && (
                <p className="rental-form-message error" role="alert">
                  {error}
                </p>
              )}

              {bookingMessage && (
                <p
                  className="rental-form-message success"
                  role="status"
                >
                  {bookingMessage}
                </p>
              )}

              <button
                type="submit"
                className="rental-submit-button"
                disabled={rentalDays <= 0}
              >
                Submit Rental Enquiry
              </button>

              <p className="rental-form-note">
                This is a demo enquiry. Your booking is not
                confirmed until Rahul Motors confirms availability.
              </p>
            </form>
          </aside>
        </div>
      )}
    </main>
  );
}

export default RentalCars;
