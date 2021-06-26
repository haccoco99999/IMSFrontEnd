import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

//css
import "../../accountmanager.css";
import Action from "./action";

//component
import AddAccountModal from "../../create/account/create-account";
import FilterModal from "./filter";
import AccountDetailsModal from "../../details/account/account-details";
import Table from "../../../table-receipt/ListReceiptsTable";

function AccountManager() {
  let history = useHistory();
  let dispatch = useDispatch();

  const listAccounts = useSelector((state) => state.imsUser);

  const [listValueColumn, setListValueColumn] = useState({
    email: true,
    fullname: true,
    isActive:true,
    phoneNumber: true,

  });

  const [listEditHeader, setListEditHeader] = useState({
    isActive: "Status",
  });

  useEffect(() => {
    dispatch(Action());
  }, []);
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
      {/* <div className="mt-3">
        <Table
          listHeaderEdit={listEditHeader}
          listColumn={listValueColumn}
          listData={listAccounts}
        />
      </div> */}

      <AddAccountModal />

      <FilterModal />
      <AccountDetailsModal />
    </>
  );
}

export default AccountManager;
