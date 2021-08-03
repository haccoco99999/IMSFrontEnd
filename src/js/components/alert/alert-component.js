import React from "react";
import { Alert } from "bootstrap";

export default function AlertComponent(props) {
  return (
    <div>
      <div className="position-absolute top-0 end-0 m-4">
        <div
          className="alert alert-warning alert-dismissible fade"
          ref={props.alertRef}
          role="alert"
        >
          {props.message}
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="alert"
            aria-label="Close"
          ></button>
        </div>
      </div>
    </div>
  );
}
