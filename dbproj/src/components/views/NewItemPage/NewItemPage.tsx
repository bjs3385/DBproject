import React, {useCallback, useRef, useState} from "react";
import Grid from "@mui/material/Unstable_Grid2";
import Container from '@mui/material/Container';
import Header from "../HomePage/Header";
import TopBar from "../HomePage/TopBar";
import {TextField, Typography} from "@mui/material";
import Autocomplete from '@mui/material/Autocomplete';
import Button from "@mui/material/Button";
import axios from "axios";


function NewItemPage() {
    const [pName, setPName] = useState("");
    const [pPrice, setpPrice] = useState("");
    const [pStock, setpStock] = useState("");
    const [pCategory, setpCategory] = useState("");
    const [pDescription, setpDescription] = useState("");
    const [pImage, setpImage] = useState("/");


    const inPutItem = useRef<HTMLInputElement | null>(null);
    const onUploadImage = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        if(!e.target.files){
            return;
        }
        console.log(e.target.files[0]);
        const formData = new FormData();

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
            params: {

                data : formData,
                pName : pName,
                pPrice : pPrice,
                pStock : pStock,
                pCategory : pCategory,
                pDescription : pDescription,
            },
        }).then((res) => {
            console.log(res);
            //TODO 이미지 추가시 받는 정보 확인 필요
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

    const handleInputPName = (e: any) => {
        setPName(e.target.value);
    };
    const handleInputPPrice = (e: any) => {
        setpPrice(e.target.value);
    }
    const handleInputPStock = (e: any) => {
        setpStock(e.target.value);
    }
    const handleInputPCategory = (e: any) => {
        setpCategory(e.target.value);
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
                <Grid container rowSpacing={1} columnSpacing={{xs: 2, sm: 2, md: 3}}>
                    <Grid xs={6}>
                        <Typography align={"center"} variant="h4">상품명</Typography>
                    </Grid>
                    <Grid xs={6}>
                        <TextField onChange={handleInputPName} fullWidth={true}></TextField>
                    </Grid>
                    <Grid xs={6}>
                        <Typography align={"center"} variant="h4">가격</Typography>
                    </Grid>
                    <Grid xs={6}>
                        <TextField onChange={handleInputPPrice} fullWidth={true}></TextField>
                    </Grid>
                    <Grid xs={6}>
                        <Typography align={"center"} variant="h4">재고</Typography>
                    </Grid>
                    <Grid xs={6}>
                        <TextField onChange={handleInputPStock} fullWidth={true}></TextField>
                    </Grid>
                    <Grid xs={6}>
                        <Typography align={"center"} variant="h4">상품 설명</Typography>
                    </Grid>
                    <Grid xs={6}>
                        <TextField multiline={true} minRows={20} onChange={handleInputPDescription}
                                   fullWidth={true}></TextField>
                    </Grid>
                    <Grid xs={6}>
                        <Typography align={"center"} variant="h4">카테고리</Typography>
                    </Grid>
                    <Grid xs={6}>
                        <Autocomplete
                            fullWidth={true}
                            {...defaultProps}
                            disableCloseOnSelect
                            onChange={handleInputPCategory}
                            renderInput={(params) => (
                                <TextField {...params} label="Category" variant="standard"/>
                            )}
                        />
                    </Grid>
                    <Grid xs={6}>
                        <Typography align={"center"} variant="h4">이미지</Typography>
                    </Grid>
                    <Grid xs={6}>
                        <TextField fullWidth={true}></TextField>
                    </Grid>
                    <Grid xs={6}>
                    </Grid>
                    <Grid xs={6}>
                        <input type="file" accept={"dbproj/src/components/views/image/*"} ref={inPutItem} onChange={onUploadImage}/>
                    </Grid>
                    <Grid xs = {9}>

                    </Grid>
                    <Grid xs={3} alignItems={"right"} >
                        <Button onClick={onUploadImageButtonClick} variant={"contained"} size={"medium"}>
                            확인
                        </Button>
                        <Button variant={"contained"} size={"medium"}>
                            취소
                        </Button>
                    </Grid>

                </Grid>
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