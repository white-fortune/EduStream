import { BaseSyntheticEvent, useState } from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleLogin(e: BaseSyntheticEvent) {
    e.preventDefault();
  }

  return (
    <form onSubmit={handleLogin}>
      <div className="card text-left" style={{ marginTop: "20px" }}>
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
            <button className="btn btn-success" type="submit">
              Login
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}
