import React from "react";
import "./Loading.scss"

export class Loading extends React.Component{

    constructor(props, context) {
        super(props, context);
    }

    render() {
        return <div className={"loading_container"}>
            <h1 className={"loading"}>Loading...</h1>
        </div>
    }
}