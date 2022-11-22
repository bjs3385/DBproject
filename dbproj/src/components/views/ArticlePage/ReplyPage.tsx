import React, { useEffect, useState } from "react";
import axios from "axios";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import ClearIcon from "@mui/icons-material/Clear";
interface props {
    boardId?: number;
    boardType?: string;
}
function ReplyPage({ boardId = 0, boardType = "" }: props) {
    const [visible, setVisible] = useState(false);
    console.log(boardId);
    const [data, setData] = useState([]);
    const callApi = async () => {
        if (boardType === "item") {
            axios
                .post("/setboard/getItemReply", null, {
                    params: {
                        boardId: boardId,
                    },
                })
                .then((res) => {
                    setData(res.data.result);
                    console.log(res.data.result);
                })
                .catch((err) => {
                    console.log(err);
                });
        } else if (boardType === "notice") {
            axios
                .post("/setboard/getNoticeReply", null, {
                    params: {
                        boardId: boardId,
                    },
                })
                .then((res) => {
                    setData(res.data.result);
                    console.log(res.data.result);
                })
                .catch((err) => {
                    console.log(err);
                });
        } else console.log("error");
    };
    console.log(data);

    const onClickDelete = (id: any) => {
        console.log(id);
        axios
            .post("/setboard/deleteReply", null, {
                params: {
                    id: id,
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

    useEffect(() => {
        if (localStorage.getItem("token") === null) {
            alert("잘못된 접근입니다.");
            window.location.replace("/");
        }
        callApi();
    }, []);
    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                <TableHead>
                    <TableRow>
                        <TableCell>번호</TableCell>
                        <TableCell align="right"></TableCell>
                        <TableCell align="right">댓글</TableCell>
                        <TableCell align="right">작성자</TableCell>
                        <TableCell align="right"></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map((row: any, index) => (
                        <TableRow key={row.rID} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                            <TableCell component="th" scope="row">
                                {index + 1}
                            </TableCell>
                            <TableCell align="right"></TableCell>
                            <TableCell align="right">{row.rREPLY}</TableCell>
                            <TableCell align="right">{row.mID}</TableCell>
                            <TableCell align="right">
                                {(localStorage.getItem("id") === row.mID || localStorage.getItem("id") === "admin") && (
                                    <IconButton
                                        key={row.rID + 10}
                                        color="error"
                                        aria-label="delete"
                                        size="small"
                                        onClick={() => onClickDelete(row.rID)}
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
    );
}

export default ReplyPage;
