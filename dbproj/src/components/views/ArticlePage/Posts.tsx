import { response } from "express";
import React from "react";

interface Props {
    posts: any;
    loading: boolean;
}

const Posts = ({ posts, loading }: Props) => {
    return (
        <>
            {loading && <div> loading ... </div>}
            <ul>
                {posts.map((post: any) => (
                    <li key={post.id}>{post.title}</li>
                ))}
            </ul>
        </>
    );
};

export default Posts;
