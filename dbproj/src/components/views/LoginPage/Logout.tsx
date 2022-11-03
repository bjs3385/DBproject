import React from 'react';

function Logout() {

    const onclickLogout = () => {
    localStorage.clear();
    window.location.replace("/login");
    }
    return (
        <div>
            <button onClick={ onclickLogout}>logout</button>
        </div>
    );
}
export default Logout;