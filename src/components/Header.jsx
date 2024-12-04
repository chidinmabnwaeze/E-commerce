import React, { useState } from "react";
import logo from '../assets/images/shop_logo-removebg-preview.png'
import cartIcon from '../assets/icons/cart-icon.png'
import searchIcon from '../assets/icons/search-icon.png'

const Header = ({ products, setSearch }) => {
const [searchQuery, setSearchQuery] = useState('')

  const handleSubmit = (e) => {
// This is to prevent form resubmission everytime the page loads
    e.preventDefault(); 
  };

  const handleSearchChange = (e) => {
    //set to lowercase to recognize all searches whether in uppercase or not
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    // Reset to display all products if search is empty
    if (!query) {
      return setSearch(products);
    }

    // Filtered products based on title or description
    const productResults = products.filter(
      (product) =>
        product.title.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query)
    );

    setSearch(productResults);
  };

  return (
    <header className="header">
      <div className="shop-header bg-blue-700 p-4 flex items-center justify-between">
        {/* Left Section */}
        <div className="shop-header-left-section">
          <a href="shop.html" className="header-link">
            <img className="shop-logo" src={logo} alt="Shop Logo" />
          </a>
        </div>

        {/* Middle Section */}
        <form className="shop-header-middle-section flex" onSubmit={handleSubmit}>
          <input
            className="search-bar p-2 rounded-l-md text-black"
          type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={handleSearchChange}
          />
          <button className="search-button bg-white p-2 rounded-r-md" type="submit">
            <img className="search-icon" src={searchIcon} alt="Search Icon" />
          </button>
        </form>

        {/* Right Section */}
        <div className="shop-header-right-section flex">
          <a className="orders-link header-link mr-4" href="orders.html">
            <span className="returns-text">Returns</span>
            <span className="orders-text">& Orders</span>
          </a>

          <a className="cart-link header-link flex items-center" href="checkout.html">
            <img className="cart-icon" src={cartIcon} alt="Cart Icon" />
            <div className="cart-quantity js-cartQuantity ml-2">0</div>
            <div className="cart-text ml-2">Cart</div>
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;
