import React, { useEffect } from "react";
import "./TopBar.css"

//<img src={$logo} alt={$mall_name} />
//.topArea__logo

const TopBar = () => {
    return (
        
        <nav id="top_gnb"><p>----Nav----</p>
            <div className="menu item1 active"><a>전체</a></div>
            <div className="menu item2"><a>아우터</a></div>
            <div className="menu item3"><a>상의</a></div>
            <div className="menu item4"><a>바지</a></div>
            <div className="menu item5"><a>원피스</a></div>
            <div className="menu item6"><a>스커트</a></div>
            <div className="menu item7"><a>모자</a></div>
            <div className="menu item8"><a>가방</a></div>
            <div className="menu item10"><a>액세서리</a></div>
        </nav>
    );
}
export default TopBar;