import { useState} from "react";
import { Link } from "react-router-dom";
import { Product, CartItem } from "../App";
import "./LandingPage.css";

interface LandingPageProps {
  cartItems: CartItem[];
  setCartItems: (newCart: CartItem[] | ((prevCart: CartItem[]) => CartItem[])) => void;
}

function LandingPage(props: LandingPageProps) {
  const { cartItems, setCartItems } = props;
  const [email, setEmail] = useState("");
  const [subscriptionMessage, setSubscriptionMessage] = useState<string | null>(null);

  const handleSubscription = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setSubscriptionMessage("Thank you for subscribing!");
        setEmail("");
      } else {
        const errorData = await response.json();
        setSubscriptionMessage(`Subscription failed: ${errorData.message}`);
      }
    } catch (error) {
      console.error("Error subscribing:", error);
      setSubscriptionMessage("An error occurred. Please try again later.");
    }
  }

  const addToCart = (product: Product) => {
    setCartItems((prevItems) => {
      const newCartItems = prevItems.slice();
      const newItem = {
        id: product.id,
        name: product.name,
        image: product.image,
        price: product.price,
        cartItemId: new Date().getTime(),
      };
  
      newCartItems.push(newItem);
      return newCartItems;
    });
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
          <p>Discover the finest beauty products and</p>
          <p>services curated just for you.</p>
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
        <form className="newsletter-form" onSubmit={handleSubscription}>
          <input
            type="email"
            placeholder="Enter your email"
            aria-label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button type="submit">Subscribe</button>
        </form>
        {subscriptionMessage && <p className="subscription-message">{subscriptionMessage}</p>}
      </section>
    </div>
  );
}

interface Testimonial {
  id: number;
  name: string;
  message: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Ian U.",
    message: "The best skincare products I have ever seen!",
  },
  {
    id: 2,
    name: "Tyler Y.",
    message: "Fantastic quality and amazing customer service.",
  },
  {
    id: 3,
    name: "Kaelem B.",
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