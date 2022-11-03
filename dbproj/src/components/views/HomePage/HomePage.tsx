import React, {useEffect} from "react";
import Logout from "../LoginPage/Logout";
import { Box, Container } from '@mui/system';
function HomePage() {

    
    return (
        
        <Container fixed>
            
            <Logout></Logout>
            <Box sx={{ height: "100vh" }}>HomePage</Box>
            <Box sx={{ bgcolor: '#cfe8fc', height: '200vh' }} />

        </Container>

    );
}
export default HomePage;
