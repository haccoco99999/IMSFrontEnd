import React, { useState, useEffect, useRef } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Modal, Toast } from "bootstrap";
import Table from "react-bootstrap-table-next";
import cellEditFactory, { Type } from "react-bootstrap-table2-editor";
// import paginationFactory from "react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css";
import Swal from "sweetalert2";
//css
import "../stocktake.css";
//components
// import ListLocationsModal from "./search-location-modal";
import ListLocationsModal from "../../components/location/location-modal";
import {
  // getAllLocationsAction,
  getListPackageAction,
  createStocktkaeAction,
} from "./action";

import { getAllLocationsAction } from "../../components/location/action";
import { RESET } from "./constants";
import SpinnerComponent from "../components/spinner-component";
// import ToastComponent from "../components/toast-component";
import NavigationBar from "../../components/navbar/navbar-component";

export default function CreateStocktakeComponent() {
  let history = useHistory();
  let dispatch = useDispatch();

  //todo: state store
  const {
    token,
    listLocationsStore,
    listPackagesStore,
    createStocktakeStore,
    getDetailsPackageReducer,
    getAllLocationsReducer,
  } = useSelector((state) => ({
    token: state.client.token,
    listLocationsStore: state.getAllLocationsReducer.listLocations,
    listPackagesStore: state.getDetailsPackageReducer.listPackages,
    getDetailsPackageReducer: state.getDetailsPackageReducer,
    createStocktakeStore: state.createStocktakeReducer,
    getAllLocationsReducer: state.getAllLocationsReducer,
  }));

  const [isLoading, setIsLoading] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState({
    id: "",
    locationName: "",
    locationBarcode: "",
  });
  const [listCheckedItems, setListCheckedItems] = useState([
    // {
    //   id: uuid(),
    //   packageId: "",
    //   name: "",
    //   sku: "",
    //   productVariantId: "",
    //   quantity: "",
    //   counted: "",
    //   note: "",
    // },
  ]);
  const [isTimeForTrigger, setIsTimeForTrigger] = useState(false);
  const [isChecking, setIsChecking] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  function clickDeleteCheckItems(rowIndex) {
    console.log(rowIndex);
    setListCheckedItems((state) => state.filter((_, i) => i !== rowIndex));
  }

  function onAddCheckItemClick() {
    setListCheckedItems([
      ...listCheckedItems,
      {
        id: uuid(),
        packageId: "",
        name: "",
        productVariantId: "",
        quantity: "",
        counted: 0,
        note: "",
      },
    ]);
  }

  function openCheckLocation() {
    dispatch(getAllLocationsAction({ token: token }));
    showModal();
  }
  //todo:modal declare
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
  };
  //todo: format input value

  //todo: bootstrap table declare

  const columns = [
    {
      dataField: "id",
      hidden: true,
    },
    {
      dataField: "packageId",
      text: "Package ID",
      editable: false,
      formatter: (cellContent, row, rowIndex) => {
        const onChange = (e) => {
          const packageDetails = listPackagesStore.find(
            (element) => element.id === e.target.value
          );
          console.log(listCheckedItems);
          listCheckedItems[rowIndex].quantity = packageDetails.quantity;
          listCheckedItems[rowIndex].packageId = packageDetails.id;
          listCheckedItems[rowIndex].productVariantId =
            packageDetails.productVariantId;
          listCheckedItems[rowIndex].counted = 0;
          listCheckedItems[rowIndex].name = packageDetails.productVariant.name;
          listCheckedItems[rowIndex].sku = packageDetails.productVariant.sku;
          setIsTimeForTrigger(true);
          setTimeout(() => {
            setIsTimeForTrigger(false);
          }, 500);
        };

        return (
          <>
            <select
              // id={rowIndex}
              class="form-select"
              aria-label="Default select example"
              defaultValue={row.packageId}
              onChange={onChange}
            >
              <option value={""} disabled>
                Select package ID
              </option>

              {listPackagesStore.map((item) => (
                <option id={item.id} value={item.id}>
                  {item.id}
                </option>
              ))}
            </select>
          </>
        );
      },
    },
    {
      dataField: "productVariantId",
      text: "Variant ID",
      editable: false,
      hidden: true,
    },
    {
      dataField: "sku",
      text: "SKU",
      editable: false,
      // hidden: true,
    },
    { dataField: "name", text: "Name", editable: false },
    {
      dataField: "quantity",
      text: "Quantity",
      editable: false,

      // formatter: (cellContent, row, rowIndex) => {
      //   if (isTimeForTrigger)
      //     return <span> {listCheckedItems[rowIndex].quantity}</span>;
      // },
    },
    {
      dataField: "counted",
      text: "Counted",
      type: "number",
      editable: true,
      formatter: (cellContent, row, rowIndex) =>
        (listCheckedItems[rowIndex].counted = row.counted),
      validator: (newValue, row, column) => {
        if (isNaN(newValue)) {
          setIsChecking(true);
          return {
            valid: false,
            message: "Price should be numeric",
          };
        } else {
          if (newValue < 0) {
            setIsChecking(true);
            return {
              valid: false,
              message: "Quantity should be bigger than 0",
            };
          }
          // if (newValue > row.quantity) {
          //   console.log(row.quantity);
          //   setIsChecking(true);
          //   return {
          //     valid: false,
          //     message: "Counted number should be lower than ordered number",
          //   };
          // }
          setIsChecking(false);
        }
      },
    },
    {
      dataField: "note",
      text: "Note",
      editor: {
        type: Type.TEXTAREA,
      },
    },
    {
      dataField: "id",
      text: "Action",
      editable: false,
      formatter: (cellContent, row, rowIndex) => {
        return (
          <div
            className="text-danger btn"
            onClick={() => clickDeleteCheckItems(rowIndex)}
          >
            <i class="bi bi-trash"></i>
          </div>
        );
      },
    },
  ];

  //todo: function nav button
  const listButton = setListButtonNav();
  function setListButtonNav() {
    return [
      {
        isShow: true,
        title: "Save",
        class: " btn-primary",
        action: () => onClickSubmit(),
        disabled: isChecking,
      },
    ];
  }

  function goBackClick() {
    setIsCreating(false);
    history.replace("/homepage/stock-take");
  }

  function handleOnSelect(row, isSelect) {
    if (isSelect) {
      setSelectedLocation({
        id: row.id,
        locationName: row.locationName,
        locationBarcode: row.locationBarcode,
      });
    }
  }

  function isEmptyRow(array) {
    const check = (element) => element.packageId === "";
    return array.some(check);
  }

  function onClickSubmit() {
    const data = {
      stockTakeGroupLocation: [
        {
          locationId: selectedLocation.id,
          checkItems: listCheckedItems.map((checkItem) => {
            return {
              pkgId: checkItem.packageId,
              productVariantName: checkItem.name,
              sku: checkItem.sku,
              storageQuantity: checkItem.quantity,
              actualQuantity: checkItem.counted,
              note: checkItem.note,
            };
          }),
        },
      ],
      stockTakeId: null,
    };

    if (selectedLocation.id === "") {
      Swal.fire({
        title: "Error",
        text: "Empty list!",
        icon: "error",
        showCancelButton: true,
        cancelButtonText: "Cancel",
        showConfirmButton: false,
      });
    } else {
      if (listCheckedItems.length > 0) {
        if (listCheckedItems.length === 1) {
          if (listCheckedItems[0].pkgId === "") {
            Swal.fire({
              title: "Error",
              text: "Empty list!",
              icon: "error",
              showCancelButton: true,
              cancelButtonText: "Cancel",
              showConfirmButton: false,
            });
          } else {
            console.log("Data output:", data);

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
              if (result.isConfirmed) {
                dispatch(createStocktkaeAction({ token: token, data: data }));
              }
            });
          }
        } else {
          //todo: check empty row
          if (isEmptyRow(listCheckedItems)) {
            Swal.fire({
              title: "Error",
              text: "There is no empty row in the list",
              icon: "error",
              showCancelButton: true,
              cancelButtonText: "Cancel",
              showConfirmButton: false,
            });
          } else {
            console.log("Ko co empty");
            if (checkForDuplicates(listCheckedItems, "packageId")) {
              console.log("Duplicate");

              Swal.fire({
                title: "Error",
                text: "There shouble be no duplicate in the list",
                icon: "error",
                showCancelButton: true,
                cancelButtonText: "Cancel",
                showConfirmButton: false,
              });
            } else {
              console.log("No duplicate");

              console.log("Data output:", data);

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
                if (result.isConfirmed) {
                  // dispatch(createStocktkaeAction({ token: token, data: data }));
                }
              });
            }
          }
        }
      } else {
        Swal.fire({
          title: "Error",
          text: "Empty list!",
          icon: "error",
          showCancelButton: true,
          cancelButtonText: "Cancel",
          showConfirmButton: false,
        });
      }
    }
  }

  function onSelectLocationClick() {
    hideModal();
    console.log("Data dang search:", selectedLocation.id);
    //reset
    setIsLoading(false);
    setListCheckedItems([
      {
        id: uuid(),
        packageId: "",
        name: "",
        sku: "",
        productVariantId: "",
        quantity: "",
        counted: "",
        note: "",
      },
    ]);
    dispatch(getListPackageAction({ token: token, id: selectedLocation.id }));
  }

  //todo: check duplicate in list
  function checkForDuplicates(array, keyName) {
    return new Set(array.map((item) => item[keyName])).size !== array.length;
  }
  //todo: random ID
  function uuid() {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
      /[xy]/g,
      function (c) {
        var r = (Math.random() * 16) | 0,
          v = c == "x" ? r : (r & 0x3) | 0x8;
        return v.toString(16);
      }
    );
  }

  useEffect(() => {
    if (listPackagesStore.length > 0) {
      setIsLoading(true);
      setIsCreating(true);
      // console.log("Check:", isLoading);
    }
  }, [listPackagesStore]);
  //todo: createStocktakeStore
  useEffect(() => {
    if (createStocktakeStore.requesting === true) {
      Swal.fire({
        title: "Progressing",
        html: "Waiting...",
        timerProgressBar: true,
        didOpen: () => {
          Swal.showLoading();
        },
      });
    } else if (createStocktakeStore.successful === true) {
      Swal.fire({
        icon: "success",
        title: "Your work has been saved",
        showCancelButton: false,
        confirmButtonColor: "#3085d6",
      }).then((result) => {
        if (result.isConfirmed) {
          history.push("/homepage/stock-take/details", {
            stocktakeId: createStocktakeStore.messages,
          });
        }
      });
    } else if (createStocktakeStore.errors === true) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Something went wrong!",
      });
    }
  }, [createStocktakeStore]);

  //todo: getDetailsPackageReducer check error
  useEffect(() => {
    if (getDetailsPackageReducer.errors) {
      setIsCreating(false);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Something went wrong!",
      });
    }
  }, [getDetailsPackageReducer]);

  //todo: getAllLocationsReducer error
  useEffect(() => {
    if (getAllLocationsReducer.errors) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Something went wrong!",
        showCancelButton: false,
        confirmButtonColor: "#3085d6",
      }).then((result) => {
        if (result.isConfirmed) {
          hideModal();
        }
      });
    }
  }, [getAllLocationsReducer]);

  useEffect(() => {
    return () => {
      dispatch({ type: RESET });
    };
  }, []);
  //todo: toast
  // const toastRef = useRef();
  // const showToast = () => {
  //   const toastEle = toastRef.current;
  //   const bsToast = new Toast(toastEle, {
  //     autohide: false,
  //   });
  //   bsToast.show();
  // };
  // const hideToast = () => {
  //   const toastEle = toastRef.current;
  //   const bsToast = Toast.getInstance(toastEle);
  //   bsToast.hide();
  // };
  return (
    <div>
      <NavigationBar
        actionGoBack={goBackClick}
        titleBar="Create Stocktake"
        status=""
        listButton={listButton}
        home="Stocktake"
        currentPage="Create stocktake"
      />
      {/* content */}
      <div className="wrapper">
        <div className="card">
          <div className="card-header fw-bold">Create Stocktake</div>
          <ul class="list-group list-group-flush">
            <li class="list-group-item">
              <div className="mt-3">
                <button
                  class="btn btn-outline-secondary"
                  type="button"
                  onClick={openCheckLocation}
                >
                  Select Location
                </button>
              </div>
            </li>
            <li class="list-group-item">
              <div className="mt-3">
                <p>
                  <strong>Location ID:</strong> {selectedLocation.id}
                </p>
                <p>
                  <strong>Location Name:</strong>{" "}
                  {selectedLocation.locationName}
                </p>
                <p>
                  <strong>Location Barcode:</strong>{" "}
                  {selectedLocation.locationBarcode}
                </p>
              </div>
            </li>
            <li class="list-group-item">
              <h5 className="card-title fw-bold">List items</h5>
              {isCreating && (
                <>
                  {isLoading ? (
                    <>
                      <button
                        className="btn btn-primary"
                        onClick={onAddCheckItemClick}
                      >
                        Add
                      </button>
                      <div className="mt-3">
                        <Table
                          keyField="id"
                          data={listCheckedItems}
                          columns={columns}
                          cellEdit={cellEditFactory({
                            mode: "click",
                            blurToSave: true,
                          })}
                        />
                      </div>
                    </>
                  ) : (
                    <SpinnerComponent />
                  )}
                </>
              )}
            </li>
          </ul>
        </div>
      </div>
      <ListLocationsModal
        modalRef={modalRef}
        hideModal={hideModal}
        listLocations={listLocationsStore}
        handleOnSelect={handleOnSelect}
        onSelectLocationClick={onSelectLocationClick}
      />

      {/* <ToastComponent toastRef={toastRef} hideToast={hideToast} /> */}
    </div>
  );
}
