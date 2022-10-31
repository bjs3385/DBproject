import React, { useState, useEffect } from "react";
import axios from "axios";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { purple } from "@mui/material/colors";
import e from "express";

const theme = createTheme({
    palette: {
        primary: {
            main: purple[500],
        },
        secondary: {
            main: "#11cb5f",
        },
    },
});

function LoginPage() {
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    

    const onClickLogin = () => {
        axios.post("http://localhost:4000/users/onLogin", null, {
            params: {
                email: email,
                password: password,
            }})
            .then(res => console.log (res))
            .catch()
    }

    const handleInputID = (e : any) =>{
        setEmail(e.target.value);
    }
    const handleInputPW = (e : any) =>{
        setPassword(e.target.value);
    }
    
    const callApi = async () => {
        axios.get("/users").then((res) => console.log(res.data));
    };
    useEffect(() => {
        callApi();
    }, []);

   
    

    return (
        <Container component="main" maxWidth="xs">
            <Box
                sx={{
                    marginTop: 8,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
                <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    로그인
                </Typography>
                <TextField
                    sx={{ mt: 3, mb: 2 }}
                    label="아이디"
                    required
                    fullWidth
                    type = "email"
                    name="email"
                    autoComplete="email"
                    autoFocus
                    onChange = {handleInputID}
                ></TextField>
                <TextField label="비밀번호" required fullWidth name="password" type = "password" onChange = {handleInputPW}></TextField>
                <FormControlLabel control={<Checkbox value="remember" color="primary" />} label="Remember me" />
                <ThemeProvider theme={theme}>
                    <Button
                        
                        color="secondary"
                        variant="contained"
                        type="submit"
                        fullWidth
                        sx={{ mt: 3, mb: 2 }}
                        onClick={() => onClickLogin()}
                        
                    >
                        로그인
                    </Button>
                </ThemeProvider>
                <Grid container>
                    <Grid item xs>
                        <Link href="http://localhost:3000/article/:articleId">비밀번호 찾기</Link>
                    </Grid>
                    <Grid item>
                        <Link>회원 가입</Link>
                    </Grid>
                </Grid>
            </Box>
        </Container>
    );
}

export default LoginPage;
