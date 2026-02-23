import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../assets/img/Boxie.png'; 
import "../styles/Navbar.css";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();

    const toggleMenu = () => setIsOpen(!isOpen);

    // Cerramos menú al navegar
    useEffect(() => setIsOpen(false), [location]);

    return (
        // CAMBIO CLAVE: Si isOpen es true, agregamos la clase 'nav-open'
        <nav className={`navbar ${isOpen ? 'nav-open' : ''}`}>
            <div className="navbar-container">
                
                <Link to="/" className="navbar-logo">
                    <img src={logo} alt="Boxie" />
                </Link>

                <div className={`menu-icon ${isOpen ? 'open' : ''}`} onClick={toggleMenu}>
                    <div className="bar"></div>
                    <div className="bar"></div>
                    <div className="bar"></div>
                </div>

                <ul className={`nav-menu ${isOpen ? 'active' : ''}`}>
                    <li className="nav-item">
                        <Link to="/galeria" className="nav-links">Boxie's</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/nosotros" className="nav-links">Nosotros</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/contacto" className="nav-links">Contacto</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/ayuda" className="nav-links help-btn">Ayuda</Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;