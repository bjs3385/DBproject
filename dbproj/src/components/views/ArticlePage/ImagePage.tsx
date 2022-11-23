import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import axios from "axios";
import Grid from "@mui/material/Unstable_Grid2";
import { styled } from '@mui/material/styles';
import Paper from "@mui/material/Paper";
import Container from '@mui/material/Container';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

function ImagePage(props: any) {
    const [data, setdata] = useState([]);
    const test = {
        width: "500px",
        height: "500px",
    };
    const callApi = async () => {
        const res = await axios.get("/setitem/getItem");
        const result = res.data.rows;

        setdata(result);
    };
    console.log(data);
    useEffect(() => {
        callApi();
    }, []);

    return (
        <Grid  direction={"row-reverse"} spacing={3}>
            {data.map((row: any) => (
                <Grid direction={"row-reverse"} spacing={3}>
                    <Container fixed={true}>
                    <Card sx={{ maxWidth: 400, border: 1 }}>
                        <CardMedia key={row.pID + 0} component="img" height="200" image={row.pIMAGE1} />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div" key={row.pID + 3}>
                                {row.pNAME}
                            </Typography>
                            <Typography variant="body2" color="text.secondary" key={row.pID + 4}>
                                {row.pDETAIL}
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button key={row.pID + 1} size="small">
                                Share
                            </Button>
                            <Button key={row.pID + 2} size="small">
                                Learn More
                            </Button>
                        </CardActions>
                    </Card>
                    </Container>
                </Grid>
            ))}
        </Grid>

    );
}

export default ImagePage;
