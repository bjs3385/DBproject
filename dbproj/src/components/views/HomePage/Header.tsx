import React from "react";
import "./Header.css"
import {Link} from "react-router-dom";

//<img src={$logo} alt={$mall_name} />
//.topArea__logo

const Header = () => {
    const id = localStorage.getItem("id");
    return (
        <div id="Header">
            <div id="Header-menu">
                {
                    id == "admin" ? (<span><Link to={"/"}>상품 추가</Link> | </span>) : (<span></span>)
                }
                {
                    !id ? (<span><Link to="/login">로그인</Link> | </span>) : (
                        <span><Link to="/" onClick={() => localStorage.clear()}>로그아웃</Link> | </span>)
                }
                {
                    !id ? (<span><Link to="/newRegister">회원가입</Link> | </span>) : (<span></span>)
                }
                <span><Link to="/mypage">장바구니</Link></span>
                <span> | </span>
                <span><Link to="/order">주문내역</Link></span>
            </div>
            <h1 id="Header-logo"><a href="/"><img src="https://www.brooksbrothers.co.kr/images/common/logo_m.png"
                                                  alt="브룩스브라더스"/></a></h1>

        </div>
    );
}
export default Header;