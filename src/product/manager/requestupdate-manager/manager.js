import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import BootstrapTable from "react-bootstrap-table-next";

//css
import "../../product.css";
//components
import {
  getAllProductAction,
  getAllUpdateProductAction,
} from "../product-manager/action";

import { agreeUpdateSKUAction, rejectUpdateSKUAction } from "./action";
import { TableLoading } from "../../../components/loading/loading-component";
export default function RequestUpdateManager() {
  let dispatch = useDispatch();
  // let history = useHistory();

  const { token, getAllUpdateRequest } = useSelector((state) => ({
    token: state.client.token,
    getAllUpdateRequest: state.getAllUpdateRequestReducer.productUpdateMessages,
  }));

  function agreeToUpdateRequest(id) {

  }

  function rejectUpdateRequest(id) {}

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
              className="text-success"
              onClick={() => agreeToUpdateRequest(row.productVariantId)}
            >
              <i class="bi bi-check-circle-fill"></i>
            </div>
            <div
              className="text-danger"
              onClick={() => rejectUpdateRequest(row.productVariantId)}
            >
              <i class="bi bi-x-circle-fill"></i>
            </div>
          </>
        );
      },
    },
  ];
  useEffect(() => {
    dispatch(getAllUpdateProductAction({ token: token }));
  }, []);
  return (
    <>
      <div className="wrapper-content shadow">
        <BootstrapTable
          keyField="productVariantId"
          striped
          hover
          condensed
          columns={columnsProductUpdate}
          headerClasses="table-header-receipt"
          noDataIndication={() => <TableLoading />}
          data={getAllUpdateRequest}
        />
      </div>
    </>
  );
}
