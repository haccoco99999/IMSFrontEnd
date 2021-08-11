import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import BootstrapTable from "react-bootstrap-table-next";
//css
import "../../product.css";
import ToolkitProvider, { ColumnToggle } from 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit';
import { TableLoading } from "../../../components/loading/loading-component";
import { CustomToggleList } from "../../../components/toggle-columns-table/CustomToggleList";
//components
import Filter from "../../filter";
import { getAllProductAction } from "./action";
import Table from "../../../table-receipt/ListReceiptsTable";
import PagingComponent from "../../../components/paging/paging-component"
import ProductVariantsFilter from "./ProductVariantsFilter";
export default function () {
  let history = useHistory();
  let dispatch = useDispatch();

  const { listProducstStore, token, pageCount } = useSelector((state) => ({
    token: state.client.token,
    listProducstStore: state.getAllProductsReducer.listProducts,
    pageCount: state.getAllProductsReducer.pageCount,
  }));

  const [currentPage, setCurrentPage] = useState(1);
  const [sizePerPage, setSizePerPage] = useState(5);
  const productVariantFilterInit = {
    SearchNameOnly: false,
    SearchQuery: "",
    Category: "",
    FromCreatedDate: "",
    ToCreatedDate: "",
    FromModifiedDate: "",
    ToModifiedDate: "",
    CreatedByName: "",
    ModifiedByName: "",
   
    Brand: "",
  }
  const [productVariantsFilter, setProductVariantsFilter] = useState({
    currentPage: 1,
    SizePerPage: 25,
    ...productVariantFilterInit
  })
  const [listValueColumn, setListValueColumn] = useState({
    productId: true,
    name: true,
    category: true,
    brand: true,
  });

  const [listEditHeader, setListEditHeader] = useState({
    productId: "Product ID",
    name: "Product Name",
    category: "Category",
    brand: "Brand",
  });

  //todo:declare bootraps table
  const columns = [
    {
      dataField: "productId",
      text: "Product ID",
    },
    {
      dataField: "name",
      text: "Product Name",
    },
    {
      dataField: "category",
      text: "Category",
    },
    { dataField: "brand", text: "Brand" },
  ];
  const rowEvents = {
    onClick: (e, row, rowIndex) => {
      history.push("/homepage/product/details", {
        productId: row.productId,
        // fromPage: "ManagerPage",
      });
    },
  };

  // function onClickToDetails(row) {
  //   history.push("/homepage/product/details", {
  //     productId: row.productId,
  //     // fromPage: "ManagerPage",
  //   });
  // }
  //todo: function button
  function pushAddPage() {
    history.push("/homepage/product/create");
  }


  function onClickToDetails(row) {
    history.push("/homepage/product/details", {
      productId: row.productId,
      // fromPage: "ManagerPage",
    });
  }

  useEffect(() => {
    console.log("CurrentPage", currentPage);

    dispatch(
      getAllProductAction({
        filter:  parseFilterToString(productVariantsFilter),
        token: token,
      })
    );
  }, [currentPage, sizePerPage]);

  function productVariantsFilterAPI(string) {
    const updateUrl = `https://imspublicapi.herokuapp.com/api/productvariant/search?${string}`



    return fetch(updateUrl, {

      method: 'GET',
      headers: {

        "Content-Type": "application/json",
        "Origin": ""
      },
      credentials: "include",

    })

      .then(response => response.json())
      .then(json => json)
      .catch((error) => { throw error })
  }

 
  function nextPagingClick() {

  
   
    let dataFilter = { ...productVariantsFilter, currentPage: productVariantsFilter.currentPage + 1 }
    dispatch(
      getAllProductAction({
        filter: parseFilterToString(dataFilter),
        token: token,
      })
    );
    setProductVariantsFilter(dataFilter)
  }
  function backPagingClick() {
   
    let dataFilter = { ...productVariantsFilter, currentPage: productVariantsFilter.currentPage - 1 }
    dispatch(
      getAllProductAction({
        filter: parseFilterToString(dataFilter),
        token: token,
      })
    );
    setProductVariantsFilter(dataFilter)
  }
  function onChangeProductVariantFilter(event) {
    setProductVariantsFilter((state) => ({
      ...state, [event.target.name]: event.target.value
    }))
  }
  function submitProductVariantsFilter() {
   
    dispatch(
      getAllProductAction({
        filter: parseFilterToString(productVariantsFilter),
        token: token,
      })
    );
  
   
  }
  function resetProductVariantsFilter() {
    dispatch(
      getAllProductAction({
        filter: parseFilterToString({
          ...productVariantsFilter, ...productVariantFilterInit
        }),
        token: token,
      })
    );
    setProductVariantsFilter((state) => ({
      ...state, ...productVariantFilterInit
    }))
  }
  function setSizePage(event) {
  
    let dataFilter = { ...productVariantsFilter, SizePerPage: event.target.value }
    dispatch(
      getAllProductAction({
        filter: parseFilterToString(dataFilter),
        token: token,
      })
    );
    setProductVariantsFilter(dataFilter)
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
  return (

    <div class="d-grid gap-2">
      <ProductVariantsFilter
        onChangeValueFilter={onChangeProductVariantFilter}
        filter={productVariantsFilter}
        submitFilter={submitProductVariantsFilter}
        resetFilter={resetProductVariantsFilter}
      />
      <div class="pb-3">
        <div className="card">
          <div class="card-header text-white bg-secondary">List Products</div>
          <div className="card-body">
            <PagingComponent
              setSizePage={setSizePage}
              pageCount={pageCount}
              nextPagingClick={nextPagingClick}
              backPagingClick={backPagingClick}
              currentPage={productVariantsFilter.currentPage} />

            <p onClick={pushAddPage}><i class="bi bi-file-earmark-plus"></i>Add</p>

            {/* <PagingComponent sizePerPage={filter.SizePerPage} setSizePage={setSizePage} pageCount={infoTablePage.pageCount} nextPagingClick={nextPagingClick} backPagingClick={backPagingClick} currentPage={filter.CurrentPage} /> */}
            <p className="dropdown-toggle" data-bs-toggle="collapse" data-bs-target="#collapseGoodReceipt" aria-expanded="false" aria-controls="collapseExample">
              <i class="bi bi-sliders"></i> Setting Colum
            </p>


            <ToolkitProvider
              keyField="id"
              data={listProducstStore}
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
                      // headerClasses="table-header-receipt"
                      columns={columns}
                      data={listProducstStore}
                      rowEvents={rowEvents}
                      {...props.baseProps}
                      noDataIndication={() => <TableLoading />}
                    />
                  </div>
                )
              }
            </ToolkitProvider>




          </div>
        </div>
      </div>


    </div>



  );
}




// <div className="wrapper-content shadow">
// <div className="ms-5">
//   <a
//     class="btn btn-default me-md-2 add"
//     onClick={pushAddPage}
//     // data-bs-target="#"
//     // data-bs-toggle="modal"
//   >
//     {/* <AddAccountModal isShowing={isShowing} hide={toggle} /> */}
//     <svg
//       class="svg-icon"
//       xmlns="http://www.w3.org/2000/svg"
//       width="20"
//       height="20"
//       fill="#4caf50"
//       class="bi bi-plus-lg"
//       viewBox="0 0 20 20"
//     >
//       <path d="M8 0a1 1 0 0 1 1 1v6h6a1 1 0 1 1 0 2H9v6a1 1 0 1 1-2 0V9H1a1 1 0 0 1 0-2h6V1a1 1 0 0 1 1-1z"></path>
//     </svg>
//     Add
//   </a>
//   {/* setting */}

//   <a
//     class="btn btn-default filter"
//     data-bs-target="#AddjustDisplayTableModal"
//     data-bs-toggle="modal"
//   >
//     <svg
//       xmlns="http://www.w3.org/2000/svg"
//       width="20"
//       height="20"
//       fill="gray"
//       class="bi bi-sliders"
//       viewBox="0 0 20 20"
//     >
//       <path d="M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492zM5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0z" />
//       <path d="M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52l-.094-.319zm-2.633.283c.246-.835 1.428-.835 1.674 0l.094.319a1.873 1.873 0 0 0 2.693 1.115l.291-.16c.764-.415 1.6.42 1.184 1.185l-.159.292a1.873 1.873 0 0 0 1.116 2.692l.318.094c.835.246.835 1.428 0 1.674l-.319.094a1.873 1.873 0 0 0-1.115 2.693l.16.291c.415.764-.42 1.6-1.185 1.184l-.291-.159a1.873 1.873 0 0 0-2.693 1.116l-.094.318c-.246.835-1.428.835-1.674 0l-.094-.319a1.873 1.873 0 0 0-2.692-1.115l-.292.16c-.764.415-1.6-.42-1.184-1.185l.159-.291A1.873 1.873 0 0 0 1.945 8.93l-.319-.094c-.835-.246-.835-1.428 0-1.674l.319-.094A1.873 1.873 0 0 0 3.06 4.377l-.16-.292c-.415-.764.42-1.6 1.185-1.184l.292.159a1.873 1.873 0 0 0 2.692-1.115l.094-.319z" />
//     </svg>
//     Adjust table
//   </a>

//   {/*  filter*/}
//   <a
//     class="btn btn-default filter"
//     data-bs-target="#FilterModal"
//     data-bs-toggle="modal"
//   >
//     <svg
//       xmlns="http://www.w3.org/2000/svg"
//       width="20"
//       height="20"
//       fill="gray"
//       class="bi bi-sliders"
//       viewBox="0 0 20 20"
//     >
//       <path
//         fill-rule="evenodd"
//         d="M11.5 2a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zM9.05 3a2.5 2.5 0 0 1 4.9 0H16v1h-2.05a2.5 2.5 0 0 1-4.9 0H0V3h9.05zM4.5 7a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zM2.05 8a2.5 2.5 0 0 1 4.9 0H16v1H6.95a2.5 2.5 0 0 1-4.9 0H0V8h2.05zm9.45 4a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zm-2.45 1a2.5 2.5 0 0 1 4.9 0H16v1h-2.05a2.5 2.5 0 0 1-4.9 0H0v-1h9.05z"
//       ></path>
//     </svg>
//     Filter
//   </a>
// </div>

// <div className="mt-3">
//   {/* <Table
//     listHeaderEdit={listEditHeader}
//     listColumn={listValueColumn}
//     listData={listProducstStore}
//     backPagingClick={backPagingClick}
//     nextPagingClick={nextPagingClick}
//     sizePerPage={sizePerPage}
//     currentPage={currentPage}
//     pageCount={pageCount}
//     onRowClick={onClickToDetails}
//   /> */}
// </div>
// <div className="mt-3">
//   <BootstrapTable
//     keyField="productId"
//     striped
//     hover
//     condensed
//     columns={columns}
//     headerClasses="table-header-receipt"
//     noDataIndication="Table is Empty"
//     data={listProducstStore}
//     rowEvents={rowEvents}
//   />
//   <PagingComponent
//     currentPage={currentPage}
//     pageCount={pageCount}
//     nextPagingClick={nextPagingClick}
//     backPagingClick={backPagingClick}
//   />
// </div>
// <Filter />
// </div>