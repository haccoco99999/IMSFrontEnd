import React, { useEffect, useState, useRef, useReducer } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Modal } from "bootstrap";
import BootstrapTable from "react-bootstrap-table-next";
import Swal from "sweetalert2";
import { TableLoading } from "../../../components/loading/loading-component";
//css
import "../../product.css";
//components
import PagingComponent from "../../../components/paging/paging-component";
import {
  getAllLocationsAction,
  createLocationAction,
  updateLocationAction,
} from "./action";
import { RESET } from "../constants";
import { LocationCategoryFilter } from "../../../components/filter/FilterComponents";
import { setStatusLoadingTable } from "../../../helper/loadDataHelper";
export default function LocationManager() {
  let dispatch = useDispatch();

  const [currentPage, setCurrentPage] = useState(1);
  // const [sizePerPage, setsizePerPage] = useState(5);
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
  const locationFilterInit = {
  
    searchQuery: "",
    IsLocationOnly: true

  }
  const [locationFilter, setLocationFilter] = useState({
    currentPage: 1,
    sizePerPage: 25,
    ...locationFilterInit
  })
  //todo:Store
  const {
    listLocationsStore,
    token,
    pageCount,
    createLocationReducer,
    updateLocationReducer,
    locationManagerReducerStatus,
  } = useSelector((state) => ({
    listLocationsStore: state.locationManagerReducer.listLocations,
    locationManagerReducerStatus: state.locationManagerReducer,
    token: state.client.token,
    pageCount: state.locationManagerReducer.pageCount,
    // messages: state.locationManagetReducer.messages,
    createLocationReducer: state.createLocationReducer,
    updateLocationReducer: state.updateLocationReducer,
  }));

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



    let dataFilter = { ...locationFilter, currentPage: locationFilter.currentPage + 1 }
    dispatch(
      getAllLocationsAction({
        filter: parseFilterToString(dataFilter),
        token: token,
      })
    );
    setLocationFilter(dataFilter)
  }
  function backPagingClick() {

    let dataFilter = { ...locationFilter, currentPage: locationFilter.currentPage - 1 }
    dispatch(
      getAllLocationsAction({
        filter: parseFilterToString(dataFilter),
        token: token,
      })
    );
    setLocationFilter(dataFilter)
  }
  function onChangeLocationFilter(event) {
    setLocationFilter((state) => ({
      ...state, [event.target.name]: event.target.value
    }))
  }
  function submitLocationFilter() {

    dispatch(
      getAllLocationsAction({
        filter: parseFilterToString(locationFilter),
        token: token,
      })
    );


  }
  function resetLocationFilter() {
    
    dispatch(
      getAllLocationsAction({
        filter: parseFilterToString({
          ...locationFilter, ...locationFilterInit
        }),
        token: token,
      })
    );
    setLocationFilter((state) => ({
      ...state, ...locationFilterInit
    }))
  }
  function setSizePage(event) {

    let dataFilter = { ...locationFilter, sizePerPage: event.target.value }
    dispatch(
      getAllLocationsAction({
        filter: parseFilterToString(dataFilter),
        token: token,
      })
    );
    setLocationFilter(dataFilter)
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
        filter: parseFilterToString(locationFilter),
        token: token,
      })
    );
    return () => {
      dispatch({ type: RESET });
    };
  }, []);

  useEffect(() => {
    if (createLocationReducer.requesting) {
      Swal.fire({
        title: "Progressing",
        html: "Waiting...",
        timerProgressBar: true,
        didOpen: () => {
          Swal.showLoading();
        },
      });
    } else if (createLocationReducer.successful) {
      if (createLocationReducer.errors) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Duplicate",
          showCancelButton: false,
          confirmButtonColor: "#3085d6",
        });
      } else
        Swal.fire({
          icon: "success",
          title: "Your work has been saved",
          showCancelButton: false,
          confirmButtonColor: "#3085d6",
        }).then((result) => {
          if (result.isConfirmed) {
            hideModal();
            dispatch(
              getAllLocationsAction({
                filter: parseFilterToString(locationFilter),
                token: token,
              })
            );
          }
        });
    } else if (createLocationReducer.errors) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Something went wrong!",
      });
    }
  }, [createLocationReducer]);

  useEffect(() => {
    if (updateLocationReducer.requesting) {
      Swal.fire({
        title: "Progressing",
        html: "Waiting...",
        timerProgressBar: true,
        didOpen: () => {
          Swal.showLoading();
        },
      });
    } else if (updateLocationReducer.successful) {
      if (updateLocationReducer.errors) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Duplicate",
          showCancelButton: false,
          confirmButtonColor: "#3085d6",
        });
      } else
        Swal.fire({
          icon: "success",
          title: "Your work has been saved",
          showCancelButton: false,
          confirmButtonColor: "#3085d6",
        }).then((result) => {
          if (result.isConfirmed) {
            hideModal();
            dispatch(
              getAllLocationsAction({
                filter: parseFilterToString(locationFilter),
                token: token,
              })
            );
          }
        });
    } else if (updateLocationReducer.errors) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Something went wrong!",
      });
    }
  }, [updateLocationReducer]);
  return (
    <>
      {/* <div className="wrapper-content shadow">
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
      </div> */}

      <LocationCategoryFilter
        onChangeValueFilter={onChangeLocationFilter}
        filter={locationFilter}
        submitFilter={submitLocationFilter}
        resetFilter={resetLocationFilter}

      />

      <div class="pb-3">
        <div className="card">
          <div class="card-header text-white bg-secondary">Location List</div>
          <div className="card-body">
            <PagingComponent
              setSizePage={setSizePage}
              pageCount={pageCount}
              nextPagingClick={nextPagingClick}
              backPagingClick={backPagingClick}
              currentPage={locationFilter.currentPage} />

            <button onClick={showModal} type="button" class=" btn-sm mb-3 btn btn-primary">Add Location</button>

            {/* <PagingComponent sizePerPage={filter.sizePerPage} setSizePage={setSizePage} pageCount={infoTablePage.pageCount} nextPagingClick={nextPagingClick} backPagingClick={backPagingClick} currentPage={filter.CurrentPage} /> */}


            <BootstrapTable


              keyField="id"
              striped
              hover
              condensed
              columns={columns}
              data={listLocationsStore}
              rowEvents={rowEvents}
              rowClasses="pointer"
              noDataIndication={() =>setStatusLoadingTable({requesting: locationManagerReducerStatus.requesting , successful:locationManagerReducerStatus.successful}) }
            />




          </div>
        </div>
      </div>



      <ModalFunction
        modalRef={modalRef}
        hideModal={hideModal}
        isCreate={isCreate}
        locationData={locationData}
        token={token}
      // messaages={messages}
      // onChangeValue={onChangeValue}
      />
    </>
  );
}

function ModalFunction(props) {
  let dispatch = useDispatch();

  const [isDisabled, setIsDisabled] = useState(true);
  const [locationSelected, setLocationSelected] = useState({});
  // const [categorySelected, setCategorySelected] = useState({ });

  function onCancelClick() {
    // setCategorySelected(props.categoryData);
    setLocationSelected(props.locationData);
    setIsDisabled(!isDisabled);
  }

  function onClickEdit() {
    setIsDisabled(!isDisabled);
  }

  function onSaveClick() {
    // console.log(locationSelected);
    if (locationSelected.locationName === "") {
      Swal.fire({
        title: "Error",
        text: "Empty Data!",
        icon: "error",
        showCancelButton: true,
        cancelButtonText: "Cancel",
        showConfirmButton: false,
      });
    } else {
      if (props.isCreate) {
        const data = {
          locationName: locationSelected.locationName,
        };
        console.log(data);
        Swal.fire({
          title: "Are you sure",
          text: "Do you want to save?",
          icon: "question",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: " #d33",
          confirmButtonText: "Confirm",
          reverseButtons: true,
        }).then((result) => {
          if (result.isConfirmed)
            dispatch(createLocationAction({ token: props.token, data: data }));
        });
      } else {
        const dataUpdate = {
          locationId: locationSelected.id,
          locationName: locationSelected.locationName,
        };
        console.log(dataUpdate);
        let needCheckName;
        if (locationSelected.locationName === props.locationData.locationName)
          needCheckName = false;
        else needCheckName = true;

        dispatch(
          updateLocationAction({
            token: props.token,
            data: dataUpdate,
            needCheckName: needCheckName,
          })
        );
      }
    }
  }

  function onCloseClick() {
    if (!isDisabled) {
      setIsDisabled(true);
    }
    props.hideModal();
  }

  function onChangeValue(event) {
    setLocationSelected({
      ...locationSelected,
      [event.target.name]: event.target.value,
    });
  }

  useEffect(() => {
    if (props.isCreate) {
      setLocationSelected({ locationName: "" });
    } else {
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

            {/* <button
              type="button"
              className="btn-close"
              // data-bs-dismiss="modal"
              aria-label="Close"
            ></button> */}
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
