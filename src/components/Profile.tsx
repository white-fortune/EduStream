import StreamElement from "./common/Stream.structure";
import { IStream, StreamType } from "../structures/types";
import { useEffect, useState } from "react";

export default function Profile() {
  const [profile, setProfile] = useState<{ display_name: string, email: string }>({ display_name: "User", email: "user@user.com"});

  useEffect(() => {
    fetch("http://localhost:2000/profile", { credentials: "include" })
      .then((response) => response.json())
      .then((data) => {
        setProfile(data);
      });
  }, []);

  let display_name: string = profile.display_name;
  let email: string = profile.email;

  const [viewStream, setViewStream] = useState("owned");

  function handleStreamView(view: "owned" | "followed") {
    setViewStream(view);
  }

  let streamList: IStream[] = [
    {
      id: crypto.randomUUID(),
      title: "Study With ME!",
      author: "John Doe",
      description: "Keep syncing your study",
      type: StreamType.Private,
    },
    {
      id: crypto.randomUUID(),
      title: "Sync Study",
      author: "Maria",
      description: "Let's start with chemistry",
      type: StreamType.Public,
    },
  ];

  let followedList: IStream[] = [
    {
      id: crypto.randomUUID(),
      title: "Hello!",
      author: "Moshi moshi",
      description: "This is a stream I follow",
      type: StreamType.Public,
    },
  ];

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
        ? streamList.map(
            ({ id, author, title, description, type }: IStream) => {
              return (
                <StreamElement
                  id={id}
                  author={author}
                  description={description}
                  title={title}
                  type={type}
                  key={id}
                />
              );
            }
          )
        : followedList.map(
            ({ id, author, title, description, type }: IStream) => {
              return (
                <StreamElement
                  id={id}
                  author={author}
                  description={description}
                  title={title}
                  type={type}
                  key={id}
                />
              );
            }
          )}
      {}
    </>
  );
}
