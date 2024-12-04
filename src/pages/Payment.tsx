import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Payment.css";

const PaymentPage = () => {
  const navigate = useNavigate();
  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    name: "",
    address: "",
    city: "",
    postalCode: "",
    country: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPaymentInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Payment Info Submitted:", paymentInfo);
    alert("Payment Successful!");
    navigate("/");
  };

  return (
    <div className="payment-page">
      <form className="payment-form" onSubmit={handleSubmit}>
        <h2>Card Details</h2>
        <div className="form-group">
          <label htmlFor="cardNumber">Card Number</label>
          <input
            type="text"
            id="cardNumber"
            name="cardNumber"
            placeholder="0000 0000 0000 0000"
            value={paymentInfo.cardNumber}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="expiryDate">Expiry Date</label>
            <input
              type="text"
              id="expiryDate"
              name="expiryDate"
              placeholder="MM/YY"
              value={paymentInfo.expiryDate}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="cvv">CVV</label>
            <input
              type="text"
              id="cvv"
              name="cvv"
              placeholder="123"
              value={paymentInfo.cvv}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>

        <h2>Billing Address</h2>
        <div className="form-group">
          <label htmlFor="name">Full Name</label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Tyler Yang"
            value={paymentInfo.name}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="address">Address</label>
          <input
            type="text"
            id="address"
            name="address"
            placeholder="123 St"
            value={paymentInfo.address}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="city">City</label>
            <input
              type="text"
              id="city"
              name="city"
              placeholder="New York City"
              value={paymentInfo.city}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="postalCode">Postal Code</label>
            <input
              type="text"
              id="postalCode"
              name="postalCode"
              placeholder="00000"
              value={paymentInfo.postalCode}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="country">Country</label>
          <input
            type="text"
            id="country"
            name="country"
            placeholder="USA"
            value={paymentInfo.country}
            onChange={handleInputChange}
            required
          />
        </div>

        <button type="submit" className="pay-button">
          Pay Now
        </button>
      </form>
    </div>
  );
};

export default PaymentPage;
