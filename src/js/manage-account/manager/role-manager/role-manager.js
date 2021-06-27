import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

//css
import "../../accountmanager.css";

//components
import Table from "../../../table-receipt/ListReceiptsTable";
import RoleManagerAction from "./action";

export default function () {
  let history = useHistory();
  let dispatch = useDispatch();

  let { listRoles, token, pageCount } = useSelector((state) => ({
    listRoles: state.getAllRoleReducer.listRoles,
    token: state.client.token,
    pageCount: state.getAllRoleReducer.pageCount,
  }));
  console.log(listRoles);
  const [listValueColumn, setListValueColumn] = useState({
    name: true,
    // Description: true,
  });
  const [listHeaderEdit, setListEditHeader] = useState({
    name: "Role Name",
  });

  const [currentPage, setCurrentPage] = useState(1);
  const [sizePerPage, setSizePerPage] = useState(5);

  function nextPagingClick() {
    console.log("forward");
    setCurrentPage(currentPage + 1);
  }

  function backPagingClick() {
    console.log("backWard");
    setCurrentPage(currentPage - 1);
  }

  function goCreatePage() {
    history.push("/homepage/manage-account/create-role");
  }

  useEffect(() => {
    dispatch(
      RoleManagerAction({
        currentPage: currentPage,
        sizePerPage: sizePerPage,
        token: token,
      })
    );
  }, []);

  function pushAddRolePage() {
    history.push("");
  }
  return (
    <>
      <div>
        <a
          className="btn btn-default me-md-2 add"
          onClick={goCreatePage}
          // data-bs-target="#AddAccountModal"
          // data-bs-toggle="modal"
        >
          {/* <AddAccountModal isShowing={isShowing} hide={toggle} /> */}
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
          Create new Role
        </a>
      </div>

      <Table
        listColumn={listValueColumn}
        listData={listRoles}
        listHeaderEdit={listHeaderEdit}
        pageCount={pageCount}
        sizePerPage={sizePerPage}
        currentPage={currentPage}
        backPagingClick={backPagingClick}
        nextPagingClick={nextPagingClick}
      />
    </>
  );
}
