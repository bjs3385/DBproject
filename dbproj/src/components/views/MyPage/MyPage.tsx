import React, { useEffect, useState } from "react";
import axios from "axios";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
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
import { purple } from "@mui/material/colors";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs, { Dayjs } from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { koKR } from "@mui/x-date-pickers";
import koLocale from "date-fns/locale/ko";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function MyPage() {
    const [password1, setPassword1] = useState("");
    const [password2, setPassword2] = useState("");
    const [password3, setPassword3] = useState("");
    const [phonenum, setPhonenum] = useState("");
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [Date, setDate] = useState<Dayjs | null>(dayjs("1999-09-17"));
    var emailCheck = false;
    const Dateformat = dayjs(Date).format("YYYY-MM-DD");
    const [data, setData] = useState([]);

    const email = localStorage.getItem('id') as string;
    const callApi = async () => {
            if(email !== "")
            {
            axios
                .post("/wishlist/getWishlist", null, {
                    params: {
                        email: email,
                    },
                })
                .then((res) => {
                    if(res.data.result){
                        setData(res.data.result);
                    }
                    else if(res.data.result === "wrong id")
                    {
                        alert("로그인을 해주시길 바랍니다.");
                    }
                })
                .catch();
            }else if (email === "") {
                alert("로그인을 해주세요.");
            }
        }
    useEffect(() => {
        if (localStorage.getItem("token") === null) {
            alert("잘못된 접근입니다.");
            window.location.replace("/");
        } else {
            axios
                .post("http://localhost:4000/users/onLogin", null, {
                    params: {
                        email: localStorage.getItem("id"),
                        token: localStorage.getItem("token"),
                    },
                })
                .then((res) => {
                    if (res.data.result === "wrong token") {
                        window.location.replace("/");
                        alert("잘못된 접근입니다.");
                    }
                });
        }
        callApi();
    }, []);
    
    //const email = JSON.parse(localStorage.getItem('id') as string);
    const onClickDelete = () => {
        if (email !== "") {
            if(email == "admin")
            {
                alert("관리자 계정은 삭제가 불가능합니다.")
            }
            else
            {
                axios
                .post("http://localhost:4000/delete/onDelete", null, {
                    params: {
                        email: email,
                    },
                })
                .then((res) => {
                    const rest = axios.post("/delete/token",null);
                    if(res.data.result ===""){
                        alert("존재하지 않는 아이디 입니다.");
                    }else{
                        localStorage.clear();
                        localStorage.setItem("id", email);
                        localStorage.setItem("token", res.data.token);
                        alert(email + " 계정이 삭제되었습니다.");
                        window.location.replace("/");
                    }
                })
                .catch();
            }
            
        }
    };

    const onClickChangePW = (mid : any, mpw : any) => {
        if(password1 !== "" && password2 !== "" && password3 !== "" && password2 == password3)
        {
            axios
            .post("/users/updatePassword", null, {
                params: {
                    mid : mid,
                    mpw : mpw,
                },
            })
            .then((res) => {
                console.log(res);
                alert("비밀번호 변경 완료");
            })
            .catch((err) => {
                console.log(err);
                alert("비밀번호 변경 실패");
            });
            window.location.reload();
        } else if(password1 == "") {
            alert("현재 비밀번호를 입력해주세요");
        } else if(password2 == "") {
            alert("변경할 비밀번호를 입력해주세요");
        }
        
    };

    const handleInputPW1 = (e: any) => {
        setPassword1(e.target.value);
    };
    const handleInputPW2 = (e: any) => {
        setPassword2(e.target.value);
    };
    const handleInputPW3 = (e: any) => {
        setPassword3(e.target.value);
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


    return (
        <div>
            <h1>MyPage</h1>
            <Container>
                <ButtonGroup variant="contained" aria-label="outlined primary button group" fullWidth = {true} >
                    <Button
                        variant="contained"
                        type="submit"
                        fullWidth
                        sx={{ mt: 1, mb: 2 }}
                        onClick={() => {
                            onClickDelete();
                        }}
                    >
                        계정삭제
                    </Button>
                    <Button
                        variant="contained"
                        type="submit"
                        fullWidth
                        sx={{ mt: 1, mb: 2 }}
                        onClick={() => {
                            window.location.replace("/CartPage");
                        }}
                    >
                        장바구니
                    </Button>
                </ButtonGroup>
            </Container>
            <Container component="main" maxWidth="xs">
                
                <h1>회원정보 수정</h1>
                <TextField
                    sx={{ mt: 0, mb: 2 }}
                    label="현재 비밀번호"
                    required
                    fullWidth
                    name="password"
                    type="password"
                    onChange={handleInputPW1}
                ></TextField>
                <TextField
                    sx={{ mt: 0, mb: 2 }}
                    label="새 비밀번호"
                    required
                    fullWidth
                    name="password"
                    type="password"
                    onChange={handleInputPW2}
                ></TextField>
                <TextField
                sx={{ mt: 0, mb: 2 }}
                    label="새 비밀번호 확인"
                    required
                    fullWidth
                    name="check_password"
                    type="password"
                    onChange={handleInputPW3}
                ></TextField>
                <Button
                    variant="contained"
                    type="submit"
                    fullWidth
                    sx={{ mt: 0, mb: 2 }}
                    onClick={() => {
                        onClickChangePW(email, password2);
                    }}
                >
                    비밀번호 변경
                </Button>
                <TextField
                    sx={{ mt: 3, mb: 2 }}
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
                sx={{ mt: 3, mb: 2 }}
                    dateAdapter={AdapterDayjs}
                    adapterLocale={koLocale}
                    localeText={koKR.components.MuiLocalizationProvider.defaultProps.localeText}
                >
                    <DesktopDatePicker
                    
                        label="생년월일"
                        inputFormat="MM/DD/YYYY"
                        value={Date?.format("YYYY-MM-DD")}
                        onChange={handleChange}
                        renderInput={(params : any) => <TextField {...params} />}
                    />
                </LocalizationProvider>
                <TextField
                sx={{ mt: 3, mb: 2 }}
                    label="번호"
                    required
                    fullWidth
                    name="phonenum"
                    type="text"
                    onChange={handleInputPhone}
                ></TextField>
                <TextField
                sx={{ mt: 1, mb: 1 }}
                    label="주소"
                    required
                    fullWidth
                    name="address"
                    type="text"
                    onChange={handleInputAddress}
                ></TextField>
            </Container>
            <Container>
                <h1>Wish List</h1>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 100 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="left">상품명</TableCell>
                            <TableCell align="left">개수</TableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                        {data.map((row: any) => (
                            <TableRow
                            key={row.wID}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                            <TableCell align="left">{row.wNAME}</TableCell>
                            <TableCell align="left">{row.wQUANTITY}</TableCell>
                            </TableRow>
                        ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Container>
            
            
            
        </div>
        
    );
}
export default MyPage;
