import React from "react";
import { useState } from "react";
import "semantic-ui-css/semantic.min.css";

function RegisterPage() {
    const [TitleValue, setTitleVatue] = useState("");
    const [ContentValue, setContentValue] = useState("");

    const onTitleChange = (event) => {
        setTitleVatue(event.currentTarget.value);
    };
    console.log(TitleValue);

    const onContentChange = (event) => {
        setContentValue(event.currentTarget.value);
    };
    console.log(ContentValue);

    return (
        <div>
            <form onSubmit>
                <br />
                <label>Title: </label>
                <input onChange={onTitleChange} value={TitleValue} type="text" name="title" />
                <hr></hr>
                <div>
                    <textarea onChange={onContentChange} value={ContentValue} name="content" />
                </div>
                <button onClick>Submit</button>
            </form>
        </div>
    );
}

export default RegisterPage;
