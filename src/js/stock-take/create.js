import React from "react";

import "./stocktake.css";
import AddMultiple from "./add-multiple";

export default function create() {
  return (
    <div className="home_content">
      {/* todo: task heading */}
      {/* todo: gop chung 2 page voi 2 nut khâc nhau  */}
      <div className=" tab-fixed container-fluid  fixed-top">
        {/* todo: task heading */}
        <div className=" tab-fixed container-fluid  fixed-top">
          <div className=" d-flex mb-3 justify-content-end mt-4 ">
            <h2>Back</h2>
            <h2 className="id-color fw-bold me-auto">Create  Stock take</h2>
            <div>
              <button className="btn btn-default button-tab">Cancel</button>
              <button className="btn btn-primary button-tab me-3 text-white">
                Submit
              </button>
              <button className="btn btn-primary button-tab me-3 text-white">
                Save
              </button>
            </div>
          </div>
        </div>

        {/* content */}
        <div className="wrapper space-top">
          <div className="shadow wrapper-content">
            <form>
              <div class="row g-3 align-items-center mt-3">
                {/* search */}
                <div className="col"></div>

                {/* button multiple */}
                <div class="col-auto">
                  <button
                    type="button"
                    class="btn btn-default btn-outline-dark"
                    data-bs-target="#AddMultipleModal"
                    data-bs-toggle="modal"
                  >
                    Add multiple
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      <AddMultiple />
    </div>
  );
}
