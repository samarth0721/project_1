import React from 'react';
import './UserCard.css';

const UserCard = ({ image, name, price, description, tag, discount, onAddToCart }) => {
  return (
    <div className="user-container">
      <div className="image-wrapper">
        <img className="user-img" src={image} alt={`${name} image`} />
        {discount && <span className="discount-badge">{discount}</span>}
        {tag && <span className="tag-label">{tag}</span>}
      </div>
      <div className="user-info">
        <p className="user-name">{name}</p>
        <p className="user-price">{price}</p>
      </div>
      <p className="user-desc">{description}</p>
      <button type="button" className="add-to-cart-btn" onClick={onAddToCart}>
        Add to Cart
      </button>
    </div>
  );
};

export default UserCard;