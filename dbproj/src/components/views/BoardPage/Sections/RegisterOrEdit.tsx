import React from "react";

function RegisterOrEdit(props: any) {
    return (
        <div>
            <form>
                <br/>
                <label>Title: </label>
                <input onChange={props.hadleTitleChange} value={props.titleValue} type="text" name="title"/>
                <hr></hr>
                <div>
                    <textarea onChange={props.handleContentChange} value={props.ContentValue} name="content"/>
                </div>
                <button>Submit</button>
            </form>
        </div>
    );
}

export default RegisterOrEdit;
