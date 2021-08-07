import React, { useEffect, useState, useRef } from "react";
import { Toast } from "bootstrap";

export default function NotificationToast(props) {
  var [toast, setToast] = useState(false);
  const toastRef = useRef();

  return (
    <div>
      <div className="toast  " role="alert" ref={props.toastRef}>
        <div className="toast-header">
          <strong className="me-auto">Notification</strong>
          <small>4 mins ago</small>
          <button
            type="button"
            className="btn-close"
            // onClick={() => setToast(false)}
            // data-bs-dismiss="toast"
            onClick={props.hideToast}
            aria-label="Close"
          ></button>
        </div>
        <div className="toast-body">{props.message}</div>
      </div>
    </div>
  );
}
