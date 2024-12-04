import React from "react";
import { Link } from "react-router-dom";
import { Product } from "../App";
import "./LandingPage.css";

interface LandingPageProps {
  cartItems: Product[];
  setCartItems: React.Dispatch<React.SetStateAction<Product[]>>;
}

const LandingPage: React.FC<LandingPageProps> = ({ cartItems, setCartItems }) => {
  const addToCart = (product: Product) => {
    setCartItems((prevItems) => [
      ...prevItems,
      { ...product, cartItemId: new Date().getTime() },
    ]);    console.log("Added to cart:", product);
  };

  return (
    <div className="landing-page">
      <header className="cart-header">
        <Link to="/checkout" className="cart-icon-link">
          <div className="cart-icon" title="View Cart">
            <img src="/cart.svg" alt="Shopping Cart" />
            <div className="cart-count">{cartItems.length}</div>
          </div>
        </Link>
      </header>

      <section className="hero-section">
        <div className="hero-content">
          <h1>Ithaca's Beauty</h1>
          <h2>Our Passion</h2>
          <p>Discover the finest beauty products and services curated just for you.</p>
          <Link to="/shop" className="cta-button-hero">
            SHOP NOW
          </Link>
        </div>
      </section>

      <section className="featured-section">
        <h2>Featured Products</h2>
        <div className="products-container">
          {featuredProducts.map((product) => (
            <div key={product.id} className="product-card">
              <img src={product.image} alt={product.name} />
              <h3>{product.name}</h3>
              <p className="price">${product.price.toFixed(2)}</p>
              <button
                className="add-to-cart-button"
                onClick={() => addToCart(product)}
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </section>

      <section className="testimonials-section">
        <h2>What Our Customers Say</h2>
        <div className="testimonials-container">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="testimonial-card">
              <p>"{testimonial.message}"</p>
              <h4>- {testimonial.name}</h4>
            </div>
          ))}
        </div>
      </section>

      <section className="newsletter-section">
        <h2>Stay Updated</h2>
        <p>Subscribe to our newsletter for the latest updates and offers.</p>
        <form className="newsletter-form">
          <input
            type="email"
            placeholder="Enter your email"
            aria-label="Email"
            required
          />
          <button type="submit">Subscribe</button>
        </form>
      </section>
    </div>
  );
};

interface Testimonial {
  id: number;
  name: string;
  message: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: 'Ian U.',
    message: 'The best skincare products I have ever seen!',
  },
  {
    id: 2,
    name: 'Tyler Y.',
    message: 'Fantastic quality and amazing customer service.',
  },
  {
    id: 3,
    name: 'Kaelem B.',
    message: "I love how the stylists are always taking a client's input",
  },
];


const featuredProducts: Product[] = [
  {
    id: 1,
    name: "Luxury Lipstick",
    image: "/images/lipstick.jpg",
    price: 29.99,
  },
  {
    id: 2,
    name: "Silky Foundation",
    image: "/images/foundation.jpg",
    price: 39.99,
  },
  {
    id: 3,
    name: "Glow Highlighter",
    image: "/images/glowhighlighter.jpg",
    price: 24.99,
  },
];

export default LandingPage;