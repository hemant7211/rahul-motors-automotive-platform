
import { useMemo, useState } from "react";
import "./Modification.css";

// ----------------------------------------
// 1. MODIFICATION ACCESSORIES
// ----------------------------------------
const accessories = [
  {
    id: 1,
    name: "Ambient Lighting Kit",
    category: "Interior",
    price: 2499,
    oldPrice: 3299,
    labour: 500,
    image:
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=700&q=80",
    description: "Premium cabin lighting",
    cars: ["Hatchback", "Sedan", "SUV"],
  },
  {
    id: 2,
    name: "Touchscreen Infotainment",
    category: "Interior",
    price: 8499,
    oldPrice: 9999,
    labour: 1000,
    image:
      "https://images.unsplash.com/photo-1493238792000-8113da705763?auto=format&fit=crop&w=700&q=80",
    description: "Upgrade your dashboard",
    cars: ["Hatchback", "Sedan", "SUV"],
  },
  {
    id: 3,
    name: "Premium Seat Covers",
    category: "Interior",
    price: 3999,
    oldPrice: 4999,
    labour: 700,
    image:
      "https://images.unsplash.com/photo-1504215680853-026ed2a45def?auto=format&fit=crop&w=700&q=80",
    description: "Comfort and fresh styling",
    cars: ["Hatchback", "Sedan", "SUV", "Luxury"],
  },
  {
    id: 4,
    name: "LED Headlight Upgrade",
    category: "Lighting",
    price: 2999,
    oldPrice: 3999,
    labour: 600,
    image:
      "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=700&q=80",
    description: "Modern lighting upgrade",
    cars: ["Hatchback", "Sedan", "SUV"],
  },
  {
    id: 5,
    name: "Sport Alloy Wheels",
    category: "Exterior",
    price: 18999,
    oldPrice: 22999,
    labour: 1200,
    image:
      "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?auto=format&fit=crop&w=700&q=80",
    description: "Sporty exterior appearance",
    cars: ["Hatchback", "Sedan", "SUV", "Luxury"],
  },
  {
    id: 6,
    name: "Rear Spoiler",
    category: "Exterior",
    price: 3499,
    oldPrice: 4499,
    labour: 800,
    image:
      "https://images.unsplash.com/photo-1507136566006-cfc505b114fc?auto=format&fit=crop&w=700&q=80",
    description: "A sport-inspired finish",
    cars: ["Hatchback", "Sedan"],
  },
  {
    id: 7,
    name: "Door Visor Set",
    category: "Exterior",
    price: 1199,
    oldPrice: 1599,
    labour: 300,
    image:
      "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=700&q=80",
    description: "Practical exterior accessory",
    cars: ["Hatchback", "Sedan", "SUV"],
  },
  {
    id: 8,
    name: "Premium Car Horn",
    category: "Utility",
    price: 999,
    oldPrice: 1299,
    labour: 250,
    image:
      "https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&w=700&q=80",
    description: "Replacement horn upgrade",
    cars: ["Hatchback", "Sedan", "SUV"],
  },
];

// ----------------------------------------
// 2. READY-MADE PACKAGES
// Prices are demo prices. Replace with actual
// workshop prices before accepting orders.
// ----------------------------------------
const packages = [
  {
    id: "street",
    number: "01",
    name: "Street Style",
    tagline: "A fresh look for everyday driving.",
    price: 4999,
    labour: 1000,
    image:
      "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=900&q=80",
    items: [
      "Door visor set",
      "Exterior styling inspection",
      "Basic fitment",
    ],
    popular: false,
  },
  {
    id: "interior",
    number: "02",
    name: "Interior Luxe",
    tagline: "Refresh your cabin experience.",
    price: 7999,
    labour: 1500,
    image:
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=900&q=80",
    items: [
      "Ambient lighting kit",
      "Interior styling",
      "Installation and testing",
    ],
    popular: true,
  },
  {
    id: "sport",
    number: "03",
    name: "Sport Edition",
    tagline: "Give your car a sportier identity.",
    price: 12999,
    labour: 2200,
    image:
      "https://images.unsplash.com/photo-1507136566006-cfc505b114fc?auto=format&fit=crop&w=900&q=80",
    items: [
      "Exterior styling accessories",
      "Sport-inspired upgrades",
      "Installation and inspection",
    ],
    popular: false,
  },
  {
    id: "tech",
    number: "04",
    name: "Tech Upgrade",
    tagline: "Modern convenience for every drive.",
    price: 9999,
    labour: 1500,
    image:
      "https://images.unsplash.com/photo-1493238792000-8113da705763?auto=format&fit=crop&w=900&q=80",
    items: [
      "Infotainment upgrade allowance",
      "Fitment and wiring check",
      "System testing",
    ],
    popular: false,
  },
  {
    id: "signature",
    number: "05",
    name: "Signature Build",
    tagline: "A complete, personalized makeover.",
    price: 24999,
    labour: 4000,
    image:
      "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?auto=format&fit=crop&w=900&q=80",
    items: [
      "Selected styling upgrades",
      "Interior or exterior enhancement",
      "Installation and final inspection",
    ],
    popular: false,
  },
];

const money = (amount) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);

// ========================================
// MAIN MODIFICATION PAGE
// ========================================
export default function Modification() {
  const [selectedCar, setSelectedCar] = useState("Hatchback");
  const [selectedItems, setSelectedItems] = useState([]);
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [notice, setNotice] = useState("");
  const [openFaq, setOpenFaq] = useState(0);

  const categories = [
    "All",
    "Interior",
    "Exterior",
    "Lighting",
    "Utility",
  ];

  // Filter accessories by search and category.
  const filteredAccessories = useMemo(() => {
    return accessories.filter((item) => {
      const matchesSearch =
        item.name.toLowerCase().includes(search.toLowerCase()) ||
        item.description.toLowerCase().includes(search.toLowerCase());

      const matchesCategory =
        activeCategory === "All" ||
        item.category === activeCategory;

      return matchesSearch && matchesCategory;
    });
  }, [search, activeCategory]);

  // Only show accessories compatible with the selected car.
  const compatibleAccessories = accessories.filter((item) =>
    item.cars.includes(selectedCar)
  );

  // Calculate custom package total.
  const selectedProducts = accessories.filter((item) =>
    selectedItems.includes(item.id)
  );

  const partsTotal = selectedProducts.reduce(
    (total, item) => total + item.price,
    0
  );

  const labourTotal = selectedProducts.reduce(
    (total, item) => total + item.labour,
    0
  );

  const customTotal = partsTotal + labourTotal;

  const toggleCustomItem = (item) => {
    setSelectedItems((previous) =>
      previous.includes(item.id)
        ? previous.filter((id) => id !== item.id)
        : [...previous, item.id]
    );
    setNotice("");
  };

  // Demo action: real checkout/cart integration comes later.
  const handleBuyNow = (item) => {
    setNotice(
      `${item.name} — ${money(item.price)}. Connect this action to your checkout to accept orders.`
    );
  };

  const handlePackage = (item) => {
    setNotice(
      `${item.name}: Parts ${money(item.price)} + Labour ${money(item.labour)} = ${money(item.price + item.labour)}. Checkout integration is pending.`
    );
  };

  const handleCustomPackage = () => {
    if (selectedItems.length === 0) {
      setNotice("Please select at least one compatible accessory.");
      return;
    }

    setNotice(
      `Custom build for ${selectedCar}: ${selectedItems.length} items. Parts ${money(partsTotal)} + Labour ${money(labourTotal)} = ${money(customTotal)}. Cart integration is pending.`
    );
  };

  return (
    <main className="mod-page">
      {/* 1. CINEMATIC HERO */}
      <section className="mod-hero">
        <div className="mod-hero-overlay" />

        <div className="mod-hero-content">
          <p className="mod-eyebrow">
            GLS GROUP PRESENTS · RAHUL MOTORS
          </p>

          <h1>
            REDEFINE
            <br />
            YOUR <span>RIDE.</span>
          </h1>

          <p className="mod-hero-description">
            Your vision. Your style. Your build.
            Upgrade your car with personalized
            automotive modifications.
          </p>

          <div className="mod-hero-actions">
            <a href="#mod-packages" className="mod-btn mod-btn-primary">
              Explore Packages <span>↗</span>
            </a>

            <a href="#design-car" className="mod-btn mod-btn-outline">
              Design Your Own
            </a>
          </div>

          <div className="mod-hero-meta">
            <span>01 / PERSONALIZED BUILDS</span>
            <span>EST. RAHUL MOTORS</span>
          </div>
        </div>

        <div className="mod-hero-side-label">
          CUSTOMIZATION STUDIO
        </div>
      </section>

      {/* 2. READY-MADE PACKAGES */}
      <section className="mod-section" id="mod-packages">
        <div className="mod-section-heading">
          <div>
            <p className="mod-eyebrow">CURATED FOR YOUR DRIVE</p>
            <h2>
              Modification <span>Packages.</span>
            </h2>
          </div>

          <p className="mod-section-description">
            Ready-made upgrades with transparent parts
            and labour breakdowns.
          </p>
        </div>

        <div className="mod-package-grid">
          {packages.map((item) => (
            <article className="mod-package-card" key={item.id}>
              <div className="mod-package-image">
                <img src={item.image} alt={item.name} loading="lazy" />

                <span className="mod-package-number">
                  {item.number}
                </span>

                {item.popular && (
                  <span className="mod-popular-label">
                    POPULAR
                  </span>
                )}
              </div>

              <div className="mod-package-body">
                <p className="mod-card-kicker">MODIFICATION PACKAGE</p>

                <h3>{item.name}</h3>
                <p className="mod-card-description">{item.tagline}</p>

                <ul className="mod-package-features">
                  {item.items.map((feature) => (
                    <li key={feature}>
                      <span>✓</span> {feature}
                    </li>
                  ))}
                </ul>

                <div className="mod-price-breakdown">
                  <div>
                    <span>Parts</span>
                    <strong>{money(item.price)}</strong>
                  </div>

                  <div>
                    <span>Labour</span>
                    <strong>{money(item.labour)}</strong>
                  </div>
                </div>

                <div className="mod-package-total">
                  <span>Package total</span>
                  <strong>{money(item.price + item.labour)}</strong>
                </div>

                <button
                  type="button"
                  className="mod-btn mod-btn-primary mod-full-btn"
                  onClick={() => handlePackage(item)}
                >
                  Select Package <span>↗</span>
                </button>
              </div>
            </article>
          ))}
        </div>

        <p className="mod-demo-note">
          Package names, inclusions and prices are sample data.
          Confirm actual workshop prices before accepting bookings.
        </p>
      </section>

      {/* 3. DESIGN YOUR OWN CAR */}
      <section className="mod-builder-section" id="design-car">
        <div className="mod-builder-intro">
          <p className="mod-eyebrow">MADE FOR YOUR TASTE</p>

          <h2>
            Design Your
            <br />
            <span>Own Car.</span>
          </h2>

          <p>
            Pick your car, select compatible accessories
            and build a custom package that matches your style.
          </p>

          <div className="mod-builder-benefit">
            <span>01</span> Choose your vehicle
          </div>
          <div className="mod-builder-benefit">
            <span>02</span> Add your upgrades
          </div>
          <div className="mod-builder-benefit">
            <span>03</span> Review parts and labour
          </div>
        </div>

        <div className="mod-builder-panel">
          <div className="mod-builder-panel-header">
            <div>
              <p className="mod-card-kicker">CUSTOM CONFIGURATOR</p>
              <h3>Build Summary</h3>
            </div>

            <span className="mod-builder-step">STEP 01 — 03</span>
          </div>

          <label className="mod-field-label" htmlFor="mod-car-select">
            Select your car type
          </label>

          <select
            id="mod-car-select"
            className="mod-car-select"
            value={selectedCar}
            onChange={(event) => {
              setSelectedCar(event.target.value);
              setSelectedItems([]);
              setNotice("");
            }}
          >
            <option value="Hatchback">Hatchback</option>
            <option value="Sedan">Sedan</option>
            <option value="SUV">SUV</option>
            <option value="Luxury">Luxury car</option>
          </select>

          <div className="mod-builder-items-heading">
            <div>
              <h4>Choose your upgrades</h4>
              <p>Select one or more accessories.</p>
            </div>

            <span>{selectedItems.length} selected</span>
          </div>

          <div className="mod-builder-items">
            {compatibleAccessories.map((item) => {
              const isSelected = selectedItems.includes(item.id);

              return (
                <label
                  className={`mod-builder-item ${isSelected ? "is-selected" : ""}`}
                  key={item.id}
                >
                  <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={() => toggleCustomItem(item)}
                  />

                  <span className="mod-custom-checkbox">
                    {isSelected ? "✓" : "+"}
                  </span>

                  <span className="mod-builder-item-info">
                    <strong>{item.name}</strong>
                    <small>
                      Parts {money(item.price)} + Labour{" "}
                      {money(item.labour)}
                    </small>
                  </span>

                  <span className="mod-builder-item-price">
                    {money(item.price + item.labour)}
                  </span>
                </label>
              );
            })}
          </div>

          <div className="mod-builder-summary">
            <div>
              <span>Selected parts</span>
              <strong>{money(partsTotal)}</strong>
            </div>

            <div>
              <span>Installation labour</span>
              <strong>{money(labourTotal)}</strong>
            </div>

            <div className="mod-builder-grand-total">
              <span>Estimated total</span>
              <strong>{money(customTotal)}</strong>
            </div>

            <button
              type="button"
              className="mod-btn mod-btn-primary mod-full-btn"
              onClick={handleCustomPackage}
            >
              Add Custom Package to Cart <span>↗</span>
            </button>

            <p>
              Final fitment and compatibility must be confirmed
              by Rahul Motors before installation.
            </p>
          </div>
        </div>
      </section>

      {/* 4. INDIVIDUAL ACCESSORIES */}
      <section className="mod-section mod-accessories-section" id="mod-accessories">
        <div className="mod-section-heading">
          <div>
            <p className="mod-eyebrow">UPGRADE YOUR WAY</p>
            <h2>
              Modification <span>Accessories.</span>
            </h2>
          </div>

          <p className="mod-section-description">
            Shop individual accessories or add them to your
            custom build for installation.
          </p>
        </div>

        <div className="mod-catalog-controls">
          <div className="mod-search-box">
            <span>⌕</span>
            <input
              type="search"
              placeholder="Search modification accessories..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              aria-label="Search modification accessories"
            />
          </div>

          <div className="mod-category-filters">
            {categories.map((category) => (
              <button
                type="button"
                key={category}
                className={
                  activeCategory === category ? "active" : ""
                }
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {filteredAccessories.length > 0 ? (
          <div className="mod-accessory-grid">
            {filteredAccessories.map((item) => {
              const discount = Math.round(
                ((item.oldPrice - item.price) / item.oldPrice) * 100
              );

              return (
                <article className="mod-accessory-card" key={item.id}>
                  <div className="mod-accessory-image">
                    <img
                      src={item.image}
                      alt={item.name}
                      loading="lazy"
                    />

                    <span className="mod-discount-badge">
                      {discount}% OFF
                    </span>
                  </div>

                  <div className="mod-accessory-body">
                    <span className="mod-accessory-category">
                      {item.category}
                    </span>

                    <h3>{item.name}</h3>
                    <p>{item.description}</p>

                    <div className="mod-accessory-price">
                      <strong>{money(item.price)}</strong>
                      <del>{money(item.oldPrice)}</del>
                    </div>

                    <div className="mod-accessory-actions">
                      <button
                        type="button"
                        className="mod-btn mod-btn-primary"
                        onClick={() => handleBuyNow(item)}
                      >
                        Buy Now
                      </button>

                      <button
                        type="button"
                        className="mod-btn mod-btn-outline"
                        onClick={() => {
                          if (!item.cars.includes(selectedCar)) {
                            setSelectedCar(item.cars[0]);
                            setSelectedItems((previous) =>
                              previous.includes(item.id)
                                ? previous
                                : [...previous, item.id]
                            );
                          } else {
                            setSelectedItems((previous) =>
                              previous.includes(item.id)
                                ? previous
                                : [...previous, item.id]
                            );
                          }

                          setNotice(
                            `${item.name} added to your custom build. Review the Design Your Own Car section for parts and labour totals.`
                          );

                          document
                            .getElementById("design-car")
                            ?.scrollIntoView({ behavior: "smooth" });
                        }}
                      >
                        + Custom Package
                      </button>
                    </div>

                    <p className="mod-install-note">
                      Labour for installation: {money(item.labour)}
                    </p>
                  </div>
                </article>
              );
            })}
          </div>
        ) : (
          <div className="mod-empty-state">
            <h3>No accessories found</h3>
            <p>Try another search or choose a different category.</p>
          </div>
        )}
      </section>

      {/* 5. FINAL CTA */}
      <section className="mod-final-cta">
        <p className="mod-eyebrow">YOUR VISION. OUR WORKSHOP.</p>

        <h2>
          LET'S MODIFY
          <br />
          YOUR <span>RIDE.</span>
        </h2>

        <a href="#mod-packages" className="mod-btn mod-btn-primary">
          Explore Packages <span>↗</span>
        </a>
      </section>
       
      {/* 6. FREQUENTLY ASKED QUESTIONS */}
      <section className="mod-faq-section" id="mod-faq">
        <div className="mod-faq-heading">
          <p className="mod-eyebrow">GOT QUESTIONS? WE HAVE ANSWERS.</p>

          <h2>
            Frequently Asked <span>Questions.</span>
          </h2>

          <p>
            Everything you need to know before upgrading your ride
            with Rahul Motors.
          </p>
        </div>

        <div className="mod-faq-list">
          {[
            {
              question: "How much does car modification cost?",
              answer:
                "Car modification costs depend on the accessories, car model and installation work. Choose a ready-made package or create your own design. The final estimate will be confirmed by Rahul Motors."
            },
            {
              question: "Can I customize my car according to my own design?",
              answer:
                "Yes! Select your car type, choose compatible accessories and add them to your custom package. Review the parts and labour estimate, then contact Rahul Motors to discuss your design."
            },
            {
              question: "Are all modification accessories compatible with my car?",
              answer:
                "No, compatibility varies by vehicle. Our listed accessories include supported car types. Please confirm the exact make, model and variant with Rahul Motors before installation."
            },
            {
              question: "Do modification package prices include labour charges?",
              answer:
                "The displayed package total includes the listed parts price and labour charges. For a custom package, the parts and installation labour are calculated separately and added together."
            },
            {
              question: "Can I buy an individual modification accessory?",
              answer:
                "Yes. Use Buy Now on an individual accessory or choose Custom Package to add it to your own design. Online checkout integration is not yet connected, so orders need to be confirmed with Rahul Motors."
            },
            {
              question: "How do I enquire about my custom modification?",
              answer:
                "Choose your vehicle and preferred accessories, then review your estimated total. Contact Rahul Motors with your selected items to confirm compatibility, availability, final pricing and installation details. A direct enquiry form can be connected separately."
            },
            {
              question: "How long does car modification take?",
              answer:
                "Installation time depends on the selected accessories, the vehicle and the work involved. Rahul Motors can confirm the expected completion time after reviewing your requirements."
            },
            {
              question: "Can I request a modification that is not listed?",
              answer:
                "Yes. Contact Rahul Motors with your vehicle details and the modification you have in mind. The workshop can review feasibility, compatibility and the estimated cost."
            }
          ].map((faq, index) => (
            <article
              className={`mod-faq-item ${
                openFaq === index ? "is-open" : ""
              }`}
              key={faq.question}
            >
              <button
                type="button"
                className="mod-faq-question"
                onClick={() =>
                  setOpenFaq(openFaq === index ? -1 : index)
                }
                aria-expanded={openFaq === index}
              >
                <span className="mod-faq-number">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <span className="mod-faq-question-text">
                  {faq.question}
                </span>

                <span className="mod-faq-icon" aria-hidden="true">
                  {openFaq === index ? "⌃" : "⌄"}
                </span>
              </button>

              {openFaq === index && (
                <div className="mod-faq-answer">
                  <p>{faq.answer}</p>
                </div>
              )}
            </article>
          ))}
        </div>

        <div className="mod-faq-footer">
          <p>Still have questions about your build?</p>

          <a
            href="#design-car"
            className="mod-btn mod-btn-primary"
          >
            Design Your Own <span>↗</span>
          </a>
        </div>
      </section>

      {/* DEMO ACTION FEEDBACK */}
      {notice && (
        <div className="mod-notice" role="status">
          <p>{notice}</p>
          <button
            type="button"
            onClick={() => setNotice("")}
            aria-label="Close notification"
          >
            ×
          </button>
        </div>
      )}
    </main>
  );
}
