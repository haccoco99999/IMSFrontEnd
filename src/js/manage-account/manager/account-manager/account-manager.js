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

function AccountManager() {
  let history = useHistory();
  let dispatch = useDispatch();
  const { data, token, pageCount } = useSelector((state) => ({
    data: state.getAllAccountsReducer.listAccounts,
    token: state.client.token,
    pageCount: state.getAllAccountsReducer.pageCount,
  }));
  const [currentPage, setCurrentPage] = useState(1);
  const [sizePerPage, setSizePerPage] = useState(5);

  const [listValueColumn, setListValueColumn] = useState({
    email: true,
    fullname: true,
    isActive: true,
    phoneNumber: true,
    userRole: true,
  });

  const [listEditHeader, setListEditHeader] = useState({
    isActive: "Status",
  });


  function nextPagingClick() {
    console.log("forward");
    setCurrentPage(currentPage + 1);
  }

  function backPagingClick() {
    console.log("backWard");
    setCurrentPage(currentPage - 1);
  }

 
  useEffect(() => {
    dispatch(
      Action({
        currentPage: currentPage,
        sizePerPage: sizePerPage,
        token: token,
      })
    );
  }, []);


  // useEffect(() => {
  //   setListAccounts(
  //     data.map((item) => {
  //       item.id = item.imsUser.id;
  //       item.email = item.imsUser.email;
  //       item.phoneNumber = item.imsUser.phoneNumber;
  //       item.fullname = item.imsUser.fullname;
  //       item.isActive = "";
  //       if (item.imsUser.isActive) item.isActive = "Active";
  //       else item.isActive = "Deactive";
  //       delete item["imsUser"];
  //       return item;
  //     })
  //   );
  // }, []);

  // console.log(listAccounts);

  function onRowClick(row) {
    history.push("/homepage/manage-account/edit-user-account");
  }
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
      text: 'Fullname ',


    },
    {

      dataField: 'isActive',
      text: 'Status ',


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
  function selectStatus(selected){

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
    <div>
      <div className="title-heading mt-2">
        <span>Account Manager</span>
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

        <AccountManagementFilter selectStatus={selectStatus} />

        <div class="p-3 ">
          <div className="card">
            <div class="card-header text-white bg-secondary">List Purchase Order</div>
            <div className="card-body">


              <PagingComponent pageCount={pageCount} nextPagingClick={nextPagingClick} backPagingClick={backPagingClick} currentPage={currentPage} />
             
              <p onClick={redirectCreateAccount}><i class="bi bi-file-earmark-plus"></i>Add</p>
              <p className="dropdown-toggle" data-bs-toggle="collapse" data-bs-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
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
                        data={data}
                        columns={columns}
                        striped
                        hover
                        condensed
                        // noDataIndication={() => <NoDataIndication />}
                        rowEvents={rowEvents}

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
