import { useNavigate } from "react-router-dom";
import { IStream } from "../../structures/types";

export default function StreamElement({ author, title, description }: IStream) {
  const navigate = useNavigate();
  function goToStream(streamID: string) {
    navigate(`/stream/${streamID}`);
  }

  return (
    <div className="card text-left" style={{ marginTop: "20px" }}>
      <div className="card-header">Stream by {author}</div>
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        <p className="card-text">{description}</p>
        <a
          onClick={() => goToStream(title)}
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
