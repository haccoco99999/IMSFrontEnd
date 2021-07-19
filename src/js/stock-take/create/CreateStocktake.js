import React, { useState, useEffect, useRef } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Modal, Toast } from "bootstrap";
import Table from "react-bootstrap-table-next";
import cellEditFactory, { Type } from "react-bootstrap-table2-editor";
import paginationFactory from "react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css";

//css
import "../stocktake.css";
//components
import ListLocationsModal from "./search-location-modal";
import {
  getAllLocationsAction,
  getListPackageAction,
  createStocktkaeAction,
} from "./action";
import SpinnerComponent from "../components/spinner-component";
import ToastComponent from "../components/toast-component";
import NavigationBar from "../../components/navbar/navbar-component";

export default function CreateStocktakeComponent() {
  let history = useHistory();
  let dispatch = useDispatch();

  //todo: state store
  const { token, listLocationsStore, listPackagesStore, messages } =
    useSelector((state) => ({
      token: state.client.token,
      listLocationsStore: state.createStocktakeReducer.listLocations,
      listPackagesStore: state.createStocktakeReducer.listPackages,
      messages: state.createStocktakeReducer.messages,
    }));

  const [isLoading, setIsLoading] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState({
    id: "",
    locationName: "",
    locationBarcode: "",
  });
  const [listCheckedItems, setListCheckedItems] = useState([
    {
      id: "",
      productVariantId: "",
      quantity: "",
      counted: "",
      note: "",
    },
  ]);
  const [selectedPackage, setSelectedPackage] = useState([]);

  function onChangeSelectPackage(event) {
    const packageDetails = listPackagesStore.find(
      (element) => element.id === event.target.value
    );
    // console.log(
    //   packageDetails.id +
    //     "-" +
    //     packageDetails.quantity +
    //     "-" +
    //     packageDetails.productVariantId
    // );

    const temp = [...listCheckedItems];
    temp[event.target.id].quantity = packageDetails.quantity;
    temp[event.target.id].id = packageDetails.id;
    temp[event.target.id].productVariantId = packageDetails.productVariantId;
    temp[event.target.id].counted = 0;
    setListCheckedItems(temp);
    console.log(listCheckedItems);

    // console.log(listCheckedItems);
  }

  function clickDeleteCheckItems(rowIndex) {
    console.log(rowIndex);
    setListCheckedItems(
      listCheckedItems.filter((_, index) => index !== rowIndex)
    );
  }

  function onAddCheckItemClick() {
    setListCheckedItems([
      ...listCheckedItems,
      {
        id: "",
        productVariantId: "",
        quantity: "",
        counted: 0,
        note: "",
      },
    ]);
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

  //todo: bootstrap table declare

  const columns = [
    {
      dataField: "id",
      text: "Package ID",
      editable: false,
      formatter: (cellContent, row, rowIndex) => {
        return (
          <>
            {/* <div>
            Selected Package: {row.id}
          </div> */}
            <select
              id={rowIndex}
              class="form-select"
              aria-label="Default select example"
              defaultValue={row.id}
              onChange={onChangeSelectPackage}
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
    },
    {
      dataField: "quantity",
      text: "Quantity",
      editable: false,
      // formatter: (cellContent, row) => <></>,
    },
    {
      dataField: "counted",
      text: "Counted",
      type: "number",
      editable: true,
      formatter: (cellContent, row, rowIndex) =>
        (listCheckedItems[rowIndex].counted = row.counted),
      validator: (newValue, oldValue, row) => {
        if (isNaN(newValue)) {
          return {
            valid: false,
            message: "Price should be numeric",
          };
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
      text: "Delete",
      editable: false,
      formatter: (cellContent, row, rowIndex) => {
        return (
          <button
            type="button"
            className="btn btn-danger"
            onClick={() => clickDeleteCheckItems(rowIndex)}
          >
            Delete
          </button>
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
        title: "Submit",
        class: " btn-primary",
        action: () => onClickSubmit(),
      },
    ];
  }

  function goBackClick() {
    history.goBack();
  }

  function handleOnSelect(row, isSelect) {
    if (isSelect) {
      console.log(row.id);
      console.log(row.locationName);
      setSelectedLocation({
        id: row.id,
        locationName: row.locationName,
        locationBarcode: row.locationBarcode,
      });
    }
  }

  function onClickSubmit() {
    const data = {
      stockTakeGroupLocation: [
        {
          locationId: selectedLocation.id,
          checkItems: listCheckedItems.map((checkItem) => {
            return {
              packageId: checkItem.id,
              actualQuantity: checkItem.counted,
              note: checkItem.note,
            };
          }),
        },
      ],
      stockTakeId: null,
    };

    console.log("Data output:", data);
    dispatch(createStocktkaeAction({ token: token, data: data }));
  }

  function onSelectLocationClick() {
    hideModal();
    console.log("Data dang search:", selectedLocation.id);
    //reset
    setIsLoading(false);
    setListCheckedItems([
      {
        id: "",
        productVariantId: "",
        quantity: "",
        counted: "",
        note: "",
      },
    ]);
    dispatch(getListPackageAction({ token: token, id: selectedLocation.id }));
  }

  useEffect(() => {
    dispatch(getAllLocationsAction({ token: token }));
  }, []);

  useEffect(() => {
    if (listPackagesStore.length > 0) {
      setIsLoading(true);
      console.log("Check:", isLoading);
    }
  }, [listPackagesStore]);

  useEffect(() => {
    if (messages !== "") {
      console.log(messages);
      history.push("/homepage/stock-take/details", {
        stocktakeId: messages,
      });
    }
  }, [messages]);

  //todo: toast
  const toastRef = useRef();
  const showToast = () => {
    const toastEle = toastRef.current;
    const bsToast = new Toast(toastEle, {
      autohide: false,
    });
    bsToast.show();
  };
  const hideToast = () => {
    const toastEle = toastRef.current;
    const bsToast = Toast.getInstance(toastEle);
    bsToast.hide();
  };

  return (
    <div>
      <NavigationBar
        actionGoBack={goBackClick}
        titleBar="Create"
        status=""
        listButton={listButton}
      />
      {/* content */}
      <div className="wrapper space-top">
        <div className="shadow wrapper-content">
          <div className="mt-3">
            <div className="title-heading mt-2">
              <span>Select Location</span>
            </div>
            <div className="mt-3">
              <button
                class="btn btn-outline-secondary"
                type="button"
                // data-bs-target="#ListLocationstModal"
                // data-bs-toggle="modal"
                onClick={showModal}
              >
                Search More...
              </button>
              {/* <button
                  className="btn btn-outline-secondary"
                  type="button"
                  onClick={showToast}
                >
                  Toast
                </button> */}
            </div>
          </div>
        </div>
        {isLoading ? (
          <>
            <div className="shadow wrapper-content mt-3">
              <button
                className="btn btn-secondary"
                onClick={onAddCheckItemClick}
              >
                Add
              </button>
              <button
                className="btn btn-secondary"
                onClick={clickDeleteCheckItems}
              >
                Discard
              </button>
              <Table
                keyField="id"
                data={listCheckedItems}
                columns={columns}
                cellEdit={cellEditFactory({
                  mode: "click",
                  blurToSave: true,
                })}
                // selectRow={selectRow}
              />
            </div>
          </>
        ) : (
          <SpinnerComponent />
        )}
      </div>
      {/* <AddMultiple /> */}
      <ListLocationsModal
        modalRef={modalRef}
        hideModal={hideModal}
        listLocations={listLocationsStore}
        handleOnSelect={handleOnSelect}
        onSelectLocationClick={onSelectLocationClick}
      />

      <ToastComponent toastRef={toastRef} hideToast={hideToast} />
    </div>
  );
}
