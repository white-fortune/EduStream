export  const Alert = ({ message }: { message: string }) => {
    return (
      <div
        className="alert alert-warning alert-dismissible fade show"
        role="alert"
        style={{
          marginTop: "50px",
          display: "block",
          maxWidth: "30rem",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        {message}
        <button
          type="button"
          className="btn-close"
          data-bs-dismiss="alert"
          aria-label="Close"
        ></button>
      </div>
    );
  };