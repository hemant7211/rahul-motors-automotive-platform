
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import "./Checkout.css";

function Checkout() {
  const navigate = useNavigate();

  const { cartItems, cartTotal } = useCart();

  const [deliveryMethod, setDeliveryMethod] = useState("pickup");
  const [paymentMethod, setPaymentMethod] = useState("cash");

  const [customer, setCustomer] = useState({
    name: "",
    phone: "",
    address: "",
    area: "",
  });

  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderDetails, setOrderDetails] = useState(null);

  const [error, setError] = useState("");

  // Customer details update karna
  function handleChange(event) {
    const { name, value } = event.target;

    setCustomer((previous) => ({
      ...previous,
      [name]: value,
    }));
  }

  // Order request submit karna
  function handleSubmit(event) {
    event.preventDefault();
    setError("");

    if (cartItems.length === 0) {
      setError("Your cart is empty. Please add products first.");
      return;
    }

    if (!customer.name.trim()) {
      setError("Please enter your name.");
      return;
    }

    if (!/^[6-9]\d{9}$/.test(customer.phone)) {
      setError("Please enter a valid 10-digit mobile number.");
      return;
    }

    if (deliveryMethod === "delivery") {
      if (!customer.address.trim() || !customer.area.trim()) {
        setError("Please enter your complete address and area.");
        return;
      }
    }

    const order = {
      orderId: `RM-${Date.now()}`,
      customer: { ...customer },
      deliveryMethod,
      paymentMethod,
      items: cartItems.map((item) => ({ ...item })),
      total: cartTotal,
      status: "Order request received",
      deliveryStatus:
        deliveryMethod === "delivery"
          ? "Delivery availability pending confirmation"
          : "Workshop pickup selected",
      createdAt: new Date().toLocaleString("en-IN"),
    };

    // Frontend demo: order confirmation show karna
    setOrderDetails(order);
    setOrderPlaced(true);
  }

  // Empty cart
  if (cartItems.length === 0 && !orderPlaced) {
    return (
      <main className="checkout-page">
        <section className="checkout-empty">
          <h2>Your cart is empty</h2>
          <p>Add spare parts before proceeding to checkout.</p>

          <button
            type="button"
            onClick={() => navigate("/spare-parts")}
          >
            Browse Spare Parts
          </button>
        </section>
      </main>
    );
  }

  // Order confirmation
  if (orderPlaced && orderDetails) {
    return (
      <main className="checkout-page">
        <section className="checkout-success">
          <div className="checkout-success-icon">✓</div>

          <h1>Order Request Received!</h1>

          <p>
            Thank you, {orderDetails.customer.name}.
            Your order request has been prepared.
          </p>

          <div className="checkout-order-info">
            <p>
              <strong>Request ID:</strong>{" "}
              {orderDetails.orderId}
            </p>

            <p>
              <strong>Total:</strong>{" "}
              ₹{orderDetails.total.toLocaleString("en-IN")}
            </p>

            <p>
              <strong>Delivery:</strong>{" "}
              {orderDetails.deliveryMethod === "pickup"
                ? "Workshop Pickup"
                : "Home Delivery"}
            </p>

            <p>
              <strong>Payment:</strong>{" "}
              {orderDetails.paymentMethod === "cash"
                ? "Cash on Pickup / Delivery"
                : "UPI - Payment not processed yet"}
            </p>

            <p>{orderDetails.deliveryStatus}</p>
          </div>

          <p className="checkout-demo-note">
            This is a frontend demo. Your request has not
            been saved to a server, and no payment has been
            processed.
          </p>

          <button
            type="button"
            onClick={() => navigate("/spare-parts")}
          >
            Continue Shopping
          </button>
        </section>
      </main>
    );
  }

  return (
    <main className="checkout-page">
      <div className="checkout-container">
        <div className="checkout-heading">
          <span>RAHUL MOTORS</span>
          <h1>Checkout</h1>
          <p>Complete your details to place an order request.</p>
        </div>

        <form className="checkout-layout" onSubmit={handleSubmit}>
          <div className="checkout-form-column">
            {/* Customer details */}
            <section className="checkout-card">
              <h2>01. Customer Details</h2>

              <div className="checkout-field">
                <label htmlFor="customer-name">Full Name</label>
                <input
                  id="customer-name"
                  name="name"
                  value={customer.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  autoComplete="name"
                  required
                />
              </div>

              <div className="checkout-field">
                <label htmlFor="customer-phone">Mobile Number</label>
                <input
                  id="customer-phone"
                  name="phone"
                  type="tel"
                  inputMode="numeric"
                  maxLength={10}
                  value={customer.phone}
                  onChange={handleChange}
                  placeholder="10-digit mobile number"
                  autoComplete="tel"
                  required
                />
              </div>
            </section>

            {/* Delivery method */}
            <section className="checkout-card">
              <h2>02. Delivery Method</h2>

              <label className={`checkout-option ${
                deliveryMethod === "pickup" ? "selected" : ""
              }`}>
                <input
                  type="radio"
                  name="delivery"
                  value="pickup"
                  checked={deliveryMethod === "pickup"}
                  onChange={() => setDeliveryMethod("pickup")}
                />

                <span>
                  <strong>Workshop Pickup</strong>
                  <small>Collect from Rahul Motors, Palwal.</small>
                </span>
              </label>

              <label className={`checkout-option ${
                deliveryMethod === "delivery" ? "selected" : ""
              }`}>
                <input
                  type="radio"
                  name="delivery"
                  value="delivery"
                  checked={deliveryMethod === "delivery"}
                  onChange={() => setDeliveryMethod("delivery")}
                />

                <span>
                  <strong>Home Delivery</strong>
                  <small>
                    Selected areas within 10 km of the workshop.
                    Availability will be confirmed.
                  </small>
                </span>
              </label>

              {deliveryMethod === "delivery" && (
                <div className="checkout-address-fields">
                  <div className="checkout-field">
                    <label htmlFor="customer-area">Area / Locality</label>
                    <input
                      id="customer-area"
                      name="area"
                      value={customer.area}
                      onChange={handleChange}
                      placeholder="Enter your area in Palwal"
                      required
                    />
                  </div>

                  <div className="checkout-field">
                    <label htmlFor="customer-address">
                      Complete Address
                    </label>
                    <textarea
                      id="customer-address"
                      name="address"
                      value={customer.address}
                      onChange={handleChange}
                      placeholder="House number, street, landmark"
                      rows={3}
                      required
                    />
                  </div>

                  <p className="checkout-notice">
                    Outside the usual 10 km delivery area?
                    You can still submit a request. Rahul Motors
                    will need to confirm delivery availability
                    and any applicable charges.
                  </p>
                </div>
              )}
            </section>

            {/* Payment method */}
            <section className="checkout-card">
              <h2>03. Payment Method</h2>

              <label className={`checkout-option ${
                paymentMethod === "cash" ? "selected" : ""
              }`}>
                <input
                  type="radio"
                  name="payment"
                  value="cash"
                  checked={paymentMethod === "cash"}
                  onChange={() => setPaymentMethod("cash")}
                />

                <span>
                  <strong>Cash Payment</strong>
                  <small>Pay when collecting or receiving your order.</small>
                </span>
              </label>

              <label className={`checkout-option ${
                paymentMethod === "upi" ? "selected" : ""
              }`}>
                <input
                  type="radio"
                  name="payment"
                  value="upi"
                  checked={paymentMethod === "upi"}
                  onChange={() => setPaymentMethod("upi")}
                />

                <span>
                  <strong>UPI Payment</strong>
                  <small>
                    Online payment integration will be connected later.
                  </small>
                </span>
              </label>

              {paymentMethod === "upi" && (
                <p className="checkout-notice">
                  Selecting UPI here does not make a payment.
                  Secure payment processing must be integrated
                  before accepting online payments.
                </p>
              )}
            </section>
          </div>

          {/* Order summary */}
          <aside className="checkout-summary">
            <h2>Order Summary</h2>

            <div className="checkout-items">
              {cartItems.map((item) => (
                <div
                  className="checkout-item"
                  key={`${item.category}-${item.id}`}
                >
                  <div className="checkout-item-image">
                    <img src={item.image} alt={item.name} />
                  </div>

                  <div className="checkout-item-details">
                    <strong>{item.name}</strong>
                    <small>Qty: {item.quantity}</small>
                    <span>
                      ₹{(item.price * item.quantity).toLocaleString("en-IN")}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="checkout-total-row">
              <span>Subtotal</span>
              <strong>
                ₹{cartTotal.toLocaleString("en-IN")}
              </strong>
            </div>

            <div className="checkout-total-row">
              <span>Delivery Charges</span>
              <span>To be confirmed</span>
            </div>

            <div className="checkout-grand-total">
              <span>Product Total</span>
              <strong>
                ₹{cartTotal.toLocaleString("en-IN")}
              </strong>
            </div>

            <p className="checkout-summary-note">
              Final delivery charges and availability, if applicable,
              will be confirmed by Rahul Motors.
            </p>

            {error && (
              <p className="checkout-error" role="alert">
                {error}
              </p>
            )}

            <button className="checkout-submit" type="submit">
              Submit Order Request
            </button>

            <button
              className="checkout-back"
              type="button"
              onClick={() => navigate("/cart")}
            >
              Back to Cart
            </button>
          </aside>
        </form>
      </div>
    </main>
  );
}

export default Checkout;
