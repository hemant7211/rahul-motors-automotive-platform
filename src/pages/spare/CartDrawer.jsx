
import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import "./Cart.css";

function CartDrawer() {
  const {
    cartItems,
    cartTotal,
    isCartOpen,
    setIsCartOpen,
    updateQuantity,
    removeFromCart,
  } = useCart();

  if (!isCartOpen) return null;

  return (
    <div
      className="cart-overlay"
      onClick={() => setIsCartOpen(false)}
    >
      <aside
        className="cart-drawer"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="cart-drawer-header">
          <h2>Your Cart ({cartItems.length})</h2>

          <button
            className="cart-close-btn"
            onClick={() => setIsCartOpen(false)}
            aria-label="Close cart"
          >
            ×
          </button>
        </div>

        {cartItems.length === 0 ? (
          <p className="cart-empty">Your cart is empty.</p>
        ) : (
          <>
            <div className="cart-drawer-items">
              {cartItems.map((item) => (
                <div
                  className="cart-drawer-item"
                  key={`${item.category}-${item.id}`}
                >
                  <img src={item.image} alt={item.name} />

                  <div className="cart-item-info">
                    <h3>{item.name}</h3>
                    <p>₹{item.price.toLocaleString("en-IN")}</p>

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
                </div>
              ))}
            </div>

            <div className="cart-drawer-footer">
              <div className="cart-subtotal">
                <span>Subtotal</span>
                <strong>
                  ₹{cartTotal.toLocaleString("en-IN")}
                </strong>
              </div>

              <Link
                to="/cart"
                className="cart-view-btn"
                onClick={() => setIsCartOpen(false)}
              >
                View Cart & Checkout
              </Link>
            </div>
          </>
        )}
      </aside>
    </div>
  );
}

export default CartDrawer;
