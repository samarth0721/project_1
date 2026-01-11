import React, { useState, useEffect } from 'react';
import UserCard from '../Components/UserCard';
import './Products.css';
import AddProduct from '../Components/AddProducts';

const Products = ({cartItems,setCartItems}) => {
    const [productList, setProductList] = useState([]);
    const [showForm,setShowForm] = useState(false);
    
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);
                setError(null); // Reset error on retry
                const response = await fetch('http://localhost:4000/api/v1/icecreams');
                
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                
                const responseData = await response.json(); // Full response: { success, data, message? }
                
                if (responseData.success) {
                    setProductList(responseData.data || []); // Extract the array from 'data'
                } else {
                    throw new Error(responseData.message || 'Failed to fetch products');
                }
            } catch (err) {
                setError(err.message);
                console.error('Error fetching products:', err);
                setProductList([]); // Set empty array on error to avoid mapping issues
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    const handleAddToList = (product) => {
        setCartItems([...cartItems, product]);
    };

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
            <h2>Product List</h2>
            <div className="available-products">
                {productList.length === 0 ? (
                    <p>No products available.</p>
                ) : (
                    productList.map((product) => (
                        <UserCard
                            key={product._id || product.id} // Use MongoDB _id or id for key
                            image={product.iceUrl} // Assuming 'image' is a URL string from File model
                            name={product.iceName}
                            price={product.price}
                            description={product.description}
                            tag={product.tags}
                            onAddToCart={() => handleAddToList(product)}
                        />
                    ))
                )}
            </div>

            <div>
                <button className="floating-add-btn" onClick={()=> setShowForm(true) }>+</button>

                {
                    showForm && (
                        <div className='modal-overlay' onClick={()=>setShowForm(false)}>
                            <div className='modal-content' onClick={(e)=>e.stopPropagation()}>
                                <AddProduct />
                            </div>
                        </div>
                    )
                }
            </div>

            
        </div>
    );
};

export default Products;