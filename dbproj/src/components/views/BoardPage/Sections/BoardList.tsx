import React, {useEffect, useState} from "react";
import axios from "axios";
import TextField from "@mui/material/TextField";

function BoardList(props: any) {
    const [data, setData] = useState([
        {
            nID: 0,
            nTITLE: "",
            nWRITER: "",
            nDATE: "",
            nCONTENT: "",
            views: 0,
        }
    ]);

    const callApi = async () => {
        const boardId = window.location.pathname.split("/")[2];
        console.log(boardId);
        axios.post("http://localhost:4000/setboard/setBoard", null, {
            params: {
                boardId: boardId,
            },
        }).then((res) => {
            console.log(res.data.result);
            setData(res.data.result);
        }).catch();
    };
    console.log("data : ", data);
    const row = data.map((row: any) => (
        <div key = "main">
            <div key={row.nID+1}>{row.nID}</div>
            <div key={row.nID+2}>{row.nTITLE}</div>
            <div key={row.nID+3}>{row.nWRITER}</div>
            <div key={row.nID+4}>{row.nDATE}</div>
            <div key={row.nID+5}>{row.nCONTENT}</div>
            <div key={row.nID+6}>{row.views}</div>
        </div>
    ));
    console.log();
    useEffect(() => {
        callApi();
    }, []);
    return (
        <div>
            {row}
        </div>
    );
}
export default BoardList;
