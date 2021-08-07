import React, { useState, useEffect } from "react";
import { Toast } from "bootstrap";

export default function ToastComponent(props) {
  //   var [toast, setToast] = useState(false);
  //   const toastRef = useRef();

  //   useEffect(() => {
  //     var myToast = toastRef.current;
  //     var bsToast = Toast.getInstance(myToast);

  //     if (!bsToast) {
  //       // initialize Toast
  //       bsToast = new Toast(myToast, { autohide: false });
  //       // hide after init
  //       bsToast.hide();
  //       setToast(false);
  //     } else {
  //       // toggle
  //       toast ? bsToast.show() : bsToast.hide();
  //     }
  //   });

  return (
    <div>
      {/* <button
        className="btn btn-success"
        onClick={() => setToast((toast) => !toast)}
      >
        Toast {toast ? "hide" : "show"}
      </button> */}
      <div
        className="toast position-absolute bottom-0 end-0 m-4"
        role="alert"
        ref={props.toastRef}
      >
        <div className="toast-header">
          <strong className="me-auto">Bootstrap 5</strong>
          <small>4 mins ago</small>
          <button
            type="button"
            className="btn-close"
            // onClick={() => setToast(false)}
            onClick={props.hideToast}
            aria-label="Close"
          ></button>
        </div>
        <div className="toast-body">Hello, world! This is a toast message.</div>
      </div>
    </div>
  );
}
