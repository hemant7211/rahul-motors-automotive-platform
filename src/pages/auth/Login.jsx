import { useState } from "react";
import { Link } from "react-router-dom";
import "./Login.css";

function Login() {
  const [loginType, setLoginType] = useState("customer");

  const [formData, setFormData] = useState({
    email: "",
    password: "",
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

    // Backend authentication abhi connect nahi hai.
    // Credentials ko abhi verify ya store nahi kiya ja raha hai.
    alert(
      "Login UI ready hai. Actual login ke liye backend authentication connect karna hoga."
    );
  };

  return (
    <main className="auth-page">
      <section className="auth-container">
        {/* Left branding panel */}
        <div className="auth-brand-panel">
          <div className="auth-brand-content">
            <span className="auth-eyebrow">WELCOME TO</span>

            <h1>
              RAHUL
              <span>MOTORS</span>
            </h1>

            <div className="auth-brand-line" />

            <p className="auth-brand-subtitle">
              Automotive Solutions
            </p>

            <p className="auth-brand-description">
              Your journey to reliable automotive care starts here.
            </p>

            <span className="auth-brand-footer">
              BY GLS GROUP
            </span>
          </div>
        </div>

        {/* Right login panel */}
        <div className="auth-form-panel">
          <div className="auth-form-wrapper">
            <Link to="/" className="auth-back-link">
              ← Back to Home
            </Link>

            <span className="auth-section-label">
              YOUR ACCOUNT
            </span>

            <h2>Welcome back</h2>

            <p className="auth-description">
              Login to continue with Rahul Motors.
            </p>

            {/* Customer/Admin login selector */}
            <div className="auth-role-selector">
              <button
                type="button"
                className={
                  loginType === "customer" ? "active" : ""
                }
                onClick={() => setLoginType("customer")}
              >
                Customer
              </button>

              <button
                type="button"
                className={
                  loginType === "admin" ? "active" : ""
                }
                onClick={() => setLoginType("admin")}
              >
                Owner / Admin
              </button>
            </div>

            <form onSubmit={handleSubmit} className="auth-form">
              <div className="auth-field">
                <label htmlFor="login-email">
                  Email Address
                </label>

                <input
                  id="login-email"
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
                <label htmlFor="login-password">
                  Password
                </label>

                <input
                  id="login-password"
                  type="password"
                  name="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                  autoComplete="current-password"
                  required
                />
              </div>

              <button type="submit" className="auth-submit-btn">
                {loginType === "admin"
                  ? "Owner Login"
                  : "Login to Account"}

                <span>→</span>
              </button>
            </form>

            {loginType === "customer" && (
              <p className="auth-switch-text">
                New to Rahul Motors?{" "}
                <Link to="/signup">Create an account</Link>
              </p>
            )}

            {loginType === "admin" && (
              <p className="auth-security-note">
                Owner access is restricted to authorized accounts.
              </p>
            )}

            <p className="auth-terms">
              By continuing, you agree to Rahul Motors' terms
              and privacy policy.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Login;