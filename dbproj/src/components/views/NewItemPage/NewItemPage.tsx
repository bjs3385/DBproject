import React, {useCallback, useRef, useState} from "react";
import Grid from "@mui/material/Unstable_Grid2";
import Container from '@mui/material/Container';
import Header from "../HomePage/Header";
import TopBar from "../HomePage/TopBar";
import {TextField, Typography} from "@mui/material";
import Autocomplete from '@mui/material/Autocomplete';
import Button from "@mui/material/Button";
import axios from "axios";
import "./NewItemPage.css";

function NewItemPage() {
    const [pName, setPName] = useState("");
    const [pPrice, setpPrice] = useState("");
    const [pStock, setpStock] = useState("");
    const [pCategory, setpCategory] = useState<{ title: string } | null>(null);
    const [pDescription, setpDescription] = useState("");
    const [pImage, setpImage] = useState("/");


    const inPutItem = useRef<HTMLInputElement | null>(null);
    const onUploadImage = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {

        const formData = new FormData();
        if(!e.target.files){
            return;
        }
        console.log(e.target.files[0]);
        if(e.target.files[0]){
            formData.append("image", e.target.files[0]);
            for(let key of formData.entries()){
                console.log(key);
            }
            for(let value of formData.values()){
                console.log(value);
            }
        }
        axios.post("/setitem/newitem", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
            params:{
                data : formData,
            }
        }).then((res) => {
            setpImage(res.data.filePath);
            console.log(pImage);
        }).catch((err) =>{
            console.log(err);
        });
    }, []);

    const onUploadImageButtonClick = useCallback(()=>{
        if(!inPutItem.current){
            return;
        }
        inPutItem.current.click();
    }, []);
    const onUploadImageSubmit =  () => {

        axios.post("/setitem/setProduct", null,{
            params: {
                pName : pName,
                pPrice : pPrice,
                pStock : pStock,
                pCategory : pCategory,
                pDescription : pDescription,
                pImage : pImage,
            },
        }).then((res) => {
            console.log(res);
        }).catch((err) =>{
            console.log(err);
        });

    };
    const handleInputPName = (e: any) => {
        setPName(e.target.value);
    };
    const handleInputPPrice = (e: any) => {
        setpPrice(e.target.value);
    }
    const handleInputPStock = (e: any) => {
        setpStock(e.target.value);
    }


    const handleInputPDescription = (e: any) => {
        setpDescription(e.target.value);
    }
    const handleInputPImage = (e: any) => {
        setpImage(e.target.value);
    }
    const defaultProps = {
        options: category,
        getOptionLabel: (option: FilmOptionType) => option.title,
    };
    const flatProps = {
        options: category.map((option) => option.title),
    };
    const [value, setValue] = React.useState<FilmOptionType | null>(null);


    return (
        <Grid>
            <Container fixed>
                <Header></Header>
                <TopBar></TopBar>
                <div className={"newItem"}>
                    <Grid container rowSpacing={1} columnSpacing={{xs: 2, sm: 2, md: 3}}>
                        <Grid xs={3}>
                            <Typography align={"left"} sx={{margin:1}} variant="h5">상품명</Typography>
                        </Grid>
                        <Grid xs={9}>
                            <TextField onChange={handleInputPName} fullWidth={true}></TextField>
                        </Grid>
                        <Grid xs={3}>
                            <Typography align={"left"} sx={{margin:1}} variant="h5">가격</Typography>
                        </Grid>
                        <Grid xs={9}>
                            <TextField onChange={handleInputPPrice} fullWidth={true}></TextField>
                        </Grid>
                        <Grid xs={3}>
                            <Typography align={"left"} sx={{margin:1}} variant="h5">재고</Typography>
                        </Grid>
                        <Grid xs={9}>
                            <TextField onChange={handleInputPStock} fullWidth={true}></TextField>
                        </Grid>
                        <Grid xs={3}>
                            <Typography align={"left"} sx={{margin:1}} variant="h5">상품 설명</Typography>
                        </Grid>
                        <Grid xs={9}>
                            <TextField multiline={true} minRows={20} onChange={handleInputPDescription}
                                       fullWidth={true}></TextField>
                        </Grid>
                        <Grid xs={3}>
                            <Typography align={"left"} sx={{margin:1}} variant="h5">카테고리</Typography>
                        </Grid>
                        <Grid xs={9}>
                            <Autocomplete
                                fullWidth={true}
                                {...defaultProps}
                                disableCloseOnSelect
                                onChange={(event, value ) => {
                                    setpCategory(value);
                                    console.log(pCategory);
                                }}
                                renderInput={(params) => (
                                    <TextField {...params} label="Category" variant="standard"/>
                                )}
                            />
                        </Grid>
                        <Grid xs={3}>
                            <Typography align={"left"} sx={{mt:1, ml:1}} variant="h5">이미지</Typography>
                        </Grid>
                        <Grid xs={9}>
                        </Grid>
                        <Grid xs={3}>
                        </Grid>
                        <Grid xs={9}>
                            <input type="file" accept={"dbproj/src/components/views/image/*"} ref={inPutItem} onChange={onUploadImage}/>
                        </Grid>
                        <Grid xs = {6}>

                        </Grid>
                        <Grid xs={6} alignItems={"right"} textAlign={"right"}>
                            <Button onClick={onUploadImageSubmit} sx={{margin:0.5}} variant={"contained"} size={"medium"}>
                                확인
                            </Button>
                            <Button variant={"contained"} sx={{margin:0.5, mr:1}} size={"medium"}>
                                취소
                            </Button>
                        </Grid>
                    </Grid>
                </div>
            </Container>
        </Grid>
    )
}

interface FilmOptionType {
    title: string;
}

const category = [
    {title: 'SKIRT'},
    {title: 'BAG'},
    {title: 'SNIKERS'},
    {title: 'BOOTS'},
    {title: 'LOAFER'},
    {title: 'SHOES'},
    {title: 'SANDAL'},
    {title: 'SNEAKERS'},
    {title: 'SHIRT'},
    {title: 'T-SHIRT'},
    {title: 'JACKET'},
    {title: 'COAT'},
    {title: 'PANTS'},
    {title: "WATCH"},
    {title: "SUNGLASSES"},
];

export default NewItemPage;