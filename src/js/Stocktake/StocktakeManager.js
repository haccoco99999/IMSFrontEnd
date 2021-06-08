import React from "react";
import "./stocktake.css";
import Empty from "./Empty";
import Filter from "./Filter";
import AdjustDisplay from "./AdjustDisplay";

export default function StocktakeManager() {
  return (
    <div className="wrapper">
      <h1>Stock Take </h1>
      <div className="d-flex justify-content-center">
        <div className="wrapper-content ">
 {/* button */}
 <div className="ms-5">
        <a
          class="btn btn-default me-md-2 add"
          // data-bs-target="#"
          // data-bs-toggle="modal"
        >
          {/* <AddAccountModal isShowing={isShowing} hide={toggle} /> */}
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
        {/* setting */}

        <a
          class="btn btn-default filter"
          data-bs-target="#AddjustDisplayTableModal"
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
            <path d="M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492zM5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0z" />
            <path d="M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52l-.094-.319zm-2.633.283c.246-.835 1.428-.835 1.674 0l.094.319a1.873 1.873 0 0 0 2.693 1.115l.291-.16c.764-.415 1.6.42 1.184 1.185l-.159.292a1.873 1.873 0 0 0 1.116 2.692l.318.094c.835.246.835 1.428 0 1.674l-.319.094a1.873 1.873 0 0 0-1.115 2.693l.16.291c.415.764-.42 1.6-1.185 1.184l-.291-.159a1.873 1.873 0 0 0-2.693 1.116l-.094.318c-.246.835-1.428.835-1.674 0l-.094-.319a1.873 1.873 0 0 0-2.692-1.115l-.292.16c-.764.415-1.6-.42-1.184-1.185l.159-.291A1.873 1.873 0 0 0 1.945 8.93l-.319-.094c-.835-.246-.835-1.428 0-1.674l.319-.094A1.873 1.873 0 0 0 3.06 4.377l-.16-.292c-.415-.764.42-1.6 1.185-1.184l.292.159a1.873 1.873 0 0 0 2.692-1.115l.094-.319z" />
          </svg>
          Adjust table
        </a>

        {/*  filter*/}
        <a
          class="btn btn-default filter"
          data-bs-target="#FilterModal"
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
      {/* search */}
      <div class="d-flex justify-content-center">
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

      {/* table */}
      <div className="d-flex justify-content-center">
        <div className="wrapper-table">
          <table class="table ">
            <thead>
              <tr>
                <th scope="col">Stock Take ID</th>
                <th scope="col">Created By</th>
                <th scope="col">Status</th>
                <th scope="col">Create Date </th>

                <th scope="col">Modified Date </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="id-color">272005181</td>
                <td>Huy</td>
                <td>Progressing</td>
                <td>05/22/2021</td>
                <td>05/22/2021</td>
              </tr>

              <tr>
                <td className="id-color">272005181</td>
                <td>Huy</td>
                <td>Complete</td>
                <td>05/22/2021</td>
                <td>05/22/2021</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
        </div>
      </div>

     

      <AdjustDisplay />
      <Filter />
    </div>
  );
}
