import React, { useEffect, useState, useRef, useReducer } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Modal } from "bootstrap";
import BootstrapTable from "react-bootstrap-table-next";
//css
import "../../product.css";
//components
import PagingComponent from "../../../components/paging/paging-component";
import {
  getAllLocationsAction,
  createLocationAction,
  updateLocationAction,
} from "./action";
export default function LocationManager() {
  let dispatch = useDispatch();

  const [currentPage, setCurrentPage] = useState(1);
  const [sizePerPage, setSizePerPage] = useState(5);
  const [isCreate, setIsCreate] = useState(true);
  const [locationData, setLocationData] = useState({
    id: "",
    locationName: "",
    locationBarcode: "",
  });
  //todo:modal
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

    setLocationData({
      id: "",
      locationName: "",
      locationBarcode: "",
    });
  };

  //todo:Store
  const { listLocationsStore, token, pageCount, messages } = useSelector(
    (state) => ({
      listLocationsStore: state.locationManagetReducer.listLocations,
      token: state.client.token,
      pageCount: state.locationManagetReducer.pageCount,
      messages: state.locationManagetReducer.messages,
    })
  );

  const columns = [
    {
      dataField: "id",
      text: " ID",
    },
    {
      dataField: "locationName",
      text: "Location Name",
    },
    {
      dataField: "locationBarcode",
      text: "Location Barcode",
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
      setLocationData({
        id: row.id,
        locationName: row.locationName,
        locationBarcode: row.locationBarcode,
      });
      setIsCreate(false);
      showModal();
    },
  };
  useEffect(() => {
    dispatch(
      getAllLocationsAction({
        token: token,
        currentPage: currentPage,
        sizePerPage: sizePerPage,
      })
    );
  }, []);
  return (
    <>
      <div className="wrapper-content shadow">
        <div className="ms-5">
          <a
            className="btn btn-default me-md-2 add"
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
            Create new Location
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
            data={listLocationsStore}
            rowEvents={rowEvents}
          />
          <PagingComponent
            currentPage={currentPage}
            pageCount={pageCount}
            nextPagingClick={nextPagingClick}
            backPagingClick={backPagingClick}
          />
        </div>
      </div>
      <ModalFunction
        modalRef={modalRef}
        hideModal={hideModal}
        isCreate={isCreate}
        locationData={locationData}
        token={token}
        messaages={messages}
        // onChangeValue={onChangeValue}
      />
    </>
  );
}

function ModalFunction(props) {
  let dispatch = useDispatch();

  const [isDisabled, setIsDisabled] = useState(true);
  const [locationSelected, setLocationSelected] = useState({});
  // const [categorySelected, setCategorySelected] = useState({});

  function onCancelClick() {
    // setCategorySelected(props.categoryData);
    setLocationSelected(props.categoryData);
    setIsDisabled(!isDisabled);
  }

  function onClickEdit() {
    setIsDisabled(!isDisabled);
  }

  function onSaveClick() {
    console.log(locationSelected);

    if (props.isCreate) {
      // dispatch(
      //   createLocationAction({ token: props.token, data: categorySelected })
      // );
    } else {
      // const dataUpdate = {
      //   categoryId: categorySelected.id,
      //   categoryName: categorySelected.categoryName,
      //   categoryDescription: categorySelected.categoryDescription,
      // };
      // dispatch(updateLocationAction({ token: props.token, data: dataUpdate }));
    }
  }

  function onCloseClick() {
    if (!isDisabled) {
      setIsDisabled(true);
    }
    props.hideModal();
  }

  function onChangeValue(event) {
    // setCategorySelected({
    //   ...categorySelected,
    //   [event.target.name]: event.target.value,
    // });
    setLocationSelected({
      ...locationSelected,
      [event.target.name]: event.target.value,
    });
  }

  useEffect(() => {
    if (props.isCreate)
      {
        setLocationSelected({ locationName: "" });
      }
    else
    {
      setLocationSelected(props.locationData);
    }
  }, [props.locationData, props.isCreate]);

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
              {!props.isCreate && (
                <>
                  <label for="Category" className="form-label">
                    Location ID
                  </label>
                  <p>
                    <strong>{locationSelected.id}</strong>
                  </p>
                  <label for="Category" className="form-label">
                    Location Barcode
                  </label>
                  <p>
                    <strong>{locationSelected.locationBarcode}</strong>
                  </p>
                </>
              )}
            </div>
            <div className="mb-3">
              <label for="Category" className="form-label">
                Location Name
              </label>
              {props.isCreate ? (
                <input
                  type="text"
                  className="form-control"
                  name="locationName"
                  value={locationSelected.locationName}
                  onChange={onChangeValue}
                />
              ) : (
                <input
                  type="text"
                  className="form-control"
                  name="locationName"
                  disabled={isDisabled}
                  value={locationSelected.locationName}
                  onChange={onChangeValue}
                />
              )}
            </div>
            {/* <div class="mb-3">
              <label for="description" class="form-label">
                Description
              </label>
              {props.isCreate ? (
                <textarea
                  class="form-control"
                  name="categoryDescription"
                  rows="3"
                  // value={categorySelected.categoryDescription}
                  onChange={onChangeValue}
                ></textarea>
              ) : (
                <textarea
                  class="form-control"
                  name="categoryDescription"
                  rows="3"
                  // value={categorySelected.categoryDescription}
                  disabled={isDisabled}
                  onChange={onChangeValue}
                ></textarea>
              )}
            </div> */}
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
