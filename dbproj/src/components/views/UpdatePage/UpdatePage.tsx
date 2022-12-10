import React, {useEffect, useState} from "react";
import axios from "axios";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import TextField from "@mui/material/TextField";
import dayjs, {Dayjs} from "dayjs";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Grid from "@mui/material/Unstable_Grid2";
import Header from "../HomePage/Header";
import {Container} from "@mui/system";
import TopBar from "../HomePage/TopBar";

function UpdatePage() {
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
        if (email !== "") {
            axios
                .post("/users/getUser", null, {
                    params: {
                        email: email,
                    },
                })
                .then((res) => {
                    if (res.data.result) {
                        setData(res.data.result);
                    } else if (res.data.result === "wrong id") {
                        alert("로그인을 해주시길 바랍니다.");
                    }
                })
                .catch();
        } else if (email === "") {
            alert("로그인을 해주세요.");
        }
    };
    useEffect(() => {
        if (localStorage.getItem("token") === null) {
            alert("잘못된 접근입니다.");
            window.location.replace("/");
        } else {
            axios
                .post("/users/onLogin", null, {
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
            if (email == "admin") {
                alert("관리자 계정은 삭제가 불가능합니다.")
            } else {
                axios
                    .post("/delete/onDelete", null, {
                        params: {
                            email: email,
                        },
                    })
                    .then((res) => {
                        const rest = axios.post("/delete/token", null);
                        if (res.data.result === "") {
                            alert("존재하지 않는 아이디 입니다.");
                        } else {
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

    const onClickChangePW = (mid: any, mpw: any) => {
        if (password1 !== "" && password2 !== "" && password3 !== "" && password2 == password3) {
            axios
                .post("/users/updatePassword", null, {
                    params: {
                        mid: mid,
                        mpw: mpw,
                    },
                })
                .then((res) => {
                    console.log(res);
                })
                .catch((err) => {
                    console.log(err);
                    alert("비밀번호 변경 실패");
                });
            alert("비밀번호 변경 완료");
            window.location.reload();
        } else if (password1 == "") {
            alert("현재 비밀번호를 입력해주세요");
        } else if (password2 == "") {
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

    return (
        <Grid>
            <Container fixed>
                <Header></Header>
                <TopBar></TopBar>
                <Grid>
        <div>
            <Container>
                <ButtonGroup variant="contained" aria-label="outlined primary button group" fullWidth={true}>
                    <Button
                        variant="contained"
                        type="submit"
                        fullWidth
                        sx={{mt: 1, mb: 2}}
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
                        sx={{mt: 1, mb: 2}}
                        onClick={() => {
                            window.location.replace("/");
                        }}
                    >
                        홈페이지로
                    </Button>
                </ButtonGroup>
            </Container>
            <Container>
                <TableContainer component={Paper}>
                    <Table sx={{minWidth: 100}} aria-label="simple table">
                        <TableHead>
                            <TableCell align="left">계정</TableCell>
                            <TableCell align="left">이름</TableCell>
                            <TableCell align="left">주소</TableCell>
                            <TableCell align="left">보유 캐쉬</TableCell>
                            <TableCell align="left">전화번호</TableCell>
                            <TableCell align="left">생년월일</TableCell>
                        </TableHead>
                        <TableBody>
                            {data.map((row: any) => (
                                <TableRow
                                    key={row.mID}
                                    sx={{'&:last-child td, &:last-child th': {border: 0}}}
                                >
                                    <TableCell align="left">{row.mID}</TableCell>
                                    <TableCell align="left">{row.mNAME}</TableCell>
                                    <TableCell align="left">{row.mADDRESS}</TableCell>
                                    <TableCell align="left">{row.mCASH}</TableCell>
                                    <TableCell align="left">{row.mPHONENUM}</TableCell>
                                    <TableCell align="left">{row.mBIRTH}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Container>
            <Container component="main" maxWidth="xs" sx={{mt: 3, mb: 3}}>

                <h1>회원정보 수정</h1>
                <TextField
                    sx={{mt: 0, mb: 2}}
                    label="현재 비밀번호"
                    required
                    fullWidth
                    name="password"
                    type="password"
                    onChange={handleInputPW1}
                ></TextField>
                <TextField
                    sx={{mt: 0, mb: 2}}
                    label="새 비밀번호"
                    required
                    fullWidth
                    name="password"
                    type="password"
                    onChange={handleInputPW2}
                ></TextField>
                <TextField
                    sx={{mt: 0, mb: 2}}
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
                    sx={{mt: 0, mb: 2}}
                    onClick={() => {
                        onClickChangePW(email, password2);
                    }}
                >
                    비밀번호 변경
                </Button>
            </Container>

        </div>
                </Grid>
            </Container>
        </Grid>

    );
}

export default UpdatePage;
