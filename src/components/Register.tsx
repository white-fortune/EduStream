import { BaseSyntheticEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Alert } from "./common/Alert.structure";
import { IAlert } from "../structures/types";

const server = "http://localhost:2000";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [alert, setAlert] = useState<IAlert>({ id: "0", message: "" });
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:2000/api/session", {
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        data.auth ? navigate("/profile") : null;
      });
  }, []);

  async function handleRegister(e: BaseSyntheticEvent) {
    e.preventDefault();

    let userData = new FormData();
    userData.append("email", email);
    userData.append("display_name", displayName);
    userData.append("password", password);

    let response = await fetch(`${server}/register`, {
      method: "POST",
      body: userData,
    });
    let data = await response.json();
    let isAuth: boolean = data.auth;
    isAuth
      ? navigate("/login")
      : (function () {
          setPassword("");
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
          <h1>Join EduStream</h1>
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
          <label>Display Name:</label>
          <input
            type="text"
            className="form-control"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
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
            <button className="btn btn-success" onClick={handleRegister}>
              Register
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
