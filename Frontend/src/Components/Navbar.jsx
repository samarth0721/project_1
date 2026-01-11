import logo from '../assets/logo.png'
import { IoPerson } from "react-icons/io5";
import { FaShoppingCart } from "react-icons/fa";
import './Navbar.css';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';


function Navbar() {

    return (
        <div>
            <nav>
                <div className='image'>
                    <NavLink to="/">
                        <img src={logo}></img>
                        <p>FrozenFeast</p>
                    </NavLink>
                </div>
                <div className='menu' >
                    <NavLink to="/">
                    <button>Home</button>
                    </NavLink>
                    <NavLink to="/products">
                    <button>Products</button>
                    </NavLink>
                    <NavLink to="/delivery">
                    <button>Delivery</button>
                    </NavLink>
                    <NavLink to="/dinein">
                    <button>Dine In</button>
                    </NavLink>
                    <NavLink to="/catering">
                    <button>Catering</button>
                    </NavLink>
                </div>
                <div className='icon'>
                    <NavLink to="/login">
                    <button><IoPerson /></button>
                    </NavLink>
                    <NavLink to="/cart">
                    <button><FaShoppingCart /></button>
                    </NavLink>
                    
                </div>
            </nav>
        </div>
    )
}

export default Navbar;