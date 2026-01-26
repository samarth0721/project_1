import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Added for potential redirection
import './Delivery.css';

const Delivery = () => {
    const [deliveryData, setDeliveryData] = useState({
        name: "", contact: "", streetAdd: "", city: "", pin: "", district: ""
    });

    const [loading, setLoading] = useState(false); // Added loading state
    const [showPopup, setShowPopup] = useState(false);
    const [popupMessage, setPopupMessage] = useState(""); // Dynamic message for success/error

    const navigate = useNavigate(); // For potential redirection after submission

    function changeHandler(event) {
        const { name, value } = event.target;
        setDeliveryData(prev => ({ ...prev, [name]: value }));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!deliveryData.name || !deliveryData.contact || !deliveryData.streetAdd || !deliveryData.city || !deliveryData.pin || !deliveryData.district) {
            setPopupMessage("Please fill in all required fields.");
            setShowPopup(true);
            setTimeout(() => setShowPopup(false), 3000);
            return;
        }

        setLoading(true);
        try {
            // Get token from localStorage (assuming auth is required)
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error("Please log in to submit delivery details.");
            }

            // Backend API call to delivery endpoint
            const response = await fetch('http://localhost:4000/api/v1/user/delivery', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`, // Auth header for middleware
                },
                body: JSON.stringify(deliveryData),
            });

            const responseData = await response.json();

            if (response.ok && responseData.success) {
                // Successful submission
                setDeliveryData({ name: "", contact: "", streetAdd: "", city: "", pin: "", district: "" });
                setPopupMessage("✅ Delivery details submitted successfully!");
                setShowPopup(true);
                setTimeout(() => {
                    setShowPopup(false);
                }, 3000);
            } else {
                throw new Error(responseData.message || 'Submission failed');
            }
        } catch (error) {
            console.error("Delivery submission error:", error);
            setPopupMessage(`❌ ${error.message}`);
            setShowPopup(true);
            setTimeout(() => setShowPopup(false), 3000);
        } finally {
            setLoading(false);
        }
    };

    function resetHandler() {
        setDeliveryData({ name: "", contact: "", streetAdd: "", city: "", pin: "", district: "" });
    }

    return (
        <div>
            <div className="ribbon-container">
                <div className="ribbon">
                    <span className="ribbon-text">Delivery</span>
                </div>
                <div className="subtitle">
                    <p>Enter Your Details</p>
                </div>
            </div>

            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="name">Name</label>
                    <input
                        type="text"
                        placeholder="Enter your name"
                        name="name"
                        id="name"
                        value={deliveryData.name}
                        onChange={changeHandler}
                        required
                        disabled={loading} // Disable during loading
                    />

                    <label htmlFor="contact">Contact Number</label>
                    <input
                        type="tel"
                        placeholder="Enter your contact number"
                        name="contact"
                        id="contact"
                        value={deliveryData.contact}
                        onChange={changeHandler}
                        pattern="[0-9]{10}"
                        title="Enter a valid 10-digit phone number"
                        required
                        disabled={loading} // Disable during loading
                    />

                    <label htmlFor="streetAdd">Street Address</label>
                    <input
                        type="text"
                        placeholder="Enter your street address"
                        name="streetAdd"
                        id="streetAdd"
                        value={deliveryData.streetAdd}
                        onChange={changeHandler}
                        required
                        disabled={loading} // Disable during loading
                    />

                    <label htmlFor="city">City</label>
                    <input
                        type="text"
                        placeholder="Enter your city"
                        name="city"
                        id="city"
                        value={deliveryData.city}
                        onChange={changeHandler}
                        required
                        disabled={loading} // Disable during loading
                    />

                    <label htmlFor="pin">PIN code</label>
                    <input
                        type="text"
                        placeholder="Enter your PIN code"
                        name="pin"
                        value={deliveryData.pin}
                        onChange={changeHandler}
                        pattern="[0-9]{6}"
                        title="Enter a valid 6-digit PIN code"
                        required
                        disabled={loading} // Disable during loading
                    />

                    <label htmlFor="district">District</label>
                    <select
                        name="district"
                        id="district"
                        value={deliveryData.district}
                        onChange={changeHandler}
                        required
                        disabled={loading} // Disable during loading
                    >
                        <option value="">-- Select District --</option>
                        <option>Ahmednagar</option>
                        <option>Amravati</option>
                        <option>Beed</option>
                        <option>Bhandara</option>
                        <option>Chandrapur</option>
                        <option>Dhule</option>
                        <option>Gadchiroli</option>
                        <option>Hingoli</option>
                        <option>Kolhapur</option>
                        <option>Mumbai</option>
                        <option>Pune</option>
                    </select>
                </div>
                <div>
                    <button type="submit" value="submit" disabled={loading}>
                        {loading ? "Submitting..." : "Submit"}
                    </button>
                    <button type="button" value="reset" onClick={resetHandler} disabled={loading}>
                        Clear
                    </button>
                </div>
            </form>
            {showPopup && (
                <div className={`popup ${popupMessage.includes('❌') ? 'error' : 'success'}`}>
                    {popupMessage}
                </div>
            )}
        </div>
    );
}

export default Delivery;