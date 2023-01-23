import React from "react";
import {login} from "../../utils/apiUtils";
import {useNavigate} from "react-router-dom";

export default function LoginForm() {
  const navigate = useNavigate();

  const unameInput = React.createRef();
  const pssInput = React.createRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    login(unameInput.current.value, pssInput.current.value)
    .then(r => {
      navigate('/admin')
    })
  }

  return <div className="form">
    <form onSubmit={handleSubmit}>
      <div className="input-container">
        <label>Username </label>
        <input ref={unameInput} type="text" name="uname" required/>
      </div>
      <div className="input-container">
        <label>Password </label>
        <input ref={pssInput} type="password" name="pass" required/>
      </div>
      <div className="button-container">
        <input type="submit"/>
      </div>
    </form>
  </div>

}