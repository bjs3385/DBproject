import React, { useEffect } from "react";
import "./Header.css"

//<img src={$logo} alt={$mall_name} />
//.topArea__logo

const Header = () => {
    return (
        <div id="Header">
            <p>----Header----</p>
            <h1 id="Header-logo"><a href="/index.html"><img src="https://www.brooksbrothers.co.kr/images/common/logo_m.png" alt="브룩스브라더스"/></a></h1>
            <div id="Header-menu">
                <span><a href="#">로그인</a></span>
                <span><a href="#">회원가입</a></span>
                <span><a href="#">장바구니</a></span>
                <span><a href="#">주문내역</a></span>
            </div>
        </div>
    );
}
export default Header;