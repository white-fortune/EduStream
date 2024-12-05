import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function NavBar() {
  let [current, setCurrent] = useState("");

  let navigate = useNavigate();
  function handleNav(to: string) {
    setCurrent(to);
    navigate(`/${to}`);
  }

  return (
    <>
      <div className="card text-middle">
        <div className="card-header" style={{ marginBottom: "20px" }}>
          <ul className="nav nav-tabs card-header-tabs">
            <li className="nav-item">
              <a
                className={
                  current === "streams" ? "nav-link active" : "nav-link"
                }
                onClick={() => handleNav("streams")}
                href="#"
              >
                Streams
              </a>
            </li>
            <li className="nav-item">
              <a
                className={
                  current === "profile" ? "nav-link active" : "nav-link"
                }
                href="#"
                onClick={() => handleNav("profile")}
              >
                Profile
              </a>
            </li>
            <li className="nav-item">
              <a
                className={
                  current === "login" ? "nav-link active" : "nav-link"
                }
                href="#"
                onClick={() => handleNav("login")}
              >
                Login
              </a>
            </li>
            <li className="nav-item">
              <a
                className={
                  current === "register" ? "nav-link active" : "nav-link"
                }
                href="#"
                onClick={() => handleNav("register")}
              >
                Register
              </a>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
