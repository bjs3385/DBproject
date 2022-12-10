import React, {useEffect, useState} from "react";
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
import Grid from "@mui/material/Unstable_Grid2";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import {styled} from "@mui/material/styles";
import Rating, { ratingClasses } from "@mui/material/Rating";

interface props {
    boardId?: number;
    boardType?: string;
}

const Item = styled(Paper)(({theme}) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

function ReplyPage({boardId = 0, boardType = ""}: props) {

    console.log(boardId);
    const [data, setData] = useState([]);
    const [text, setText] = useState("");
    const [value, setValue] = useState<number | null>();
    const id = localStorage.getItem("id");
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
                })
                .catch((err) => {
                    console.log(err);
                });
        } else console.log("error");
    };
    const onClickCreate = () => {
        console.log(id);
        if(!(id === null)) {
            axios.post("/setboard/createReply", null, {
                params: {
                    boardId: boardId,
                    text,
                    id: id,
                    rate: value
                },
            })
                .then((res) => {
                    if (res.data.result) {
                        console.log("success!");
                        callApi();
                    } else console.log("fail");
                })
                .catch((err) => {
                        console.log(err);
                    }
                );
        }

    }

    const onTextHandler = (e: any) => {
        setText(e.currentTarget.value);
    }

    const onClickDelete = (id: any) => {


        if(!(id === null)) {
            axios
                .post("/setboard/deleteReply", null, {
                    params: {
                        id: id,
                    },
                })
                .then((res) => {
                    console.log(res.data.result);
                    callApi();
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    };

    useEffect(() => {

        callApi();
    }, []);
    return (
        <div>
            <Box sx={{width: '100%'}}>
                <Grid container spacing={3} columns={2}>

                    <Grid xs={6}>
                        <Item>
                            <TextField InputProps={{disableUnderline: true}} label={"댓글"} onChange={onTextHandler}
                                       rows={5} multiline={true} fullWidth={true} size={"medium"}></TextField>
                                       <Rating
                                        name="size-large"
                                        defaultValue={0.0}
                                        precision={0.5}
                                        size="large"
                                        onChange={(event, newValue) => {
                                            setValue(newValue);
                                          }}                                 
                                        />
                        </Item>
                    </Grid>
                    <Grid xs>
                        <Item>
                            <Button onClick={onClickCreate} fullWidth={true} variant={"contained"}
                                    size={"medium"}>등록하기</Button>
                        </Item>
                    </Grid>
                </Grid>
            </Box>

            <TableContainer component={Paper}>
                <Table sx={{minWidth: 650}} size="small" aria-label="a dense table">
                    <TableHead>
                        <TableRow>
                            <TableCell>번호</TableCell>
                            <TableCell align="right"></TableCell>
                            <TableCell align="right">별점</TableCell>
                            <TableCell align="right">댓글</TableCell>
                            <TableCell align="right">작성자</TableCell>
                            <TableCell align="right"></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map((row: any, index) => (
                            <TableRow key={row.rID} sx={{"&:last-child td, &:last-child th": {border: 0}}}>
                                <TableCell component="th" scope="row">
                                    {index + 1}
                                </TableCell>
                                <TableCell align="right"></TableCell>
                                <TableCell align="right">
                                    <Rating
                                        name="half-rating-read"
                                        defaultValue={row.rRATING}
                                        precision={0.5}
                                        size="large"
                                        readOnly                                        
                                        />
                                </TableCell>
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
                                            <ClearIcon fontSize="inherit"/>
                                        </IconButton>
                                    )}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}

export default ReplyPage;
