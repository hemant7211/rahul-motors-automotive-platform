
import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import "./Cart.css";

function Cart() {
  const {
    cartItems,
    cartTotal,
    updateQuantity,
    removeFromCart,
  } = useCart();
  const navigate = useNavigate();
  const [deliveryOption, setDeliveryOption] = useState("pickup");

  return (
    <main className="cart-page">
      <div className="cart-page-heading">
        <p className="cart-eyebrow">RAHUL MOTORS</p>
        <h1>Your Shopping Cart</h1>
        <p>Review your spare parts before proceeding.</p>
      </div>

      {cartItems.length === 0 ? (
        <div className="cart-empty-page">
          <h2>Your cart is empty</h2>
          <p>Add spare parts to get started.</p>

          <Link to="/spare-parts" className="cart-view-btn">
            Browse Spare Parts
          </Link>
        </div>
      ) : (
        <div className="cart-page-layout">
          <section className="cart-page-products">
            {cartItems.map((item) => (
              <article
                className="cart-page-item"
                key={`${item.category}-${item.id}`}
              >
                <img src={item.image} alt={item.name} />

                <div className="cart-page-item-info">
                  <h3>{item.name}</h3>
                  <p>{item.category}</p>

                  <strong>
                    ₹{item.price.toLocaleString("en-IN")}
                  </strong>

                  <div className="cart-quantity">
                    <button
                      onClick={() =>
                        updateQuantity(item.id, item.category, -1)
                      }
                      aria-label="Decrease quantity"
                    >
                      −
                    </button>

                    <span>{item.quantity}</span>

                    <button
                      disabled={item.quantity >= item.stock}
                      onClick={() =>
                        updateQuantity(item.id, item.category, 1)
                      }
                      aria-label="Increase quantity"
                    >
                      +
                    </button>
                  </div>

                  <button
                    className="cart-remove-btn"
                    onClick={() =>
                      removeFromCart(item.id, item.category)
                    }
                  >
                    Remove
                  </button>
                </div>

                <strong className="cart-line-total">
                  ₹{(item.price * item.quantity).toLocaleString("en-IN")}
                </strong>
              </article>
            ))}
          </section>

          <aside className="cart-order-summary">
            <h2>Order Summary</h2>

            <div className="cart-summary-row">
              <span>Items ({cartItems.reduce(
                (total, item) => total + item.quantity,
                0
              )})</span>
              <span>₹{cartTotal.toLocaleString("en-IN")}</span>
            </div>

            <h3>Delivery Method</h3>

            <label className="cart-delivery-option">
              <input
                type="radio"
                name="delivery"
                value="pickup"
                checked={deliveryOption === "pickup"}
                onChange={() => setDeliveryOption("pickup")}
              />
              <span>
                <strong>Workshop Pickup</strong>
                <small>Collect from Rahul Motors, Palwal</small>
              </span>
            </label>

            <label className="cart-delivery-option">
              <input
                type="radio"
                name="delivery"
                value="delivery"
                checked={deliveryOption === "delivery"}
                onChange={() => setDeliveryOption("delivery")}
              />
              <span>
                <strong>Home Delivery</strong>
                <small>Availability depends on your location</small>
              </span>
            </label>

            <div className="cart-summary-total">
              <span>Subtotal</span>
              <strong>
                ₹{cartTotal.toLocaleString("en-IN")}
              </strong>
            </div>

            <p className="cart-summary-note">
              Delivery charges, if applicable, will be confirmed
              before the order is placed.
            </p>

            
<button
  className="cart-checkout-btn"
  onClick={() => navigate("/checkout")}
>
  Proceed to Checkout
</button>


            <Link to="/spare-parts" className="cart-continue-link">
              Continue Shopping
            </Link>
          </aside>
        </div>
      )}
    </main>
  );
}

export default Cart;
