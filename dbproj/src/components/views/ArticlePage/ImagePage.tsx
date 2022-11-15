import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import axios from "axios";

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
        <div style={test}>
            {data.map((row: any) => (
                <div key={row.pID + 5}>
                    <Card sx={{ maxWidth: 345 }}>
                        <CardMedia key={row.pID + 0} component="img" height="140" image={row.pIMAGE1} />
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
                </div>
            ))}
        </div>
    );
}

export default ImagePage;
