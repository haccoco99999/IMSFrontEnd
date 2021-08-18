import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import BootstrapTable from "react-bootstrap-table-next";
import Swal from "sweetalert2";
//css
import "../../product.css";
//components
import {
  // getAllProductAction,
  getAllUpdateProductAction,
} from "../product-manager/action";

import { agreeUpdateSKUAction, rejectUpdateSKUAction } from "./action";
import { TableLoading } from "../../../components/loading/loading-component";
export default function RequestUpdateManager() {
  let dispatch = useDispatch();
  // let history = useHistory();

  const {
    token,
    getAllUpdateRequest,
    agreeUpdateRequestSkuReducer,
    rejectUpdateRequestSkuReducer,
  } = useSelector((state) => ({
    token: state.client.token,
    getAllUpdateRequest: state.getAllUpdateRequestReducer.productUpdateMessages,
    agreeUpdateRequestSkuReducer: state.agreeUpdateRequestSkuReducer,
    rejectUpdateRequestSkuReducer: state.rejectUpdateRequestSkuReducer,
  }));

  function agreeToUpdateRequest(id) {
    const data = { productVariantId: id };
    Swal.fire({
      title: "Are you sure",
      text: "Do you want to accept this?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: " #d33",
      confirmButtonText: "Confirm",
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(agreeUpdateSKUAction({ data: data, token: token }));
      }
    });
  }

  function rejectUpdateRequest(id) {
    const data = { productVariantId: id };
    Swal.fire({
      title: "Are you sure",
      text: "Do you want to reject this?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: " #d33",
      confirmButtonText: "Confirm",
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(rejectUpdateSKUAction({ data: data, token: token }));
      }
    });
  }

  const columnsProductUpdate = [
    { dataField: "productVariantId", hidden: true },
    { dataField: "productVariantName", text: "Name" },
    { dataField: "sku", text: "Requested SKU" },
    {
      dataField: "productVariantId",
      text: "Action",
      formatter: (cellContent, row, rowIndex) => {
        return (
          <>
            <div
              className="text-success btn"
              onClick={() => agreeToUpdateRequest(row.productVariantId)}
            >
              <i class="bi bi-check-circle-fill me-1 "></i>
              Accept
            </div>
            <div
              className="text-danger btn"
              onClick={() => rejectUpdateRequest(row.productVariantId)}
            >
              <i class="bi bi-x-circle-fill me-1 "></i>
              Reject
            </div>
          </>
        );
      },
    },
  ];
  useEffect(() => {
    dispatch(getAllUpdateProductAction({ token: token }));
  }, []);

  useEffect(() => {
    if (agreeUpdateRequestSkuReducer.requesting === true) {
      Swal.fire({
        title: "Progressing",
        html: "Waiting...",
        timerProgressBar: true,
        didOpen: () => {
          Swal.showLoading();
        },
      });
    }

    if (agreeUpdateRequestSkuReducer.successful === true) {
      Swal.fire({
        icon: "success",
        title: "Your work has been saved",
        showCancelButton: false,
        confirmButtonColor: "#3085d6",
      }).then((result) => {
        if (result.isConfirmed) {
          dispatch(getAllUpdateProductAction({ token: token }));
        }
      });
    }

    if (agreeUpdateRequestSkuReducer.errors === true) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Something went wrong!",
        showCancelButton: false,
        confirmButtonColor: "#3085d6",
      });
    }
  }, [agreeUpdateRequestSkuReducer]);

  useEffect(() => {
    if (rejectUpdateRequestSkuReducer.requesting === true) {
      Swal.fire({
        title: "Progressing",
        html: "Waiting...",
        timerProgressBar: true,
        didOpen: () => {
          Swal.showLoading();
        },
      });
    }

    if (rejectUpdateRequestSkuReducer.successful === true) {
      Swal.fire({
        icon: "success",
        title: "Your work has been saved",
        showCancelButton: false,
        confirmButtonColor: "#3085d6",
      }).then((result) => {
        if (result.isConfirmed) {
          dispatch(getAllUpdateProductAction({ token: token }));
        }
      });
    }

    if (rejectUpdateRequestSkuReducer.errors === true) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Something went wrong!",
        showCancelButton: false,
        confirmButtonColor: "#3085d6",
      });
    }
  }, [rejectUpdateRequestSkuReducer]);
  return (
    <>

<div class="pb-3">
        <div className="card">
          <div class="card-header text-white bg-secondary">Request Update List</div>
          <div className="card-body">
      


            {/* <PagingComponent sizePerPage={filter.sizePerPage} setSizePage={setSizePage} pageCount={infoTablePage.pageCount} nextPagingClick={nextPagingClick} backPagingClick={backPagingClick} currentPage={filter.CurrentPage} /> */}

            <BootstrapTable
          keyField="productVariantId"
          striped
          hover
          condensed
          columns={columnsProductUpdate}
          noDataIndication={() => <TableLoading />}
          data={getAllUpdateRequest}
        />



          </div>
        </div>
      </div>

      
    </>
  );
}
