import { useNavigate } from "react-router-dom";
import { IStream, StreamType } from "../../structures/types";

export default function StreamElement({
  author,
  name,
  description,
  stream_id,
  stream_type,
}: IStream) {
  const navigate = useNavigate();
  function goToStream(streamID: string) {
    navigate(`/stream/${streamID}`);
  }

  function getStream(stream_type: StreamType) {
    switch (stream_type) {
      case "private":
        return <span className="badge text-bg-warning">{stream_type}</span>;
      case "public":
        return <span className="badge text-bg-success">{stream_type}</span>;
    }
  }

  return (
    <div className="card text-left" style={{ marginTop: "20px" }}>
      <div className="card-header">Stream by {author.display_name}</div>
      <div className="card-body">
        <h5 className="card-title">{name}</h5>
        <p className="card-text">{description}</p>
        <a
          onClick={() => goToStream(stream_id)}
          className="btn btn-outline-success"
        >
          Go to stream
        </a>
      </div>
      <div className="card-footer text-body-secondary">
        Type: {getStream(stream_type)}
      </div>
    </div>
  );
}
