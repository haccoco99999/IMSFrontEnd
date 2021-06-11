import React from "react";

import "../product.css";
import NewCategory from "./create-new-category";
export default function () {
  return (
    <div>
      <NewCategory />
      <div className="ms-5">
        <a
          class="btn btn-default me-md-2 add"
          data-bs-target="#NewCategoryModal"
          data-bs-toggle="modal"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            fill="currentColor"
            className="bi bi-plus-lg"
            viewBox="0 0 20 20"
          >
            <path d="M8 0a1 1 0 0 1 1 1v6h6a1 1 0 1 1 0 2H9v6a1 1 0 1 1-2 0V9H1a1 1 0 0 1 0-2h6V1a1 1 0 0 1 1-1z" />
          </svg>
          Create new Category
        </a>
      </div>

      {/* <div className="d-flex justify-content-center">
        <div className="wrapper-table">
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Category Name</th>
                <th scope="col" colspan="3">
                  Description
                </th>
                <th scope="col">Last Update</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td class="table-role-name ">Accountant</td>
                <td colspan="3"></td>
                <td>05/17/2021</td>
              </tr>
              <tr>
                <td class="table-role-name ">Stockkeeper</td>
                <td colspan="3"></td>
                <td>05/17/2021</td>
              </tr>
              <tr>
                <td class="table-role-name ">Salesman</td>
                <td colspan="3"></td>
                <td>05/17/2021</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div> */}
    </div>
  );
}
