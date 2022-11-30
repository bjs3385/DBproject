import React, { useEffect } from "react";
import Logout from "../LoginPage/Logout";
import MyPage from "../MyPage/MyPagebtn";
import { Box, Container } from "@mui/system";
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import axios from "axios";
import ImagePage2 from "../ArticlePage/ImagePage2";
import styles from "./HomePage.module.css"; //add
import Header from "./Header"; //add
import TopBanner from "./TopBanner";    //add
import TopBar from "./TopBar";
import {ImageList, ImageListItem} from "@mui/material"
import {useNavigate} from "react-router-dom";



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
            <Header />
            <div className={styles.MyMenu}>
                <p className={styles.Box}>DIV</p>
                <Logout></Logout>
                <MyPage></MyPage>
            </div>
            <TopBar />
            <div className="{styles.Content}">
                <TopBanner />
            </div>
            <ImagePage2></ImagePage2>
        </Container>




    );
}
export default HomePage;
