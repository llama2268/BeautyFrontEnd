import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './pages/firebaseClient';
import Navbar from './component/Navbar';
import Footer from './component/Footer';
import LandingPage from './pages/Landingpage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import AccountPage from './pages/AccountPage';
import BookingPage from './pages/BookingPage';
import CheckoutPage from './pages/CheckoutPage';
import PaymentPage from './pages/Payment';
import ProtectedRoute from './component/ProtectedRoute';
import './App.css';


export interface Product {
  id: number;
  name: string;
  image: string;
  price: number;
}

const App: React.FC = () => {
  const [cartItems, setCartItems] = useState<Product[]>([]);
  const [user, setUser] = useState<boolean>(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(!!currentUser);
    });
    return () => unsubscribe();
  }, []);

  const removeFromCart = (cartItemId: number) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.cartItemId !== cartItemId));
  };  

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/account" element={<AccountPage />} />
        <Route path="/" element={<ProtectedRoute user={user}><LandingPage cartItems={cartItems} setCartItems={setCartItems} /></ProtectedRoute>}/>
        <Route path="/book" element={<ProtectedRoute user={user}><BookingPage /></ProtectedRoute>}/>
        <Route path="/checkout" element={<ProtectedRoute user={user}><CheckoutPage cartItems={cartItems} removeFromCart={removeFromCart}/></ProtectedRoute>}/>
        <Route path="/pay" element={<ProtectedRoute user={user}><PaymentPage/></ProtectedRoute>}/>


      </Routes>
      <Footer />
    </Router>
  );
};

export default App;