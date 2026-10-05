import React, { useState } from "react";
import {
  ArrowRight,
  CalendarDays,
  CarFront,
  CheckCircle2,
  Clock3,
  Disc3,
  Droplets,
  Hand,
  Leaf,
  ShieldCheck,
  Sparkles,
  SprayCan,
  Users,
  Wind,
} from "lucide-react";

import "./Washing.css";

// =========================
// SERVICE DATA
// =========================

const washingServices = [
  {
    id: "exterior",
    title: "Exterior Washing",
    icon: CarFront,
    shortDescription:
      "Removes dust, dirt and road grime for a fresh, clean look.",
    description:
      "We thoroughly clean your car's exterior to remove dust, dirt, mud and road grime. Our team uses safe washing techniques and quality products to maintain your car's paint and finish.",
    image: "/wash/exterior.jpeg",
    included: [
      "Pressure Wash",
      "Foam Wash",
      "Hand Washing",
      "Wheel & Tyre Cleaning",
      "Exterior Drying",
      "Glass Cleaning",
    ],
  },

  {
    id: "interior",
    title: "Interior Cleaning",
    icon: SprayCan,
    shortDescription:
      "Deep cleaning for a fresh, hygienic and comfortable cabin.",
    description:
      "Give your car's cabin a fresh feel with detailed interior cleaning. We clean the dashboard, seats, floor, mats and other accessible interior areas.",
    image: "/wash/interior.jpeg",
    included: [
      "Vacuum Cleaning",
      "Dashboard Cleaning",
      "Seat Cleaning",
      "Floor & Mat Cleaning",
      "Door Panel Cleaning",
      "Interior Dust Removal",
    ],
  },

  {
    id: "foam",
    title: "Foam Wash",
    icon: Droplets,
    shortDescription:
      "Gentle yet effective foam cleaning for a spotless finish.",
    description:
      "Our foam wash helps loosen dirt and grime before the main cleaning process, reducing the need for harsh rubbing on the vehicle surface.",
    image: "/wash/foam.jpeg",    
    included: [
      "Pre-Rinse",
      "Premium Foam Application",
      "Hand Cleaning",
      "Body Rinse",
      "Wheel Cleaning",
      "Final Drying",
    ],
  },

  {
    id: "pressure",
    title: "Pressure Wash",
    icon: Wind,
    shortDescription:
      "High-pressure wash for a deeper clean, even in hard-to-reach areas.",
    description:
      "Pressure washing helps remove accumulated dirt from exterior surfaces, wheel areas and other difficult-to-reach parts of the vehicle.",
    image: "/wash/pressure.jpeg",
    included: [
      "High Pressure Cleaning",
      "Wheel Area Cleaning",
      "Mud Removal",
      "Lower Body Cleaning",
      "Exterior Rinse",
      "Final Drying",
    ],
  },

  {
    id: "underbody",
    title: "Underbody Cleaning",
    icon: CarFront,
    shortDescription:
      "Removes mud, salt and buildup from underneath the chassis.",
    description:
      "Underbody cleaning removes accumulated mud, dirt and road debris from underneath your vehicle, helping keep hard-to-see areas cleaner.",
    image: "/wash/underbody.jpeg",
    included: [
      "Underbody Pressure Wash",
      "Mud Removal",
      "Chassis Area Cleaning",
      "Wheel Arch Cleaning",
      "Road Dirt Removal",
      "Final Rinse",
    ],
  },

  {
    id: "wheel",
    title: "Tyre & Wheel Care",
    icon: Disc3,
    shortDescription:
      "Cleans and shines your tyres and alloy wheels.",
    description:
      "Your wheels collect a lot of road dust and brake residue. Our wheel and tyre cleaning focuses on removing visible dirt while giving the wheels a clean finish.",
    image: "/wash/wheel.jpeg",
    included: [
      "Wheel Cleaning",
      "Tyre Cleaning",
      "Alloy Wheel Cleaning",
      "Mud Removal",
      "Tyre Dressing",
      "Final Inspection",
    ],
  },
];


// =========================
// PROCESS DATA
// =========================

const washingProcess = [
  {
    number: "01",
    title: "Pre-Rinse",
    icon: Droplets,
  },
  {
    number: "02",
    title: "Foam Application",
    icon: SprayCan,
  },
  {
    number: "03",
    title: "Hand Cleaning",
    icon: Hand,
  },
  {
    number: "04",
    title: "Wheel Cleaning",
    icon: Disc3,
  },
  {
    number: "05",
    title: "Final Rinse",
    icon: Wind,
  },
  {
    number: "06",
    title: "Dry & Finish",
    icon: Sparkles,
  },
];


// =========================
// PACKAGES
// =========================

const packages = [
  {
    name: "Basic Wash",
    subtitle: "Quick Clean. Great Look.",
    price: "₹499",
    features: [
      "Exterior Wash",
      "Pressure Wash",
      "Tyre Cleaning",
    ],
  },

  {
    name: "Premium Wash",
    subtitle: "Clean Inside. Shine Outside.",
    price: "₹899",
    popular: true,
    features: [
      "Foam Wash",
      "Interior Cleaning",
      "Vacuum Cleaning",
      "Dashboard Cleaning",
    ],
  },

  {
    name: "Complete Wash",
    subtitle: "The Ultimate Clean.",
    price: "₹1,299",
    features: [
      "Everything in Premium",
      "Underbody Cleaning",
      "Tyre & Wheel Cleaning",
      "Detailed Drying",
    ],
  },
];


// =========================
// COMPONENT
// =========================

const Washing = () => {
  const [selectedService, setSelectedService] = useState(
    washingServices[0]
  );

  const handleLearnMore = (service) => {
    setSelectedService(service);

    setTimeout(() => {
      document
        .getElementById("service-details")
        ?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
    }, 50);
  };

  return (
    <div className="washing-page">

      {/* =========================
          HERO
      ========================= */}

      <section className="washing-hero">

        <div className="washing-hero-overlay"></div>

        <div className="washing-hero-content">

          <div className="washing-hero-text">

            <span className="washing-eyebrow">
              CAR WASHING SERVICE
            </span>

            <h1>
              Premium Car
              <span> Washing Service</span>
            </h1>

            <p>
              Keep your car clean, fresh and protected with
              our professional washing and detailing services.
              Because your car deserves the best.
            </p>

            <a
              href="#washing-booking"
              className="washing-main-btn"
            >
              <CalendarDays size={17} />
              Book a Service
              <ArrowRight size={17} />
            </a>

            <div className="washing-hero-features">

              <div>
                <ShieldCheck size={19} />
                <span>Professional Care</span>
              </div>

              <div>
                <Leaf size={19} />
                <span>Eco Friendly Products</span>
              </div>

              <div>
                <Users size={19} />
                <span>Skilled Team</span>
              </div>

            </div>

          </div>

        </div>

        <img
          className="washing-hero-image"
          src="/wash/exterior.jpeg"
          alt="Professional car washing service"
        />

      </section>


      {/* =========================
          SERVICES
      ========================= */}

      <section className="washing-services section-space">

        <div className="section-heading">

          <span>OUR WASHING SERVICES</span>

          <h2>
            Complete Care for Your Car
          </h2>

          <p>
            From deep cleaning to premium detailing,
            we offer a range of washing services to
            keep your vehicle looking its best.
          </p>

        </div>


        <div className="washing-services-grid">

          {washingServices.map((service) => {

            const Icon = service.icon;

            return (
              <div
                className="washing-service-card"
                key={service.id}
              >

                <div className="washing-service-icon">
                  <Icon size={30} />
                </div>

                <div className="washing-service-content">

                  <h3>
                    {service.title}
                  </h3>

                  <p>
                    {service.shortDescription}
                  </p>

                  <button
                    onClick={() => handleLearnMore(service)}
                    className="learn-more-btn"
                  >
                    Learn More
                    <ArrowRight size={15} />
                  </button>

                </div>

              </div>
            );
          })}

        </div>

      </section>


      {/* =========================
          SERVICE DETAILS
      ========================= */}

      <section
        className="service-details"
        id="service-details"
      >

        <div className="service-details-container">

          <button
            className="back-services"
            onClick={() =>
              document
                .querySelector(".washing-services")
                ?.scrollIntoView({
                  behavior: "smooth",
                })
            }
          >
            ← Back to Services
          </button>


          <div className="service-details-grid">

            <div className="service-details-text">

              <span className="details-label">
                {selectedService.title.toUpperCase()}
              </span>

              <h2>
                Professional {selectedService.title}
              </h2>

              <p className="details-description">
                {selectedService.description}
              </p>


              <div className="included-list">

                {selectedService.included.map(
                  (item, index) => (
                    <div
                      className="included-item"
                      key={index}
                    >
                      <CheckCircle2 size={17} />
                      <span>{item}</span>
                    </div>
                  )
                )}

              </div>


              <a
                href="#washing-booking"
                className="details-book-btn"
              >
                <CalendarDays size={17} />
                Book This Service
                <ArrowRight size={17} />
              </a>

            </div>


            <div className="service-details-image">

              <img
                src={selectedService.image}
                alt={selectedService.title}
              />

            </div>

          </div>

        </div>

      </section>


      {/* =========================
          HOW IT WORKS
      ========================= */}

      <section className="washing-process section-space">

        <div className="process-heading">

          <span>HOW OUR WASHING WORKS</span>

          <h2>
            Simple Process. Professional Finish.
          </h2>

        </div>


        <div className="process-wrapper">

          {washingProcess.map((step, index) => {

            const Icon = step.icon;

            return (
              <React.Fragment key={step.number}>

                <div className="process-card">

                  <div className="process-number">
                    {step.number}
                  </div>

                  <Icon size={30} />

                  <h3>
                    {step.title}
                  </h3>

                </div>

                {index !== washingProcess.length - 1 && (
                  <ArrowRight
                    className="process-arrow"
                    size={20}
                  />
                )}

              </React.Fragment>
            );

          })}

        </div>

      </section>


      {/* =========================
          PACKAGES
      ========================= */}

      <section className="washing-packages section-space">

        <div className="section-heading">

          <span>WASHING PACKAGES</span>

          <h2>
            Choose the Right Package
          </h2>

          <p>
            Flexible options to suit your needs and budget.
          </p>

        </div>


        <div className="packages-grid">

          {packages.map((pkg) => (

            <div
              className={`package-card ${
                pkg.popular ? "popular-package" : ""
              }`}
              key={pkg.name}
            >

              {pkg.popular && (
                <div className="popular-label">
                  Most Popular
                </div>
              )}

              <h3>
                {pkg.name}
              </h3>

              <p className="package-subtitle">
                {pkg.subtitle}
              </p>

              <div className="package-price">
                {pkg.price}
              </div>


              <div className="package-features">

                {pkg.features.map(
                  (feature, index) => (

                    <div
                      className="package-feature"
                      key={index}
                    >
                      <CheckCircle2 size={16} />
                      <span>{feature}</span>
                    </div>

                  )
                )}

              </div>


              <a
                href="#washing-booking"
                className="package-btn"
              >
                Book Now
                <ArrowRight size={15} />
              </a>

            </div>

          ))}

        </div>

      </section>


      {/* =========================
          WHY CHOOSE US
      ========================= */}

      <section className="washing-why section-space">

        <div className="why-heading">

          <span>WHY CHOOSE US</span>

          <h2>
            The Rahul Motors Advantage
          </h2>

        </div>


        <div className="why-grid">

          <div className="why-item">

            <ShieldCheck />

            <h3>
              Expert Team
            </h3>

            <p>
              Skilled professionals with years
              of experience.
            </p>

          </div>


          <div className="why-item">

            <Sparkles />

            <h3>
              Quality Products
            </h3>

            <p>
              Safe and eco-friendly cleaning products.
            </p>

          </div>


          <div className="why-item">

            <Leaf />

            <h3>
              Safe & Gentle
            </h3>

            <p>
              We care for your car's paint and finish.
            </p>

          </div>


          <div className="why-item">

            <Clock3 />

            <h3>
              Quick Service
            </h3>

            <p>
              Get back on the road faster.
            </p>

          </div>

        </div>

      </section>


      {/* =========================
          CTA
      ========================= */}

      <section
        className="washing-cta"
        id="washing-booking"
      >

        <div className="cta-content">

          <div className="cta-icon">
            <CarFront size={35} />
          </div>

          <div>

            <h2>
              Ready to Refresh Your Car?
            </h2>

            <p>
              Book your car washing service today
              and experience the difference.
            </p>

          </div>

        </div>


        <a
          href="/contact"
          className="cta-btn"
        >
          <CalendarDays size={17} />
          Book a Service
          <ArrowRight size={17} />
        </a>

      </section>


      {/* =========================
          FOOTER
      ========================= */}

      <footer className="washing-footer">

        <div className="footer-brand">

          <h3>
            RAHUL <span>MOTORS</span>
          </h3>

          <p>
            Automotive Solutions
          </p>

        </div>


        <div className="footer-links">

          <a href="/">Home</a>
          <a href="/services">Services</a>
          <a href="/about">About Us</a>
          <a href="/gallery">Gallery</a>
          <a href="/contact">Contact</a>

        </div>


        <div className="footer-copy">

          © 2026 Rahul Motors. All rights reserved.

        </div>

      </footer>

    </div>
  );
};

export default Washing;