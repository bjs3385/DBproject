import React, {useEffect, useState} from "react";
import axios from "axios";
import Grid from "@mui/material/Unstable_Grid2";
import {styled} from '@mui/material/styles';
import Paper from "@mui/material/Paper";
import Carousel from 'react-material-ui-carousel'


const Item = styled(Paper)(({theme}) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

function ImagePage2(props: any) {
    const [data, setdata] = useState([]);
    const limit = 5;
    const [list, setList] = useState(1);
    const offset = (list - 1) * limit;

    const sliceData = (data: any, size: number) => {
        const res = [];
        for (let i = 0; i < data.length; i += size) {
            const chunk = data.slice(i, i + size);
            res.push(chunk);
        }
        return res;
    }
    console.log(sliceData(data, 5));
    const test = {
        width: "500px",
        height: "500px",
    };
    const callApi = async () => {
        const res = await axios.get("/setitem/getItem");
        const result = res.data.rows;
        setdata(result);
    };
    useEffect(() => {
        callApi();
    }, []);

    return (
        <Carousel>
            {
                sliceData(data, 4).map((row: any) => (
                    <Grid key={"Test"} alignItems="center" justifyContent="center" container spacing={12}>{
                        row.map((val: any) => (
                            <Grid key={val.pID + 99}>
                                <a key={val.pID + 999} href={"http://localhost:3000/article/" + val.pID}>
                                    <img height={200} width={200} key={val.pID} src={val.pIMAGE1}></img>
                                </a>
                            </Grid>
                        ))}
                    </Grid>
                ))}
        </Carousel>
    );
}

export default ImagePage2;