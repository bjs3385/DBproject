import React, { useEffect } from "react";
import "./TopBar.css"
import {Link} from "react-router-dom";

//<img src={$logo} alt={$mall_name} />
//.topArea__logo

const TopBar = () => {





    return (
        <nav id="top_gnb"><p>----Nav----</p>
            <div className="menu item1 active">
                <Link to="/category/all">ALL</Link>
            </div>
            <div className="menu item2">
                <Link to="/category/all">OUTER</Link>
                </div>
            <div className="menu item3">
                <Link to="/category/all">DRESS</Link>
                </div>
            <div className="menu item4">
                <Link to="/category/all">BAG</Link>
                </div>
            <div className="menu item5">
                <Link to="/category/all">BOOTS</Link>
               </div>
            <div className="menu item6">
                <Link to="/category/all">SKIRT</Link>
                </div>
            <div className="menu item7">
                <Link to="/category/all">CAP</Link>
                </div>
            <div className="menu item8">
                <Link to="/category/all">TSHIRT</Link>
                </div>
            <div className="menu item10">
                <Link to="/category/all">WATCH</Link>
                </div>
        </nav>
    );
}
export default TopBar;