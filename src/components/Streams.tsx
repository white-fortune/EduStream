import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { IStream } from "../structures/types";
import StreamElement from "./common/Stream.structure";
import Cookies from "js-cookie";
import { Alert } from "./common/Alert.structure";
import Loader from "./common/Loader.structure";

// const SearchPanel = ({
//   streamName,
// }: // streams
// {
//   streamName: any;
//   streams: any;
// }) => {
//   return (
//     <div className="input-group mb-3" style={{ marginTop: "20px" }}>
//       <input
//         type="text"
//         className="form-control"
//         placeholder="Search Stream"
//         value={streamName[0]}
//         onChange={(e) => streamName[1](e.target.value)}
//       />
//       <div className="btn-group">
//         {/* <button
//           className="btn btn-outline-primary"
//           type="button"
//           data-bs-toggle="modal"
//           data-bs-target="#exampleModal"
//         >
//           Create Stream
//         </button> */}
//       </div>
//     </div>
//   );
// };
// type AlertContextType = [
//   boolean,
//   React.Dispatch<React.SetStateAction<boolean>>
// ];
// const AlertContext = createContext<AlertContextType | undefined>(undefined);

const CreateGroupModal = ({
  streamTitle,
  streamDesc,
  streamType,
  streams,
  alert,
}: {
  streamTitle: any;
  streamDesc: any;
  streamType: any;
  streams: any;
  alert: any;
}) => {
  async function createStream() {
    if (streamTitle[0] === "") return;
    let streamData = new FormData();

    let userID: string = Cookies.get("userID")!;

    streamData.append("name", streamTitle[0]);
    streamData.append("userID", userID);
    streamData.append("description", streamDesc[0]);
    streamData.append("stream_type", streamType[0]);

    fetch("/api/createStream", {
      method: "POST",
      credentials: "include",
      body: streamData,
    })
      .then((response) => response.json())
      .then((data) => {
        data.ok
          ? streamType[0] == "public"
            ? (function () {
                streams[1]((prev_streams: any) => {
                  return prev_streams.concat(data.stream);
                });
                alert[1]({
                  id: crypto.randomUUID(),
                  message: "Stream created successfully",
                });
              })()
            : null
          : console.log(data.message);
      });

    streamTitle[1]("");
  }

  return (
    <>
      <div
        className="modal fade"
        id="exampleModal"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Track your progress!
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>

            <div className="modal-body">
              <label className="lead">Stream Name:</label>
              <input
                type="text"
                className="form-control"
                placeholder="This will express the topic you will be tracking..."
                value={streamTitle[0]}
                onChange={(e) => streamTitle[1](e.target.value)}
              />
              <br />
              <label className="lead">Stream Description:</label>
              <textarea
                className="form-control"
                placeholder="Some basic info to help others know what are you exactly tracking, or specifing some tips or recources..."
                value={streamDesc[0]}
                onChange={(e) => streamDesc[1](e.target.value)}
              />
              <br />
              <label className="lead">Type:</label>
              <select
                className="form-select"
                value={streamType[0]}
                onChange={(e) => streamType[1](e.target.value)}
              >
                <option value="private">
                  Private - Only you will be able to use the stream
                </option>
                <option value="public">
                  Public - Everyone in EduStream can see the stream
                </option>
              </select>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-danger"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-success"
                data-bs-dismiss="modal"
                onClick={() => createStream()}
              >
                Create
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default function Streams() {
  let streamList: IStream[] = [];

  // const [streamName, setStreamName] = useState(""); // Search bar
  const [streamTitle, setStreamTitle] = useState("");
  const [streamDesc, setStreamDesc] = useState("");
  const [streamType, setStreamType] = useState("private");
  const [streams, setStreams] = useState(streamList);
  const [alert, setAlert] = useState({ id: "0", message: "" });
  const [loaderShow, setLoaderShow] = useState<"block" | "none">("none");
  const navigate = useNavigate();

  useEffect(() => {
    setLoaderShow("block");
    fetch("/api/session", {
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        !data.auth
          ? navigate("/login")
          : fetch("/api/getStreams")
              .then((response) => response.json())
              .then(({ streams }) => {
                setLoaderShow("none");
                setStreams((prev_streams) => {
                  return prev_streams.concat(streams);
                });
              });
      });
  }, []);

  return (
    <>
      {/* <SearchPanel
        streamName={[streamName, setStreamName]}
        streams={[streams, setStreams]}
      /> */}
      {alert.id !== "0" ? (
        <Alert controlAlert={[alert, setAlert]} key={alert.id} />
      ) : null}
      <button
        className="btn btn-outline-primary"
        type="button"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
        style={{ marginTop: "20px" }}
      >
        Create Stream
      </button>
      <Loader
        controlLoader={[loaderShow, setLoaderShow]}
        message="Fethcing streams for you...just wait a bit!"
      />
      <CreateGroupModal
        streamTitle={[streamTitle, setStreamTitle]}
        streamDesc={[streamDesc, setStreamDesc]}
        streamType={[streamType, setStreamType]}
        streams={[streams, setStreams]}
        alert={[alert, setAlert]}
      />

      <div className="list-group">
        {streams.length != 0
          ? streams
              .filter((stream) => stream.stream_id != "0")
              .map(
                ({
                  stream_id,
                  name,
                  author,
                  description,
                  stream_type,
                }: IStream) => {
                  return (
                    <StreamElement
                      stream_id={stream_id}
                      author={author}
                      name={name}
                      description={description}
                      stream_type={stream_type}
                      key={stream_id}
                    />
                  );
                }
              )
          : null}
      </div>
    </>
  );
}
