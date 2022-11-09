import React, { useEffect, useState } from "react";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import axios from "axios";



function ImagePage(props : any) {

    const [data, setdata] = useState([{
        id: 0,
        imageLink: "",
        imageName: "test",
        itemName:  "test",
        itemPrice: 0,
        itemDescription: "test",
    }]);
    
    
    const callApi = async () => {
        const res = await axios.get("/setitem/getItem");
        const result = res.data.result;
        setdata(result);
    };

    useEffect(() => {

        callApi();
    },[]);

    
    return (
        <div>
        {data.map((row: any) => (
            <div key = "row.id + 5">
    <Card sx={{ maxWidth: 345 }}>
        <CardMedia
            key = "{ row.id }"
          component="img"
          height="140"
          image="{ row.imageLink }"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div" key = "{row.id + 3 }">
            { row.itemName }
          </Typography>
          <Typography variant="body2" color="text.secondary" key = "{row.id + 4 }">
            { row.itemDescription }
          </Typography>
        </CardContent>
        <CardActions >
          <Button key = "{row.id + 1 }" size="small">Share</Button>
          <Button key = "{row.id + 2 }"size="small">Learn More</Button>
        </CardActions>
      </Card>
      </div>
      ))}
      </div>
    );
}

export default ImagePage;