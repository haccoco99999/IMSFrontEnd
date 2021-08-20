import React from "react";
import Table from "react-bootstrap-table-next";
import ToolkitProvider, {
  Search,
} from "react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit.min";

export default function BrandModalComponent(props) {
  const { SearchBar } = Search;
  const columns = [
    // { dataField: "id", text: "ID" },
    { dataField: "brandName", text: "Brand Name" },
    // { dataField: "brandDescription", text: "Brand Description" },
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
              <h5 className="modal-title">Search: Brands </h5>
              <button
                type="button"
                className="btn-close"
                onClick={props.hideModal}
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <ToolkitProvider
                keyField="brandName"
                data={props.listBrand}
                columns={columns}
                search={afterSearch}
              >
                {(props) => (
                  <div>
                    <SearchBar {...props.searchProps} />
                    <hr />
                    <Table
                      striped
                      hover
                      condensed
                      headerClasses="table-header-receipt"
                      selectRow={selectRow}
                      {...props.baseProps}
                    />
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
                onClick={props.onSelectLocationClick}
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
