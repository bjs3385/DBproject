import React, {useEffect, useState} from "react";
import {Container} from "@mui/system";
import "./ArticleDetail.css";
import classnames from 'classnames';

function ArticleDetail(this:any) {
    const [toggle1,setToggle1] = useState(true);
    const onClickSelect1 = () => {
        setToggle1(!toggle1)
    };
    const [toggle2,setToggle2] = useState(true);
    const onClickSelect2 = () => {
        setToggle2(!toggle2)
    };
    const [toggle3,setToggle3] = useState(true);
    const onClickSelect3 = () => {
        setToggle3(!toggle3)
    };
    const [toggle4,setToggle4] = useState(true);
    const onClickSelect4 = () => {
        setToggle4(!toggle4)
    };


    return (
        <div  className="xans-product xans-product-additional ">
            <div onClick={onClickSelect1} className={classnames('ec-base-fold', 'theme1', 'eToggle', {selected: toggle1})}>
                <div className="title">
                    <h2>상품결제정보</h2>
                </div>
                <div className="contents">
                    <div className="info">
                        무통장 입금은 상품 구매 대금은 PC뱅킹, 인터넷뱅킹, 텔레뱅킹 혹은 가까운 은행에서 직접 입금하시면 됩니다. &nbsp;
                        <br />
                        주문시 입력한&nbsp;입금자명과 실제입금자의 성명이 반드시 일치하여야 하며, 7일 이내로 입금을 하셔야 하며&nbsp;입금되지
                        않은 주문은 자동취소 됩니다.
                    </div>
                </div>
            </div>

            <div onClick={onClickSelect2} className={classnames('ec-base-fold', 'theme1', 'eToggle', {selected: toggle2})}>
                <div className="title">
                    <h2>배송정보</h2>
                </div>
                <div className="contents">
                    <ul className="info delivery">
                        <li>배송 방법 : 택배</li>
                        <li>배송 지역 : 전국지역</li>
                        <li>배송 비용 : 3000원</li>
                        <li>배송 기간 : 3일 이내</li>
                        <li><br/>배송 안내 : <br />
                            - 산간벽지나 도서지방은 별도의 추가금액을 지불하셔야 하는 경우가 있습니다. <br/>
                            제주지역 6,000원 제주 외 도서산간지역: 8,000원 울릉도 10,000원 <br/>
                            고객님께서 주문하신 상품은 입금 확인후 배송해 드립니다. 다만, 상품종류에 따라서 상품의 배송이 다소 지연될 수 있습니다.
                        </li>
                    </ul>
                </div>
            </div>

            <div onClick={onClickSelect3} className={classnames('ec-base-fold', 'theme1', 'eToggle', {selected: toggle3})}>
                <div className="title">
                    <h2>교환 및 반품정보</h2>
                </div>
                <div className="contents">
                    <div className="info"><br/>반품 불가사유 : <br/>
                        - 고객님의 책임 있는 사유로 상품등이 멸실 또는 훼손된 경우. 단, 상품의 내용을 확인하기 위하여 <br/>
                        포장 등을 훼손한 경우는 제외<br/> - 포장을 개봉하였거나 포장이 훼손되어 상품가치가 상실된 경우
                        <br/> &nbsp;&nbsp;(예 : 가전제품, 식품, 음반 등, 단 액정화면이 부착된 노트북, LCD모니터, 디지털 카메라 등의 불량화소에
                        <br/> &nbsp;&nbsp;따른 반품/교환은 제조사 기준에 따릅니다.)
                        <br/> - 고객님의 사용 또는 일부 소비에 의하여 상품의 가치가 현저히 감소한 경우 단, 화장품등의 경우 시용제품을
                        <br/> &nbsp;&nbsp;제공한 경우에 한 합니다.

                    </div>
                </div>
            </div>

            <div onClick={onClickSelect4} className={classnames('ec-base-fold', 'theme1', 'eToggle', {selected: toggle4})}>
                <div className="title">
                    <h2>서비스문의</h2>
                </div>
                <div className="contents">
                    <div className="info">
                        &nbsp;&nbsp;(자세한 내용은 고객만족센터 카카오플러스친구/네이버 톡톡/1:1 E-MAIL상담을 이용해 주시기 바랍니다.)
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ArticleDetail;
