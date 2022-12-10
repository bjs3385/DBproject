import React, { useEffect, useState } from "react";
import axios from "axios";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import TextField from "@mui/material/TextField";
import Container from "@mui/material/Container";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import ClearIcon from "@mui/icons-material/Clear";
import CardMedia from '@mui/material/CardMedia';
import { height } from "@mui/system";
import { Grid } from "@mui/material";
import Header from "../HomePage/Header";
import TopBar from "../HomePage/TopBar";


function MyPage() {
    var emailCheck = false;
    const [data, setData] = useState([]);
    const [qty, setQty] = useState("");

    const email = localStorage.getItem('id') as string;
    const callApi = async () => {
        if(email !== "")
        {
            axios
                .post("/cart/getCart", null, {
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
    const onClickDeleteCart = (mid: any, pid: any) => {
        axios
            .post("/cart/deleteCart", null, {
                params: {
                    mid: mid,
                    pid: pid,
                },
            })
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                console.log(err);
            });
        window.location.reload();
    };
    const onClickChange = (mid : any, pid : any, qty: any) => {
        axios
            .post("/cart/updateCart", null, {
                params: {
                    mid : mid,
                    pid : pid,
                    qty: qty,
                },
            })
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                console.log(err);
            });
        window.location.reload();
    };

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
                    .post("/delete/onDelete", null, {
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
    const handleInputQTY = (e: any) => {
        setQty(e.target.value);
        console.log(qty);
    };

    return (
        <Grid>
        <Container fixed>
            <Header></Header>
            <TopBar></TopBar>
        <div>
            <Container>
                <ButtonGroup variant="contained" aria-label="outlined primary button group" fullWidth = {true} >
                    <Button
                        variant="outlined"
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
                            window.location.replace("/wishpage");
                        }}
                    >
                        위시 리스트
                    </Button>
                    <Button
                        variant="outlined"
                        type="submit"
                        fullWidth
                        sx={{ mt: 1, mb: 2 }}
                        onClick={() => {
                            window.location.replace("/updatepage");
                        }}
                    >
                        회원정보수정
                    </Button>
                </ButtonGroup>
            </Container>
            <Container>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 100 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="left">상품명</TableCell>
                                <TableCell align="left">상품사진</TableCell>
                                <TableCell align="left">개수</TableCell>
                                <TableCell align="left">가격</TableCell>
                                <Button
                                    variant="contained"
                                    type="submit"
                                    sx={{ mt: 1, mb: 1 }}
                                    onClick={() => {
                                        window.location.replace("/");
                                    }}
                                >
                                    홈페이지로
                                </Button>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data.map((row: any) => (
                                <TableRow
                                    key={row.cID}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell align="left">{row.pNAME}</TableCell>
                                    <CardMedia key={row.pID} component="img" sx={{width:150, height:150 }} image={row.pIMAGE1}/>
                                    <TableCell align="left">
                                        <TextField
                                            label={row.cQTY}
                                            required
                                            type="number"
                                            name="qty"
                                            autoComplete="qty"
                                            sx={{
                                                width : 100,
                                                height : 30
                                            }}
                                            onChange={handleInputQTY}
                                        ></TextField>
                                        <Button
                                            type={"submit"}
                                            onClick={() => onClickChange(row.mID,row.pID,qty)}>확인
                                        </Button>
                                    </TableCell>
                                    <TableCell align="left">
                                        총 가격 : {(row.pPRICE)*(row.cQTY)}<br></br>
                                        개당 가격 : {row.pPRICE}
                                    </TableCell>
                                    <TableCell align="left">
                                        {(localStorage.getItem("id") === row.mID || localStorage.getItem("id") === "admin") && (
                                            <IconButton
                                                key={row.cID + 10}
                                                color="error"
                                                aria-label="delete"
                                                size="small"
                                                onClick={() => onClickDeleteCart(row.mID,row.pID)}
                                            >
                                                <ClearIcon fontSize="inherit" />
                                            </IconButton>
                                        )}
                                    </TableCell>

                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Container>
            <Grid container alignItems="center" maxWidth="xs"
                  sx={{
                      flexDirection: "column",
                  }}>
                <Button
                    variant="contained"
                    type="submit"
                    sx={{ mt: 1, mb: 1 }}
                    onClick={() => {
                        window.location.replace("/mypage");
                    }}
                >
                    구매하러 가기
                </Button>
            </Grid>
        </div>
        </Container>
        </Grid>

    );
}
export default MyPage;