import React, { useEffect } from "react";
import "./Footer.css"

//<img src={$logo} alt={$mall_name} />
//.topArea__logo

const Footer = () => {
    return (
        <footer id="footer">
    <h2 className="blind"><hr/></h2>
    <div className="inner">
        <div>
            <ul className="util">
                <li><a href="/index.html">Home</a></li>
                <li><a href="/shopinfo/company.html">About Us</a></li>
                <li><a href="/member/mall_agreement.html">Terms&amp;Conditions</a></li>
                <li><a href="/member/privacy.html"><strong>Privacy Policy</strong></a></li>
                <li><a href="/shopinfo/guide.html">Help</a></li>
            </ul>
            <div className="sns">
                <a href="#none">@import(/svg/icon-instagram.html)instagram</a>
                <a href="#none">@import(/svg/icon-facebook.html)facebook</a>
                <a href="#none">@import(/svg/icon-youtube.html)youtube</a>
                <a href="#none">@import(/svg/icon-kakao.html)kakao</a>
            </div>
            <div className="info">
                <div className="info__address">
                    <h3 className="title RW">Company info</h3>
                    <span>법인명(상호) : $company_name </span> <span>대표자(성명) : $president_name</span> <span>사업자 등록번호 안내 : [$company_regno]</span> <span>통신판매업 신고 $network_regno</span> <span>$biz_no_link</span> <br />
                    <span>전화 : $phone</span> <span>팩스 : $fax</span> <span>주소 : $mall_zipcode $mall_addr1 $mall_addr2</span><br />
                    <span className="{$cpo_email|display}">개인정보보호책임자 : <a href="mailto:{$cpo_email}">$cpo_name($cpo_email)</a></span><br />
                    <span>Contact <a href="mailto:{$email}">$email</a> for more information.</span>
                </div>
                <div className="info__customer">
                    <div className="heading">
                        <h3 className="title">Customer</h3>
                        <button type="button" className="toggle"><i aria-hidden="true" className="icon icoArrowBottom"></i>open</button>
                    </div>
                    <ul className="content">
                        <li className="tel">$phone</li>
                        <li className="runtime">$runtime</li>
                    </ul>
                </div>
                <div className="info__community RW">
                    <h3 className="title">Community</h3>
                    <ul>
                        <li><a href="/board/free/list.html?board_no=1">Notice</a></li>
                        <li><a href="/board/product/list.html?board_no=4">Review</a></li>
                        <li><a href="/board/product/list.html?board_no=6">Q&amp;A</a></li>
                        <li><a href="/board/free/list.html?board_no=3">FAQ</a></li>
                    </ul>
                </div>
            </div>
            <p className="copyright">Copyright &copy; <strong>$mall_name</strong>. All rights reserved. Hosting by <span className="hosting">cafe24</span></p>
        </div>
    </div>
</footer>
    );
}
export default Footer;