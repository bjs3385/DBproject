import React from "react";
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
                    name="email"
                    autoComplete="email"
                    autoFocus
                ></TextField>
                <TextField label="비밀번호" required fullWidth name="password"></TextField>
                <FormControlLabel control={<Checkbox value="remember" color="primary" />} label="Remember me" />
                <ThemeProvider theme={theme}>
                    <Button
                        href="http://localhost:3000/register"
                        color="secondary"
                        variant="contained"
                        type="submit"
                        fullWidth
                        sx={{ mt: 3, mb: 2 }}
                    >
                        로그인
                    </Button>
                </ThemeProvider>
                <Grid container>
                    <Grid item xs>
                        <Link>비밀번호 찾기</Link>
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
