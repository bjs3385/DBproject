import React, { useState, useEffect } from "react";
import axios from "axios";
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Unstable_Grid2';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import CardMedia from '@mui/material/CardMedia';
import { useLocation, useParams } from "react-router-dom";
import Typography from "@mui/material/Typography";

import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import ReplyPage from "./ReplyPage";


const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));


function ArticlePage() {
    let {id} = useParams();

    const reply_id = Number(id);
    const [item, setItem] = useState([]);
    const callApi = async () => {
        axios
                .post("http://localhost:4000/setItem/setItem", null, {
                    params: {
                        id: id
                    },
                })
                .then((res) => {
                    if(res.data.result){
                        setItem(res.data.rows);
                }})
                .catch();
    };

    
    useEffect(() => {
        callApi();
    }, []);
    return (
        <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
        <Grid xs={4} sm = {4} md = {4}>
            
            <Item>
                {item.map((row: any) => (
                    <div key = {row.pID + 1 + "d"}>
                    <CardMedia
                    key = {row.pID + 1 + "a"}
                    component="img"
                    height="400"
                    image={row.pIMAGE1}
                    alt="green iguana"/>
                        <Typography gutterBottom variant="h6" component="div" key={row.pID + 2 + "a"}>
                                    {row.pNAME}
                        </Typography>
                    </div>
                    ))}
            </Item>
        </Grid>
        <Grid xs={4} sm = {4} md = { 8}>
            <Item>
                <Stack direction="column" spacing={2}>
                    {
                        item.map((row: any) => (
                            <div key = {row.pID + 2 + "d"}>
                                <Typography gutterBottom variant="h5" component="div" key={row.pID + 3 + "a"}>
                                    {row.pNAME}
                                </Typography>
                                <Typography variant="body2" color="text.secondary" key={row.pID + 4 + "a"}>
                                    {row.pDETAIL}
                                </Typography>
                            </div>
                        ))
                    }
                    <ButtonGroup variant="contained" aria-label="outlined primary button group" fullWidth = {true} >
                    <Button>찜하기</Button>
                    <Button>장바구니</Button>
                    <Button>구매하기</Button>
                    </ButtonGroup>
                </Stack>
            </Item>
            </Grid>

            <Grid xs={4} sm = {8} md = { 12}>

            <Item>
                <ReplyPage boardId = {reply_id} boardType = "item"></ReplyPage>
            </Item>
            </Grid>
        </Grid>
    );
}

export default ArticlePage;
