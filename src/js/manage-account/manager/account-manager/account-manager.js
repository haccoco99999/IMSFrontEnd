import React, { useState } from "react";

//css
import "../../accountmanager.css";

//component
import AddAccountModal from "../../create/account/create-account";
import FilterModal from "./filter";
import AccountDetailsModal from "../../details/account/account-details";

function AccountManager() {
  return (
    <>
      <div>
        <a
          class="btn btn-default me-md-2 add"
          data-bs-target="#AddAccountModal"
          data-bs-toggle="modal"
        >
          <svg
            class="svg-icon"
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            fill="#4caf50"
            class="bi bi-plus-lg"
            viewBox="0 0 20 20"
          >
            <path d="M8 0a1 1 0 0 1 1 1v6h6a1 1 0 1 1 0 2H9v6a1 1 0 1 1-2 0V9H1a1 1 0 0 1 0-2h6V1a1 1 0 0 1 1-1z"></path>
          </svg>
          Add
        </a>

        <a
          class="btn btn-default filter"
          data-bs-target="#AddFilterModal"
          data-bs-toggle="modal"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            fill="gray"
            class="bi bi-sliders"
            viewBox="0 0 20 20"
          >
            <path
              fill-rule="evenodd"
              d="M11.5 2a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zM9.05 3a2.5 2.5 0 0 1 4.9 0H16v1h-2.05a2.5 2.5 0 0 1-4.9 0H0V3h9.05zM4.5 7a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zM2.05 8a2.5 2.5 0 0 1 4.9 0H16v1H6.95a2.5 2.5 0 0 1-4.9 0H0V8h2.05zm9.45 4a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zm-2.45 1a2.5 2.5 0 0 1 4.9 0H16v1h-2.05a2.5 2.5 0 0 1-4.9 0H0v-1h9.05z"
            ></path>
          </svg>
          Filter
        </a>
      </div>

      {/* <div class="d-flex justify-content-center">
        <div class=" searchaccount">
          <div class="input-group input-group-sm mb-3">
            <div class="input-group-prepend ">
              <span
                class="input-group-text span-searchiconslot "
                id="inputGroup-sizing-sm"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  fill="currentColor"
                  class="bi bi-search"
                  viewBox="0 0 16 16"
                >
                  <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                </svg>
              </span>
            </div>

            <input
              type="text"
              class="form-control searchfield-borderless"
              aria-label="Small"
              aria-describedby="inputGroup-sizing-sm"
              placeholder="Search by Email, Account ID, Name"
            />
          </div>
        </div>
      </div>

      <table class="table">
        <thead>
          <tr>
            <th scope="col">Email Address</th>
            <th scope="col">Full Name</th>
            <th scope="col">Status</th>
            <th scope="col">Phone No</th>
            <th scope="col">Role</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Tammmmse130115@fpt.vn</td>
            <td class=" d-flex justify-content-start">
              <a class="btn btndefault"
              data-bs-target="#AccountDetailsModal"
              data-bs-toggle="modal"
              
              >Mao Nguyễn Minh Tâm</a>
            </td>
            <td class="table-acc-status-active">Active</td>
            <td>0909000002</td>
            <td class="table-role-name">Stockkeeper</td>
          </tr>
          <tr>
            <td>Hungppse130005@fpt.vn</td>
            <td>
              <a class="btn btndefault"
              data-bs-target="#AccountDetailsModal"
              data-bs-toggle="modal"
              
              >Phan Phú Hưng</a>
            </td>
            <td class="table-acc-status-deactive">Deactive</td>
            <td>0909000003</td>
            <td class="table-role-name">Salesman</td>
          </tr>
        </tbody>
      </table> */}
      <AddAccountModal />

      <FilterModal />
      <AccountDetailsModal />
    </>
  );
}

export default AccountManager;
