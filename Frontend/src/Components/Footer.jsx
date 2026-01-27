import React from 'react';
import { FaFacebook, FaInstagram, FaTwitter, FaPhone, FaEnvelope } from 'react-icons/fa'; // Social icons
import './Footer.css'; // Separate CSS

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="footer-section">
                    <h3>FrozenFeast</h3>
                    <p>Scoop into happiness, anytime, anywhere! Indulge in our frozen delights with dine-in, delivery, or catering options.</p>
                    <div className="social-icons">
                        <a href="https://facebook.com" aria-label="Facebook"><FaFacebook /></a>
                        <a href="https://instagram.com" aria-label="Instagram"><FaInstagram /></a>
                        <a href="https://twitter.com" aria-label="Twitter"><FaTwitter /></a>
                    </div>
                </div>
                <div className="footer-section">
                    <h4>Quick Links</h4>
                    <ul>
                        <li><a href="/">Home</a></li>
                        <li><a href="/products">Products</a></li>
                        <li><a href="/delivery">Delivery</a></li>
                        <li><a href="/dinein">Dine In</a></li>
                        <li><a href="/catering">Catering</a></li>
                    </ul>
                </div>
                <div className="footer-section">
                    <h4>Contact Us</h4>
                    <p><FaPhone /> +91 95183 23285</p>
                    <p><FaEnvelope /> harshsakhare450@gmail.com</p>
                    <p><FaEnvelope /> samarthkawade2005@gmail.com</p>
                    <p>Pune, Maharashtra</p>
                </div>
            </div>
            <div className="footer-bottom">
                <p>&copy; 2024 FrozenFeast. All rights reserved. | Made with ❤️ in Pune</p>
            </div>
        </footer>
    );
};

export default Footer;