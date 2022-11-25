import React from 'react';

function moveMyPage() {

    const onclickMyPage = () => {
    window.location.replace("/mypage");
    }
    return (
        <div>
            <button onClick={ onclickMyPage}>MyPage</button>
        </div>
    );
}
export default moveMyPage;