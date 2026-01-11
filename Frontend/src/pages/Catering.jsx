import React, { useState } from 'react';
import { Link } from "react-router-dom";
import './Catering.css';

const Catering = () => {
    const [fname, setFname] = useState("");
    const [email, setEmail] = useState("");
    const [contact, setContact] = useState("");
    const [eventDate, setEventDate] = useState("");
    const [eventType, setEventType] = useState('');
    const [streetAddress, setStreetAddress] = useState('');
    const [district, setDistrict] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false); 
    const [showPopup, setShowPopup] = useState(false);


    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Example: fake API delay
        setTimeout(() => {
            console.log({
                fname, email, contact, eventDate, eventType, streetAddress, district
            });

            setIsSubmitting(false);
            setShowPopup(true); // 👈 show popup
            handleClear();

            // hide popup after 3s
            setTimeout(() => setShowPopup(false), 3000);
        }, 2000);

    };

    const handleClear = () => {
        setFname('');
        setEmail('');
        setContact('');
        setEventDate('');
        setEventType('');
        setStreetAddress('');
        setDistrict('');
    };

    return (
        <div>
            <div className="banner-container">
                <div className="banner">
                    <span className="banner-text">Event Catering</span>
                </div>
                <p className="event-text">Tell us about your event</p>
            </div>

            <div className="form-container">
                <div className="form-group">
                    <label>Name</label>
                    <input
                        type='text'
                        placeholder='Name'
                        value={fname}
                        onChange={(e) => setFname(e.target.value)}
                        required
                        maxLength={10}
                    />
                </div>

                <div className="form-group">
                    <label>Email Id</label>
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Contact No.</label>
                    <input
                        type="tel"
                        placeholder='Contact No.'
                        value={contact}
                        onChange={(e) => setContact(e.target.value)}
                        maxLength={10}
                        required
                    />
                </div>

                <div className="form-group" >
                    <label>Event Date</label>
                    <input
                        id='e'
                        type="date"
                        value={eventDate}
                        onChange={(e) => setEventDate(e.target.value)}
                        required
                    />
                </div>

                <div className="form-group">
                    <label className="text">Event Type</label>

                    <label className="radio">
                        <input
                            type="radio"
                            id="self-pickup"
                            name="eventType"
                            value="Self Service Pickup"
                            checked={eventType === 'Self Service Pickup'}
                            onChange={(e) => setEventType(e.target.value)}
                        />
                        Self Service Pickup
                    </label>

                    <label className="radio">
                        <input
                            type="radio"
                            id="self-delivery"
                            name="eventType"
                            value="Self Service Delivery"
                            checked={eventType === 'Self Service Delivery'}
                            onChange={(e) => setEventType(e.target.value)}
                        />
                        Self Service Delivery
                    </label>

                    <label className="radio">
                        <input
                            type="radio"
                            id="full-service"
                            name="eventType"
                            value="Full Service Catering"
                            checked={eventType === 'Full Service Catering'}
                            onChange={(e) => setEventType(e.target.value)}
                        />
                        Full Service Catering
                    </label>

                    <label className="radio">
                        <input
                            type="radio"
                            id="not-sure"
                            name="eventType"
                            value="Not Sure, Want To Learn More"
                            checked={eventType === 'Not Sure, Want To Learn More'}
                            onChange={(e) => setEventType(e.target.value)}
                        />
                        Not Sure, Want To Learn More
                    </label>
                </div>

                <div className="form-group">
                    <label>Complete Address</label>
                    <input
                        type="text"
                        placeholder="Street Address"
                        value={streetAddress}
                        onChange={(e) => setStreetAddress(e.target.value)}
                    />
                    
                    <label>Select District</label>
                    <select
                        value={district}
                        onChange={(e) => setDistrict(e.target.value)}
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

                <div className="button-group">
                    <button
                        type="submit"
                        onClick={handleSubmit}
                        disabled={isSubmitting} // 👈 disable while submitting
                    >
                        {isSubmitting ? "Submitting..." : "Submit"} {/* 👈 change text */}
                    </button>
                    <button
                        type="button"
                        onClick={handleClear}
                        disabled={isSubmitting} // optional: prevent clearing during submit
                    >
                        Clear
                    </button>
                    {showPopup && (
                        <div className="popup">
                            ✅ Form submitted successfully!
                        </div>
                    )}

                </div>
            </div>
        </div>
    );
};

export default Catering;