import React, {useEffect, useState} from "react";
import axios from "axios";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import {purple} from "@mui/material/colors";
import {useNavigate} from "react-router-dom";
import "../Btn.css"
import {createTheme, ThemeProvider} from "@mui/material/styles";
const theme = createTheme({
    palette: {
        primary: {
            main: purple[500],
        },
        secondary: {
            main: "#000000FF",
        },
    },
});

function LoginPage() {
    const navi = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const onClickLogin = () => {
        if (email !== "" && password !== "") {
            axios
                .post("http://localhost:4000/users/onLogin", null, {
                    params: {
                        email: email,
                        password: password,
                    },
                })
                .then((res) => {
                    if (res.data.result === "success") {
                        localStorage.clear();
                        localStorage.setItem("id", email);
                        localStorage.setItem("token", res.data.token);
                        navi("/");
                    } else if (res.data.result === "wrong password") {
                        alert("잘못된 비밀번호 입니다.");
                    } else if (res.data.result === "wrong id") {
                        alert("존재하지 않는 아이디 입니다.");
                    }
                })
                .catch();
        } else if (email === "") {
            alert("아이디를 입력해주세요.");
        } else if (password === "") {
            alert("비밀번호를 입력해주세요.");
        }
    };

    const handleInputID = (e: any) => {
        setEmail(e.target.value);
    };
    const handleInputPW = (e: any) => {
        setPassword(e.target.value);
    };

    const callApi = async () => {
        axios.get("/users").then((res) => console.log(res.data.test));
    };
    useEffect(() => {
        callApi();
    }, []);

    return (
        <Grid>
            <Container component="main" maxWidth="xs">
                <Box
                    sx={{
                        marginTop: 8,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                    }}
                >
                    <Avatar sx={{m: 1, bgcolor: "secondary.main"}}>
                        <LockOutlinedIcon></LockOutlinedIcon>
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        로그인
                    </Typography>
                    <TextField
                        sx={{mt: 3, mb: 2}}
                        label="아이디"
                        required
                        fullWidth
                        type="email"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        onChange={handleInputID}
                    ></TextField>
                    <TextField
                        label="비밀번호"
                        required
                        fullWidth
                        name="password"
                        type="password"
                        onChange={handleInputPW}
                    ></TextField>
                    <FormControlLabel control={<Checkbox value="remember" color="primary"/>} label="Remember me"/>
                    <ThemeProvider theme={theme}>
                        <Button
                            color="secondary"
                            variant="contained"
                            type="submit"
                            fullWidth
                            sx={{mt: 3, mb: 2, height: 45}}
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
                            <Link href="http://localhost:3000/newRegister">회원 가입</Link>
                        </Grid>
                    </Grid>

                    <br/><br/>
                   
                <br/><br/><br/><br/><br/>
                
                <div>
                <span><a className="Hov">이용약관</a></span>
                <span style={{color:"lightgrey"}}>　|　</span>
                <span><a className="Hov">개인정보처리방침</a></span>
                <span style={{color:"lightgrey"}}>　|　</span>
                <span><a className="Hov">법적고지</a></span>
                <span style={{color:"lightgrey"}}>　|　</span>
                <span><a className="Hov">Q&A</a></span>
                </div>
                <br/>
                <p style={{color:"lightgrey"}} className="copyright">Copyright &copy; <strong>DBMall, INC</strong>. All rights reserved.</p>
                </Box>
                
            </Container>
        </Grid>
    );
}

export default LoginPage;
