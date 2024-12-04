import React from "react";
import { CartItem } from "../App";

import { Link } from "react-router-dom";
import "./CheckoutPage.css";

interface Props {
  cartItems: CartItem[];
  removeFromCart: (productId: number) => void;
}

const CheckoutPage = (props: Props) => {
  const { cartItems, removeFromCart } = props;
  const totalPrice = cartItems.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="checkout-page">
      <header className="checkout-header">
        <Link to="/" className="back-to-shop">
          Back to Shop
        </Link>
        <h1>Checkout</h1>
      </header>

      {cartItems.length === 0 ? (
        <p>Your cart is empty. <Link to="/">Go back to shop</Link>.</p>
      ) : (
        <div className="cart-items">
          {cartItems.map((item) => (
          <div key={item.cartItemId} className="cart-item">
           <img src={item.image} alt={item.name} className="cart-item-image" />
          <div className="cart-item-details">
            <h3>{item.name}</h3>
            <p>${item.price.toFixed(2)}</p>
            <button
        className="remove-button"
          onClick={() => removeFromCart(item.cartItemId)}
        >
        Remove
        </button>
        </div>
        </div> ))}
        </div>
      )}

      <footer className="checkout-footer">
        <h2>Total: ${totalPrice.toFixed(2)}</h2>
        <Link to ="/pay"><button className="checkout-button">Place Order</button></Link>
      </footer>
    </div>
  );
};

export default CheckoutPage;
