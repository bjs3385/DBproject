import React from "react";
import "./Header.css"
import {Link} from "react-router-dom";

//<img src={$logo} alt={$mall_name} />
//.topArea__logo

const Logo = () => {
    const id = localStorage.getItem("id");
    return (
        <div id="Logo">
            <h1><a href="/"><img src="https://www.brooksbrothers.co.kr/images/common/logo_m.png"
                                                  alt="브룩스브라더스"/></a></h1>

        </div>
    );
}
export default Logo;