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
        <Container fixed>
            <PopupState variant="popover" popupId="demo-popup-menu">
                {(popupState) => (
                    <React.Fragment>
                    <Button variant="contained" >
                    <AccountCircleIcon {...bindTrigger(popupState)}></AccountCircleIcon>
                    </Button>
                    <Menu {...bindMenu(popupState)}>
                        <MenuItem onClick={() => onclickMyPage()}>My Page</MenuItem>
                        <MenuItem divider={loginState} onClick={() => onclickLogout()}>Log out</MenuItem>
                        <MenuItem onClick={() => onclickMyPage()}>asd</MenuItem>
                    </Menu>
                    </React.Fragment>
                )}
            </PopupState>
            <Box sx={{ height: "100vh" }}>HomePage</Box>
            <Box sx={{ bgcolor: "#cfe8fc", height: "200vh" }} />
        </Container>
        
    );
}
export default HomePage;
