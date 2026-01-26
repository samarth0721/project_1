import React, { useState, useEffect } from "react";
import './Cart.css';
import CartCard from "../Components/CartCard";
import { NavLink } from "react-router-dom";

const Cart = ({ addedProducts = [], setCartItems }) => {
    const [cartProducts, setCartProductsLocal] = useState([]);
    const [totalAmount, setTotalAmount] = useState(0);
    const [addressList, setAddressList] = useState([]);
    const [selectedAddress, setSelectedAddress] = useState(null); // ✅ New: Track selected address
    const [loadingAddresses, setLoadingAddresses] = useState(true); // ✅ New: Loading state
    const [addressError, setAddressError] = useState(null); // ✅ New: Error state

    // ✅ Fixed: Fetch addresses once on mount (empty deps)
    useEffect(() => {
        const fetchAddress = async () => {
            try {
                setLoadingAddresses(true);
                setAddressError(null);
                const token = localStorage.getItem("token");
                if (!token) {
                    setAddressError("Please log in to fetch addresses.");
                    return;
                }

                const response = await fetch('http://localhost:4000/api/v1/deliveries', {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    }
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                const responseData = await response.json();

                if (responseData.success) {
                    setAddressList(responseData.deliveries || []);
                    if (responseData.deliveries && responseData.deliveries.length > 0) {
                        setSelectedAddress(responseData.deliveries[0]._id); // ✅ Default to first address
                    }
                } else {
                    throw new Error(responseData.message || 'Failed to fetch addresses');
                }
            } catch (error) {
                setAddressError(error.message);
                console.error("Error fetching Addresses:", error);
                setAddressList([]);
            } finally {
                setLoadingAddresses(false);
            }
        };

        fetchAddress();
    }, []); // ✅ Fixed: Empty dependency array to prevent infinite loop

    useEffect(() => {
        const productWithQuantity = addedProducts.map((item) => ({
            ...item,
            quantity: item.quantity || 1,
        }));
        setCartProductsLocal(productWithQuantity);
    }, [addedProducts]);

    useEffect(() => {
        const total = cartProducts.reduce(
            (acc, item) => acc + (item.price * item.quantity || 0),
            0
        );
        setTotalAmount(total);
    }, [cartProducts]);

    const removeFromCartHandler = (product) => {
        const newCart = cartProducts.filter((item) => item._id !== product._id);
        setCartProductsLocal(newCart);
        setCartItems(newCart); // Sync with parent
    };

    const updateQuantityHandler = (productId, newQuantity) => {
        if (newQuantity < 1) return; // Prevent negative/zero quantity
        const updatedCart = cartProducts.map((item) =>
            item._id === productId ? { ...item, quantity: newQuantity } : item
        );
        setCartProductsLocal(updatedCart);
        setCartItems(updatedCart); // Sync with parent
    };

    const handleAddressChange = (addressId) => {
        setSelectedAddress(addressId);
    };

    const handleCheckout = () => {
        if (!selectedAddress) {
            alert("Please select a delivery address."); // ✅ Simple validation
            return;
        }
        if (cartProducts.length === 0) {
            alert("Your cart is empty.");
            return;
        }
        // ✅ TODO: Implement checkout logic (e.g., API call, navigation)
        console.log("Proceeding to checkout with:", { cartProducts, selectedAddress, totalAmount });
        // Example: navigate('/payment', { state: { orderData: { cartProducts, addressId: selectedAddress, total: totalAmount } } });
    };

    if (addedProducts.length === 0) {
        return (
            <div className="cart-page">
                <div className="cart-empty">
                    <h2>Your cart is empty</h2>
                    <NavLink to="/products" className="shop-now-btn">
                        Shop Now
                    </NavLink>
                </div>
            </div>
        );
    }

    return (
        <div className="cart-page">
            <div className="cart-content">
                <div className="cart-items-section">
                    {cartProducts.map((product) => (
                        <CartCard
                            key={product._id}
                            image={product.iceUrl}
                            name={product.iceName}
                            price={product.price}
                            description={product.description}
                            tag={product.tags}
                            quantity={product.quantity}
                            removeFromCart={() => removeFromCartHandler(product)}
                            onQuantityChange={(newQty) =>
                                updateQuantityHandler(product._id, newQty)
                            }
                        />
                    ))}
                </div>

                <div className="cart-summary-section">
                    <h2>Your Summary</h2>
                    <p>Total Items: {cartProducts.reduce((acc, item) => acc + item.quantity, 0)}</p>
                    <p>Total Amount: ₹{totalAmount.toFixed(2)}</p>

                    <button className="checkout-btn" onClick={handleCheckout} disabled={loadingAddresses}>
                        {loadingAddresses ? "Loading..." : `Checkout (₹${totalAmount.toFixed(2)})`}
                    </button>

                    <h2>Select Address</h2>
                    {loadingAddresses ? (
                        <p>Loading addresses...</p>
                    ) : addressError ? (
                        <p className="error-message">{addressError}</p>
                    ) : addressList.length === 0 ? (
                        <p>Please log in and fill the delivery form to add addresses.</p>
                    ) : (
                        <div className="address-list">
                            {addressList.map((add) => (
                                <label key={add._id} className={`address-card ${selectedAddress === add._id ? 'selected' : ''}`}>
                                    <input
                                        type="radio"
                                        name="selectAddress"
                                        value={add._id}
                                        checked={selectedAddress === add._id}
                                        onChange={() => handleAddressChange(add._id)}
                                    />
                                    <div className="address-details">
                                        <p>{add.streetAdd}, {add.city}, {add.district}, {add.pin}</p>
                                        {add.phone && <p className="address-phone">Phone: {add.phone}</p>}
                                    </div>
                                </label>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Cart;