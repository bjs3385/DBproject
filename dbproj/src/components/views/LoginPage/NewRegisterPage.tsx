import React, { useState, useEffect} from 'react';
import axios from 'axios';
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
import Select, { SelectChangeEvent } from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';

function NewRegisterPage(){
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [phonenum, setPhonenum] = React.useState("");
    const [born, setborn] = React.useState("");


    const onClickRegister = () => {
        axios.post("http://localhost:4000/users/onRegister", null, {
            params: {
                email: email,
                password: password,
                phonenum: phonenum,
                born: born,
            }}).then(res => console.log (res))
            .catch()
    }
    const handleInputID = (e : any) =>{
        setEmail(e.target.value);
    }
    const handleInputPW = (e : any) =>{
        setPassword(e.target.value);
    }
    const handleInputPhone = (e : any) =>{
        setPhonenum(e.target.value);
    }
    
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
            type = "email"
            name="email"
            autoComplete="email"
            autoFocus
            onChange = {handleInputID}></TextField>
            <Button
            variant="contained"
            type="submit"
            fullWidth
            sx={{ mt: 1, mb: 2 }}>중복 확인</Button>
            <TextField
            label="비밀번호" required fullWidth name="password" type = "password" onChange = {handleInputPW}></TextField>
            <TextField label="비밀번호 확인" required fullWidth name="check_password" type = "password" onChange = {handleInputPW}></TextField>
            
            
            <InputLabel id = 'label1'>년</InputLabel>
            <Select labelId = 'label1' label = "test"></Select>

            <InputLabel id = 'label2'>월</InputLabel>
            <Select labelId = 'label2' label = "test"></Select>

            <InputLabel id = 'label3'>일</InputLabel>
            <Select labelId = 'label3' label = "test"></Select>


            <TextField label="전화번호" required fullWidth name="phonenum" type = "phonenum" onChange = {handleInputPhone}></TextField>
            <Button
            variant="contained"
            type="submit"
            fullWidth
            sx={{ mt: 3, mb: 2 }}
            onClick = { () => {onClickRegister();}}>
                회원 가입
            </Button>


        </Container>
        
    );

}




export default NewRegisterPage;