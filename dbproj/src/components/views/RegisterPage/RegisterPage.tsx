import React, {useEffect, useState} from "react";
import axios from "axios";
import RegisterOrEdit from "../BoardPage/Sections/RegisterOrEdit";

function RegisterPage() {
    const [TitleValue, setTitleValue] = useState("");
    const [ContentValue, setContentValue] = useState("");

    const onTitleChange = (event: any) => {
        setTitleValue(event.currentTarget.value);
    };
    console.log(TitleValue);

    const onContentChange = (event: any) => {
        setContentValue(event.currentTarget.value);
    };
    console.log(ContentValue);
    useEffect(() => {
        if (localStorage.getItem("token") === null) {
            alert("잘못된 접근입니다.");
            window.location.replace("/");
        } else {
            axios
                .post("http://localhost:4000/users/onLogin", null, {
                    params: {
                        email: localStorage.getItem("id"),
                        token: localStorage.getItem("token"),
                    },
                })
                .then((res) => {
                    if (res.data.result === "wrong token") {
                        window.location.replace("/");
                        alert("잘못된 접근입니다.");
                    }
                });
        }
    }, []);
    return (
        <RegisterOrEdit
            titleValue={TitleValue}
            ContentValue={ContentValue}
            handleTitleChange={onTitleChange}
            handleContentChange={onContentChange}
        ></RegisterOrEdit>
    );
}

export default RegisterPage;
