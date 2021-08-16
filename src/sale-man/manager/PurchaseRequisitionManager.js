import React, { useState, useEffect, useReducer } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import BootstrapTable from "react-bootstrap-table-next";
import moment from "moment";
import ToolkitProvider from 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit';

//css
import "../sale-man.css";

//components
import { getAllPRAction } from "./action";
import { CustomToggleList } from "../../components/toggle-columns-table/CustomToggleList";
import { PurchaseOrderFilter } from "../../components/filter/FilterComponents";
import { TableLoading } from "../../components/loading/loading-component";
import PagingComponent from "../../components/paging/paging-component";
import { setStatusLoadingTable } from "../../helper/loadDataHelper";
export default function PurchaseRequisitionManager() {
  let history = useHistory();
  let dispatch = useDispatch();
  const purchaserOrderFilterInit = {

    SearchQuery: "",
    Statuses: [
      { key: 0, value: "Draft" },
      { key: 1, value: "Merge" },
      { key: 2, value: "Waiting Confirm" },
      { key: 3, value: "Price Quote" },
      { key: 4, value: "Purchase Order" },
      { key: 5, value: "Done" },
      { key: 6, value: "Cancel" },

    ],
    supplier: {
      id: "",
      address: "",
      supplierName: "",
      phoneNumber: "",
      email: "",
    },

    FromTotalOrderPrice: "",
    ToTotalOrderPrice: "",
    FromDeliveryDate: "",
    ToDeliveryDate: "",
    FromConfirmedDate: "",
    ToConfirmedDate: "",
    ConfirmedByName: "",
    FromCreatedDate: "",
    ToCreatedDate: "",
    FromModifiedDate: "",
    ToModifiedDate: "",

  }
  const [filter, setFilter] = useState({

    currentPage: 1,
    SizePerPage: 25,

    ...purchaserOrderFilterInit

  })
  //todo: declare  bootstrap table
  const columns = [
    {
      dataField: "id",
      text: "ID",
    },
    {
      dataField: "status",
      text: "Status",
    
      isDummyField: true,
      formatter: (cellContent, row) => {
        if (row.status === "RequisitionCreated")
          return <span className="badge bg-secondary">Draft</span>;
        else if (row.status === "POConfirm") {
          return <span class="badge bg-success">Confirmed</span>;
        } else if (row.status === "Done") {
          return <span class="badge bg-primary">Done</span>;
        } else if (
          row.status === "PQCanceled" ||
          row.status === "RequisitionCanceled" ||
          row.status === "POCanceled"
        ) {
          return <span class="badge bg-danger">Canceled</span>;
        } else
          return (
            <span class="badge bg-warning text-dark">Waiting confirm</span>
          );
      },
      align: (cell, row, rowIndex, colIndex) => {
        return 'left';

    },
    },
    {
      dataField: "createdByName",
      text: "Created By",
      hidden: true,
      align: (cell, row, rowIndex, colIndex) => {
        return 'left';

    },
    },
    {
      dataField: "createdDate",
      text: "Created Date",
      align: "right",
      formatter: (cellContent, row, rowIndex) => {
        return <span>{moment(row.createdDate).format("DD-MM-YYYY")}</span>;
      },
    },
    {
      dataField: "modifiedDate",
      text: "Modified Date",
      align: "right",
      formatter: (cellContent, row, rowIndex) => {
        return <span>{moment(row.modifiedDate).format("DD-MM-YYYY")}</span>;
      },
    },
  ];

  const [currentPage, setCurrentPage] = useState(1);
  const [sizePerPage, setSizePerPage] = useState(5);
  const [returnData, setReturnData] = useState(false)

  const { listData, pageCount, rowCountTotal, token , getAllPurchaseRequisitionReducerStatus} = useSelector((state) => ({
    listData: state.getAllPurchaseRequisitionReducer.listPurchaseRequisition,
    pageCount: state.getAllPurchaseRequisitionReducer.pageCount,
    rowCountTotal: state.getAllPurchaseRequisitionReducer.rowCountTotal,
    getAllPurchaseRequisitionReducerStatus: state.getAllPurchaseRequisitionReducer,
    token: state.client.token,
  }));

  function pushAddPage() {
    history.push("/homepage/sale-man/create-purchase-requisition");
  }

  // function onClickToDetails(row) {
  //   history.push("/homepage/sale-man/details", {
  //     purchaseRequisitionId: row.id,
  //   });
  // }

  const rowEvents = {
    onClick: (e, row, rowIndex) => {
      history.push("/homepage/sale-man/details", {
        purchaseRequisitionId: row.id,
      });
    },
  };

  useEffect(() => {
    dispatch(getAllPRAction({ filter: parseFilterToString(filter), token: token }));

  }, [currentPage, sizePerPage]);
  //////////////////////////////////

  function nextPagingClick() {
    let dataFilter = { ...filter, currentPage: filter.currentPage + 1 }
    dispatch(getAllPRAction({ filter: parseFilterToString(dataFilter), token: token }))
    setFilter(dataFilter)
  }
  function backPagingClick() {
    let dataFilter = { ...filter, currentPage: filter.currentPage - 1 }
    dispatch(getAllPRAction({ filter: parseFilterToString(dataFilter), token: token }))
    setFilter(dataFilter)
  }
  function setSizePage(event) {
    console.log(event.target.value)
    let dataFilter = { ...filter, SizePerPage: event.target.value }
    dispatch(getAllPRAction({ filter: parseFilterToString(dataFilter), token: token }))
    setFilter(dataFilter)
  }
  function onChangeValueFilter(event) {
    setFilter(state => ({ ...state, [event.target.name]: event.target.value }))

  }
  function setFilterSupplier(supplierValue) {

    setFilter(state => ({ ...state, supplier: supplierValue }))

  }
  function selectStatusFilter(selected) {
    setFilter(state => ({ ...state, Statuses: selected.map(item => item) }))

  }
  function parseFilterToString(dataFilter) {
    let filterString = ""



    Object.entries(dataFilter).forEach(item => {
      if (item[1] !== "") {

        if (item[0] === "supplier") {

          if (item[1]["id"] !== "") filterString += "SupplierId=" + item[1]["id"] + "&"
        }
        else if (item[0] === "Statuses") {
          // filterString += item[0] + "=" + status.key + "&"
          item[1].forEach(status => {
            if (status.key === 0) {
              filterString += item[0] + "=RequisitionCreated&"



            }
            else if (status.key === 1) {

            }
            else if (status.key === 2) {
              filterString += item[0] + "=Requisition&"
            }
            else if (status.key === 3) {
              filterString += item[0] + "=PriceQuote&"
            }
            else if (status.key === 4) {
              filterString += item[0] + "=PurchaseOrder&POWaitingConfirmation&POConfirm&"
            }
            else if (status.key === 5) {
              filterString += item[0] + "=Done&"
            }
            else if (status.key === 6) {
              filterString += item[0] + "=PQCanceled&RequisitionCanceled&POCanceled"
            }
          })

        }

        else {

          filterString += item[0] + "=" + item[1] + "&"
        }

      }
    })
    return filterString
  }
  function submitFilter() {



    dispatch(getAllPRAction({ filter: parseFilterToString(filter), token: token }))

  }
  function resetFilter() {

    setFilter(state => ({ ...state, ...purchaserOrderFilterInit }))
    dispatch(getAllPRAction({ filter: parseFilterToString({ ...filter, ...purchaserOrderFilterInit }), token: token }))
  }


  return (
    <div className="space-top-heading wrapper">
      {/* title  */}
      <div className="title-heading mt-2">
        <span>Purchase Requisition</span>
      </div>

      {/* content block  */}

      <div class="d-grid gap-2">

        <PurchaseOrderFilter
          isRequisition={true}
          filter={filter}
          isSaleMan={true}
          submitFilter={submitFilter}
          resetFilter={resetFilter}
          onChangeValueFilter={onChangeValueFilter}
          selectStatusFilter={selectStatusFilter}
          setFilterSupplier={setFilterSupplier}
        />
        <div class="pb-3">
          <div className="card">
            <div class="card-header text-white bg-secondary">Order List</div>
            <div className="card-body">



              <PagingComponent rowCountTotal={rowCountTotal} sizePerPage={filter.SizePerPage} setSizePage={setSizePage} pageCount={pageCount} nextPagingClick={nextPagingClick} backPagingClick={backPagingClick} currentPage={filter.currentPage} />
              <button   onClick={pushAddPage} type="button" class=" btn-sm mb-1 btn btn-primary">Add Purchase Requistition</button>
              <p className="dropdown-toggle pointer" data-bs-toggle="collapse" data-bs-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-sliders" viewBox="0 0 16 16">
                  <path fill-rule="evenodd" d="M11.5 2a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zM9.05 3a2.5 2.5 0 0 1 4.9 0H16v1h-2.05a2.5 2.5 0 0 1-4.9 0H0V3h9.05zM4.5 7a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zM2.05 8a2.5 2.5 0 0 1 4.9 0H16v1H6.95a2.5 2.5 0 0 1-4.9 0H0V8h2.05zm9.45 4a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zm-2.45 1a2.5 2.5 0 0 1 4.9 0H16v1h-2.05a2.5 2.5 0 0 1-4.9 0H0v-1h9.05z" />
                </svg> Setting Colum
              </p>

              <ToolkitProvider
                keyField="id"
                data={listData}
                columns={columns}
                columnToggle
              >
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
                        headerClasses="table-header-receipt"
                        columns={columns}
                        data={listData}
                        rowEvents={rowEvents}
                        noDataIndication={() => setStatusLoadingTable({requesting: getAllPurchaseRequisitionReducerStatus.requesting, successful : getAllPurchaseRequisitionReducerStatus.successful})}
                        // rowEvents={rowEvents}
                        rowClasses="pointer"

                        //    headerClasses="table-header-receipt"
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







