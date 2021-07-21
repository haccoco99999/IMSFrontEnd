import React from "react";
import Table from "react-bootstrap-table-next";
import ToolkitProvider, {
  Search,
} from "react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit.min";

export default function PurchaseAcceptModal(props) {
  const { SearchBar } = Search;
  const columns = [
    { dataField: "id", text: "Purchase Order ID" },
    { dataField: "supplierName", text: "Supplier" },
    {
      dataField: "createdDate",
      text: "Created Date",
      formatter: (cellContent, row, rowIndex) => {
        return row.createdDate.split("T")[0];
      },
    },
  ];

  const selectRow = {
    mode: "radio",
    clickToSelect: true,
    onSelect: props.handleOnSelect,
    style: { backgroundColor: "#c8e6c9" },
  };

  const afterSearch = (newResult) => {
    console.log(newResult);
  };
  return (
    <div>
      <div
        className="modal fade"
        tabIndex="-1"
        id="ListLocationstModal"
        data-bs-keyboard="false"
        data-bs-backdrop="static"
        ref={props.modalRef}
      >
        <div className="modal-dialog modal-dialog-scrollable">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Search: Confirmed Purchase Order </h5>
              <button
                type="button"
                className="btn-close"
                onClick={props.hideModal}
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <ToolkitProvider
                keyField="id"
                data={props.listPOConfirm}
                columns={columns}
                search={afterSearch}
              >
                {(props) => (
                  <div>
                    <SearchBar {...props.searchProps} />
                    <hr />
                    <Table selectRow={selectRow} {...props.baseProps} />
                  </div>
                )}
              </ToolkitProvider>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-default"
                // data-bs-dismiss="modal"
                onClick={props.hideModal}
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn btn-default button-save--modal text-white"
                onClick={props.onSelectConfirm}
              >
                Select
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
