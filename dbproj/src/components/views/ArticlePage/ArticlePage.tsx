import React, {useEffect, useState} from "react";
import axios from "axios";
import {styled} from '@mui/material/styles';
import Grid from '@mui/material/Unstable_Grid2';
import Paper from '@mui/material/Paper';
import CardMedia from '@mui/material/CardMedia';
import {useParams} from "react-router-dom";
import Typography from "@mui/material/Typography";
import {Container} from "@mui/system";
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import ReplyPage from "./ReplyPage";
import ImagePage2 from "./ImagePage2";

import Snackbar from '@mui/material/Snackbar';
import MuiAlert, {AlertProps} from '@mui/material/Alert';
import Header from "../HomePage/Header";
import TopBar from "../HomePage/TopBar";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref,
) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Item = styled(Paper)(({theme}) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));


function ArticlePage() {
    let {id} = useParams();
    const loginId = localStorage.getItem("id");
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
                if (res.data.result) {
                    setItem(res.data.rows);
                }
            })
            .catch();
    };
    const onClickBuy = () => {

        console.log("onClickBuy");
        axios.post("/setitem/setOrderlist", null, {
            params: {
                id: loginId,
                pID: id,
            }
        }).then((res) => {
            if (res) {
                console.log("주문완료");
            }
        }).catch();
    }
    const onClickLike = () => {
        axios.post("/setitem/insertWishlist", null, {
            params: {
                id: loginId,
                product: reply_id
            }
        }).then((res) => {
            if (res) {
            }
        }).catch((err) => {
            console.log(err);
        })
    }
    const onClickCart = () => {
        axios.post("/setitem/insertCart", null, {
            params: {
                id: loginId,
                product: reply_id
            }
        }).then((res) => {
            if (res) {
            }
        }).catch((err) => {
            console.log(err);
        })
    }

    const [open, setOpen] = React.useState(false);

    const handleClick = () => {
        setOpen(true);
    };

    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        setOpen(false);
    };

    useEffect(() => {
        callApi();
    }, []);
    return (
        <Grid>
            <Container fixed>
                <Header></Header>
                <TopBar></TopBar>
                <Grid container spacing={{xs: 2, md: 3}} columns={{xs: 4, sm: 8, md: 12}}>

                    <Grid xs={4} sm={4} md={4}>

                        <Item>
                            {item.map((row: any) => (
                                <div key={row.pID + 1 + "d"}>
                                    <CardMedia
                                        key={row.pID + 1 + "a"}
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
                    <Grid xs={4} sm={4} md={8}>
                        <Item>
                            <Stack direction="column" spacing={2}>
                                {
                                    item.map((row: any) => (
                                        <div key={row.pID + 2 + "d"}>
                                            <Typography gutterBottom variant="h5" component="div"
                                                        key={row.pID + 3 + "a"}>
                                                {row.pNAME}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary" key={row.pID + 4 + "a"}>
                                                {row.pDETAIL}
                                            </Typography>
                                            <Typography variant="h6" color="text.secondary" key={row.pID + 5 + "a"}>
                                                가격 : {row.pPRICE}
                                            </Typography>

                                        </div>
                                    ))
                                }

                                <ButtonGroup variant="contained" aria-label="outlined primary button group"
                                             fullWidth={true}>
                                    <Button onClick={() => {
                                        onClickLike()
                                        handleClick()
                                    }}>찜하기</Button>
                                    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                                        <Alert onClose={handleClose} severity="success" sx={{width: '100%'}}>
                                            성공
                                        </Alert>
                                    </Snackbar>


                                    <Button onClick={() => {
                                        onClickCart()
                                        handleClick()
                                    }
                                    }>장바구니</Button>

                                    <Button onClick={
                                        () => {
                                            onClickBuy()
                                            handleClick()
                                        }
                                    }>구매하기</Button>
                                </ButtonGroup>
                            </Stack>
                        </Item>


                    </Grid>

                    <Grid xs={4} sm={8} md={12}>
                        <Item>
                            <ImagePage2></ImagePage2>
                        </Item>
                        <Item>
                            <ReplyPage boardId={reply_id} boardType="item"></ReplyPage>
                        </Item>
                    </Grid>
                </Grid>
            </Container>
        </Grid>
    );
}

export default ArticlePage;
