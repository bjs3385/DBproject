import React, {useState} from "react";
import ImagePage from "../ArticlePage/ImagePage";
import {useParams} from "react-router-dom";
import Grid from "@mui/material/Unstable_Grid2";



function CategoryPage() {

    // @ts-ignore
    const parms = useParams().category.toString();
    console.log(parms);



    return (
        <Grid>
        <ImagePage productCategory={parms}></ImagePage>
        </Grid>
    );
}

export default CategoryPage;