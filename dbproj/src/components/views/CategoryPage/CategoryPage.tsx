import React, {useState} from "react";
import ImagePage from "../ArticlePage/ImagePage";
import {useParams} from "react-router-dom";
import Grid from "@mui/material/Unstable_Grid2";
import Header from "../HomePage/Header";
import { Box, Container } from "@mui/system";



function CategoryPage() {

    // @ts-ignore
    const parms = useParams().category.toString();
    console.log(parms);



    return (
        <Grid>
            <Container fixed>
                <Header></Header>
        <Grid>
        <ImagePage productCategory={parms}></ImagePage>
        </Grid>
            </Container>
        </Grid>

    );
}

export default CategoryPage;