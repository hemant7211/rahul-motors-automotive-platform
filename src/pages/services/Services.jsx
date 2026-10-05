
import {
  Clock3,
  Check,
  ShieldCheck,
  Cog,
  BadgeCheck,
  CalendarDays,
  ArrowRight,
} from "lucide-react";
import "./Services.css";
import Footer from "../../components/footer/Footer";
const services = [
  {
    id: "repair",
    no: "01",
    title: "Car Repair & Maintenance",
    tags: "Engine • Brakes • AC • Electrical • Diagnostics",
    time: "2–4 Hours",
     image: "/services/washing.jpeg",
    description:
      "Complete repair and maintenance solutions to keep your vehicle safe, smooth and reliable.",
    included: [
      "Full vehicle inspection",
      "Engine service & tuning",
      "Brake check & replacement",
      "AC service & gas refill",
      "Electrical system check",
      "OBD diagnostics",
    ],
    why: [
      "Skilled technicians",
      "Genuine spare parts",
      "Modern diagnostic tools",
      "Transparent pricing",
    ],
  },

  {
    id: "painting",
    no: "02",
    title: "Denting & Painting",
    tags: "Dent Repair • Painting • Scratch Removal",
    time: "1–3 Days",
    image: "/services/spare1.jpeg",
    description:
      "Restore your vehicle's original appearance with professional denting, painting and finishing.",
    included: [
      "Dent removal & repair",
      "Panel painting",
      "Scratch & rust removal",
      "Color matching",
    ],
    why: [
      "Quality paint",
      "Skilled specialists",
      "Long-lasting finish",
      "Professional finishing",
    ],
  },

  {
    id: "detailing",
    no: "03",
    title: "Cleaning & Detailing",
    tags: "Washing • Interior • Polishing • Detailing",
    time: "1–3 Hours",
     image: "/services/paint1.jpeg",
    description:
      "Professional interior and exterior cleaning to give your vehicle a fresh and premium finish.",
    included: [
      "Exterior foam wash",
      "Interior deep cleaning",
      "Polishing & waxing",
      "Tyre & rim cleaning",
    ],
    why: [
      "Premium products",
      "Attention to detail",
      "Better protection",
      "Fresh interiors",
    ],
  },

  {
    id: "parts",
    no: "04",
    title: "Spare Parts & Modification",
    tags: "Spare Parts • Accessories • Modification",
    time: "Varies",
    image: "/services/modified.jpeg",
    description:
      "Genuine spare parts and professional modification solutions for performance, style and reliability.",
    included: [
      "Genuine spare parts",
      "Car accessories",
      "Performance upgrades",
      "Custom modifications",
    ],
    why: [
      "Original branded parts",
      "Expert installation",
      "Better performance",
      "Warranty support",
    ],
  },
];

function Services() {
  return (
    <main className="services-page">

      {/* HERO */}
      <section className="services-hero">
        <div className="services-hero-overlay" />

        <div className="services-hero-content">
          <span className="services-label">OUR SERVICES</span>

          <h1>
            Professional Care
            <strong>For Every Drive</strong>
          </h1>

          <p>
            From routine maintenance to complete vehicle care,
            Rahul Motors provides expert automotive solutions
            with skilled technicians and genuine parts.
          </p>

          <div className="hero-highlights">
            <span>
              <ShieldCheck size={17} />
              Expert Technicians
            </span>

            <span>
              <Cog size={17} />
              Genuine Parts
            </span>

            <span>
              <BadgeCheck size={17} />
              Trusted Service
            </span>
          </div>
        </div>
      </section>
      {/* marquee */}
      <div className="service-marquee">
  <div className="marquee-track">
    <span>RAHUL MOTORS</span>
    <i>✦</i>
    <span>PREMIUM SERVICE</span>
    <i>✦</i>
    <span>GENUINE PARTS</span>
    <i>✦</i>
    <span>EXPERT TECHNICIANS</span>
    <i>✦</i>

    <span>RAHUL MOTORS</span>
    <i>✦</i>
    <span>PREMIUM SERVICE</span>
    <i>✦</i>
    <span>GENUINE PARTS</span>
    <i>✦</i>
    <span>EXPERT TECHNICIANS</span>
    <i>✦</i>
  </div>
</div>

      {/* SERVICES */}
      <section className="services-area">
        <div className="services-content">

          {services.map((service, index) => (
            <article
              className={`service-detail ${
                index % 2 !== 0 ? "service-reverse" : ""
              }`}
              key={service.id}
            >

              <div className="service-main">

                <div className="service-main-content">

                  <div className="service-heading-row">

                    <div>
                      <span className="service-no">
                        {service.no}
                      </span>

                      <h2>{service.title}</h2>
                    </div>

                    <div className="service-time">
                      <Clock3 size={18} />

                      <span>
                        <small>Approx. Time</small>
                        {service.time}
                      </span>
                    </div>

                  </div>

                  <p className="service-tags">
                    {service.tags}
                  </p>

                  <p className="service-description">
                    {service.description}
                  </p>

                  <button className="book-service">
                    Book This Service
                    <ArrowRight size={15} />
                  </button>

                </div>


                <div className="service-detail-image">
                  <img
                    src={service.image}
                    alt={service.title}
                    loading="lazy"
                    decoding="async"
                  />
                </div>

              </div>


              <div className="service-extra">

                <div>
                  <h4>Included Work</h4>

                  <ul>
                    {service.included.map((item) => (
                      <li key={item}>
                        <Check size={14} />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>


                <div>
                  <h4>Why Choose Us?</h4>

                  <ul>
                    {service.why.map((item) => (
                      <li key={item}>
                        <Check size={14} />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

              </div>

            </article>
          ))}

        </div>
      </section>


      {/* CTA */}
      <section className="service-bottom-cta">

        <div className="cta-bg" />

        <div className="cta-content">

          <div className="cta-icon">
            <CalendarDays size={23} />
          </div>

          <div>
            <span>READY TO GET STARTED?</span>

            <h2>Book Your Service Today</h2>

            <p>
              Choose your service and let our experts take care of your vehicle.
            </p>
          </div>

        </div>


        <div className="cta-buttons">

          <button>
            Book Appointment
            <ArrowRight size={15} />
          </button>

          <button className="outline-btn">
            Contact Us
          </button>

        </div>

      </section>
    <Footer/>
    </main>
  );
}

export default Services;