import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import BootstrapTable from "react-bootstrap-table-next";
import ToolkitProvider from 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit';
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

  const { listGoodsReceipt, pageCount,rowCountTotal, token, pageAuthorized, getGoodsReceiptReducer } = useSelector((state) => ({
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


  }
  const [goodsReceiptFilter, setGoodsReceiptFilter] = useState({

    currentPage: 1,
    SizePerPage: 25,

    ...goodsReceiptFilterInit

  })

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
        return <span>{moment(row.createdDate).add(7, "h").format("DD-MM-YYYY")}</span>;
      },
    },
    {
      dataField: "modifiedDate",
      text: "Modified Date",
      formatter: (cellContent, row, rowIndex) => {
        return <span>{moment(row.modifiedDate).add(7, "h").format("DD-MM-YYYY")}</span>;
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
      ...state, [event.target.name]: event.target.value
    }))
  }
  function nextPagingClick() {

    let dataFilter = { ...goodsReceiptFilter, currentPage: goodsReceiptFilter.currentPage + 1 }
    dispatch(
      searchGoodsReceiptAction({
        filter: parseFilterToString(dataFilter),
        token: token,
      })
    );
    setGoodsReceiptFilter(dataFilter)
  }
  function backPagingClick() {

    let dataFilter = { ...goodsReceiptFilter, currentPage: goodsReceiptFilter.currentPage - 1 }
    dispatch(
      searchGoodsReceiptAction({
        filter: parseFilterToString(dataFilter),
        token: token,
      })
    );
    setGoodsReceiptFilter(dataFilter)
  }
  function setSizePage(event) {

    let dataFilter = { ...goodsReceiptFilter, SizePerPage: event.target.value }
    dispatch(
      searchGoodsReceiptAction({
        filter: parseFilterToString(dataFilter),
        token: token,
      })
    );
    setGoodsReceiptFilter(dataFilter)
  }
  function parseFilterToString(dataFilter) {
    let filterString = ""
    Object.entries(dataFilter).forEach(item => {
      if (item[1] !== "") {


        filterString += item[0] + "=" + item[1] + "&"


      }
    })
    return filterString
  }

  function onClickToDetails(row) {
    history.push("/homepage/good-receipt/details", {
      goodsreceiptId: row.id,
      fromPage: "ManagerPage",
    });
  }

  const CustomToggleList = ({
    columns,
    onColumnToggle,
    toggles
  }) => (

    <div className=" collapse btn-group btn-group-toggle btn-group-vertical" id="collapseGoodReceipt" data-toggle="buttons">
      {
        columns
          .map(column => ({
            ...column,
            toggle: toggles[column.dataField]
          }))
          .map((column, index) => (

            <div class="form-check form-switch">
              <input
                key={column.dataField}
                className={`form-check-input ${column.toggle ? 'active' : ''}`}
                data-toggle="button"
                checked={column.toggle}
                type="checkbox"
                aria-pressed={column.toggle ? 'true' : 'false'}
                id={"flexSwitchCheckDefault" + index}
                onClick={() => onColumnToggle(column.dataField)}
              />
              <label class="form-check-label" for={"flexSwitchCheckDefault" + index}>{column.text}</label>

            </div>

          ))
      }
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
    let defaultData = {...goodsReceiptFilter,...goodsReceiptFilterInit}
    dispatch(
      searchGoodsReceiptAction({
        filter: parseFilterToString(defaultData),
        token: token,
      })
    );
    setGoodsReceiptFilter(defaultData)
  }
  //   <div className="wrapper-content shadow">
  //   {/* list nut bam  */}
  //   <div className="ms-1">
  //     <a
  //       onClick={handleClick}
  //       class="btn btn-default me-md-2 fw-bold add"
  //     // data-bs-target="#"
  //     // data-bs-toggle="modal"
  //     >
  //       <svg
  //         class="svg-icon"
  //         xmlns="http://www.w3.org/2000/svg"
  //         width="20"
  //         height="20"
  //         fill="#4caf50"
  //         class="bi bi-plus-lg"
  //         viewBox="0 0 20 20"
  //       >
  //         <path d="M8 0a1 1 0 0 1 1 1v6h6a1 1 0 1 1 0 2H9v6a1 1 0 1 1-2 0V9H1a1 1 0 0 1 0-2h6V1a1 1 0 0 1 1-1z"></path>
  //       </svg>
  //       Add
  //     </a>

  //     {/* setting */}

  //     <a
  //       class="btn btn-default fw-bold filter"
  //       data-bs-target="#AddjustDisplayTableModal"
  //       data-bs-toggle="modal"
  //     >
  //       <svg
  //         xmlns="http://www.w3.org/2000/svg"
  //         width="20"
  //         height="20"
  //         fill="gray"
  //         class="bi bi-sliders"
  //         viewBox="0 0 20 20"
  //       >
  //         <path d="M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492zM5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0z" />
  //         <path d="M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52l-.094-.319zm-2.633.283c.246-.835 1.428-.835 1.674 0l.094.319a1.873 1.873 0 0 0 2.693 1.115l.291-.16c.764-.415 1.6.42 1.184 1.185l-.159.292a1.873 1.873 0 0 0 1.116 2.692l.318.094c.835.246.835 1.428 0 1.674l-.319.094a1.873 1.873 0 0 0-1.115 2.693l.16.291c.415.764-.42 1.6-1.185 1.184l-.291-.159a1.873 1.873 0 0 0-2.693 1.116l-.094.318c-.246.835-1.428.835-1.674 0l-.094-.319a1.873 1.873 0 0 0-2.692-1.115l-.292.16c-.764.415-1.6-.42-1.184-1.185l.159-.291A1.873 1.873 0 0 0 1.945 8.93l-.319-.094c-.835-.246-.835-1.428 0-1.674l.319-.094A1.873 1.873 0 0 0 3.06 4.377l-.16-.292c-.415-.764.42-1.6 1.185-1.184l.292.159a1.873 1.873 0 0 0 2.692-1.115l.094-.319z" />
  //       </svg>
  //       Adjust table
  //     </a>

  //     {/*  filter*/}
  //     <a
  //       class="btn btn-default fw-bold filter"
  //       data-bs-target="#FilterModal"
  //       data-bs-toggle="modal"
  //     >
  //       <svg
  //         xmlns="http://www.w3.org/2000/svg"
  //         width="20"
  //         height="20"
  //         fill="gray"
  //         class="bi bi-sliders"
  //         viewBox="0 0 20 20"
  //       >
  //         <path
  //           fill-rule="evenodd"
  //           d="M11.5 2a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zM9.05 3a2.5 2.5 0 0 1 4.9 0H16v1h-2.05a2.5 2.5 0 0 1-4.9 0H0V3h9.05zM4.5 7a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zM2.05 8a2.5 2.5 0 0 1 4.9 0H16v1H6.95a2.5 2.5 0 0 1-4.9 0H0V8h2.05zm9.45 4a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zm-2.45 1a2.5 2.5 0 0 1 4.9 0H16v1h-2.05a2.5 2.5 0 0 1-4.9 0H0v-1h9.05z"
  //         ></path>
  //       </svg>
  //       Filter
  //     </a>
  //   </div>

  //   <div className="mt-3">
  //     {/* <ListReceiptTable
  //       listHeaderEdit={listEditHeader}
  //       listColumn={listValueColumn}
  //       listData={list_goods_receipt}
  //       backPagingClick={backPagingClick}
  //       nextPagingClick={nextPagingClick}
  //       sizePerPage={sizePerPage}
  //       currentPage={currentPage}
  //       pageCount={pageCount}
  //       onRowClick={onClickToDetails}
  //     /> */}
  //     <BootstrapTable
  //       keyField="id"
  //       striped
  //       hover
  //       condensed
  //       headerClasses="table-header-receipt"
  //       noDataIndication="Table is Empty"
  //       columns={columns}
  //       data={listGoodsReceipt}
  //       rowEvents={rowEvents}
  //     />
  //     <PagingComponent
  //       currentPage={currentPage}
  //       pageCount={pageCount}
  //       nextPagingClick={nextPagingClick}
  //       backPagingClick={backPagingClick}
  //     />
  //   </div>
  // </div>



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
            <div class="card-header text-white bg-secondary">List Goods Receipt</div>
            <div className="card-body">
              <PagingComponent rowCountTotal={rowCountTotal} sizePerPage={goodsReceiptFilter.SizePerPage} setSizePage={setSizePage} pageCount={pageCount} nextPagingClick={nextPagingClick} backPagingClick={backPagingClick} currentPage={goodsReceiptFilter.currentPage} />

          {pageAuthorized.includes("CreateGoodsReceipt")? <button   onClick={handleClick} type="button" class=" btn-sm mb-1 btn btn-primary">Add Goods Receipt</button>:"" }
              <p className="dropdown-toggle pointer"  data-bs-toggle="collapse" data-bs-target="#collapseGoodReceipt" aria-expanded="false" aria-controls="collapseExample">
                <i class="bi bi-sliders"></i> Setting Colum
              </p>


              <ToolkitProvider
                keyField="id"
                data={listGoodsReceipt}
                columns={columns}
                columnToggle >
                {
                  props => (
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
                        noDataIndication={() =>setStatusLoadingTable({requesting: getGoodsReceiptReducer.requesting , successful:getGoodsReceiptReducer.successful}) }
                      />
                    </div>
                  )
                }
              </ToolkitProvider>




            </div>
          </div>
        </div>


      </div>



    </div>
  );
}
