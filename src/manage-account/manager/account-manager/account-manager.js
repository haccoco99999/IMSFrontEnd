import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import ToolkitProvider from 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit';
import BootstrapTable from 'react-bootstrap-table-next';

//css
import "../../accountmanager.css";
import Action from "./action";

//component
import AddAccountModal from "../../create/account/create-account";
import FilterModal from "./filter";
import AccountDetailsModal from "../../details/account/account-details";
import Table from "../../../table-receipt/ListReceiptsTable";
import AccountManagementFilter from "./AccountManagerFilter";
import { CustomToggleList } from "../../../components/toggle-columns-table/CustomToggleList";
import PagingComponent from "../../../components/paging/paging-component";
import { TableLoading } from "../../../components/loading/loading-component";
import { setStatusLoadingTable } from "../../../helper/loadDataHelper";

function AccountManager() {
  let history = useHistory();
  let dispatch = useDispatch();
 
 
  const accountFilterInit = {

    searchQuery: "",
    role: [
      { key: "Accountant", value: "Accountant" },
      { key: "StockKeeper", value: "StockKeeper" },
      { key: "Saleman", value: "Saleman" },
      { key: "Manager", value: "Manager" },


    ],
    status:""


  }
  const [accountFilter, setAccountFilter] = useState({
    currentPage: 1,
    sizePerPage: 25,
    ...accountFilterInit
  })



  const { data, token, pageCount, rowCountTotal,getAllAccountsReducerStatus } = useSelector((state) => ({
    data: state.getAllAccountsReducer.listAccounts,
    token: state.client.token,
    getAllAccountsReducerStatus : state.getAllAccountsReducer,
    pageCount: state.getAllAccountsReducer.pageCount,
    rowCountTotal: state.getAllAccountsReducer.rowCountTotal,
  }));






  useEffect(() => {
    dispatch(
      Action({
        filter: parseFilterToString(accountFilter),
        token: token,
      })
    );
  }, []);


 

 
  function redirectCreateAccount() {
    history.push("/homepage/manage-account/create-account", { status: "CREATEUSER" });
  }
  const columns = [

    {

      dataField: 'email',
      text: 'Email ',


    },
    {

      dataField: 'fullname',
      text: 'Full Name ',


    },
    {

      dataField: 'isActive',
      text: 'Status ',
      formatter: (cell, row, rowIndex, extraData) => {
        console.log(cell)
        if (cell === "Active") {
          return <span class="badge bg-success ext-dark">Active</span>

        }
        else if (cell === "Deactive") {
          return <span class="badge bg-danger">Deactive</span>


        }
     
        return cell

      }

    },
    {

      dataField: 'phoneNumber',
      text: 'Phone Number ',


    },
    {

      dataField: 'userRole',
      text: 'Role ',


    }
  ]
  function onChangeAccountFilter(event) {
   
    setAccountFilter((state) => ({
      ...state, [event.target.name]: event.target.value
    }))
  }
  function submitAccountFilter() {
    dispatch(
      Action({
        filter: parseFilterToString(accountFilter),
        token: token,
      })
    );



  }
  function resetAccountFilter() {
    dispatch(
      Action({
        filter: parseFilterToString({
          ...accountFilter, ...accountFilterInit
        }),
        token: token,
      })
    );
    setAccountFilter((state) => ({
      ...state, ...accountFilterInit
    }))
  }
  function selectStatusFilter(selected) {
    setAccountFilter(state => ({ ...state, role: selected.map(item => item) }))

  }


  function nextPagingClick() {

    let dataFilter = { ...accountFilter, currentPage: accountFilter.currentPage + 1 }
    dispatch(
      Action({
        filter: parseFilterToString(dataFilter),
        token: token,
      })
    );
    setAccountFilter(dataFilter)
  }
  function backPagingClick() {

    let dataFilter = { ...accountFilter, currentPage: accountFilter.currentPage - 1 }
    dispatch(
      Action({
        filter: parseFilterToString(dataFilter),
        token: token,
      })
    );
    setAccountFilter(dataFilter)
  }
  function setSizePage(event) {

    let dataFilter = { ...accountFilter, sizePerPage: event.target.value }
    dispatch(
      Action({
        filter: parseFilterToString(dataFilter),
        token: token,
      })
    );
    setAccountFilter(dataFilter)
  }

  function parseFilterToString(dataFilter) {
    let filterString = ""
    Object.entries(dataFilter).forEach(item => {
      if (item[1] !== "") {


        if (item[0] === "role") {
          if(item[1].length === 0){
            accountFilterInit.role.forEach(role => filterString += item[0] + "=" + role.key + "&")
          }
          else{ 
          item[1].forEach(role => filterString += item[0] + "=" + role.key + "&")
          }
        }
        else {

          filterString += item[0] + "=" + item[1] + "&"
        }

      }
    })
    return filterString
  }
  const rowEvents = {
    onClick: (e, row, rowIndex) => {


      history.push("/homepage/manage-account/create-account", {
        userId: row.id,
        status: "EDITUSER"
      });



    },

  };
  return (
    <div class="space-top-heading wrapper">
      <div className="title-heading mt-2">
        <span>Account Management</span>
      </div>
      <div class="d-grid gap-2">
        {/* <div>
        <a onClick={() => redirectCreateAccount()}>
          <svg
            class="svg-icon"
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            fill="#4caf50"
            class="bi bi-plus-lg"
            viewBox="0 0 20 20"
          >
            <path d="M8 0a1 1 0 0 1 1 1v6h6a1 1 0 1 1 0 2H9v6a1 1 0 1 1-2 0V9H1a1 1 0 0 1 0-2h6V1a1 1 0 0 1 1-1z"></path>
          </svg>
          Add
        </a>

        <a
          class="btn btn-default filter"
          data-bs-target="#AddFilterModal"
          data-bs-toggle="modal"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            fill="gray"
            class="bi bi-sliders"
            viewBox="0 0 20 20"
          >
            <path
              fill-rule="evenodd"
              d="M11.5 2a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zM9.05 3a2.5 2.5 0 0 1 4.9 0H16v1h-2.05a2.5 2.5 0 0 1-4.9 0H0V3h9.05zM4.5 7a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zM2.05 8a2.5 2.5 0 0 1 4.9 0H16v1H6.95a2.5 2.5 0 0 1-4.9 0H0V8h2.05zm9.45 4a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zm-2.45 1a2.5 2.5 0 0 1 4.9 0H16v1h-2.05a2.5 2.5 0 0 1-4.9 0H0v-1h9.05z"
            ></path>
          </svg>
          Filter
        </a>
      </div> */}

        <AccountManagementFilter
        onChangeAccountFilter={onChangeAccountFilter}
        resetFilter={resetAccountFilter}
        submitFilter={submitAccountFilter}
          selectStatus={selectStatusFilter}
          filter={accountFilter}
        />

        <div class="pb-3">
          <div className="card">
            <div class="card-header text-white bg-secondary">Account List</div>
            <div className="card-body">


              <PagingComponent rowCountTotal={rowCountTotal} setSizePage={setSizePage} sizePerPage={accountFilter.sizePerPage} pageCount={pageCount} nextPagingClick={nextPagingClick} backPagingClick={backPagingClick} currentPage={accountFilter.currentPage} />
              <button   onClick={redirectCreateAccount} type="button" class=" btn-sm mb-1 btn btn-primary">Add Account</button>

              <p className="dropdown-toggle pointer" data-bs-toggle="collapse" data-bs-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-sliders" viewBox="0 0 16 16">
                  <path fill-rule="evenodd" d="M11.5 2a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zM9.05 3a2.5 2.5 0 0 1 4.9 0H16v1h-2.05a2.5 2.5 0 0 1-4.9 0H0V3h9.05zM4.5 7a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zM2.05 8a2.5 2.5 0 0 1 4.9 0H16v1H6.95a2.5 2.5 0 0 1-4.9 0H0V8h2.05zm9.45 4a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zm-2.45 1a2.5 2.5 0 0 1 4.9 0H16v1h-2.05a2.5 2.5 0 0 1-4.9 0H0v-1h9.05z" />
                </svg> Setting Colum
              </p>

              <ToolkitProvider
                keyField="email"
                data={data}
                columns={columns}
                columnToggle
              >
                {
                  props => (
                    <div>
                      <CustomToggleList {...props.columnToggleProps} />
                      <hr />
                      <BootstrapTable
                        keyField='email'
                        headerClasses="table-header-receipt"
                        data={data}
                        columns={columns}
                        striped
                        hover
                        condensed
                        noDataIndication={() => setStatusLoadingTable({requesting: getAllAccountsReducerStatus.requesting , successful:getAllAccountsReducerStatus.successful})}
                        rowEvents={rowEvents}
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
        {/* <div className="p-3">
        <Table
          listHeaderEdit={listEditHeader}
          listColumn={listValueColumn}
          listData={data}
          pageCount={pageCount}
          sizePerPage={sizePerPage}
          currentPage={currentPage}
          backPagingClick={backPagingClick}
          nextPagingClick={nextPagingClick}
          onRowClick={onClickToDetails}
        />
      </div> */}

        {/* <AddAccountModal />

      <FilterModal />
      <AccountDetailsModal /> */}
      </div>
    </div>
  );
}

export default AccountManager;
