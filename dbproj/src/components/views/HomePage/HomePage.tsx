import React from "react";
import {Container} from "@mui/system";
import ImagePage2 from "../ArticlePage/ImagePage2";
import styles from "./HomePage.module.css"; //add
import Header from "./Header"; //add
import TopBanner from "./TopBanner"; //add
import TopBar from "./TopBar";
import {useNavigate} from "react-router-dom";
import Footer from "./Footer";


//배너이미지 출처 - TheAmall
function HomePage() {
    const navi = useNavigate();
    const onclickMyPage = () => {
        navi("/mypage");
    }
    const onclickLogout = () => {
        localStorage.clear();
        navi("/login");
    }
    const loginState = false;
    return (
        <Container fixed>
            <Header/>
            <TopBar/>
            <div className="{styles.Content}">
                <TopBanner/>
            </div>
            <h1 className={styles.ImgPage2}>Sale Items</h1>
            <ImagePage2></ImagePage2>
            <Footer/>
        </Container>
    );
}

export default HomePage;
