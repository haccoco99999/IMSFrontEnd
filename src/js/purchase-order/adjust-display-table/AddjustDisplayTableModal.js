import React, { useState } from "react";


export default function AddjustDisplayTableModal(props) {
  // let[listCheckBox, setListCheckBox] = useState()
  // function setCheckBoxClick( event){
  //   setListCheckBox(
  //     ...listCheckBox
  //   )
  // }
  return (
    <div>
      <div
        className="modal"
        tabIndex="-1"
        id="AddjustDisplayTableModal"
        data-bs-keyboard="false"
        data-bs-backdrop="static"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Adjust Display Table </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              {/* Lap column */}
              {Object.entries(props.listColumnDisplay).map(item =>
                <div class="form-check">
                  <input name={item[0]} checked={item[1]}  onChange={(event) =>props.setCheckBoxClick(event)} class="form-check-input" type="checkbox" value="" id="checkCreateDate" />
                  <label class="form-check-label" for="checkCreateDate">
                    {item[0]}
                  </label>
                </div>
              )}

              {/* ket thuc */}
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-default"
                data-bs-dismiss="modal"
              >
                Cancel
              </button>
              <button onClick={(e) =>props.submitDisplay(e)}
                type="button"
                className="btn btn-default addaccountmodal-done "
              >
                Done
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
