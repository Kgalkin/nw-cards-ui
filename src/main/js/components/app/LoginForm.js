import React from "react";
import PrivateRoute from "./PrivateRoute";
import {login} from "../../utils/apiUtils";

export class LoginForm extends React.Component {

    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this)
        this.unameInput = React.createRef()
        this.pssInput = React.createRef()
    }

    render() {
        return <div className="form">
            <form onSubmit={this.handleSubmit}>
                <div className="input-container">
                    <label>Username </label>
                    <input ref={this.unameInput} type="text" name="uname" required/>
                </div>
                <div className="input-container">
                    <label>Password </label>
                    <input ref={this.pssInput} type="password" name="pass" required/>
                </div>
                <div className="button-container">
                    <input type="submit"/>
                </div>
            </form>
        </div>
    }

    handleSubmit = (e) => {
        e.preventDefault();
        login(this.unameInput.current.value, this.pssInput.current.value)
            .then(r =>
            this.props.history.push("/admin"))
    }
}