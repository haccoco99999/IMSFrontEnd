import React from "react";
import "./product.css";

export default function CreateNewProduct() {
  return (
    <div className="wrapper">
      <div className=" tab-fixed fixed-top border-bottom shadow">
        <div className=" d-flex mb-3 justify-content-end mt-4">
          <h2 className=" supplierid-color me-auto">
            Create purchase requisition
          </h2>
          <button className="btn btn-default">Cancel</button>
          <button className="btn btn-warning button me-3 text-white">
            Save
          </button>
          <button className="btn btn-primary button me-3">Submit</button>
        </div>
      </div>

      <div className="d-flex flex-column align-items-center wrapper-spacetop">
        <div className="wrapper_create d-flex justify-content-center mt-3 shadow "></div>
      </div>
    </div>
  );
}
