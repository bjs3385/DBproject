import React from "react";
import "./Footer.css"

//<img src={$logo} alt={$mall_name} />
//.topArea__logo

const Footer = () => {
    return (
        <footer id="footer">
            <h2 className="blind">
                <hr/>
            </h2>
            <div className="inner">
                <div>
                    <ul className="util">
                        <li><a href="/">Home</a></li>
                        <li><a href="/shopinfo/company.html">About Us</a></li>
                        <li><a href="/member/mall_agreement.html">Terms&amp;Conditions</a></li>
                        <li><a href="/member/privacy.html">Privacy Policy<strong></strong></a></li>
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
                    <span>법인명(상호) : ㈜Artworks Korea - BrooksBrothers </span> <span>대표자(성명) : 박춘하 </span> <span>사업자 등록번호 안내 : [643-85-01841]</span> <span>통신판매업 신고 제 2021-서울동대문-1799호</span> <span></span> <br />
                    <span>전화 : 010-1234-5678</span> <span>팩스 : 02-345-6789</span> <span>주소 : 서울특별시 용산구 한강대로 372, 16층 (동자동, KDB타워)</span><br />
                    <span className="{$cpo_email|display}">개인정보보호책임자 : 박춘하<a href="mailto:{$cpo_email}">(abc@abc.com)</a></span><br />
                    <span>Contact <a href="mailto:{$email}">abc@abc.com</a> for more information.</span>
                        </div>
                        <div className="info__customer">
                            <div className="heading">
                                <h3 className="title">Customer</h3>
                                <button type="button" className="toggle"><i aria-hidden="true"
                                                                            className="icon icoArrowBottom"></i>open
                                </button>
                            </div>
                            <ul className="content">
                            <li className="tel">010-1234-1234</li>
                        <li className="runtime">오전 09:00~18:00 점심시간 12:00~13:00<br/>주말/공휴일 휴무</li>
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
                    <p className="copyright">Copyright &copy; <strong>BROOKS BROTHERS GROUP, INC</strong>. All rights reserved.</p>
                    <br />
                </div>
            </div>
        </footer>
    );
}
export default Footer;