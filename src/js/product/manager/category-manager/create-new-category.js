import React from "react";
import "../../product.css";
export default function () {
  return (
    <div>
      <div
        className="modal"
        tabIndex="-1"
        id="NewCategoryModal"
        data-bs-keyboard="false"
        data-bs-backdrop="static"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Create New Category </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>

            <div className="modal-body">
              <form>
                <div class="mb-3">
                  <label for="Category" class="form-label">
                    Category Name
                  </label>
                  <input
                    type="text"
                    class="form-control"
                    id="Category"
                    aria-describedby="emailHelp"
                  />
                </div>
                <div class="mb-3">
                  <label for="description" class="form-label">
                    Description
                  </label>
                  <textarea
                    class="form-control"
                    id="description"
                    rows="3"
                  ></textarea>
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-default"
                data-bs-dismiss="modal"
              >
                Cancel
              </button>
              <button
                type="button"
                className=" text-white btn btn-default button-save--modal "
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
