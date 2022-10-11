import React from "react";
import { useState } from "react";
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
