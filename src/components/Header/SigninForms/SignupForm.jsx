import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { signUpFetch } from "../../../redux/features/application";
import { Link } from "react-router-dom";
import styles from "./Signin.module.css";

const SignupForm = () => {
  const dispatch = useDispatch();
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(signUpFetch(login, password));
  };
  return (
    <div className={styles.container}>
      <section className={styles.content}>
        <form action="">
          <h1>Login Form</h1>
          <div>
            <input
              type="text"
              placeholder="Username"
              required=""
              className={styles.username}
              value={login}
              onChange={(e) => setLogin(e.target.value)}
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Password"
              required=""
              className={styles.password}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div>
            <input type="submit" value="Log up" onClick={handleSubmit} />
            <Link to="/login">Log in</Link>
          </div>
        </form>
      </section>
    </div>
  );
};

export default SignupForm;
