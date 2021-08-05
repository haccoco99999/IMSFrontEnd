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
import { TableLoading } from "../../../components/loading/loading-component";
export default function VariantManager() {
  let dispatch = useDispatch();
  // let history = useHistory();

  const { token, getAllUpdateRequest } = useSelector((state) => ({
    token: state.client.token,
    getAllUpdateRequest: state.getAllUpdateRequestReducer.productUpdateMessages,
  }));

  const columnsProductUpdate = [
    { dataField: "productVariantId", text: "Variant ID" },
    { dataField: "sku", text: "Updated SKU" },
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
