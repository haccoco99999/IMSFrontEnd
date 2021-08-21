import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import BootstrapTable from "react-bootstrap-table-next";
import ToolkitProvider from "react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit";
import { TableLoading } from "../../components/loading/loading-component";
import moment from "moment";
// css
import "../goodreceipt.css";
import "./good-receipt-manager.css";

//component
// import ListReceiptTable from "../../table-receipt/ListReceiptsTable";
import { searchGoodsReceiptAction } from "./action";
import PagingComponent from "../../components/paging/paging-component";
import { GoodReceiptFilter } from "../../components/filter/FilterComponents";
import { setStatusLoadingTable } from "../../helper/loadDataHelper";

export default function GoodsReceipt() {
  let history = useHistory();
  let dispatch = useDispatch();

  const {
    listGoodsReceipt,
    pageCount,
    rowCountTotal,
    token,
    pageAuthorized,
    getGoodsReceiptReducer,
  } = useSelector((state) => ({
    listGoodsReceipt: state.getGoodsReceiptReducer.listGoodsReceipt,
    pageCount: state.getGoodsReceiptReducer.pageCount,
    rowCountTotal: state.getGoodsReceiptReducer.rowCountTotal,
    token: state.client.token,
    pageAuthorized: state.client.pageAuthorized,
    getGoodsReceiptReducer: state.getGoodsReceiptReducer,
  }));

  const [currentPage, setCurrentPage] = useState(1);
  // const [sizePerPage, setSizePerPage] = useState(5);

  const goodsReceiptFilterInit = {
    SearchQuery: "",
    FromCreatedDate: "",
    ToCreatedDate: "",
  };
  const [goodsReceiptFilter, setGoodsReceiptFilter] = useState({
    currentPage: 1,
    SizePerPage: 25,

    ...goodsReceiptFilterInit,
  });

  // const [listValueColumn, setListValueColumn] = useState([
  //   { purchaseOrderId: "Purchase Order ID" },
  //   { createdDate: "Create Date" },
  //   { supplierName: "Supplier Name" },
  //   { createdBy: "Created By" },
  //   { id: "Goods Receipt ID" },
  // ]);

  const [listValueColumn, setListValueColumn] = useState({
    purchaseOrderId: true,
    createdDate: true,
    supplierName: true,
    createdBy: true,
    id: true,
  });

  //todo: declare bootstrap table
  const columns = [
    {
      dataField: "id",
      text: "ID",
    },
    {
      dataField: "purchaseOrderId",
      text: "Purchase Order ID",
    },
    {
      dataField: "createdBy",
      text: "Created By",
    },
    {
      dataField: "createdDate",
      text: "Created Date",
      formatter: (cellContent, row, rowIndex) => {
        return (
          <span>
            {moment(row.createdDate).add(7, "h").format("DD-MM-YYYY")}
          </span>
        );
      },
    },
    {
      dataField: "modifiedDate",
      text: "Modified Date",
      formatter: (cellContent, row, rowIndex) => {
        return (
          <span>
            {moment(row.modifiedDate).add(7, "h").format("DD-MM-YYYY")}
          </span>
        );
      },
    },
  ];

  const [listEditHeader, setListEditHeader] = useState({
    id: "Goods Receipt ID",
  });

  const rowEvents = {
    onClick: (e, row, rowIndex) => {
      history.push("/homepage/good-receipt/details", {
        goodsreceiptId: row.id,
        fromPage: "ManagerPage",
      });
    },
  };

  useEffect(() => {
    console.log("CurrentPage", currentPage);
    dispatch(
      searchGoodsReceiptAction({
        filter: parseFilterToString(goodsReceiptFilter),
        token: token,
      })
    );
  }, []);

  function handleClick() {
    history.push("/homepage/good-receipt/create-goods-receipt");
  }
  function onChangeGoodsReceiptFilter(event) {
    setGoodsReceiptFilter((state) => ({
      ...state,
      [event.target.name]: event.target.value,
    }));
  }
  function nextPagingClick() {
    let dataFilter = {
      ...goodsReceiptFilter,
      currentPage: goodsReceiptFilter.currentPage + 1,
    };
    dispatch(
      searchGoodsReceiptAction({
        filter: parseFilterToString(dataFilter),
        token: token,
      })
    );
    setGoodsReceiptFilter(dataFilter);
  }
  function backPagingClick() {
    let dataFilter = {
      ...goodsReceiptFilter,
      currentPage: goodsReceiptFilter.currentPage - 1,
    };
    dispatch(
      searchGoodsReceiptAction({
        filter: parseFilterToString(dataFilter),
        token: token,
      })
    );
    setGoodsReceiptFilter(dataFilter);
  }
  function setSizePage(event) {
    let dataFilter = { ...goodsReceiptFilter, SizePerPage: event.target.value };
    dispatch(
      searchGoodsReceiptAction({
        filter: parseFilterToString(dataFilter),
        token: token,
      })
    );
    setGoodsReceiptFilter(dataFilter);
  }
  function parseFilterToString(dataFilter) {
    let filterString = "";
    Object.entries(dataFilter).forEach((item) => {
      if (item[1] !== "") {
        filterString += item[0] + "=" + item[1] + "&";
      }
    });
    return filterString;
  }

  function onClickToDetails(row) {
    history.push("/homepage/good-receipt/details", {
      goodsreceiptId: row.id,
      fromPage: "ManagerPage",
    });
  }

  const CustomToggleList = ({ columns, onColumnToggle, toggles }) => (
    <div
      className=" collapse btn-group btn-group-toggle btn-group-vertical"
      id="collapseGoodReceipt"
      data-toggle="buttons"
    >
      {columns
        .map((column) => ({
          ...column,
          toggle: toggles[column.dataField],
        }))
        .map((column, index) => (
          <div class="form-check form-switch">
            <input
              key={column.dataField}
              className={`form-check-input ${column.toggle ? "active" : ""}`}
              data-toggle="button"
              checked={column.toggle}
              type="checkbox"
              aria-pressed={column.toggle ? "true" : "false"}
              id={"flexSwitchCheckDefault" + index}
              onClick={() => onColumnToggle(column.dataField)}
            />
            <label
              class="form-check-label"
              for={"flexSwitchCheckDefault" + index}
            >
              {column.text}
            </label>
          </div>
        ))}
    </div>
  );
  function submitGoodsReceiptFilter() {
    dispatch(
      searchGoodsReceiptAction({
        filter: parseFilterToString(goodsReceiptFilter),
        token: token,
      })
    );
  }
  function resetGoodsReceiptFilter() {
    let defaultData = { ...goodsReceiptFilter, ...goodsReceiptFilterInit };
    dispatch(
      searchGoodsReceiptAction({
        filter: parseFilterToString(defaultData),
        token: token,
      })
    );
    setGoodsReceiptFilter(defaultData);
  }
 

  return (
    <div className="space-top-heading wrapper">
      {/* title  */}
      <div className="title-heading mt-2">
        <span>Goods Receipt</span>
      </div>
      {/* content block  */}

      {/* /////////EDIT FRONTEND////////////////// */}

      <div class="d-grid gap-2">
        <GoodReceiptFilter
          filter={goodsReceiptFilter}
          onChangeValueFilter={onChangeGoodsReceiptFilter}
          submitFilter={submitGoodsReceiptFilter}
          resetFilter={resetGoodsReceiptFilter}
        />
        <div class="">
          <div className="card">
            <div class="card-header text-white bg-secondary">
              List Goods Receipt
            </div>
            <div className="card-body">
              <PagingComponent
                rowCountTotal={rowCountTotal}
                sizePerPage={goodsReceiptFilter.SizePerPage}
                setSizePage={setSizePage}
                pageCount={pageCount}
                nextPagingClick={nextPagingClick}
                backPagingClick={backPagingClick}
                currentPage={goodsReceiptFilter.currentPage}
              />

              {pageAuthorized.includes("CreateGoodsReceipt") ? (
                <button
                  onClick={handleClick}
                  type="button"
                  class=" btn-sm mb-1 btn btn-primary"
                >
                  Add Goods Receipt
                </button>
              ) : (
                ""
              )}
              <p
                className="dropdown-toggle pointer"
                data-bs-toggle="collapse"
                data-bs-target="#collapseGoodReceipt"
                aria-expanded="false"
                aria-controls="collapseExample"
              >
                <i class="bi bi-sliders"></i> Setting Colum
              </p>

              <ToolkitProvider
                keyField="id"
                data={listGoodsReceipt}
                columns={columns}
                columnToggle
              >
                {(props) => (
                  <div>
                    <CustomToggleList {...props.columnToggleProps} />
                    <hr />
                    <BootstrapTable
                      keyField="id"
                      striped
                      hover
                      condensed
                      // headerClasses="table-header-receipt"
                      noDataIndication="Table is Empty"
                      columns={columns}
                      data={listGoodsReceipt}
                      rowEvents={rowEvents}
                      {...props.baseProps}
                      rowClasses="pointer"
                      noDataIndication={() =>
                        setStatusLoadingTable({
                          requesting: getGoodsReceiptReducer.requesting,
                          successful: getGoodsReceiptReducer.successful,
                        })
                      }
                      headerClasses="table-header-receipt"
                    />
                  </div>
                )}
              </ToolkitProvider>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
