import React, {useEffect, useState} from "react";
import Grid from "@mui/material/Unstable_Grid2";
import Header from "../HomePage/Header";
import {Container} from "@mui/system";
import TopBar from "../HomePage/TopBar";
import axios from "axios";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";

function OrderlistPage() {
    const [data, SetData] = useState([]);
    const id = localStorage.getItem('id');
    let val;
    const callApi = async () => {
        axios.post("/setitem/getOrderList", null, {
            params: {
                id: id
            },
        }).then((res) => {
            SetData(res.data.rows);
        }).catch((err) => {
            console.log(err);
        });
    }

    useEffect(() => {
        callApi();
    }, []);
    return (
        <Grid>
            <Container fixed>
                <Header></Header>
                <TopBar></TopBar>
                <TableContainer component={Paper}>
                    <Table sx={{minWidth: 650}} size="small" aria-label="a dense table">
                        <TableHead>
                            <TableRow>
                                <TableCell>번호</TableCell>
                                <TableCell align="right">상품이름</TableCell>
                                <TableCell align="right">상품번호</TableCell>
                                <TableCell align="right">주소</TableCell>
                                <TableCell align="right">가격</TableCell>
                                <TableCell align="right">수량</TableCell>
                                <TableCell align="right">주문일</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data.map((row: any, index) => (
                                <TableRow key={row.rID} sx={{"&:last-child td, &:last-child th": {border: 0}}}>
                                    <TableCell component="th" scope="row">
                                        {index + 1}
                                    </TableCell>
                                    <TableCell align="right">{row.pNAME}</TableCell>
                                    <TableCell align="right">{row.pID}</TableCell>
                                    <TableCell align="right">{row.oADDRESS}</TableCell>
                                    <TableCell align="right">{row.oPRICE}</TableCell>
                                    <TableCell align="right">{row.oQTY}</TableCell>
                                    <TableCell align="right">{row.oDATE}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Container>
        </Grid>
    )
}

export default OrderlistPage