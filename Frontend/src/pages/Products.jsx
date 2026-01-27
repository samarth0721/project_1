import React, { useState, useEffect } from 'react';
import UserCard from '../Components/UserCard';
import './Products.css';
import AddProduct from '../Components/AddProducts';
import { motion } from 'framer-motion';

const Products = ({ cartItems, setCartItems }) => {
    const [productList, setProductList] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [showAlert, setShowAlert] = useState(false); // ✅ New state for cart alert

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // ✅ admin check
    const isAdmin = localStorage.getItem("role") === "admin";

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);
                setError(null);

                const response = await fetch('http://localhost:4000/api/v1/icecreams');

                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                const responseData = await response.json();

                if (responseData.success) {
                    setProductList(responseData.data || []);
                } else {
                    throw new Error(responseData.message || 'Failed to fetch products');
                }
            } catch (err) {
                setError(err.message);
                console.error('Error fetching products:', err);
                setProductList([]);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    const handleAddToList = (product) => {
        // ✅ Check if product already exists in cart
        const existingProductIndex = cartItems.findIndex(item => item._id === product._id);

        if (existingProductIndex > -1) {
            // Increase quantity if exists
            const updatedCart = cartItems.map((item, index) =>
                index === existingProductIndex
                    ? { ...item, quantity: (item.quantity || 1) + 1 }
                    : item
            );
            setCartItems(updatedCart);
        } else {
            // Add new product with quantity 1
            setCartItems([...cartItems, { ...product, quantity: 1 }]);
        }

        setShowAlert(true); // ✅ Show alert on successful add
    };

    // ✅ Auto-hide alert after 3 seconds
    useEffect(() => {
        if (showAlert) {
            const timer = setTimeout(() => {
                setShowAlert(false);
            }, 3000);

            return () => clearTimeout(timer); // Cleanup timer
        }
    }, [showAlert]);

    if (loading) {
        return <div className="product-container">Loading products...</div>;
    }

    if (error) {
        return (
            <div className="product-container">
                <p>Error: {error}</p>
                <button onClick={() => window.location.reload()}>Retry</button>
            </div>
        );
    }

    return (
        <div className="product-container">
            <div className="banner">
                <span className="banner-text">Product List</span>
            </div>

            <div className="available-products">
                {productList.length === 0 ? (
                    <p>No products available.</p>
                ) : (
                    productList.map((product, index) => (
                        <motion.div
                            key={product._id}
                            className="product-card"
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <UserCard
                                image={product.iceUrl}
                                name={product.iceName}
                                price={product.price}
                                description={product.description}
                                tag={product.tags}
                                onAddToCart={() => handleAddToList(product)}
                            />
                        </motion.div>
                    ))
                )}
            </div>

            {/* ✅ SHOW ONLY IF ADMIN */}
            {isAdmin && (
                <div>
                    <button
                        className="floating-add-btn"
                        onClick={() => setShowForm(true)}
                    >
                        +
                    </button>

                    {showForm && (
                        <div
                            className="modal-overlay"
                            onClick={() => setShowForm(false)}
                        >
                            <div
                                className="modal-content"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <AddProduct />
                            </div>
                        </div>
                    )}
                </div>
            )}

            {/* ✅ Cart Success Alert */}
            {showAlert && (
                <div className="cart-alert">
                    <p>Product added to cart! 🎉</p>
                    <button onClick={() => setShowAlert(false)} className="alert-close">
                        ×
                    </button>
                </div>
            )}
        </div>
    );
};

export default Products;

// import React, { useState, useEffect } from 'react';
// import UserCard from '../Components/UserCard';
// import './Products.css';
// import AddProduct from '../Components/AddProducts';

// const Products = ({ cartItems, setCartItems }) => {
//     const [productList, setProductList] = useState([]);
//     const [showForm, setShowForm] = useState(false);
//     const [showAlert, setShowAlert] = useState(false); // ✅ New state for cart alert

//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);

//     // ✅ admin check
//     const isAdmin = localStorage.getItem("role") === "admin";

//     useEffect(() => {
//         const fetchProducts = async () => {
//             try {
//                 setLoading(true);
//                 setError(null);

//                 const response = await fetch('http://localhost:4000/api/v1/icecreams');

//                 if (!response.ok) {
//                     throw new Error(`HTTP error! Status: ${response.status}`);
//                 }

//                 const responseData = await response.json();

//                 if (responseData.success) {
//                     setProductList(responseData.data || []);
//                 } else {
//                     throw new Error(responseData.message || 'Failed to fetch products');
//                 }
//             } catch (err) {
//                 setError(err.message);
//                 console.error('Error fetching products:', err);
//                 setProductList([]);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchProducts();
//     }, []);

//     const handleAddToList = (product) => {
//         setCartItems([...cartItems, product]);
//         setShowAlert(true); // ✅ Show alert on successful add
//     };

//     // ✅ Auto-hide alert after 3 seconds
//     useEffect(() => {
//         if (showAlert) {
//             const timer = setTimeout(() => {
//                 setShowAlert(false);
//             }, 3000);

//             return () => clearTimeout(timer); // Cleanup timer
//         }
//     }, [showAlert]);

//     if (loading) {
//         return <div className="product-container">Loading products...</div>;
//     }

//     if (error) {
//         return (
//             <div className="product-container">
//                 <p>Error: {error}</p>
//                 <button onClick={() => window.location.reload()}>Retry</button>
//             </div>
//         );
//     }

//     return (
//         <div className="product-container">
//             <div className="banner">
//                 <span className="banner-text">Product List</span>
//             </div>

//             <div className="available-products">
//                 {productList.length === 0 ? (
//                     <p>No products available.</p>
//                 ) : (
//                     productList.map((product) => (
//                         <UserCard
//                             key={product._id || product.id}
//                             image={product.iceUrl}
//                             name={product.iceName}
//                             price={product.price}
//                             description={product.description}
//                             tag={product.tags}
//                             onAddToCart={() => handleAddToList(product)}
//                         />
//                     ))
//                 )}
//             </div>

//             {/* ✅ SHOW ONLY IF ADMIN */}
//             {isAdmin && (
//                 <div>
//                     <button
//                         className="floating-add-btn"
//                         onClick={() => setShowForm(true)}
//                     >
//                         +
//                     </button>

//                     {showForm && (
//                         <div
//                             className="modal-overlay"
//                             onClick={() => setShowForm(false)}
//                         >
//                             <div
//                                 className="modal-content"
//                                 onClick={(e) => e.stopPropagation()}
//                             >
//                                 <AddProduct />
//                             </div>
//                         </div>
//                     )}
//                 </div>
//             )}

//             {/* ✅ Cart Success Alert */}
//             {showAlert && (
//                 <div className="cart-alert">
//                     <p>Product added to cart! 🎉</p>
//                     <button onClick={() => setShowAlert(false)} className="alert-close">
//                         ×
//                     </button>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default Products;