import axios from "axios";
import {Route, Routes} from "react-router-dom";
import React, {useEffect} from "react";
import "./App.css";
import BoardPage from "./components/views/BoardPage/BoardPage";
import ArticlePage from "./components/views/ArticlePage/ArticlePage";
import RegisterPage from "./components/views/RegisterPage/RegisterPage";
import LoginPage from "components/views/LoginPage/LoginPage";
import NewRegisterPage from "components/views/LoginPage/NewRegisterPage";
import HomePage from "components/views/HomePage/HomePage";
import BoardList from "components/views/BoardPage/Sections/BoardList";
import ReplyPage from "components/views/ArticlePage/ReplyPage";
import MyPage from "components/views/MyPage/MyPage";
import WishlistPage from "components/views/ArticlePage/WishlistPage";
import ImagePage2 from "components/views/ArticlePage/ImagePage2";
import CategoryPage from "./components/views/CategoryPage/CategoryPage";
import OrderlistPage from "./components/views/OrderListPage/OrderlistPage";
import NewItemPage from "./components/views/NewItemPage/NewItemPage";
import UpdatePage from "./components/views/UpdatePage/UpdatePage";
import {createTheme, ThemeProvider} from "@mui/material/styles";
import {grey} from "@mui/material/colors";
import SearchPage from "./components/views/SearchPage/SearchPage";

const theme = createTheme({
    palette: {
        primary: {
            main: grey[900],
        },
        secondary: {
            main: "#000000FF",
        },
    },
});

function App() {
    return (
        <div><ThemeProvider theme={theme}>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/article/:id" element={<ArticlePage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/board" element={<BoardPage />} />
                <Route path="/board/:boardId" element={<BoardList />} />
                <Route path="/newregister" element={<NewRegisterPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/image2" element={<ImagePage2 />} />
                <Route path="/category/:category" element={<CategoryPage/>} />
                <Route path="/mypage" element={<MyPage />} />
                <Route path="/wishpage" element={<WishlistPage />} />
                <Route path="/updatepage" element={<UpdatePage />} />
                <Route path="/reply" element={<ReplyPage boardId={1} boardType="notice" />} />
                <Route path={"/order"} element={<OrderlistPage></OrderlistPage>} />
                <Route path={"/newItem"} element={<NewItemPage></NewItemPage>} />
                <Route path={"/testPage"} element={<SearchPage></SearchPage>} />
            </Routes>
        </ThemeProvider>
        </div>
    );
}

export default App;
