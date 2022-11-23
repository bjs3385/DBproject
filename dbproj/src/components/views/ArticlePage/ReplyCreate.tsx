import React, {useEffect, useState} from "react";
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import axios from "axios";

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

interface props {
    boardId? : number;
    boardType : string;

}



function ReplyCreate({ boardId = 0, boardType = ""}:props) {

    const [text, setText] = useState("");
    const id = localStorage.getItem("id");

    const callApi = async () => {

    }

    const onClickCreate = () => {
        console.log(id);
        axios.post("/setboard/createReply", null, {
            params: {
                boardId: boardId,
                text,
                id: id
            },
        })
            .then((res) =>{
            if(res.data.result){
                console.log("success!");
                window.location.reload();

            }else console.log("fail");
        })
            .catch((err) =>{
                console.log(err);
                }
            );

    }

    const onTextHandler = (e : any) =>{
        setText(e.currentTarget.value);
    }




    useEffect(() => {
        if (localStorage.getItem("token") === null) {
            alert("잘못된 접근입니다.");
            window.location.replace("/");
        }
        callApi();
    }, []);
    return (
        <Box sx={{ width: '100%' }}>
            <Grid container spacing={3} columns={2}>

                <Grid xs={6}>
                    <Item>
                        <TextField label={"댓글"}  onChange={onTextHandler} rows={5}  multiline={true} fullWidth={true} size={"medium"} ></TextField>
                    </Item>
                </Grid>
                <Grid xs>
                    <Item>
                        <Button onClick={onClickCreate} fullWidth={true} variant={"contained"} size={"medium"}>등록하기</Button>
                    </Item>
                </Grid>
            </Grid>
        </Box>
    );
}

export default ReplyCreate;