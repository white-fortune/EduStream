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
          <ul className="nav nav-tabs card-header-tabs">
            <li className="nav-item">
              <a
                className={
                  current === "groups" ? "nav-link active" : "nav-link"
                }
                onClick={() => handleNav("groups")}
                href="#"
              >
                Groups
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
          </ul>
      </div>
    </>
  );
}
