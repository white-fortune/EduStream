import { IAlert } from "../../structures/types";

export const Alert = ({
  controlAlert,
}: {
  controlAlert: [
    IAlert,
    React.Dispatch<React.SetStateAction<IAlert>>
  ];
}) => {
  function deleteAlert() {
    controlAlert[1]({ id: "0", message: "0" })
  }

  return (
    <>
      <div
        className="alert alert-warning alert-dismissible fade show"
        style={{
          marginTop: "50px",
          display: "block",
          maxWidth: "30rem",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        {controlAlert[0] ? controlAlert[0].message : null}
        <button
          type="button"
          className="btn-close"
          onClick={deleteAlert}
        ></button>
      </div>
    </>
  );
};
