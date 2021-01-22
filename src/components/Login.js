import React from "react";
import { Formik } from "formik";
import axios from "axios";
import ReactDom from "react-dom";
import PostsList from "./PostsList";

const Login = () => (
  <Formik
    initialValues={{
        userName: "",
      password: ""
    }}
    onSubmit={values => {
      console.log("submitting:", values);
      axios.post("http://localhost:8080/login", values).then(res => {
        const token = res.headers.token;
        localStorage.setItem("token",token);
        console.log(token,'token-----------');
        ReactDom.unmountComponentAtNode(document.getElementById("root"));
        ReactDom.render(<PostsList />, document.getElementById("root"))
        
        
        });
    }}
  >
    {({ handleSubmit, handleChange, values }) => (
      <form onSubmit={handleSubmit}>
        <label htmlFor="userName">user name</label>
        <input
          type="text"
          name="userName"
          id="userName"
          value={values.userName}
          onChange={handleChange}
        />
        <label htmlFor="password">password</label>
        <input
          type="password"
          name="password"
          id="password"
          value={values.password}
          onChange={handleChange}
        />
        <button type="submit">Login</button>
      </form>
    )}
  </Formik>
);

export default Login;
