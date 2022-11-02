import React, { useState, useEffect } from "react";
import axios from "axios";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Container from "@mui/material/Container";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";

function NewRegisterPage() {
    const [email, setEmail] = React.useState("");
    const [password1, setPassword1] = React.useState("");
    const [password2, setPassword2] = React.useState("");
    const [phonenum, setPhonenum] = React.useState("");
    const [born, setborn] = React.useState("");

    const onClickRegister = () => {
        if (password1 === password2 && password1 !== "" && password2 !== "") {
            axios
                .post("http://localhost:4000/users/onRegister", null, {
                    params: {
                        email: email,
                        password: password1,
                        phonenum: phonenum,
                        born: born,
                    },
                })
                .then((res) => console.log(res))
                .catch();
        } else if (password1 !== password2) {
            alert("비밀번호가 일치하지 않습니다");
        } else if(email === ""){
            alert("이메일을 입력해주세요");
        } else if(password1 === ""){
            alert("비밀번호를 입력해주세요");
        } else if(password2 === ""){
            alert("비밀번호를 입력해주세요");
        } else if(phonenum === ""){
            alert("전화번호를 입력해주세요");
        } else if(born === ""){
            alert("생년월일을 입력해주세요");
        }
        
    };
    const handleInputID = (e: any) => {
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

    const callApi = async () => {
        axios.get("/users").then((res) => console.log(res.data));
    };
    useEffect(() => {
        callApi();
    }, []);

    return (
        <Container component="main" maxWidth="xs">
            <TextField
                sx={{ mt: 3, mb: 2 }}
                label="아이디"
                required
                fullWidth
                type="email"
                name="email"
                autoComplete="email"
                autoFocus
                onChange={handleInputID}
            ></TextField>
            <Button variant="contained" type="submit" fullWidth sx={{ mt: 1, mb: 2 }}>
                중복 확인
            </Button>
            <TextField
                label="비밀번호"
                required
                fullWidth
                name="password"
                type="password"
                onChange={handleInputPW1}
            ></TextField>
            <TextField
                label="비밀번호 확인"
                required
                fullWidth
                name="check_password"
                type="password"
                onChange={handleInputPW2}
            ></TextField>

            <InputLabel id="label1">년</InputLabel>
            <Select labelId="label1" label="test"></Select>

            <InputLabel id="label2">월</InputLabel>
            <Select labelId="label2" label="test"></Select>

            <InputLabel id="label3">일</InputLabel>
            <Select labelId="label3" label="test"></Select>

            <TextField
                label="전화번호"
                required
                fullWidth
                name="phonenum"
                type="phonenum"
                onChange={handleInputPhone}
            ></TextField>
            <Button
                variant="contained"
                type="submit"
                fullWidth
                sx={{ mt: 3, mb: 2 }}
                onClick={() => {
                    onClickRegister();
                }}
            >
                회원 가입
            </Button>
        </Container>
    );
}

export default NewRegisterPage;
