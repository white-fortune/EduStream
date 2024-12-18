import { BaseSyntheticEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Alert } from "./common/Alert.structure";
import { IAlert } from "../structures/types";
import { ButtonLoader } from "./common/Loader.structure";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alert, setAlert] = useState<IAlert>({ id: "0", message: "" });
  const [loaderShow, setLoaderShow] = useState<"block" | "none">("none");
  let navigate = useNavigate();

  useEffect(() => {
    fetch("/api/session", {
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        data.auth ? navigate("/profile") : null;
      });
  }, []);

  async function handleLogin(e: BaseSyntheticEvent) {
    e.preventDefault();

    let userData = new FormData();
    userData.append("email", email);
    userData.append("password", password);

    setLoaderShow("block");
    let response = await fetch("/login", {
      method: "POST",
      credentials: "include",
      body: userData,
    });
    let data = await response.json();
    let isAuth: boolean = data.auth;
    isAuth
      ? (function () {
          navigate("/profile");
        })()
      : (function () {
          setPassword("");
          setEmail("");
          setLoaderShow("none")
          setAlert({ id: crypto.randomUUID(), message: data.message });
        })();
  }

  return (
    <>
      {alert.id !== "0" ? (
        <Alert controlAlert={[alert, setAlert]} key={alert.id} />
      ) : null}
      <div
        className="card text-left"
        style={{
          marginTop: "220px",
          maxWidth: "30rem",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <div className="card-header text-center">
          <h1>Welcome Back!</h1>
        </div>
        <div className="card-body">
          <label>Email Address:</label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <br />
          <label>Password:</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <br />
          <div className="d-grid">
            <ButtonLoader
              controlLoader={[loaderShow, setLoaderShow]}
              message="Logging in..."
            ></ButtonLoader>
            <button
              className="btn btn-success"
              type="submit"
              onClick={handleLogin}
              style={{ display: loaderShow === "block" ? "none" : "block" }}
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
