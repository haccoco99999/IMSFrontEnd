import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import BootstrapTable from "react-bootstrap-table-next";
import ToolkitProvider from 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit';

//css
import "../supplier.css";
//component
import ListReceiptTable from "../../table-receipt/ListReceiptsTable";
import { getAllSuppliersAction } from "./action";
import NavigationBar from "../../components/navbar/navbar-component";
import PagingComponent from "../../components/paging/paging-component";
import { SupplierFilter } from "../../components/filter/FilterComponents";
import { CustomToggleList } from "../../components/toggle-columns-table/CustomToggleList";
import { TableLoading } from "../../components/loading/loading-component";
import { setStatusLoadingTable } from "../../helper/loadDataHelper";

export default function SupplierManager() {
  let history = useHistory();
  let dispatch = useDispatch();

  const [currentPage, setCurrentPage] = useState(1);
  const [sizePerPage, setSizePerPage] = useState(5);

  // const [listValueColumn, setListValueColumn] = useState({
  //   id: false,
  //   supplierName: true,
  //   email: true,
  //   phoneNumber: true,
  // });

  // const [listEditHeader, setListEditHeader] = useState({
  //   // id: "Goods Receipt ID",
  // });
  const supplierFilterInit = {

    SearchQuery: "",
  

}
const [supplierFilter, setSupplierFilter] = useState({

    currentPage: 1,
    SizePerPage: 25,

    ...supplierFilterInit

})
  const columns = [
    {
      dataField: "id",
      text: "ID",
      hidden: true,
    },
    {
      dataField: "supplierName",
      text: "Name",
    },
    {
      dataField: "email",
      text: "Email",
    },
    { dataField: "phoneNumber", text: "Phone Number" },
  ];

  const { listData, pageCount, rowCountTotal,token , getAllSuppliersReducerStatus} = useSelector((state) => ({
    listData: state.getAllSuppliersReducer.listSuppliers,
    getAllSuppliersReducerStatus: state.getAllSuppliersReducer,
    pageCount: state.getAllSuppliersReducer.pageCount,
    rowCountTotal: state.getAllSuppliersReducer.rowCountTotal,
    token: state.client.token,
  }));

  function pushAddPage() {
    history.push("/homepage/supplier/create");
  }

 
////////////////////FILTER
  function onChangeSupplierFilter(event) {
    setSupplierFilter((state) => ({
      ...state, [event.target.name]: event.target.value
    }))
  }
  function nextPagingClick() {

    let dataFilter = { ...supplierFilter, currentPage: supplierFilter.currentPage + 1 }
    dispatch(
      getAllSuppliersAction({
        filter: parseFilterToString(dataFilter),
        token: token,
      })
    );
    setSupplierFilter(dataFilter)
  }
  function backPagingClick() {

    let dataFilter = { ...supplierFilter, currentPage: supplierFilter.currentPage - 1 }
    dispatch(
      getAllSuppliersAction({
        filter: parseFilterToString(dataFilter),
        token: token,
      })
    );
    setSupplierFilter(dataFilter)
  }
  function setSizePage(event) {

    let dataFilter = { ...supplierFilter, SizePerPage: event.target.value }
    dispatch(
      getAllSuppliersAction({
        filter: parseFilterToString(dataFilter),
        token: token,
      })
    );
    setSupplierFilter(dataFilter)
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



  function submitsupplierFilter() {

    dispatch(
      getAllSuppliersAction({
        filter: parseFilterToString(supplierFilter),
        token: token,
      })
    );


  }
  function resetSupplierFilter() {
    let defaultData = {...supplierFilter,...supplierFilterInit}
    dispatch(
      getAllSuppliersAction({
        filter: parseFilterToString(defaultData),
        token: token,
      })
    );
    setSupplierFilter(defaultData)
  }




  
  const rowEvents = {
    onClick: (e, row, rowIndex) => {
      history.push("/homepage/supplier/details", {
        supplierId: row.id,
      });
    },
  };

  useEffect(() => {
    dispatch(
      getAllSuppliersAction({
        filter: parseFilterToString(supplierFilter),
        token: token,
      })
    );
  }, []);

  return (
    <div className="space-top-heading wrapper">
      {" "}
      {/* title */}
      <div className="title-heading mt-2">
        <span>Supplier Management</span>
      </div>
      {/* content block */}
      {/* <SupplierFilter/> */}
      

      <div class="d-grid gap-2">

      
        <SupplierFilter
         filter={supplierFilter}
         onChangeValueFilter={onChangeSupplierFilter}
         submitFilter={submitsupplierFilter}
         resetFilter={resetSupplierFilter}
        />
        <div class="pb-3 ">
          <div className="card">
            <div class="card-header text-white bg-secondary">List Suppliers</div>
            <div className="card-body">


              <PagingComponent rowCountTotal={rowCountTotal} sizePerPage={supplierFilter.SizePerPage} setSizePage={setSizePage} pageCount={pageCount} nextPagingClick={nextPagingClick} backPagingClick={backPagingClick} currentPage={supplierFilter.currentPage} />
              {/* <p onClick={pushAddPage}><i class="bi bi-file-earmark-plus"></i>Add</p> */}
              <button   onClick={pushAddPage} type="button" class=" btn-sm mb-1 btn btn-primary">Add Supplier</button>

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
                        columns={columns}
                        striped
                        hover
                        condensed
                        headerClasses="table-header-receipt"
                        data={listData}
                        rowEvents={rowEvents}
                        rowClasses="pointer"
                        noDataIndication={() => setStatusLoadingTable({requesting: getAllSuppliersReducerStatus.requesting, successful : getAllSuppliersReducerStatus.successful})}
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


// <div className="wrapper-content shadow">
//         {/* list nut bam  */}
//         <div className="ms-1">
//           <a
//             class="btn btn-default me-md-2 fw-bold add"
//             onClick={pushAddPage}
//           // data-bs-target="#"
//           // data-bs-toggle="modal"
//           >
//             <svg
//               class="svg-icon"
//               xmlns="http://www.w3.org/2000/svg"
//               width="20"
//               height="20"
//               fill="#4caf50"
//               class="bi bi-plus-lg"
//               viewBox="0 0 20 20"
//             >
//               <path d="M8 0a1 1 0 0 1 1 1v6h6a1 1 0 1 1 0 2H9v6a1 1 0 1 1-2 0V9H1a1 1 0 0 1 0-2h6V1a1 1 0 0 1 1-1z"></path>
//             </svg>
//             Add
//           </a>

//           {/* setting */}

//           <a
//             class="btn btn-default fw-bold filter"
//             data-bs-target="#AddjustDisplayTableModal"
//             data-bs-toggle="modal"
//           >
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               width="20"
//               height="20"
//               fill="gray"
//               class="bi bi-sliders"
//               viewBox="0 0 20 20"
//             >
//               <path d="M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492zM5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0z" />
//               <path d="M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52l-.094-.319zm-2.633.283c.246-.835 1.428-.835 1.674 0l.094.319a1.873 1.873 0 0 0 2.693 1.115l.291-.16c.764-.415 1.6.42 1.184 1.185l-.159.292a1.873 1.873 0 0 0 1.116 2.692l.318.094c.835.246.835 1.428 0 1.674l-.319.094a1.873 1.873 0 0 0-1.115 2.693l.16.291c.415.764-.42 1.6-1.185 1.184l-.291-.159a1.873 1.873 0 0 0-2.693 1.116l-.094.318c-.246.835-1.428.835-1.674 0l-.094-.319a1.873 1.873 0 0 0-2.692-1.115l-.292.16c-.764.415-1.6-.42-1.184-1.185l.159-.291A1.873 1.873 0 0 0 1.945 8.93l-.319-.094c-.835-.246-.835-1.428 0-1.674l.319-.094A1.873 1.873 0 0 0 3.06 4.377l-.16-.292c-.415-.764.42-1.6 1.185-1.184l.292.159a1.873 1.873 0 0 0 2.692-1.115l.094-.319z" />
//             </svg>
//             Adjust table
//           </a>

//           {/*  filter*/}
//           <a
//             class="btn btn-default fw-bold filter"
//             data-bs-target="#FilterModal"
//             data-bs-toggle="modal"
//           >
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               width="20"
//               height="20"
//               fill="gray"
//               class="bi bi-sliders"
//               viewBox="0 0 20 20"
//             >
//               <path
//                 fill-rule="evenodd"
//                 d="M11.5 2a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zM9.05 3a2.5 2.5 0 0 1 4.9 0H16v1h-2.05a2.5 2.5 0 0 1-4.9 0H0V3h9.05zM4.5 7a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zM2.05 8a2.5 2.5 0 0 1 4.9 0H16v1H6.95a2.5 2.5 0 0 1-4.9 0H0V8h2.05zm9.45 4a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zm-2.45 1a2.5 2.5 0 0 1 4.9 0H16v1h-2.05a2.5 2.5 0 0 1-4.9 0H0v-1h9.05z"
//               ></path>
//             </svg>
//             Filter
//           </a>
//         </div>

//         <div className="mt-3">
//           <BootstrapTable
//             keyField="id"
//             columns={columns}
//             striped
//             hover
//             condensed
//             headerClasses="table-header-receipt"
//             noDataIndication="Table is Empty"
//             data={listData}
//             rowEvents={rowEvents}
//           />
//           <PagingComponent
//             currentPage={currentPage}
//             pageCount={pageCount}
//             nextPagingClick={nextPagingClick}
//             backPagingClick={backPagingClick}
//           />
//           {/* <ListReceiptTable
//             listHeaderEdit={listEditHeader}
//             listColumn={listValueColumn}
//             listData={listData}
//             backPagingClick={backPagingClick}
//             nextPagingClick={nextPagingClick}
//             sizePerPage={sizePerPage}
//             currentPage={currentPage}
//             pageCount={pageCount}
//             onRowClick={onClickToDetails}
//           /> */}
//         </div>
//       </div>