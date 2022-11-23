import React, { useEffect } from "react";
import Logout from "../LoginPage/Logout";
import MyPage from "../ArticlePage/MyPagebtn";
import { Box, Container } from "@mui/system";
import axios from "axios";
import ImagePage from "../ArticlePage/ImagePage";
function HomePage() {
    return (
        <Container fixed>
            <ImagePage></ImagePage>
            <Logout></Logout>
            <MyPage></MyPage>
            <Box sx={{ height: "100vh" }}>HomePage</Box>
            <Box sx={{ bgcolor: "#cfe8fc", height: "200vh" }} />
        </Container>
    );
}
export default HomePage;
