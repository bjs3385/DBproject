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

function App() {
    const callApi = async () => {
        axios.get("/api").then((res) => console.log(res.data.test));
    };
    useEffect(() => {
        callApi();
    }, []);
    return (
        <div>
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
            </Routes>
        </div>
    );
}

export default App;
