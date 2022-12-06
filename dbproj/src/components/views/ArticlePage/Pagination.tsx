import React from "react";

const Pagination = ({postsPerPage, totalPosts, paginate}: any) => {
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
        pageNumbers.push(i);
    }
    return (
        <div>
            <nav>
                <ul>
                    {pageNumbers.map((number) => (
                        <li key={number}>
                            <span onClick={() => paginate(number)}>{number}</span>
                        </li>
                    ))}
                </ul>
            </nav>
        </div>
    );
};
export default Pagination;
