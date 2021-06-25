import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";

//css
import "../supplier.css";

import { getDetailsSupplierAction } from "./action";

export default function () {
  let history = useHistory();
  let location = useLocation();
  let dispatch = useDispatch();

  const supplier = useSelector(
    (state) => state.getDetailsSupplierReducer.supplierDetails
  );
  // console.log(sup);

  const [returnData, setReturnData] = useState(false);
  console.log(supplier);

  function goBackClick() {
    history.goBack();
  }

  useEffect(() => {
    dispatch(getDetailsSupplierAction({ id: location.state.supplierName }));
    if (supplier !== null) {
      setReturnData(true);
    }
  }, []);

  return (
    <div>
      {/* todo: task heading */}
      <div className=" tab-fixed container-fluid  fixed-top">
        <div className=" d-flex mb-3 justify-content-end mt-4 ">
          <a className="me-2" onClick={goBackClick}>
            <h3>Back</h3>
          </a>
          <h2 className="id-color fw-bold me-auto">Create new supplier</h2>
          <div>
            <button className="btn btn-danger button-tab button me-3">
              Cancel
            </button>
            <button className="btn btn-primary button-tab button me-3">
              Save
            </button>
          </div>
        </div>
      </div>
      {/* content */}
      {returnData && (
        <div className="wrapper space-top">
          {/* content field 1  */}
          <div className="wrapper-content shadow">
            <div className="title-heading mt-2">
              <span>Supplier Details</span>
            </div>
            <form>
              {/* Supplier name  */}
              <div className="mt-3">
                <label for="supplierName" class="form-label">
                  Supplier Name
                </label>
                <input
                  type="text"
                  class="form-control"
                  id="supplierName"
                  value={location.state.supplierName}
                />
              </div>
              {/* Email &&  Phone No  */}
              <div className="mt-3">
                <div class="row g-3 align-items-center">
                  <div class="col">
                    <label for="inputEmail" class="col-form-label">
                      Email
                    </label>{" "}
                    <input
                      type="text"
                      id="inputEmail"
                      class="form-control"
                      value={supplier.email}
                      //aria-describedby="passwordHelpInline"
                    />
                  </div>
                  <div class="col">
                    <label for="phone" class="col-form-label">
                      Phone No.
                    </label>{" "}
                    <input
                      type="tel"
                      id="phone"
                      class="form-control"
                      value={supplier.phoneNumber}
                    />
                  </div>
                </div>
              </div>

              {/* Note  */}
              <div class="mb-3 mt-3">
                <label for="note" class="form-label">
                  Note
                </label>
                <textarea
                  class="form-control"
                  id="note"
                  rows="3"
                  value={supplier.description}
                ></textarea>
              </div>
            </form>
          </div>

          {/* content field 2  */}
          <div className="wrapper-content mt-3 shadow">
            <div className="title-heading mt-2">
              <span>Address</span>
            </div>
            <form>
              <div class="row g-3 align-items-center">
                <div class="col">
                  <label for="inputEmail" class="col-form-label">
                    City
                  </label>{" "}
                  <select
                    class="form-select"
                    aria-label="Default select example"
                  >
                    <option selected disabled>
                      Select Role
                    </option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                  </select>
                </div>
                <div class="col">
                  <label for="inputphoneno" class="col-form-label">
                    District
                  </label>{" "}
                  <select
                    class="form-select"
                    aria-label="Default select example"
                  >
                    <option selected disabled>
                      Select Role
                    </option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                  </select>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
