import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Table from "react-bootstrap-table-next";
import { TableLoading } from "../../components/loading/loading-component";
// import paginationFactory, {
//   PaginationProvider,
// } from "react-bootstrap-table2-paginator";
//css
import "../stocktake.css";
import StockTakeFilter from './StockTakeFilter'
import ToolkitProvider, { ColumnToggle } from 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit';
//components
// import Details from "../details/details";
import { getAllStocktakeAction } from "./action";
// import PagingComponent from "../../components/";
import PagingComponent from "../../components/paging/paging-component";
import { CustomToggleList } from "../../components/toggle-columns-table/CustomToggleList";
import moment from "moment";
import { setStatusLoadingTable } from "../../helper/loadDataHelper";

export default function () {
  let history = useHistory();
  let dispatch = useDispatch();

  const { listStocktakeStore, pageCount,rowCountTotal,  token, pageAuthorized, getAllStocktakeReducer } = useSelector((state) => ({
    listStocktakeStore: state.getAllStocktakeReducer.listStocktakes,
    pageCount: state.getAllStocktakeReducer.pageCount,
    rowCountTotal: state.getAllStocktakeReducer.rowCountTotal,
    token: state.client.token,
    pageAuthorized: state.client.pageAuthorized,
    getAllStocktakeReducer: state.getAllStocktakeReducer,

  }));


  const [currentPage, setCurrentPage] = useState(1);
  const [sizePerPage, setSizePerPage] = useState(5);

  const stockTakeFilterInit = {

    SearchQuery: "",
   
    FromCreatedDate: "",
    ToCreatedDate: "",
    ToTotalPrice: "",
    CreatedByName: "",
    DeliveryMethod: "",
    FromDeliveryDate: "",
    ToDeliveryDate: "",
    FromModifiedDate:"",
    ToModifiedDate:"",
    Statuses: [
      { key: "Cancel", value: "Cancel" },
      { key: "AwaitingAdjustment", value: "Validating" },
      { key: "Completed", value: "Completed" },
      { key: "Progressing", value: "Progressing" },
    

  ]

  }
  const [stockTakeFilter, setStockTakeFilter] = useState({
    currentPage: 1,
    SizePerPage: 25,
    ...stockTakeFilterInit
  })


  // TODO: DECLARE BOOTSTRAP TABLE
  const columns = [
    {
      dataField: "id",
      text: "Stocktake ID",
      // headerAlign: "center",
      // align: "center",

    },
    {
      dataField: "status",
      text: "Status",
      isDummyField: true,
      // headerAlign: "center",
      // align: "center",
      formatter: (cellContent, row) => {
        if (row.status === "Progressing")
          return <span className="badge bg-primary">{row.status}</span>;
        else if (row.status === "Cancel")
          return <span className="badge bg-danger">{row.status}</span>;
        else if (row.status === "Completed")
          return <span className="badge bg-success">{row.status}</span>;
        else if (row.status === "AwaitingAdjustment")
          return <span className="badge bg-secondary">Validating</span>;
      },
    },
    {
      dataField: "createdByName",
      text: "Created By",
      // headerAlign: "center",
      // align: "center",
    },
    {
      dataField: "createdDate",
      text: "Created Date",
      formatter: (cellContent, row) => {
        return <span>{moment(row.createdDate).add(7, "h").format("DD-MM-YYYY")}</span>;
      },
      align: (cell, row, rowIndex, colIndex) => {
        return 'right';

    },
    },
    // {
    //   dataField:"modifiedDate"

    // }
  ];

  const customTotal = (from, to, size) => (
    <span className="react-bootstrap-table-pagination-total">
      Showing {from} to {to} of {size} Results
    </span>
  );

  const rowEvents = {
    onClick: (e, row, rowIndex) => {
      history.push("/homepage/stock-take/details", {
        stocktakeId: row.id,
      });
    },
  };

  // const options = {
  //   paginationSize: 5,
  //   onPageChange: (page, sizePerPage) => {},
  //   firstPageText: "First",
  //   prePageText: "Back",
  //   nextPageText: "Next",
  //   lastPageText: "Last",
  //   paginationTotalRenderer: customTotal,
  // };
  // const options = {
  //   custom: true,
  //   totalSize: pageCount,
  // };

  function pushAddPage() {
    history.push("/homepage/stock-take/create");
  }


  function onClickToDetails(row) {
    history.push("/homepage/stock-take/details", {
      stocktakeId: row.id,
      stocktakeStatus: row.status,
    });
  }
  useEffect(() => {
    dispatch(
      getAllStocktakeAction({
        filter: parseFilterToString(stockTakeFilter),
        token: token,
      })
    );
  }, [currentPage, sizePerPage]);


  //todo: options2
  // const options2 = {
  //   sizePerPage: 5,
  //   totalSize: pageCount,
  //   paginationTotalRenderer: customTotal,
  //   firstPageText: "First",
  //   prePageText: "Back",
  //   nextPageText: "Next",
  //   lastPageText: "Last",
  //   showTotal: true,
  //   hidePageListOnlyOnePage: true,
  //   // disablePageTitle: true,
  // };


  //   <div className="wrapper-content shadow">
  //   {/* list nut bam  */}
  //   <div className="ms-1">
  //     <a
  //       class="btn btn-default me-md-2 fw-bold add"
  //       onClick={pushAddPage}
  //       // data-bs-target="#"
  //       // data-bs-toggle="modal"
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
  //     <Table
  //       keyField="id"
  //       data={listStocktakeStore}
  //       columns={columns}
  //       striped
  //       hover
  //       condensed
  //       headerClasses="table-header-receipt"
  //       noDataIndication="Table is Empty"
  //       rowEvents={rowEvents}
  //       // pagination={paginationFactory(options2)}
  //     />
  //     <PagingComponent
  //       currentPage={currentPage}
  //       pageCount={pageCount}
  //       nextPagingClick={nextPagingClick}
  //       backPagingClick={backPagingClick}
  //     />
  //     {/* <div className="paging-container">
  //       <div className="left-size-paging">
  //         <select className="select-row-table">
  //           <option value={10}>{10}</option>
  //           <option value={11}>{10}</option>
  //           <option value={10}>{10}</option>
  //         </select>
  //         <span>Showing result out of </span>
  //       </div>
  //       <div className="button-paging">
  //         <img src="..\src\js\images\left-arrow.svg" />
  //         <img src="..\src\js\images\right-arrow.svg" />
  //       </div>
  //     </div> */}
  //   </div>
  // </div>



  function onChangeStockTaketFilter(event) {
    setStockTakeFilter((state) => ({
      ...state, [event.target.name]: event.target.value
    }))
  }
  function submitStockTakeFilter() {
   
    dispatch(
      getAllStocktakeAction({
        filter: parseFilterToString(stockTakeFilter),
        token: token,
      })
    );
 
  }
  function resetStockTakeFilter() {
    
    dispatch(
      getAllStocktakeAction({
        filter: parseFilterToString({
          ...stockTakeFilter, ...stockTakeFilterInit
        }),
        token: token,
      })
    );
    setStockTakeFilter((state) => ({
      ...state, ...stockTakeFilterInit
    }))
  }

  function nextPagingClick() {
    console.log("forward");
    // setCurrentPage(currentPage + 1);
    let dataFilter = { ...stockTakeFilter, currentPage: stockTakeFilter.currentPage + 1 }
    dispatch(
      getAllStocktakeAction({
        filter: parseFilterToString(dataFilter),
        token: token,
      })
    );
    setStockTakeFilter(dataFilter)
  }
  function setSizePage(event) {
  
    let dataFilter = { ...stockTakeFilter, SizePerPage: event.target.value }
    dispatch(
      getAllStocktakeAction({
        filter: parseFilterToString(dataFilter),
        token: token,
      })
    );
    setStockTakeFilter(dataFilter)
  }
  function backPagingClick() {
    console.log("backWard");
    let dataFilter = { ...stockTakeFilter, currentPage: stockTakeFilter.currentPage - 1 }
    dispatch(
      getAllStocktakeAction({
        filter: parseFilterToString(dataFilter),
        token: token,
      })
    );
    setStockTakeFilter(dataFilter)
  }
  function parseFilterToString(dataFilter) {
    let filterString = ""
    Object.entries(dataFilter).forEach(item => {
      if (item[1] !== "") {

        if (item[0] === "Statuses") {
          item[1].forEach(status => filterString += item[0] + "=" + status.key + "&")

        }
        else {

          filterString += item[0] + "=" + item[1] + "&"
        }

      }
    })
    return filterString
  }
  function selectStatus(selected) {
    setStockTakeFilter(state => ({ ...state, Statuses: selected.map(item => item) }))

}
  return (
    <div className="space-top-heading wrapper">
      {/* title */}
      <div className="title-heading mt-2">
        <span>Stocktake Management</span>
      </div>
      {/* content block  */}

      {/* ////////////////EDIT FRONTEND/////////////// */}
      <div class="d-grid gap-2">
     

          <StockTakeFilter
            selectStatus={selectStatus}
            onChangeValueFilter={onChangeStockTaketFilter}
            filter={stockTakeFilter}
            submitFilter={submitStockTakeFilter}
            resetFilter={resetStockTakeFilter}
          />


      
        <div class="">
          <div className="card">
            <div class="card-header text-white bg-secondary">List Stock Take</div>
            <div className="card-body">
              <PagingComponent 
              rowCountTotal = {rowCountTotal}
              sizePerPage={stockTakeFilter.sizePerPage}
              setSizePage={setSizePage}
              pageCount={pageCount} 
              nextPagingClick={nextPagingClick} 
              backPagingClick={backPagingClick} 
              currentPage={stockTakeFilter.currentPage} />

            {pageAuthorized.includes( "CreateStocktake" )?<button   onClick={pushAddPage} type="button" class=" btn-sm mb-1 btn btn-primary">Add Stock take</button>:""}  

              <p className="dropdown-toggle pointer" data-bs-toggle="collapse" data-bs-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
                <i class="bi bi-sliders"></i> Setting Colum
              </p>


              <ToolkitProvider
                keyField="id"
                data={listStocktakeStore}
                columns={columns}
                columnToggle
              >
                {
                  props => (
                    <div>

                      <CustomToggleList {...props.columnToggleProps} />
                      <hr />
                      <Table
                        keyField="id"
                        data={listStocktakeStore}
                        headerClasses="table-header-receipt"
                        columns={columns}
                        striped
                        hover
                        condensed
                        rowClasses="pointer"
                        noDataIndication={() =>setStatusLoadingTable({requesting: getAllStocktakeReducer.requesting , successful:getAllStocktakeReducer.successful}) }
                        //  noDataIndication="Table is Empty"
                        rowEvents={rowEvents}
                        {...props.baseProps}

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

{
  /* <PaginationProvider pagination={paginationFactory(options)}>
            {({ paginationProps, paginationTableProps }) => (
              <div>
                <div>
                  <p>Current Page: {paginationProps.page}</p>
                  <p>Current SizePerPage: {paginationProps.sizePerPage}</p>
                  <p>Current Size: {paginationProps.totalSize}</p>
                </div>
                <Table
                  keyField="id"
                  striped
                  hover
                  condensed
                  headerClasses="table-header-receipt"
                  noDataIndication="Table is Empty"
                  columns={columns}
                  data={listStocktakeStore}
                  {...paginationTableProps}
                />
                <div className="btn-group" role="group">
                  <button className="btn btn-primary" onClick={ this.handleNextPage(paginationProps) }>Next Page</button>
                  <button className="btn btn-success" onClick={ this.handlePrevPage(paginationProps) }>Prev Page</button>
                  <button className="btn btn-danger" onClick={ () => this.handleSizePerPage(paginationProps, 10) }>Size Per Page: 10</button>
                  <button className="btn btn-warning" onClick={ () => this.handleSizePerPage(paginationProps, 25) }>Size Per Page: 25</button>
                  <button
                    className="btn btn-primary"
                    onClick={() => handleNextPage(paginationProps)}
                  >
                    Next Page
                  </button>
                  <button
                    className="btn btn-success"
                    onClick={() => handlePrevPage(paginationProps)}
                  >
                    Prev Page
                  </button>
                </div>
              </div>
            )}
          </PaginationProvider> */
}

{
  /* <div className="mt-3">
            <Table
              keyField="id"
              data={listStocktakeStore}
              columns={columns}
              pagination={paginationFactory(options2)}
            />
          </div> */
}

{
  /* <Table
            listHeaderEdit={listEditHeader}
            listColumn={listValueColumn}
            listData={listStocktakeStore}
            backPagingClick={backPagingClick}
            nextPagingClick={nextPagingClick}
            sizePerPage={sizePerPage}
            currentPage={currentPage}
            pageCount={pageCount}
            onRowClick={onClickToDetails}
          /> */
}
