import React from "react";
import {
    Link
  } from "react-router-dom";
  

function Header(){
    return(
            <div className="header-nav">
            <nav className="navbar navbar-default">
                <div className="container">
                <div className="navbar-header">
                    <p className="navbar-brand">MERN Blog</p>
                </div>
                    <ul className="nav navbar-nav navbar-right">
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/about">About Us</Link></li>
                        <li><Link to="/create">Create</Link></li>
                    </ul>
                </div>
            </nav>
            </div>
    );
};

export default Header;