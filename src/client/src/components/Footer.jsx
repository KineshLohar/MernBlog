import React from "react";

function Footer(){

    var currentYear = new Date().getFullYear();
    return (
        <div className="footer">
            <p>Copyright © {currentYear}</p>
        </div>
    )
};

export default Footer;