import React from "react";
import { useHistory } from "react-router-dom";
//css
import "../sale-man.css";

export default function () {
  let history = useHistory();

  function goBackClick() {
    history.goBack();
  }

  return (
    <div>
      {/* todo: task heading */}
      {/* todo: gop chung 2 page voi 2 nut khâc nhau  */}
      <div className=" tab-fixed container-fluid  fixed-top">
        {/* todo: task heading */}
        <div className=" tab-fixed container-fluid  fixed-top">
          <div className=" d-flex mb-3 justify-content-end mt-4 ">
            {/* testing */}
            <a className="me-2" onClick={goBackClick}>
              <h3>Back</h3>
            </a>
            {/* title */}
            <h2 className="id-color fw-bold me-auto">Create Goods Receipt</h2>
            {/* list button */}
            <div>
              <button className="btn btn-primary me-3 text-white button-tab">
                Save
              </button>

              <button className="btn btn-primary me-3 text-white button-tab ">
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* content */}
      <div className="wrapper space-top"></div>
    </div>
  );
}
