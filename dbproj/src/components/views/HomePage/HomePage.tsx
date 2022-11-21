import React, { useEffect } from "react";
import Logout from "../LoginPage/Logout";
import MyPage from "../ArticlePage/MyPagebtn";
import { Box, Container } from "@mui/system";
import axios from "axios";
function HomePage() {
    return (
        <Container fixed>
            <img src="https://thumbnail10.coupangcdn.com/thumbnails/remote/492x492ex/image/vendor_inventory/6195/993b4df0be8b5f18aa0965b9ea859afc92eb25b77d27f461613dc9176387.jpg"></img>
            <Logout></Logout>
            <MyPage></MyPage>
            <Box sx={{ height: "100vh" }}>HomePage</Box>
            <Box sx={{ bgcolor: "#cfe8fc", height: "200vh" }} />
        </Container>
    );
}
export default HomePage;
