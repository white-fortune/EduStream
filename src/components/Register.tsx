import { BaseSyntheticEvent, useState } from "react";

const server = "http://localhost:2000";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");

  async function handleRegister(e: BaseSyntheticEvent) {
    e.preventDefault();
  }

  return (
    <div className="card text-left" style={{ marginTop: "20px" }}>
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
  );
}
