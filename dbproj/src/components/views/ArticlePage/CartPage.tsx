import React, {useEffect, useState} from "react";
import axios from "axios";

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function CartPage() {
    const email = localStorage.getItem('id') as string;
    const callApi = async () => {
      if(email !== "")
      {
        axios
            .post("/cart/getCart", null, {
              params: {
                  email: email,
              },
          })
            .then((res) => {
                if(res.data.result ==="success"){
                    setData(res.data.result);
                    console.log("asdasd"+data);
                    window.location.replace("/");
                }
                else if(res.data.result === "wrong id")
                {
                  alert("로그인을 해주시길 바랍니다.");
                }
            })
            .catch();
        }else if (email === "") {
          alert("아이디를 입력해주세요.");
      }
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
      <Table sx={{ minWidth: 100 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="left">상품명</TableCell>
            <TableCell align="left">개수</TableCell>
            <TableCell align="left">가격</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row: any) => (
            <TableRow
              key={row.cID}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell align="left">{row.pID}</TableCell>
              <TableCell align="left">{row.cQTY}</TableCell>
              <TableCell align="left">{row.cPRICE}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
        
    );
}

export default CartPage;
