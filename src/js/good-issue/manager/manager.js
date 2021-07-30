import React, { useEffect, useState } from "react";
import { Typeahead, AsyncTypeahead } from 'react-bootstrap-typeahead';
import "../goodissue.css";
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import Progress from "../progress/progressing";
import BootstrapTable from 'react-bootstrap-table-next';
import { getAllGoodIssue, getAllGoodIssueRequisition } from './action'
import { useDispatch, useSelector } from "react-redux";
import DetailGoodIssue from "../good-issue-detail/GoodIssueDetail";
import 'react-bootstrap-typeahead/css/Typeahead.css';
import SearchTest from "./search";
import { useHistory } from "react-router-dom";
import Gallery from "../../Gallery/Gallery";
import { GalleryGoodIssue } from "../../Gallery/Gallery";
import ToolkitProvider, { ColumnToggle } from 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit';
import { CustomToggleList } from "../../components/toggle-columns-table/CustomToggleList";
import { GalleryLoading, TableLoading } from "../../components/loading/loading-component";
export default function manager() {

  let history = useHistory()
  let { goodIssueStore, goodIssueRequisition } = useSelector(state => ({
    goodIssueStore: state.GetAllGoodIssues,
    goodIssueRequisition: state.getAllGoodIssuesRequisition,
  }))
  let [listGoodIssues, setListGoodIssues] = useState([])
  let [listGoodIssueRequisition, setListGoodIssueRequisition] = useState([])
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getAllGoodIssue(""))
    dispatch(getAllGoodIssueRequisition())
  }, [])
  useEffect(() => {
    setListGoodIssues(
      goodIssueStore.infoListGoodIssue.listGoodIssue
    )
    setListGoodIssueRequisition(
      goodIssueRequisition.infoListGoodIssueRequisition.listGoodIssueRequisition
    )
  }, [goodIssueStore, goodIssueRequisition])
  console.log(listGoodIssues)
  const columns = [
    {
      dataField: 'goodsIssueNumber',
      text: 'Goods Issue Request ID',

    },
    {
      dataField: 'status',
      text: 'Status',
      align: 'center',
      formatter: (cell, row, rowIndex, extraData) => {

        if (row.status === "Packing") {
          return <span class="badge bg-warning text-dark">Packing</span>

        }
        if (row.status === "Shipping") {
          return <span class="badge bg-primary">Shipping</span>


        }
        if (row.status === "Completed") {
          return <span class="badge bg-success">Completed</span>


        }

        if (row.status === "Canceled") {
          return <span class="badge bg-danger">Canceled</span>


        }
        return row.status

      }
    },
    {
      dataField: 'createdByName',
      text: 'Create By'
    },
    {
      dataField: 'deliveryDate',
      text: 'Delivery Date'
    },
    {
      dataField: 'createdDate',
      text: 'Create Date'
    },
    {
      dataField: 'deliveryMethod',
      text: 'Delivery Method'
    }

  ];
  const products = [
    {
      id: 1,
      name: "hung",
      price: 1000
    },
    {
      id: 2,
      name: "hung",
      price: 1000
    },
    {
      id: 3,
      name: "hung",
      price: 1000
    }
  ];

  const rowEvents = {
    onClick: (e, row, rowIndex) => {
      history.push("/homepage/good-issue/detail", { id: row.id, status: row.status })

    },
    // onMouseEnter: (e, row, rowIndex) => {
    //   console.log(`enter on row with index: ${rowIndex}`);
    // }
  };
  function clickGoodIssueRequisition(data) {
    history.push("/homepage/good-issue/detail", { id: data.id, status: data.status })
  }
  const hiddenRowKeys = [-1, -3];
  const { ToggleList } = ColumnToggle;
  return (
    <div className="space-top-heading">
      {/* title */}
      <div className="title-heading mt-2">
        <span>Goods Issues Requisition</span>
      </div>
      <GalleryLoading/>
      <GalleryGoodIssue listData={listGoodIssueRequisition}
        clickGoodIssueRequisition={clickGoodIssueRequisition}
      />

      <div className="title-heading mt-2">
        <span>Goods Issues</span>
      </div>
      {/* content block  */}

      <div class="d-grid gap-2">
        <div class="">
          <div className="card">
            <div class="card-header text-white bg-secondary">List Purchase Order</div>
            <div className="card-body">
              {/* <PagingComponent pageCount={pageCount} nextPagingClick={nextPagingClick} backPagingClick={backPagingClick} currentPage={currentPage} /> */}

              {/* <p onClick={handleClick}><i class="bi bi-file-earmark-plus"></i>Add</p> */}

              {/* <PagingComponent sizePerPage={filter.SizePerPage} setSizePage={setSizePage} pageCount={infoTablePage.pageCount} nextPagingClick={nextPagingClick} backPagingClick={backPagingClick} currentPage={filter.CurrentPage} /> */}
              <p className="dropdown-toggle" data-bs-toggle="collapse" data-bs-target="#collapseGoodReceipt" aria-expanded="false" aria-controls="collapseExample">
                <i class="bi bi-sliders"></i> Setting Colum
              </p>


              <ToolkitProvider
                keyField="id"
                data={listGoodIssues}
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
                        noDataIndication="Table is Empty"
                        columns={columns}
                        data={listGoodIssues}
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
      {/* <Filter /> */}
    </div>

  );
}


// <div className="wrapper-content shadow">
// {/* list nut bam  */}
// <div className="ms-1">
//   {/* setting */}

//   <a
//     class="btn btn-default fw-bold filter"
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
//     class="btn btn-default fw-bold filter"
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



//   <BootstrapTable classes="foo"
//     keyField='id'
//     data={listGoodIssues}
//     columns={columns}
//     striped
//     hover
//     condensed
//     noDataIndication="Table is Empty"
//     rowEvents={rowEvents}
//     hiddenRows={hiddenRowKeys}
//     headerClasses="table-header-receipt"
//   />

//   {/* end table */}
// </div>
// </div>
