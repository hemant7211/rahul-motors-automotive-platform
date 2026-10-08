import { Wrench, ShieldCheck, BadgeIndianRupee, Headset } from "lucide-react";
import { NavLink } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import "./Home.css";
import home1 from "../../assets/home1.webp";
import spare1 from "../../assets/spare1.webp";
import "../services/Services";
import Footer from "../../components/footer/Footer";
function Home() {
  const aboutRef = useRef(null);
  const [aboutVisible, setAboutVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setAboutVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.3,
      }
    );

    if (aboutRef.current) {
      observer.observe(aboutRef.current);
    }

    return () => observer.disconnect();
  }, []);
  // service scroll animation
  const servicesRef = useRef(null);
  const [servicesVisible, setServicesVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setServicesVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.5 }
    );

    if (servicesRef.current) {
      observer.observe(servicesRef.current);
    }

    return () => observer.disconnect();
  }, []);
  return (
    <>
      <main className="home-page">
        {/* HERO SECTION */}
        <section
          className="hero-section">

          <img
            src={home1}
            alt="Mahindra Thar"
            className="hero-car"
          />

          <div className="hero-overlay"></div>

          <div className="hero-content">

            <p className="hero-tagline">
              DRIVEN BY PASSION
            </p>

            <h1>
              RAHUL
              <br />
              <span>MOTORS</span>
            </h1>
            <p className="hero-subtitle">
              Automotive Solutions
            </p>
            <p className="hero-brand">
              BY GLS GROUP
            </p>
          </div>
        </section>
        {/* ABOUT SECTION */}
        <section
          className={`about-section ${aboutVisible ? "show" : ""
            }`}
          ref={aboutRef}
        >
          <div className="about-image">
            <img
              src={spare1}
              alt="Rahul Motors"
            />
          </div>
          <div className="about-content">
            <p className="about-tagline">
              ABOUT RAHUL MOTORS
            </p>
            <h2>
              YOUR CAR, <span>OUR PASSION</span>
            </h2>
            <p className="about-description">
              From expert car repairs to premium detailing,
              Rahul Motors provides complete automotive
              solutions to keep your journey smooth.
            </p>
            <button className="about-btn">
              Explore Our Services →
            </button>
          </div>
        </section>
        {/* services SECTION */}
        <section
          className={`services-section ${servicesVisible ? "services-show" : ""
            }`}
          ref={servicesRef}>
          <h1>⚙︎ ── 🔧 Services 🔧 ── ⚙︎</h1>
          <div className="services-container">


            <div className="service-box">
              <img
                src="/home/repair3.webp"
                alt="Car Repair"
                className="service-img"
              />
              <div className="service-content">
                <h3>Car Repair</h3>
                <p>Professional car repair and maintenance.</p>
                <a href="#" className="service-link">
                  <NavLink to="/services">Explore More →</NavLink>

                </a>
              </div>
            </div>

            <div className="service-box">
              <img
                src="./services/washing.webp"
                alt="Car Washing"
                className="service-img"
              />
              <div className="service-content">
                <h3>Car Washing</h3>
                <p>Premium cleaning for your vehicle.</p>
                <a href="#contact" className="service-link">
                  Explore More →
                </a>
              </div>
            </div>

            <div className="service-box">
              <img
                src="./services/modified.webp"
                alt="Car Modification"
                className="service-img"
              />
              <div className="service-content">
                <h3>Car Modification</h3>
                <p>Customize your car with our experts.</p>
                <a href="#contact" className="service-link">
                  Explore More →
                </a>
              </div>
            </div>
            <div className="service-box">
              <img
                src="./services/paint1.webp"
                alt="Car Painting"
                className="service-img"
              />
              <div className="service-content">
                <h3>Car painting</h3>
                <p>Professional car repair and maintenance.</p>
                <a href="#contact" className="service-link">
                  Explore More →
                </a>
              </div>
            </div>
            <div className="service-box">
              <img
                src="./services/spare1.webp"
                alt="Car Repair"
                className="service-img"
              />
              <div className="service-content">
                <h3>Car Spare Parts</h3>
                <p>Professional car repair and maintenance.</p>
                <a href="#contact" className="service-link">
                  Explore More →
                </a>
              </div>
            </div>
            <div className="service-box">
              <img
                src="./services/rent.webp"
                alt="Car Repair"
                className="service-img"
              />
              <div className="service-content">
                <h3>Car Sell & Rent</h3>
                <p>Professional car repair and maintenance.</p>
                <a href="#contact" className="service-link">
                  Explore More →
                </a>
              </div>
            </div>
          </div>
        </section>
        {/*  features section  pre owned cars */}
        <section
          className="features">
          <span>  <h1>⚙︎ ◈ ━━━ Pre-Owned Cars ━━━ ◈ ⚙︎</h1></span>
          <div className="f-container">
            <div className="f-box"><img src="./used/scorpio1.webp" /><div className="f-content"><h3>Car Sell & Rent</h3>
              <p>Professional car repair and maintenance.</p>
              <a href="#contact" className="service-link">
                Check Now →
              </a></div></div>
            <div className="f-box"><img src="./used/fortuner1.webp" /><div className="f-content"><h3>Car Sell & Rent</h3>
              <p>Professional car repair and maintenance.</p>
              <a href="#contact" className="service-link">
                Check Now →
              </a></div></div>
            <div className="f-box"><img src="./used/thar.webp" /><div className="f-content"><h3>Car Sell & Rent</h3>
              <p>Professional car repair and maintenance.</p>
              <a href="#contact" className="service-link">
                Check Now →
              </a></div></div>
            <div className="f-box"><img src="./used/swift.webp" /><div className="f-content"><h3>Car Sell & Rent</h3>
              <p>Professional car repair and maintenance.</p>
              <a href="#contact" className="service-link">
                Check Now →
              </a></div></div>
            <div className="f-box"><img src="./used/scorpio.webp" /><div className="f-content"><h3>Car Sell & Rent</h3>
              <p>Professional car repair and maintenance.</p>
              <a href="#contact" className="service-link">
                Check Now →
              </a></div></div>
            <div className="f-box"><img src="./used/audi.webp" /><div className="f-content"><h3>Car Sell & Rent</h3>
              <p>Professional car repair and maintenance.</p>
              <a href="#contact" className="service-link">
                Check Now →
              </a></div></div>
          </div>

        </section>
        {/* washing section  auto detailing */}
        <section
          className="wash">
          <h1>⚙︎ ── 🛠️ Auto Detailing 🛠️ ── ⚙︎</h1>
          <div className="wash-container">
            <div className="wash-detail">
              <img src="/home/washing.webp" />
              <h3>Premium Car Washing</h3>
              <p>Deep wash for a spotless shine.</p>
              <a href="#contact" className="book-btn">
                BOOK NOW
              </a>
            </div>
            <div className="wash-detail">
              <img src="/home/deepclean.webp" />
              <h3>Interior Deep Cleaning</h3>
              <p>Fresh, clean and hygienic car interiors.</p>
              <a href="#contact" className="book-btn">
                BOOK NOW
              </a>
            </div>
            <div className="wash-detail">
              <img src="/home/polish.webp" />
              <h3>Car Polishing & Detailing</h3>
              <p>Restore shine and protect your car's paint.</p>
              <a href="#contact" className="book-btn">
                BOOK NOW
              </a>
            </div>
          </div>
        </section>
        {/* why you choose us */}
        <section>
          <div className="choose">
            <h1>⚙︎ ── 🔧 Why Rahul Motors 🔧 ── ⚙︎</h1>
            <h3>Your Car , Our Responsibility</h3>
          </div>
          <div className="choose-container">
            <div className="choose-box">
              <Wrench className="why-icon" />
              <h3>Expert Mechanics</h3>
              <p>Skilled Professionals For Your Car's Needs.</p>
            </div>
            <div className="choose-box">
              <ShieldCheck className="why-icon" />
              <h3>Quality Parts</h3>
              <p>Reliable Spare Parts For Lasting Performance.</p>
            </div>
            <div className="choose-box">
              <BadgeIndianRupee className="why-icon" />
              <h3>Fair Pricing</h3>
              <p>Clear Estimates And Transparent Service Costs.</p>
            </div>
            <div className="choose-box">
              <Headset className="why-icon" />
              <h3>Customer Support</h3>
              <p>Helpful Assistance Whenever You Need Us.</p>
            </div>
          </div>

        </section>
        {/* customers reviews */}
        <section className="review-section">
          <div className="review">
            <h1>⚙︎ ── 🔧 Client's Reviews 🔧 ── ⚙︎</h1>
          </div>
          <div className="r-container">
            <div className="r-box">
              <h1>★★★★★</h1>
              <h2>Great Service</h2>
              <h3>Professional and reliable work.</h3>
              <hr></hr>
              <h2>Hemant Saini</h2>
            </div>
            <div className="r-box">
              <h1>★★★★★</h1>
              <h2>Great Service</h2>
              <h3>Professional and reliable work.</h3>
              <hr></hr>
              <h2>Vikas Saini </h2>
            </div>
            <div className="r-box">
              <h1>★★★★★</h1>
              <h2>Great Service</h2>
              <h3>Professional and reliable work.</h3>
              <hr></hr>
              <h2>Himanshu Saini</h2>
            </div>
          </div>


        </section>
        {/* contact us */}
        <section className="service-enquiry-section">
          <div className="contact">
            <h1>⚙︎ ── 🔧 Service Enquiry 🔧 ── ⚙︎</h1>
          </div>
          <div className="c-container">
            <div className="inquiry">
              <h1>Let’s Connect</h1>
              <p className="inquiry-text">
                Tell us about your car and the service you need. Our team will get back to you shortly.
              </p>
              <form className="contact-form">
                {/* Name */}
                <div className="form-group">
                  <label htmlFor="name">Name</label>
                  <input type="text" id="name" placeholder="Enter your name" />
                </div>
                {/* Phone */}
                <div className="form-group">
                  <label htmlFor="phone">Phone</label>
                  <input type="tel" id="phone" placeholder="Enter your phone number" />
                </div>
                {/* Email */}
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input type="email" id="email" placeholder="Enter your email" />
                </div>
                {/* Car Brand */}
                <div className="form-group">
                  <label htmlFor="car">Car Brand</label>
                  <input type="text" id="car" placeholder="e.g. Hyundai, Tata, Maruti" />
                </div>
                {/* Car Model */}
                <div className="form-group">
                  <label htmlFor="model">Car Model</label>
                  <input type="text" id="model" placeholder="e.g. Creta, Swift, Nexon" />
                </div>
                {/* Message */}
                <div className="form-group">
                  <label htmlFor="message">Message</label>
                  <textarea id="message" placeholder="Tell us what service you need..." >
                  </textarea>
                </div>
                {/* Submit */}
                <div className="submit-box">
                  <button type="submit"> Submit Enquiry </button>
                </div>
              </form>
            </div>
          </div>
        </section>

        {/* footer */}
        <Footer />
      </main>
    </>
  );
}
export default Home;