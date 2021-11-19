import React, { useState, useLayoutEffect } from "react";
import { login } from "../api/auth"; 
import { toast } from "react-toastify";
import { getSessionStorage } from "../utils/storage";

const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async () => {
    let data = {
      email,
      password,
    };

    let user = await login(data);  
    if (user) {
      toast.success("Successful Transaction")
      setTimeout(function(){ 
        props.history.push("/home"); 
      }, 3000);
      
    }

  };

  useLayoutEffect(() => {
    let token = getSessionStorage("token"); 
    token && props.history.push("/home")
  })

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
        }}
        className="text-center"
      >
        <div
          className="form-signin"
          style={{
            width: "50%",
          }}
        >
          <form className="form-signin mt-5">
            <img
              className="mb-4"
              src="https://getbootstrap.com/docs/4.0/assets/brand/bootstrap-solid.svg"
              alt=""
              width="72"
              height="72"
            />
            <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>

            <input
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              type="email"
              id="inputEmail"
              className="form-control"
              placeholder="Email address"
              required
            />

            <input
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              type="password"
              id="inputPassword"
              className="form-control"
              placeholder="Password"
              required
            />

            <button
              onClick={(e) => {
                e.preventDefault();
                handleSubmit();
              }}
              className="btn btn-lg btn-primary btn-block"
            >
              Sign in
            </button>
           
            <p className="mt-5 mb-3 text-muted">; 2017-2018</p>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
