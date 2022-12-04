import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import axios from "axios";
import Grid from "@mui/material/Unstable_Grid2";
import { styled } from '@mui/material/styles';
import Paper from "@mui/material/Paper";
import Container from '@mui/material/Container';
import Carousel from 'react-material-ui-carousel'
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import StarRateIcon from '@mui/icons-material/StarRate';
import StarPurple500Icon from '@mui/icons-material/StarPurple500';
import Popover from '@mui/material/Popover';
import "./ImagePage.css"
import {Link} from "react-router-dom";

interface props{
    productCategory : string,
}

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

function ImagePage({productCategory = "" } : props) {
    const [data, setdata] = useState([]);
    let 좋아요 = Array.from({length: data.length}, () => false);
    const [따봉, 따봉설정] = useState([false]);
    const id = localStorage.getItem("id");


    const 좋아요클릭 = async (index : any, product : any) => {

        if(!따봉[index]){
            let copy = [...따봉];
            copy[index] = true;
            따봉설정(copy);
            axios.post("/setitem/insertWishlist", null, {
                params: {
                    id: id,
                    product :product
                }
            }).then((res) =>{
                if(res){
                    alert("")
                }
            }).catch((err)=>{
                console.log(err);
            });
        }else {
            let copy = [...따봉];
            copy[index] = false;
            따봉설정(copy);
            axios.post("/setitem/deleteWishlist", null, {
                params: {
                    id: id,
                    product : product
                }
            }).then((res) =>{
                if(res){
                    alert("")
                }
            }).catch((err)=>{
                console.log(err);
            });
        }
    }

    const callApi = async () => {
        axios.post("/setitem/getItemCategory", null, {
            params: {
                productCategory: productCategory,
            }
        }).then((res) =>{
            setdata(res.data.rows);
        }).catch((err)=>{
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
            {data.map((row: any, index:number) => (
                <Grid  xs={12} sm={3}>
                    <Box sx = {{width : 300, height: 300, alignItems: "center"}}>
                        <Box sx = { { align : "center"}}>
                            <Link to={"/article/"+ row.pID}>
                            <CardMedia key={row.pID + 0} component="img" height="200" image={row.pIMAGE1} />
                            </Link>
                            <Typography gutterBottom variant="h4" component="div" key={row.pID + 3}>
                                {row.pNAME}
                            </Typography>
                            <Typography variant="body2" color="text.secondary" key={row.pID + 4}>
                                {row.pDETAIL}
                         </Typography>
                        </Box>
                        <Box sx = { { align : "center"}}>
                            <div className="aligned">
                            <Button key={row.pID + 1} size="small">
                                구매하기
                            </Button>
                            <Button key={row.pID + 2} size="small">
                                장바구니
                            </Button>
                                <IconButton onClick={() =>{
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
