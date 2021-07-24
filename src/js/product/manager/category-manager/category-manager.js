import React, { useEffect, useState, useRef, useReducer } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Modal } from "bootstrap";
import BootstrapTable from "react-bootstrap-table-next";
//css
import "../../product.css";

//components
import {
  GetAllCategoryAction,
  CreateCategoryAction,
  UpdateCategoryAction,
} from "./action";
import Table from "../../../table-receipt/ListReceiptsTable";
import PagingComponent from "../../../components/paging/paging-component";
export default function CategoryManager() {
  let dispatch = useDispatch();
  //modal
  const modalRef = useRef();
  const showModal = () => {
    const modalEle = modalRef.current;
    const bsModal = new Modal(modalEle, {
      backdrop: "static",
      keyboard: false,
    });
    bsModal.show();
  };
  const hideModal = () => {
    const modalEle = modalRef.current;
    const bsModal = Modal.getInstance(modalEle);
    bsModal.hide();

    //reset
    if (!isCreate) setIsCreate(true);

    setCategoryData({
      id: "",
      categoryName: "",
      categoryDescription: "",
      transactionId: "",
    });
  };

  const [categoryData, setCategoryData] = useState({
    id: "",
    categoryName: "",
    categoryDescription: "",
    transactionId: "",
  });

  const { list_Categories, token, pageCount, messages } = useSelector(
    (state) => ({
      list_Categories: state.getAllCategoriesReducer.listCategories,
      token: state.client.token,
      pageCount: state.getAllCategoriesReducer.pageCount,
      messages: state.getAllCategoriesReducer.messages,
    })
  );

  const [currentPage, setCurrentPage] = useState(1);
  const [sizePerPage, setSizePerPage] = useState(5);

  const [isCreate, setIsCreate] = useState(true);

  // const [listValueColumn, setListValueColumn] = useState({
  //   id: true,
  //   categoryName: true,
  //   categoryDescription: true,
  //   transactionId: false,
  // });

  // const [listEditHeader, setListEditHeader] = useState({
  //   categoryName: "Name",
  //   categoryDescription: "Description",
  //   id: "Category ID",
  // });

  const columns = [
    {
      dataField: "id",
      hidden: true,
    },
    {
      dataField: "categoryName",
      text: "Name",
    },
    {
      dataField: "categoryDescription",
      text: "Description",
    },
    {
      dataField: "transactionId",
      hidden: true,
    },
  ];
  function nextPagingClick() {
    console.log("forward");
    setCurrentPage(currentPage + 1);
  }
  function backPagingClick() {
    console.log("backWard");
    setCurrentPage(currentPage - 1);
  }

  const rowEvents = {
    onClick: (e, row, rowIndex) => {
      setCategoryData({
        id: row.id,
        categoryName: row.categoryName,
        categoryDescription: row.categoryDescription,
        transactionId: row.transactionId,
      });
      setIsCreate(false);
      showModal();
    },
  };

  function onRowClick(row) {
    setCategoryData({
      id: row.id,
      categoryName: row.categoryName,
      categoryDescription: row.categoryDescription,
      transactionId: row.transactionId,
    });
    setIsCreate(false);
    showModal();
  }

  function onChangeValue(event) {
    setCategoryData({
      ...categoryData,
      [event.target.name]: event.target.value,
    });
  }

  useEffect(() => {
    dispatch(
      GetAllCategoryAction({
        currentPage: currentPage,
        sizePerPage: sizePerPage,
        token: token,
      })
    );
  }, [currentPage, sizePerPage]);

  useEffect(() => {
    if (messages === "Create Success") {
      console.log("Create Suceess");
    } else if (messages === "Update Success") console.log("Update Suceess");
  }, [messages]);

  return (
    <div className="wrapper-content shadow">
      <ModalFunction
        modalRef={modalRef}
        hideModal={hideModal}
        isCreate={isCreate}
        categoryData={categoryData}
        // onChangeValue={onChangeValue}
        token={token}
        messaages={messages}
      />

      <div className="ms-5">
        <a
          class="btn btn-default me-md-2 add"
          // data-bs-target="#NewCategoryModal"
          // data-bs-toggle="modal"
          onClick={showModal}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            fill="currentColor"
            className="bi bi-plus-lg"
            viewBox="0 0 20 20"
          >
            <path d="M8 0a1 1 0 0 1 1 1v6h6a1 1 0 1 1 0 2H9v6a1 1 0 1 1-2 0V9H1a1 1 0 0 1 0-2h6V1a1 1 0 0 1 1-1z" />
          </svg>
          Create new Category
        </a>
      </div>

      <div className="mt-3">
        <BootstrapTable
          keyField="id"
          striped
          hover
          condensed
          columns={columns}
          headerClasses="table-header-receipt"
          noDataIndication="Table is Empty"
          data={list_Categories}
          rowEvents={rowEvents}
        />
        <PagingComponent
          currentPage={currentPage}
          pageCount={pageCount}
          nextPagingClick={nextPagingClick}
          backPagingClick={backPagingClick}
        />
        {/* <Table
          listHeaderEdit={listEditHeader}
          listColumn={listValueColumn}
          listData={list_Categories}
          backPagingClick={backPagingClick}
          nextPagingClick={nextPagingClick}
          sizePerPage={sizePerPage}
          currentPage={currentPage}
          pageCount={pageCount}
          onRowClick={onRowClick}
        /> */}
      </div>
    </div>
  );
}

function ModalFunction(props) {
  let dispatch = useDispatch();

  const [isDisabled, setIsDisabled] = useState(true);
  const [categorySelected, setCategorySelected] = useState({});

  function onCancelClick() {
    setCategorySelected(props.categoryData);
    setIsDisabled(!isDisabled);
  }

  function onClickEdit() {
    setIsDisabled(!isDisabled);
  }

  function onSaveClick() {
    console.log(categorySelected);

    if (props.isCreate)
      dispatch(
        CreateCategoryAction({ token: props.token, data: categorySelected })
      );
    else {
      const dataUpdate = {
        categoryId: categorySelected.id,
        categoryName: categorySelected.categoryName,
        categoryDescription: categorySelected.categoryDescription,
      };
      dispatch(UpdateCategoryAction({ token: props.token, data: dataUpdate }));
    }
  }

  function onCloseClick() {
    if (!isDisabled) {
      setIsDisabled(true);
    }
    props.hideModal();
  }

  function onChangeValue(event) {
    setCategorySelected({
      ...categorySelected,
      [event.target.name]: event.target.value,
    });
  }

  useEffect(() => {
    if (props.isCreate)
      setCategorySelected({ categoryName: "", categoryDescription: "" });
    else setCategorySelected(props.categoryData);
  }, [props.categoryData, props.isCreate]);

  return (
    <div className="modal fade" ref={props.modalRef} tabIndex="-1">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            {props.isCreate ? (
              <h5 className="modal-title fw-bold">Create</h5>
            ) : (
              <h5 className="modal-title fw-bold">Details</h5>
            )}

            <button
              type="button"
              className="btn-close"
              // data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>

          <div className="modal-body">
            <div className="mb-3">
              <label for="Category" className="form-label">
                Category Name
              </label>
              {props.isCreate ? (
                <input
                  type="text"
                  className="form-control"
                  name="categoryName"
                  value={categorySelected.categoryName}
                  onChange={onChangeValue}
                />
              ) : (
                <input
                  type="text"
                  className="form-control"
                  name="categoryName"
                  disabled={isDisabled}
                  value={categorySelected.categoryName}
                  onChange={onChangeValue}
                />
              )}
            </div>
            <div class="mb-3">
              <label for="description" class="form-label">
                Description
              </label>
              {props.isCreate ? (
                <textarea
                  class="form-control"
                  name="categoryDescription"
                  rows="3"
                  value={categorySelected.categoryDescription}
                  onChange={onChangeValue}
                ></textarea>
              ) : (
                <textarea
                  class="form-control"
                  name="categoryDescription"
                  rows="3"
                  value={categorySelected.categoryDescription}
                  disabled={isDisabled}
                  onChange={onChangeValue}
                ></textarea>
              )}
            </div>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-default"
              // data-bs-dismiss="modal"
              onClick={onCloseClick}
            >
              Close
            </button>
            {props.isCreate ? (
              <button
                type="button"
                className=" text-white btn btn-default button-save--modal "
                onClick={onSaveClick}
              >
                Save
              </button>
            ) : (
              <>
                {" "}
                {isDisabled ? (
                  <button
                    type="button"
                    className=" text-white btn btn-default button-save--modal "
                    onClick={onClickEdit}
                  >
                    Edit
                  </button>
                ) : (
                  <>
                    <button
                      type="button"
                      className=" text-white btn btn-default button-save--modal "
                      onClick={onCancelClick}
                    >
                      Revert
                    </button>
                    <button
                      type="button"
                      className=" text-white btn btn-default button-save--modal "
                      onClick={onSaveClick}
                    >
                      Save
                    </button>
                  </>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
