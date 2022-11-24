import axios from "axios";
import { Routes, Route, useParams } from "react-router-dom";
import { useEffect } from "react";
import "./App.css";
import BoardPage from "./components/views/BoardPage/BoardPage";
import ArticlePage from "./components/views/ArticlePage/ArticlePage";
import RegisterPage from "./components/views/RegisterPage/RegisterPage";
import LoginPage from "components/views/LoginPage/LoginPage";
import NewRegisterPage from "components/views/LoginPage/NewRegisterPage";
import HomePage from "components/views/HomePage/HomePage";
import BoardList from "components/views/BoardPage/Sections/BoardList";
import ImagePage from "components/views/ArticlePage/ImagePage";
import ReplyPage from "components/views/ArticlePage/ReplyPage";
import MyPage from "components/views/ArticlePage/MyPage";
import ImagePage2 from "components/views/ArticlePage/ImagePage2";

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
                <Route path="/image" element={<ImagePage />} />
                <Route path="/image2" element={<ImagePage2 />} />
                <Route path="/mypage" element={<MyPage />} />
                <Route path="/reply" element={<ReplyPage boardId={1} boardType="notice" />} />
            </Routes>
        </div>
    );
}

export default App;
