import React, { useEffect } from "react";
import Logout from "../LoginPage/Logout";
import MyPage from "../ArticlePage/MyPagebtn";
import { Box, Container } from "@mui/system";
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import axios from "axios";
import ImagePage2 from "../ArticlePage/ImagePage2";
function HomePage() {
    const onclickMyPage = () => {
        window.location.replace("/mypage");
    }
    const onclickLogout = () => {
        localStorage.clear();
        window.location.replace("/login");
    }
    const loginState = false;
    return (
        <Container>
            <Logout></Logout>
            <MyPage></MyPage>
            <ImagePage2></ImagePage2>
        </Container>
    );
}
export default HomePage;
