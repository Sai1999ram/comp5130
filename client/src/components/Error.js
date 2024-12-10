import React from "react";

export default function Error({ error }) {
  return (
    <div className="alert alert-danger d-flex align-items-center my-3" role="alert">
      <div className="me-2">
        <i className="fas fa-exclamation-circle"></i>
      </div>
      <div>
        {error}
      </div>
    </div>
  );
}