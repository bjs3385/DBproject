import React, {useEffect, useState} from "react";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import axios from "axios";
import Grid from "@mui/material/Unstable_Grid2";
import {styled} from '@mui/material/styles';
import Paper from "@mui/material/Paper";
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import StarRateIcon from '@mui/icons-material/StarRate';
import StarPurple500Icon from '@mui/icons-material/StarPurple500';
import "./ImagePage.css"
import {Link} from "react-router-dom";

interface props {
    productCategory: string,
}

const Item = styled(Paper)(({theme}) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

function ImagePage({productCategory = ""}: props) {
    const [data, setdata] = useState([]);
    let 좋아요 = Array.from({length: data.length}, () => false);
    const [따봉, 따봉설정] = useState([false]);
    const id = localStorage.getItem("id");


    const 좋아요클릭 = async (index: any, product: any) => {

        if (!따봉[index]) {
            let copy = [...따봉];
            copy[index] = true;
            따봉설정(copy);
            axios.post("/setitem/insertWishlist", null, {
                params: {
                    id: id,
                    product: product
                }
            }).then((res) => {
                if (res) {
                    alert("위시리스트에 추가되었습니다.")
                }
            }).catch((err) => {
                console.log(err);
            });
        } else {
            let copy = [...따봉];
            copy[index] = false;
            따봉설정(copy);
            axios.post("/setitem/deleteWishlist", null, {
                params: {
                    id: id,
                    product: product
                }
            }).then((res) => {
                if (res) {
                    alert("위시리스트에서 제거되었습니다.")
                }
            }).catch((err) => {
                console.log(err);
            });
        }
    }
    const onClickBuy = (pID: any) => {
        console.log("onClickBuy");
        axios.post("/setitem/setOrderlist", null, {
            params: {
                id: id,
                pID: pID
            }
        }).then((res) => {
            if (res) {
                console.log("주문완료");
            }
        }).catch();
    }
    const callApi = async () => {
        axios.post("/setitem/getItemCategory", null, {
            params: {
                productCategory: productCategory,
            }
        }).then((res) => {
            setdata(res.data.rows);
        }).catch((err) => {
            console.log(err);
        });
    };
    useEffect(() => {
        callApi();
    }, []);

    return (
        <Grid container
              spacing={3}
              justifyContent="center"
              alignItems="stretch">
            {data.map((row: any, index: number) => (
                <Grid key={row.pID + 1000} xs={12} sm={3}>
                    <Box key={row.pID + 10000} >
                        <Box key={row.pID + 100000} >
                            <Link to={"/article/" + row.pID}>
                                <CardMedia key={row.pID + 0} component="img" height="200" image={row.pIMAGE1}/>
                            </Link>
                            <Typography gutterBottom variant="h4" component="div" key={row.pID + 3}>
                                {row.pNAME}
                            </Typography>
                            <Typography variant="body2" color="text.secondary" key={row.pID + 4}>
                                {row.pDETAIL}
                            </Typography>
                        </Box>
                        <Box key={row.pID + 10000000} sx={{align: "center"}}>
                            <div className="aligned">
                                <Button onClick={() => {
                                    onClickBuy(row.pID);
                                }} key={row.pID + 1} size="small">
                                    구매하기
                                </Button>
                                <Button key={row.pID + 2} size="small">
                                    장바구니
                                </Button>
                                <IconButton key={row.pID + 10001001} onClick={() => {
                                    좋아요클릭(index, row.pID);
                                }} color={"primary"}>
                                    {
                                        따봉[index] ? (<StarRateIcon/>) : (<StarPurple500Icon/>)
                                    }
                                </IconButton>
                            </div>
                        </Box>
                    </Box>
                </Grid>
            ))}

        </Grid>


    );
}

export default ImagePage;
