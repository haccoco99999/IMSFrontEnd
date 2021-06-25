import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
//css
import "../supplier.css";
//component
import ListReceiptTable from "../../table-receipt/ListReceiptsTable";
import { getAllSuppliersAction } from "./action";

export default function () {
  let history = useHistory();
  let dispatch = useDispatch();
  

  const [currentPage, setCurrentPage] = useState(1);
  const [sizePerPage, setSizePerPage] = useState(5);

  const [listValueColumn, setListValueColumn] = useState({
    supplierName: true,
    email: true,
    phoneNumber: true,
  });

  const [listEditHeader, setListEditHeader] = useState({
    // id: "Goods Receipt ID",
  });

  const { listData, pageCount } = useSelector((state) => ({
    listData: state.getAllSuppliersReducer.listSuppliers,
    pageCount: state.getAllSuppliersReducer.pageCount,
  }));

  function pushAddPage() {
    history.push("/homepage/supplier/create");
  }

  function nextPagingClick() {
    console.log("forward");
    setCurrentPage(currentPage + 1);
  }

  function backPagingClick() {
    console.log("backWard");
    setCurrentPage(currentPage - 1);
  }
  function onClickToDetails(row) {
    history.push("/homepage/supplier/details", {
      supplierName: row.supplierName,
    });
  }

  useEffect(() => {
    dispatch(
      getAllSuppliersAction({
        currentPage: currentPage,
        sizePerPage: sizePerPage,
      })
    );
  }, [currentPage, sizePerPage]);

  return (
    <div className="space-top-heading">
      {" "}
      {/* title */}
      <div className="title-heading mt-2">
        <span>Supplier</span>
      </div>
      {/* content block */}
      <div className="wrapper-content shadow">
        {/* list nut bam  */}
        <div className="ms-1">
          <a
            class="btn btn-default me-md-2 fw-bold add"
            onClick={pushAddPage}
            // data-bs-target="#"
            // data-bs-toggle="modal"
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

          {/* setting */}

          <a
            class="btn btn-default fw-bold filter"
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
            class="btn btn-default fw-bold filter"
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
        <div className="mt-3">
          <ListReceiptTable
            listHeaderEdit={listEditHeader}
            listColumn={listValueColumn}
            listData={listData}
            backPagingClick={backPagingClick}
            nextPagingClick={nextPagingClick}
            sizePerPage={sizePerPage}
            currentPage={currentPage}
            pageCount={pageCount}
            onRowClick={onClickToDetails}
          />
        </div>
      </div>
    </div>
  );
}
