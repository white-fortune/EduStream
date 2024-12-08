import React from "react";

type LoaderControler = ["block" | "none", React.Dispatch<"block" | "none">];
interface Props {
  controlLoader: LoaderControler;
  message: string;
}

export default function Loader({ controlLoader, message }: Props) {
  const [loaderShow] = controlLoader;
  return (
    <div style={{ display: loaderShow }}>
      <div className="d-flex" style={{ marginTop: "15px" }}>
        <div className="p-2 flex-grow-1">{message}</div>
        <div className="p-2">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">{message}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export function ButtonLoader({ controlLoader, message }: Props) {
  const [loaderShow] = controlLoader;
  return (
    <button
      className="btn btn-success"
      type="button"
      disabled
      style={{ display: loaderShow }}
    >
      <span
        className="spinner-border spinner-border-sm"
        aria-hidden="true"
      ></span>
      <span role="status">{message}</span>
    </button>
  );
}
