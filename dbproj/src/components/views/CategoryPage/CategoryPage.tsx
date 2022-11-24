import React, {useState} from "react";
import ImagePage from "../ArticlePage/ImagePage";
import {useParams} from "react-router-dom";



function CategoryPage() {

    // @ts-ignore
    const parms = useParams().category.toString();
    console.log(parms);



    return (
        <ImagePage productCategory={parms}></ImagePage>
    );
}

export default CategoryPage;