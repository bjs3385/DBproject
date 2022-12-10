import React, {useState} from "react";
import {Container} from "@mui/system";
import Header from "../HomePage/Header";
import TopBar from "../HomePage/TopBar";
import Grid from "@mui/material/Unstable_Grid2";
import axios from "axios";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import {Link} from "react-router-dom";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import StarRateIcon from "@mui/icons-material/StarRate";
import StarPurple500Icon from "@mui/icons-material/StarPurple500";




function SearchPage() {
    const [search, setSearch] = useState("");
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
    const onClickSearch = () => {
        axios.post("/setitem/searchItem", null, {
            params: {
                search: search,
            }
        }).then((res) => {
           setdata(res.data.rows)
        }).catch((err)=> {
            console.log(err);
        });
    }

    const onChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
    }


    return (
        <Grid>
            <Container fixed>
                <Header></Header>
                <TopBar></TopBar>
                <input onChange={onChangeSearch}/>
                <Button onClick={onClickSearch}>검색</Button>
                {data.map((row: any, index: number) => (
                    <Grid key={row.pID + 1000} xs={12} sm={3}>
                        <Box key={row.pID + 10000} >
                            <Box key={row.pID + 100000} >
                                <Link to={"/article/" + row.pID}>
                                    <CardMedia key={row.pID + 0} component="img" height="200" image={row.pIMAGE1}/>
                                </Link>
                                <div>
                                    <Typography gutterBottom variant="h6" component="div" key={row.pID + 3}>
                                        {row.pNAME}
                                    </Typography>
                                </div>
                                <div>
                                    <Typography variant="body2" color="text.secondary" key={row.pID + 4}>
                                        {row.pDETAIL}
                                    </Typography>
                                </div>
                            </Box>
                            <Box key={row.pID + 10000000} sx={{align: "center"}}>
                                <div className="aligned">
                                    <div className={"itemButton"}>
                                        <Button
                                            variant="outlined" onClick={() => {
                                            onClickBuy(row.pID);
                                        }} key={row.pID + 1} size="small">
                                            구매하기
                                        </Button>
                                    </div>
                                    <div className={"itemButton"}>
                                        <Button
                                            variant="outlined" key={row.pID + 2} size="small">
                                            장바구니
                                        </Button>
                                    </div>
                                    <div className={"itemButton"}>

                                        <IconButton key={row.pID + 10001001} onClick={() => {
                                            좋아요클릭(index, row.pID);
                                        }} color={"primary"}>
                                            {
                                                따봉[index] ? (<StarRateIcon/>) : (<StarPurple500Icon/>)
                                            }
                                        </IconButton>
                                    </div>
                                </div>
                            </Box>
                        </Box>
                    </Grid>
                ))}
                <Grid>
                </Grid>
            </Container>
        </Grid>
    );
}

export default SearchPage;