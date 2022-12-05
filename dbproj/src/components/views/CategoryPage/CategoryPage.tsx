import React, {useEffect, useState} from "react";
import ImagePage from "../ArticlePage/ImagePage";
import {useParams} from "react-router-dom";
import Grid from "@mui/material/Unstable_Grid2";
import Header from "../HomePage/Header";
import { Box, Container } from "@mui/system";
import TopBar from "../HomePage/TopBar";


function CategoryPage() {

    // @ts-ignore
    let Category = useParams().category.toString();
    return (
        <Grid>
            <Container fixed>
                <Header></Header>
                <TopBar></TopBar>
                <Grid>
                    <ImagePage productCategory={Category}></ImagePage>
                </Grid>
            </Container>
        </Grid>
    );
}

export default CategoryPage;