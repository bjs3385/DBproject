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
import { TextField } from "@mui/material";
import Homepage from "components/views/HomePage/HomePage";
import CardMedia from '@mui/material/CardMedia';
import { Container } from "@mui/system";
import { Grid } from "@mui/material";
import Header from "../HomePage/Header";
import TopBar from "../HomePage/TopBar";

function WishlistPage() {
    const [data, setData] = useState([]);
    const [imageData, setImage] = useState([]);
    
    const email = localStorage.getItem('id') as string;
    const callApi = async () => {
        axios
            .post("/wishlist/getWishlist", null, {
                params: {
                    email: email,
                },
            })
            .then((res) => {
                if(res.data.result){
                    setData(res.data.result);
                    setImage(res.data.result1);
                }
                else if(res.data.result === "wrong id")
                {
                    alert("로그인을 해주시길 바랍니다.");
                }
            })
            .catch();
        if(email !== "")
        {
        
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
                console.log("값 : "+result);
                setImage(result);
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
    <Table sx={{ minWidth: 90 }} aria-label="simple table">
    <TableHead>
            <TableRow>
                <TableCell align="left">상품사진</TableCell>
                <TableCell align="left">상품명</TableCell>
                <TableCell align="left">개수</TableCell>
                <TableCell>
                    <Button
                            variant="contained"
                            type="submit"
                            sx={{ mt: 1, mb: 1 }}
                            onClick={() => {
                                window.location.replace("/mypage");
                            }}
                        >
                            마이 페이지
                    </Button>
                </TableCell>
            </TableRow>
            </TableHead>
            <TableBody>
            {data.map((row: any) => (
                <TableRow
                key={row.wID}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                    <TableCell align="left">
                    <CardMedia key={row.pID} component="img" sx={{width:150, height:150 }} image={row.pIMAGE1}/>
                    </TableCell>
                    <TableCell align="left">{row.pNAME}</TableCell>
                    <TableCell align="left">{row.wQUANTITY}</TableCell>
                    <TableCell align="left">
                        {(localStorage.getItem("id") === row.mID || localStorage.getItem("id") === "admin") && (
                            <IconButton
                                key={row.wID + 10}
                                color="error"
                                aria-label="delete"
                                size="small"
                                onClick={() => onClickWishDelete(row.mID,row.pID)}
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
        </Grid>
    );
}

export default WishlistPage;
