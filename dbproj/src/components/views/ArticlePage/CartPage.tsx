import React, {useEffect, useState} from "react";
import axios from "axios";

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import ClearIcon from "@mui/icons-material/Clear";
import {TextField} from "@mui/material";
import Header from "../HomePage/Header";
import TopBar from "../HomePage/TopBar";
import {Container} from "@mui/system";
import Grid from "@mui/material/Grid";

function CartPage() {
    const [data, setData] = useState([]);
    const [qty, setQty] = useState("");
    const email = localStorage.getItem('id') as string;
    const callApi = async () => {
        if (email !== "") {
            axios
                .post("/cart/getCart", null, {
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
    }
    const handleInputQTY = (e: any) => {
        setQty(e.target.value);
        console.log(qty);
    };
    useEffect(() => {
        if (localStorage.getItem('token') === null) {
            alert("잘못된 접근입니다.");
            window.location.replace('/')
        }
        callApi();

    }, []);
    const onClickDelete = (mid: any, pid: any) => {
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
    const onClickChange = (mid: any, pid: any, qty: any) => {
        axios
            .post("/cart/updateCart", null, {
                params: {
                    mid: mid,
                    pid: pid,
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
    return (
        <Grid>
            <Container fixed>
                <Header></Header>
                <TopBar></TopBar>
                <TableContainer component={Paper}>
                    <Table sx={{minWidth: 100}} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="left">상품명</TableCell>
                                <TableCell align="left">개수</TableCell>
                                <TableCell align="left">가격</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data.map((row: any) => (
                                <TableRow
                                    key={row.cID}
                                    sx={{'&:last-child td, &:last-child th': {border: 0}}}
                                >
                                    <TableCell align="left">{row.cNAME}</TableCell>
                                    <TableCell align="left">
                                        <TextField
                                            label={row.cQTY}
                                            required
                                            type="number"
                                            name="qty"
                                            autoComplete="qty"
                                            autoFocus
                                            onChange={handleInputQTY}
                                        ></TextField>
                                        <Button
                                            onClick={() => onClickChange(row.mID, row.pID, qty)}>확인
                                        </Button>
                                    </TableCell>
                                    <TableCell align="left">{(row.cPRICE) * (row.cQTY)}</TableCell>
                                    <TableCell align="left">
                                        {(localStorage.getItem("id") === row.mID || localStorage.getItem("id") === "admin") && (
                                            <IconButton
                                                key={row.cID + 10}
                                                color="error"
                                                aria-label="delete"
                                                size="small"
                                                onClick={() => onClickDelete(row.mID, row.pID)}
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
        </Grid>

    );
}

export default CartPage;
