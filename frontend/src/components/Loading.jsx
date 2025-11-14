export const Loading = () => {
  return (
    <div
    //esto tambien lo edité con IA 
      className="d-flex justify-content-center align-items-center"
      style={{
        width: "100%",
        height: "100vh",
        backgroundColor: "rgba(255, 255, 255, 0.6)",
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: 9999,
      }}
    >
      <div
        className="spinner-border text-primary"
        role="status"
        style={{ width: "4rem", height: "4rem" }}
      >
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
};
