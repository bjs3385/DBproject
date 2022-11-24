import React, { useEffect } from "react";
import Logout from "../LoginPage/Logout";
import MyPage from "../ArticlePage/MyPagebtn";
import { Box, Container } from "@mui/system";
import axios from "axios";
import styles from "./HomePage.module.css"; //add
import Header from "./Header"; //add
import TopBanner from "./TopBanner";    //add
import TopBar from "./TopBar";
import {ImageList, ImageListItem} from "@mui/material"



//배너이미지 출처 - TheAmall
function HomePage() {
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

            <Box sx={{ height: "100vh" }}>HomePage</Box>
            <Box sx={{ bgcolor: "#cfe8fc", height: "200vh" }} />
            
            
            
        </Container>
    );
}
export default HomePage;
