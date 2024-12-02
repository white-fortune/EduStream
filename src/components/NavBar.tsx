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
    <ul className="nav nav-pills">
      <li className="nav-item">
        <a
          href="#"
          className={current === "groups" ? "nav-link active" : "nav-link"}
          onClick={() => handleNav("groups")}
        >
          Groups
        </a>
      </li>
      <li className="nav-item">
        <a
          href="#"
          className={current === "profile" ? "nav-link active" : "nav-link"}
          onClick={() => handleNav("profile")}
        >
          Profile
        </a>
      </li>
    </ul>
  );
}
