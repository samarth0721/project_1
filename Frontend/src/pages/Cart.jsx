import React, { useState, useEffect } from "react";
import './Cart.css';
import CartCard from "../Components/CartCard";

const Cart = ({ addedProducts = [], setCartItems }) => {
    const [cartProducts, setCartProductsLocal] = useState([]);
    const [totalAmount, setTotalAmount] = useState(0);
    const [addressList, setAddressList] = useState([]);

    useEffect(() => {
        const fetchAddress = async () => {
            try {
                const token = localStorage.getItem("token");
                const response = await fetch('http://localhost:4000/api/v1/deliveries', {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`  // 👈 MUST SEND
                    }
                });

                if (!response.ok) {
                    console.log("HTTP Error in fetching address.");
                    return;
                }

                const responseData = await response.json();

                if (responseData.success) {
                    setAddressList(responseData.deliveries || []);
                } else {
                    console.log("Failed to fetch address");
                }
            } catch (error) {
                console.error("Error fetching Address:", error);
            }
        };

        fetchAddress();
    }, [addressList]);


    useEffect(() => {
        const productWithQuantity = addedProducts.map((item) => ({
            ...item,
            quantity: item.quantity || 1,
        }));
        setCartProductsLocal(productWithQuantity);
    }, [addedProducts]);

    useEffect(() => {
        const total = cartProducts.reduce(
            (acc, item) => acc + item.price * item.quantity,
            0
        );
        setTotalAmount(total);
    }, [cartProducts]);

    const removeFromCartHandler = (product) => {
        const newCart = cartProducts.filter((item) => item._id !== product._id);
        setCartProductsLocal(newCart);
        setCartItems(newCart);
    };

    const updateQuantityHandler = (productId, newQuantity) => {
        const updatedCart = cartProducts.map((item) =>
            item._id === productId ? { ...item, quantity: newQuantity } : item
        );
        setCartProductsLocal(updatedCart);
        setCartItems(updatedCart);
    };

    return (
        <div className="cart-page">
            {cartProducts && cartProducts.length > 0 ? (
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
                        <p>Total Amount: ₹{totalAmount}</p>
                        <button className="checkout-btn">Checkout</button>
                        <h2>Select Address</h2>
                        <div>
                            {addressList.length === 0 ?
                                (<p>Login and fill delivery form</p>

                                ) : (

                                    addressList.map((add, index) => (
                                        <label key={index} className="address-card">
                                            <input type="radio" name="selectAddress" />
                                            {add.streetAdd}, {add.city}, {add.district}, {add.pin}
                                        </label>
                                    ))
                                )}
                        </div>

                    </div>
                </div>
            ) : (
                <div className="cart-empty">
                    <h2>Your cart is empty</h2>
                </div>
            )}
        </div>
    );
};

export default Cart;
