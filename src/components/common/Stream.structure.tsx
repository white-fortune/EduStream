import { useNavigate } from "react-router-dom";
import { IStream } from "../../structures/types";

export default function StreamElement({ author, name, description, stream_id }: IStream) {
  const navigate = useNavigate();
  function goToStream(streamID: string) {
    navigate(`/stream/${streamID}`);
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
        Staus: <span className="badge text-bg-success">Followed</span>
      </div>
    </div>
  );
}
