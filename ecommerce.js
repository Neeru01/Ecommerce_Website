import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CheckoutPage from './checkoutPage'; 
import './App.css';

const Ecommerce = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [checkoutFormVisible, setCheckoutFormVisible] = useState(false);
  const [confirmationVisible, setConfirmationVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('https://fakestoreapi.com/products');
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  const removeFromCart = (index) => {
    const newCart = [...cart];
    newCart.splice(index, 1);
    setCart(newCart);
  };

  const calculateTotalPrice = () => {
    return cart.reduce((total, product) => total + product.price, 0).toFixed(2);
  };

  const handleCheckout = () => {
    setCheckoutFormVisible(true);
  };

  const handlePlaceOrder = () => {
    setCheckoutFormVisible(false);
    setConfirmationVisible(true);
  };

  // Filter products based on search term
  const filteredProducts = products.filter(product =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="App">
      <div className="container mt-5">
        {/* Add search bar */}
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-bar"
        />

        <div className="row">
          {filteredProducts.map((product, index) => (
            <div key={index} className="col-md-4">
              <div className="card mb-4">
                <img src={product.image} className="card-img-top" alt={product.title} />
                <div className="card-body">
                  <h5 className="card-title">{product.title}</h5>
                  <p className="card-text">${product.price.toFixed(2)}</p>
                  <button onClick={() => addToCart(product)} className="btn btn-primary">
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>


      <div className="container mt-5">
        <h2>Shopping Cart</h2>
        {cart.map((product, index) => (
          <div key={index} className="card mb-3">
            <div className="card-body">
              <h5 className="card-title">{product.title}</h5>
              <p className="card-text">${product.price.toFixed(2)}</p>
              <button onClick={() => removeFromCart(index)} className="btn btn-danger">
                Remove
              </button>
            </div>
          </div>
        ))}
        <div className="mt-3">
          <p>Total Items: {cart.length}</p>
          <p>Total Price: ${calculateTotalPrice()}</p>
          <button onClick={handleCheckout} className="btn btn-primary">
            Checkout
          </button>
        </div>
      </div>

      {checkoutFormVisible && (
        <div className="container mt-5">
          <h2>Checkout</h2>
          <form>
            {/* Add checkout form fields here (name, address, payment details) */}
            <button type="button" onClick={handlePlaceOrder} className="btn btn-success mt-3">
              Place Order
            </button>
          </form>
        </div>
      )}

      {checkoutFormVisible && (
        <CheckoutPage
          handlePlaceOrder={handlePlaceOrder}
          cart={cart}
          calculateTotalPrice={calculateTotalPrice}
        />
      )}  

      {confirmationVisible && (
        <div className="container mt-5">
          <h2>Order Confirmation</h2>
          <div>
            <p>Thank you for your order!</p>
            <p>Order Summary:</p>
            {/* Display order summary here */}
          </div>
        </div>
      )}
    </div>
  );
};

export default Ecommerce;
