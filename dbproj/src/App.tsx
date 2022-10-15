import axios from "axios";
import { Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import "./App.css";
import BoardPage from "./components/views/BoardPage/BoardPage";
import ArticlePage from "./components/views/ArticlePage/ArticlePage";
import RegisterPage from "./components/views/RegisterPage/RegisterPage";
import LoginPage from "components/views/LoginPage/LoginPage";

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
                <Route path="/" element={<LoginPage />} />
                <Route path="/article/:articleId" element={<ArticlePage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/board" element={<BoardPage />} />
            </Routes>
        </div>
    );
}

export default App;
