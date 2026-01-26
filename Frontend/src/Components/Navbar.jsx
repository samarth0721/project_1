import logo from '../assets/logo.png';
import { IoPerson } from "react-icons/io5";
import { FaShoppingCart } from "react-icons/fa";
import { FaBars, FaTimes } from "react-icons/fa"; // Add for hamburger
import './Navbar.css';
import { NavLink } from 'react-router-dom';
import { useState } from 'react'; // Now used for mobile toggle

function Navbar() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    return (
        <header className="navbar-header"> {/* Wrapper for better semantics */}
            <nav className="navbar">
                <div className="logo-section">
                    <NavLink to="/" className="logo-link">
                        <img src={logo} alt="FrozenFeast Logo" />
                        <p>FrozenFeast</p>
                    </NavLink>
                </div>

                <div className={`menu-section ${isMobileMenuOpen ? 'mobile-open' : ''}`}>
                    <NavLink
                        to="/"
                        className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
                        onClick={() => setIsMobileMenuOpen(false)} // Close on click (mobile)
                    >
                        Home
                    </NavLink>
                    <NavLink
                        to="/products"
                        className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
                        onClick={() => setIsMobileMenuOpen(false)}
                    >
                        Products
                    </NavLink>
                    <NavLink
                        to="/delivery"
                        className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
                        onClick={() => setIsMobileMenuOpen(false)}
                    >
                        Delivery
                    </NavLink>
                    <NavLink
                        to="/dinein"
                        className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
                        onClick={() => setIsMobileMenuOpen(false)}
                    >
                        Dine-In
                    </NavLink>
                    <NavLink
                        to="/catering"
                        className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
                        onClick={() => setIsMobileMenuOpen(false)}
                    >
                        Catering
                    </NavLink>
                </div>

                <div className="icons-section">
                    {localStorage.getItem('token') ? (
                        <NavLink to="/profile" aria-label="Profile">
                            <button className="icon-btn" aria-label="User profile">
                                <IoPerson />
                            </button>
                        </NavLink>
                    ) : (
                        <NavLink to="/login" aria-label="Login">
                            <button className="icon-btn" aria-label="User profile">
                                <IoPerson />
                            </button>
                        </NavLink>
                    )}
                    <NavLink to="/cart" aria-label="Shopping Cart">
                        <button className="icon-btn" aria-label="View cart">
                            <FaShoppingCart />
                        </button>
                    </NavLink>
                    <button
                        className="hamburger-btn"
                        onClick={toggleMobileMenu}
                        aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
                        aria-expanded={isMobileMenuOpen}
                    >
                        {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
                    </button>
                </div>
            </nav>
        </header>
    );
}

export default Navbar;