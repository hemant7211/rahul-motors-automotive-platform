

import "./Footer.css";
import {
  ShieldCheck,
  Settings,
  CircleCheck,
  Wrench,
  Sparkles,
  Cog,
  Paintbrush,
  CarFront,
  MapPin,
  Phone,
  Mail,
  Camera,
  ArrowRight,
} from "lucide-react";

import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="rm-footer">

      {/* ORANGE TOP BORDER */}
      <div className="footer-top-line"></div>

      {/* MAIN FOOTER */}
      <div className="rm-footer-main">

        {/* BRAND SECTION */}
        <div className="rm-footer-brand">

          {/* Replace with your transparent logo */}
          <Link to="/" className="rm-footer-logo">
            <img
              src="/logo.png"
              alt="Rahul Motors by GLS Group"
            />
          </Link>

          <p className="rm-footer-description">
         RAHUL MOTORS
          <p> Complete Automotive Solutions | GLS Group</p>
          </p>

          {/* TRUST ICONS */}
          <div className="rm-footer-trust">

            <div className="trust-item">
              <ShieldCheck />
              <span>
                Trusted
                <br />
                Service
              </span>
            </div>

            <div className="trust-item">
              <Settings />
              <span>
                Expert
                <br />
                Mechanics
              </span>
            </div>

            <div className="trust-item">
              <CircleCheck />
              <span>
                Quality
                <br />
                Assured
              </span>
            </div>

          </div>
        </div>

        {/* QUICK LINKS */}
        <div className="rm-footer-column">

          <h3>Quick Links</h3>
          <div className="footer-heading-line"></div>

          <div className="rm-footer-links">

            <Link to="/">
              Home <ArrowRight />
            </Link>

            <Link to="/about">
              About Us <ArrowRight />
            </Link>

            <Link to="/services">
              Our Services <ArrowRight />
            </Link>

            <Link to="/used-cars">
              Used Cars <ArrowRight />
            </Link>

            <Link to="/spare-parts">
              Spare Parts <ArrowRight />
            </Link>

            <Link to="/contact">
              Contact Us <ArrowRight />
            </Link>

          </div>
        </div>

        {/* OUR SERVICES */}
        <div className="rm-footer-column">

          <h3>Our Services</h3>
          <div className="footer-heading-line"></div>

          <div className="rm-footer-service-list">

            <div className="footer-service-item">
              <Wrench />
              <span>Car Repair & Maintenance</span>
            </div>

            <div className="footer-service-item">
              <Sparkles />
              <span>Car Washing & Detailing</span>
            </div>

            <div className="footer-service-item">
              <Cog />
              <span>Spare Parts & Accessories</span>
            </div>

            <div className="footer-service-item">
              <Paintbrush />
              <span>Denting & Painting</span>
            </div>

            <div className="footer-service-item">
              <Wrench />
              <span>Modification & Upgrades</span>
            </div>

            <div className="footer-service-item">
              <CarFront />
              <span>Car Rental & Used Cars</span>
            </div>

          </div>
        </div>

        {/* CONTACT SECTION */}
        <div className="rm-footer-column rm-footer-contact">

          <h3>Contact Us</h3>
          <div className="footer-heading-line"></div>

          <div className="footer-contact-item">
            <MapPin />

            <div>
              <h4>Visit Our Workshop</h4>
              <p>Palwal, Haryana, India</p>
            </div>
          </div>

          <div className="footer-contact-item">
            <Phone />

            <div>
              <h4>Call Us</h4>
              <p>+91 XXXXX XXXXX</p>
            </div>
          </div>

          <div className="footer-contact-item">
            <Mail />

            <div>
              <h4>Email Us</h4>
              <p>your-email@example.com</p>
            </div>
          </div>

          <div className="footer-social">

            <h3>Follow Us</h3>

            <div className="footer-social-icons">

              <a href="#" aria-label="Instagram">
                <Camera/>
              </a>

              <a href="#" aria-label="Facebook">
                <Camera />
              </a>

              <a href="#" aria-label="YouTube">
                <Camera />
              </a>

            </div>
          </div>

        </div>
      </div>
      {/* COPYRIGHT BAR */}
      <div className="rm-footer-bottom">

        <p>
          © 2026 Rahul Motors. All Rights Reserved.
        </p>

        <p>
          Powered by <span>GLS Group</span>
        </p>

      </div>

    </footer>
  );
}

export default Footer;