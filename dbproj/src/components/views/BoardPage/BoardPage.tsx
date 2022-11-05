import React, {useEffect, useState} from "react";
import BoardList from "./Sections/BoardList";
import { Link } from "react-router-dom";
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
        const res = await axios.get("/setboard/getBoard");
        const result = res.data.result;
        setData(result);
    }
    const [data, setData] = useState([]);
    
    
      
      

    useEffect(() => {
        if (localStorage.getItem('token') === null) {
            alert("잘못된 접근입니다.");
          window.location.replace('/')
        }
        callApi();
        
      }, []);
    return (
        <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>게시판 제목</TableCell>
            <TableCell align="right">게시판 번호</TableCell>
            <TableCell align="right">작성자</TableCell>
            <TableCell align="right">작성일</TableCell>
            <TableCell align="right">조회수</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row: any) => (
            <TableRow
              key={row.nID}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.nTITLE}
              </TableCell>
              <TableCell align="right">{row.nID}</TableCell>
              <TableCell align="right">{row.nWRITER}</TableCell>
              <TableCell align="right">{row.nDATE}</TableCell>
              <TableCell align="right">{row.views}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
        
    );
}

export default BoardPage;
