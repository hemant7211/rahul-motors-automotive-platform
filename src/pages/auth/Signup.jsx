import { useState } from "react";
import { Link } from "react-router-dom";
import "./Signup.css";

function Signup() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Password aur Confirm Password match nahi kar rahe.");
      return;
    }

    // Backend abhi connect nahi hai.
    // Customer account abhi database mein create nahi hoga.
    alert(
      "Signup UI ready hai. Account create karne ke liye backend connect karna hoga."
    );
  };

  return (
    <main className="auth-page">
      <section className="auth-container signup-container">
        {/* Brand panel */}
        <div className="auth-brand-panel">
          <div className="auth-brand-content">
            <span className="auth-eyebrow">JOIN OUR COMMUNITY</span>

            <h1>
              RAHUL
              <span>MOTORS</span>
            </h1>

            <div className="auth-brand-line" />

            <p className="auth-brand-subtitle">
              Automotive Solutions
            </p>

            <p className="auth-brand-description">
              Create your account to explore our automotive services
              and stay connected with Rahul Motors.
            </p>

            <span className="auth-brand-footer">
              BY GLS GROUP
            </span>
          </div>
        </div>

        {/* Signup form */}
        <div className="auth-form-panel">
          <div className="auth-form-wrapper signup-form-wrapper">
            <Link to="/" className="auth-back-link">
              ← Back to Home
            </Link>

            <span className="auth-section-label">
              CUSTOMER REGISTRATION
            </span>

            <h2>Create account</h2>

            <p className="auth-description">
              Enter your details to get started.
            </p>

            <form onSubmit={handleSubmit} className="auth-form">
              <div className="auth-field">
                <label htmlFor="signup-name">Full Name</label>

                <input
                  id="signup-name"
                  type="text"
                  name="name"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={handleChange}
                  autoComplete="name"
                  required
                />
              </div>

              <div className="auth-field">
                <label htmlFor="signup-email">Email Address</label>

                <input
                  id="signup-email"
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                  autoComplete="email"
                  required
                />
              </div>

              <div className="auth-field">
                <label htmlFor="signup-phone">Mobile Number</label>

                <input
                  id="signup-phone"
                  type="tel"
                  name="phone"
                  placeholder="Enter your mobile number"
                  value={formData.phone}
                  onChange={handleChange}
                  autoComplete="tel"
                  pattern="[0-9]{10}"
                  maxLength={10}
                  title="Please enter a valid 10-digit mobile number"
                  required
                />
              </div>

              <div className="auth-field">
                <label htmlFor="signup-password">Password</label>

                <input
                  id="signup-password"
                  type="password"
                  name="password"
                  placeholder="Create a password"
                  value={formData.password}
                  onChange={handleChange}
                  autoComplete="new-password"
                  minLength={8}
                  required
                />
              </div>

              <div className="auth-field">
                <label htmlFor="signup-confirm-password">
                  Confirm Password
                </label>

                <input
                  id="signup-confirm-password"
                  type="password"
                  name="confirmPassword"
                  placeholder="Re-enter your password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  autoComplete="new-password"
                  minLength={8}
                  required
                />
              </div>

              <button type="submit" className="auth-submit-btn">
                Create Customer Account
                <span>→</span>
              </button>
            </form>

            <p className="auth-switch-text">
              Already have an account?{" "}
              <Link to="/login">Login</Link>
            </p>

            <p className="auth-terms">
              By creating an account, you agree to Rahul Motors'
              terms and privacy policy.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Signup;