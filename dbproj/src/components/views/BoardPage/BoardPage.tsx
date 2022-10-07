import React from "react";
import BoardList from "./Sections/BoardList";
import { Link } from "react-router-dom";
function BoardPage() {
    return (
        <div>
            <div>
                <h1>Board Title</h1>
            </div>
            <div>
                <Link to="/register">
                    <button>New Post</button>
                </Link>
            </div>
            <div>
                <BoardList></BoardList>
            </div>
        </div>
    );
}

export default BoardPage;
