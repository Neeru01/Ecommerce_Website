import React from 'react';

const CheckoutPage = ({ handlePlaceOrder, cart, calculateTotalPrice }) => {
  return (
    <div className="checkout-container">
      <h2 className="checkout-heading">Checkout</h2>
      <div className="checkout-summary">
        <h3>Items Purchased:</h3>
        <ul>
          {cart.map((product, index) => (
            <li key={index}>{product.title} - ${product.price.toFixed(2)}</li>
          ))}
        </ul>
        <h3>Total Amount: ${calculateTotalPrice()}</h3>
      </div>
      <form>
        {/* Add checkout form fields here (name, address, payment details) */}
        <button type="button" onClick={handlePlaceOrder} className="btn btn-success mt-3">
          Place Order
        </button>
      </form>
    </div>
  );
};

export default CheckoutPage;

