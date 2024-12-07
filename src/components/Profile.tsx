import StreamElement from "./common/Stream.structure";
import { IStream } from "../structures/types";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


export default function Profile() {
  const [profile, setProfile] = useState<{
    display_name: string;
    email: string;
    owned_group: [];
    followed_group: [];
  }>({display_name: "", email: "", owned_group: [], followed_group: []});

  const navigate = useNavigate();

  useEffect(() => {
    console.log(`Second`)
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
                // console.log(data)
                setProfile(data);
              });
      });
  }, []);

  let display_name: string = profile!.display_name;
  let email: string = profile!.email;

  const [viewStream, setViewStream] = useState("owned");

  function handleStreamView(view: "owned" | "followed") {
    setViewStream(view);
  }

  return (
    <>
      <div
        className="card border-dark mb-3"
        style={{ maxWidth: "30rem", marginTop: "20px" }}
      >
        <div className="card-header text-center">This is ME!</div>
        <div className="card-body">
          <h5 className="card-title">I am {display_name}</h5>
          <p className="card-text">
            You can email me at <b>{email}</b>
          </p>
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

      {viewStream == "owned"
        ? profile.owned_group.map(
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
        : profile.followed_group.map(
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
          )}
      {}
    </>
  );
}
