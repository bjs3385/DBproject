import React, {useEffect, useState} from "react";
import axios from "axios";

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';




function BoardPage() {
    
    const callApi = async () => {
        const res = await axios.get("/cart/getCart");
        const result = res.data.result;
        setData(result);
    }
    const [data, setData] = useState([
      {
        cID: "",
        pID : "",
        cPRICE : "",
        cQTY : ""
      }
    ]);
    
    
    const clickBoard = (boardId: any) => {
      window.location.href = "/board/" + boardId;
    };
      
      

    useEffect(() => {
        if (localStorage.getItem('token') === null) {
            alert("잘못된 접근입니다.");
          window.location.replace('/')
        }
        callApi();
        
      }, []);
    return (
        <TableContainer component={Paper}>
      <Table sx={{ minWidth: 100 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="left">상품명</TableCell>
            <TableCell align="left">가격</TableCell>
            <TableCell align="left">개수</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row: any) => (
            <TableRow
              key={row.nID}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row" onClick={()=>clickBoard(row.nID)}> 
                {row.nTITLE}
              </TableCell>
              <TableCell align="right">{row.cID}</TableCell>
              <TableCell align="right">{row.cQTY}</TableCell>
              <TableCell align="right">{row.cPRICE}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
        
    );
}

export default BoardPage;
