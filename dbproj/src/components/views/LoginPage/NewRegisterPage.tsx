import React, {useEffect, useState} from "react";
import axios from "axios";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Container from "@mui/material/Container";
import {DesktopDatePicker} from "@mui/x-date-pickers/DesktopDatePicker";
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, {Dayjs} from "dayjs";
import {koKR} from "@mui/x-date-pickers";
import koLocale from "date-fns/locale/ko";
import Grid from "@mui/material/Grid";
import Header from "../HomePage/Header";
import {Box} from "@mui/material";
import "../Btn.css"
import Logo from "../HomePage/Logo";
import {createTheme} from "@mui/material/styles";



function NewRegisterPage() {
    const [email, setEmail] = useState("");
    const [password1, setPassword1] = useState("");
    const [password2, setPassword2] = useState("");
    const [phonenum, setPhonenum] = useState("");
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [Date, setDate] = useState<Dayjs | null>(dayjs("1999-09-17"));
    var emailCheck = false;
    const Dateformat = dayjs(Date).format("YYYY-MM-DD");

    const onClickCheckEmail = () => {
        if (email !== "") {
            axios
                .post("http://localhost:4000/users/checkEmail", null, {
                    params: {
                        email: email,
                    },
                })
                .then((res) => {
                    console.log(res);
                    if (res.data.result) {
                        alert("사용 가능한 아이디입니다.");
                        emailCheck = true;
                    } else {
                        alert("이미 사용중인 아이디입니다.");
                    }
                })
                .catch();
        } else {
            alert("아이디를 입력해주세요.");
        }
    };
    const onClickRegister = () => {
        if (password1 === password2 && password1 !== "" && password2 !== "" && phonenum !== "" && address !== "" && emailCheck === true) {
            axios
                .post("http://localhost:4000/users/onRegister", null, {
                    params: {
                        email: email,
                        name: name,
                        password: password1,
                        phonenum: phonenum,
                        Date: Dateformat,
                        address: address,
                    },
                })
                .then((res) => {
                    console.log(res);
                    if (res.data.test === "회원가입 완료") {
                        alert("회원가입이 완료되었습니다.");
                        window.location.replace("/login");
                    } else {
                        alert("회원가입에 실패했습니다.");
                    }
                })
                .catch();
        } else if (password1 !== password2) {
            alert("비밀번호가 일치하지 않습니다.");
        } else if (email === "") {
            alert("아이디를 입력해주세요.");
        } else if (password1 === "" || password2 === "") {
            alert("비밀번호를 입력해주세요.");
        } else if (phonenum === "") {
            alert("전화번호를 입력해주세요.");
        } else if (Date === null) {
            alert("생년월일을 입력해주세요.");
        } else if (name === null) {
            alert("이름을 입력해주세요.");
        } else if (address === null) {
            alert("주소를 입력해주세요.");
        } else if (emailCheck === false) {
            alert("이메일 중복확인을 해주세요.");
        }

    };
    const handleInputID = (e: any) => {
        emailCheck = false;
        setEmail(e.target.value);
    };
    const handleInputPW1 = (e: any) => {
        setPassword1(e.target.value);
    };
    const handleInputPW2 = (e: any) => {
        setPassword2(e.target.value);
    };
    const handleInputPhone = (e: any) => {
        setPhonenum(e.target.value);
    };
    const handleInputName = (e: any) => {
        setName(e.target.value);
    };
    const handleInputAddress = (e: any) => {
        setAddress(e.target.value);
    };
    const handleChange = (newValue: Dayjs | null) => {
        setDate(newValue);
    };

    const callApi = async () => {
        axios.get("/users").then((res) => console.log(res.data));
    };
    useEffect(() => {
        callApi();
    }, []);

    return (
        <Grid>
            <Container fixed>
                <Logo />
                <Box>
                    <Container component="main" maxWidth="xs">
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
                        <Button className="Btn"
                            color={
                                "info"
                            }
                            variant="contained"
                            type="submit"
                            fullWidth
                            sx={{mt: 0, mb: 2, height:45}}
                            onClick={() => {
                                onClickCheckEmail();
                            }}
                        >
                            중복 확인
                        </Button>
                        <TextField
                            sx={{mt: 1, mb: 2}}
                            label="비밀번호"
                            required
                            fullWidth
                            name="password"
                            type="password"
                            onChange={handleInputPW1}
                        ></TextField>
                        <TextField
                            sx={{mt: 1, mb: 3}}
                            label="비밀번호 확인"
                            required
                            fullWidth
                            name="check_password"
                            type="password"
                            onChange={handleInputPW2}
                        ></TextField><hr/>
                        <TextField
                            sx={{mt: 3, mb: 3}}
                            label="이름"
                            required
                            fullWidth
                            type="name"
                            name="name"
                            autoComplete="name"
                            autoFocus
                            onChange={handleInputName}
                        ></TextField>
                        <LocalizationProvider
                            sx={{mt: 3, mb: 2}}
                            dateAdapter={AdapterDayjs}
                            adapterLocale={koLocale}
                            localeText={koKR.components.MuiLocalizationProvider.defaultProps.localeText}
                        >
                            <DesktopDatePicker

                                label="생년월일"
                                inputFormat="MM/DD/YYYY"
                                value={Date?.format("YYYY-MM-DD")}
                                onChange={handleChange}
                                renderInput={(params: any) => <TextField {...params} />}
                            />
                        </LocalizationProvider>

                        <TextField
                            sx={{mt: 3, mb: 2}}
                            label="번호"
                            required
                            fullWidth
                            name="phonenum"
                            type="text"
                            onChange={handleInputPhone}
                        ></TextField>
                        <TextField
                            sx={{mt: 1, mb: 1}}
                            label="주소"
                            required
                            fullWidth
                            name="address"
                            type="text"
                            onChange={handleInputAddress}
                        ></TextField>
                        <Button className="Btn"
                            variant="contained"
                            type="submit"
                            fullWidth
                            sx={{mt: 3, mb: 8, height:45}}
                            onClick={() => {
                                onClickRegister();
                            }}
                        >
                            회원 가입
                        </Button>
                    </Container>
                </Box>
            </Container>
        </Grid>
    );
}

export default NewRegisterPage;

