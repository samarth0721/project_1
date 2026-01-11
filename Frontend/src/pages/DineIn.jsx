import React, { useEffect, useState } from "react";
import ShopCard from "../Components/ShopCard";
import './DineIn.css'; // Import CSS for layout and styling

const DineIn = () => {
    const [dineinList, setDineinList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [location, setLocation] = useState(''); // State for search input

    useEffect(() => {
        const fetchDinein = async () => {
            try {
                setLoading(true);
                setError(null); // Reset error on fetch
                const response = await fetch('http://localhost:4000/api/v1/shop');

                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                const responseData = await response.json();

                if (responseData.success) {
                    setDineinList(responseData.data || []); // Ensure array
                } else {
                    throw new Error(responseData.message || 'Failed to fetch shops');
                }

            } catch (error) {
                console.error("Error fetching Dine in:", error);
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchDinein();
    }, []);

    const handleSelectShop = (shop) => {
        console.log('Selected shop:', shop.shopName); 
    };

    const handleSearch = (e) => {
        e.preventDefault();
        console.log('Searching for shops near:', location); 
    };

    if (loading) {
        return <div className="dinein-container">Loading Dine in...</div>;
    }

    if (error) {
        return (
            <div className="dinein-container">
                <p>Error: {error}</p>
                <button onClick={() => window.location.reload()}>Retry</button>
            </div>
        );
    }

    return (
        <div className="dinein-container">
            {/* Search Section from Image */}
            <div className="search-section">
                <div className="ribbon-container">
                    <div className="ribbon">
                        <span className="ribbon-text">Dine-In</span>
                    </div>
                </div>
                <h2 className="search-title">Find your nearest store</h2>
                <form className="location-search" onSubmit={handleSearch}>
                    <div className="search-wrapper">
                        <input
                            type="text"
                            placeholder="Enter your current location"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            className="location-input"
                        />
                        <button type="submit" className="search-button-new">
                            🔍 {/* Magnifying glass icon */}
                        </button>
                    </div>
                </form>
            </div>

            {/* Shops Grid */}
            <div className="shops-grid">
                {dineinList.length === 0 ? (
                    <p>No shops available for dine-in.</p>
                ) : (
                    dineinList.map((shop) => (
                        <ShopCard
                            key={shop._id || shop.id} // Use unique ID for key
                            shopName={shop.shopName}
                            shopImageUrl={shop.shopImageUrl}
                            location={shop.location}
                            rating={shop.rating || 0} // Default if missing
                            onSelectShop={() => handleSelectShop(shop)}
                        />
                    ))
                )}
            </div>
        </div>
    );
}

export default DineIn;