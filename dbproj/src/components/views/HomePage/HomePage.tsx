import React, { useEffect } from "react";
import Logout from "../LoginPage/Logout";
import MyPage from "../ArticlePage/MyPagebtn";
import { Box, Container } from "@mui/system";
import axios from "axios";
import ImagePage2 from "../ArticlePage/ImagePage2";
function HomePage() {
    return (
        <Container>
            <Logout></Logout>
            <MyPage></MyPage>
            <ImagePage2></ImagePage2>
        </Container>
    );
}
export default HomePage;
