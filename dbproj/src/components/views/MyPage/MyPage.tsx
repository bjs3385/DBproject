import React, {useEffect, useState} from "react";
import axios from "axios";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import dayjs, {Dayjs} from "dayjs";
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
import Header from "../HomePage/Header";
import TopBar from "../HomePage/TopBar";

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
    const [imageData, setImage] = useState([]);

    const email = localStorage.getItem('id') as string;
    const callApi = async () => {
        if (email !== "") {
            axios
                .post("/wishlist/getWishlist", null, {
                    params: {
                        email: email,
                    },
                })
                .then((res) => {
                    if (res.data.result) {
                        setData(res.data.result);
                        setImage(res.data.imageData);
                    } else if (res.data.result === "wrong id") {
                        alert("로그인을 해주시길 바랍니다.");
                    }
                })
                .catch();
        } else if (email === "") {
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

    const onClickWishDelete = (mid: any, pid: any) => {
        axios
            .post("/wishlist/deleteWishlist", null, {
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

    const LoadImage = (pid: any) => {
        axios
            .post("/wishlist/getWishlistImage", null, {
                params: {
                    pid: pid,
                },
            })
            .then((res) => {
                console.log(res);
                const result = res.data.result;
                console.log("값 : " + result.pIMAGE1);
                return result;
            })
            .catch((err) => {
                console.log(err);
            });
        //window.location.reload();
    };
//onClickWishDelete(row.mID,row.pID) delete에 들어가야함
    return (
        <Grid>
            <Container fixed>
                <Header></Header>
                <TopBar></TopBar>
                <div>
                    <h1>MyPage</h1>
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
                                    window.location.replace("/CartPage");
                                }}
                            >
                                장바구니
                            </Button>
                            <Button
                                variant="contained"
                                type="submit"
                                fullWidth
                                sx={{mt: 1, mb: 2}}
                                onClick={() => {
                                    window.location.replace("/UpdatePage");
                                }}
                            >
                                회원정보수정
                            </Button>
                        </ButtonGroup>
                    </Container>
                    <Container>
                        <h1>Wish List</h1>
                        <TableContainer component={Paper}>
                            <Table sx={{minWidth: 100}} aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell align="left">상품사진</TableCell>
                                        <TableCell align="left">상품명</TableCell>
                                        <TableCell align="left">개수</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {data.map((row: any) => (
                                        <TableRow
                                            key={row.wID}
                                            sx={{'&:last-child td, &:last-child th': {border: 0}}}
                                        >
                                            <TableCell align="left">
                                                <CardMedia key={row.pID + 0} component="img" height="200" image={""}/>
                                            </TableCell>
                                            <TableCell align="left">{row.wNAME}</TableCell>
                                            <TableCell align="left">{row.wQUANTITY}</TableCell>
                                            <TableCell align="left">
                                                {(localStorage.getItem("id") === row.mID || localStorage.getItem("id") === "admin") && (
                                                    <IconButton
                                                        key={row.wID + 10}
                                                        color="error"
                                                        aria-label="delete"
                                                        size="small"
                                                        onClick={() => LoadImage(row.pID)}
                                                    >
                                                        <ClearIcon fontSize="inherit"/>
                                                    </IconButton>
                                                )}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Container>
                </div>
            </Container>
        </Grid>


    );
}

export default MyPage;
