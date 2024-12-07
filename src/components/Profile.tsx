import StreamElement from "./common/Stream.structure";
import { IStream } from "../structures/types";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { NavContext } from "../App";

export default function Profile() {
  const [profile, setProfile] = useState<{
    display_name: string;
    email: string;
    owned_group: [];
    followed_group: [];
  }>({ display_name: "", email: "", owned_group: [], followed_group: [] });
  let [regloginShow, setRegLoginShow] = useContext(NavContext)!


  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:2000/api/session", {
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        !data.auth
          ? navigate("/login")
          : fetch("http://localhost:2000/profile", { credentials: "include" })
              .then((response) => response.json())
              .then((data) => {
                setProfile(data);
                setRegLoginShow(false)
              });
      });
  }, []);

  let display_name: string = profile!.display_name;
  let email: string = profile!.email;

  const [viewStream, setViewStream] = useState("owned");

  function handleStreamView(view: "owned" | "followed") {
    setViewStream(view);
  }

  function logout() {
    fetch("http://localhost:2000/logout", { credentials: 'include' })
      .then(response => response.json())
      .then(data => {
        data.ok ? (function() {
          navigate("/login")
          setRegLoginShow(true)
        })() : false
      })
  }

  return (
    <>
      <div
        className="card border-dark mb-3"
        style={{ maxWidth: "30rem", marginTop: "20px" }}
      >
        <div className="card-header text-center">This is ME!</div>
        <div className="card-body">
          <div className="d-flex">
            <div className="p-2 flex-grow-1">
              <h5 className="card-title">I am {display_name}</h5>
            </div>
          </div>
          <div className="d-flex">
            <div className="p-2 flex-grow-1">
              <p className="card-text">
                You can email me at <b>{email}</b>
              </p>
            </div>
            <div className="p-2">
              <button className="btn btn-danger" onClick={logout}>Logout</button>
            </div>
          </div>
        </div>
      </div>

      <ul className="nav nav-pills">
        <li className="nav-item">
          <a
            className={viewStream == "owned" ? "nav-link active" : "nav-link"}
            onClick={() => handleStreamView("owned")}
          >
            I own these
          </a>
        </li>
        <li className="nav-item">
          <a
            className={
              viewStream == "followed" ? "nav-link active" : "nav-link"
            }
            onClick={() => handleStreamView("followed")}
          >
            I follow these
          </a>
        </li>
      </ul>

      {viewStream == "owned" ? (
        profile.owned_group.length != 0 ? (
          profile.owned_group.map(
            ({
              stream_id,
              author,
              name,
              description,
              stream_type,
            }: IStream) => {
              return (
                <StreamElement
                  stream_id={stream_id}
                  author={author}
                  description={description}
                  name={name}
                  stream_type={stream_type}
                  key={stream_id}
                />
              );
            }
          )
        ) : (
          <h1>Don't you study??</h1>
        )
      ) : profile.owned_group.length != 0 ? (
        profile.followed_group.map(
          ({ stream_id, author, name, description, stream_type }: IStream) => {
            return (
              <StreamElement
                stream_id={stream_id}
                author={author}
                description={description}
                name={name}
                stream_type={stream_type}
                key={stream_id}
              />
            );
          }
        )
      ) : (
        <h1>Follow some, people aren't that bad!</h1>
      )}
    </>
  );
}
