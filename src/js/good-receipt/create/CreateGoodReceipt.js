import React, { useState, useEffect, useReducer, useRef } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Modal } from "bootstrap";
import BootstrapTable from "react-bootstrap-table-next";
import cellEditFactory, { Type } from "react-bootstrap-table2-editor";
import Swal from "sweetalert2";
//css
import "../goodreceipt.css";
//component
import {
  getConfirmedPOAction,
  getConfirmedPODetailsAction,
  setCreateingGRRequestAction,
  getAllLocationsAction,
} from "./action";
import Table from "../../list-products-table/ListProductsTable";
import ListLocationsModal from "../../stock-take/create/search-location-modal";
import NavigationBar from "../../components/navbar/navbar-component";
import ListPurchaseConfirmModal from "../components/purchase-accept-component";
const formReducer = (state, event) => {
  return {
    ...state,
    [event.name]: event.value,
  };
};

export default function CreateGoodsReceiptComponent() {
  let history = useHistory();
  let dispatch = useDispatch();

  const [formData, setFormData] = useReducer(formReducer, {});
  const [isChange, setIsChange] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState({
    id: "",
    locationName: "",
    locationBarcode: "",
  });
  const [selectedPO, setSelectedPO] = useState("");

  const {
    list_ConfirmPurchaseOrderID,
    list_BuyingProductStore,
    token,
    messages,
    listLocationsStore,
  } = useSelector((state) => ({
    token: state.client.token,
    list_ConfirmPurchaseOrderID:
      state.getAllConfirmedPurchaseOrderReducer.listConfirmedPurchaseOrder,
    list_BuyingProductStore:
      state.getAllConfirmedPurchaseOrderReducer.listProducts
        .purchaseOrderProduct,
    messages: state.getAllConfirmedPurchaseOrderReducer.messages,
    listLocationsStore: state.getAllConfirmedPurchaseOrderReducer.listLocations,
  }));

  const [list_BuyingProduct, setList_BuyingProduct] = useState([]);

  const [listValueColumn, setListValueColumn] = useState([
    { id: "ID" },
    {
      productId: "Product ID",
    },
    {
      productVariantId: "Variant ID",
    },
    {
      name: "Product Name",
    },
    { sku: "SKU", input: "true" },
    { barcode: "Barcode", input: "true" },
    {
      orderQuantity: "Quantity",
      input: true,
    },
  ]);

  const [listEditHeader, setListEditHeader] = useState({
    // id: "Goods Receipt ID",
  });

  const columns = [
    {
      dataField: "id",
      text: "ID",
      hidden: true,
    },
    { dataField: "productId", text: "Product ID", editable: false },
    {
      dataField: "productVariantId",
      text: "Variant ID",
      editable: false,
    },
    {
      dataField: "name",
      text: "Name",
      editable: false,
    },
    { dataField: "sku", text: "SKU", editable: true },
    {
      dataField: "barcode",
      text: "Barcode",
      editable: true,
    },
    {
      dataField: "orderQuantity",
      text: "Ordered",
      editable: false,
    },
    {
      dataField: "received",
      text: "Received",
      editable: true,
      validator: (newValue, oldValue, row) => {
        if (isNaN(newValue)) {
          return {
            valid: false,
            message: "Sale price should be numeric",
          };
        }
      },
      formatter: (cellContent, row, rowIndex) =>
        (list_BuyingProduct[rowIndex].received = row.received),
    },
    {
      dataField: "id",
      text: "Action",
      editable: false,
      formatter: (cellContent, row, rowIndex) => {
        return (
          <button
            type="button"
            className="btn btn-danger"
            onClick={() => clickDeleteVariant(rowIndex)}
          >
            Delete
          </button>
        );
      },
      
    },
  ];

  //todo: function Nav button
  const listButton = setListButtonNav();

  function setListButtonNav() {
    return [
      {
        isShow: true,
        title: "Save",
        action: () => saveGoodsReceipt(),
        class: "btn-primary",
      },
    ];
  }

  //todo:modal location declare
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
  //todo: modal po confirm modal
  const modalPO = useRef();
  const showModalPO = () => {
    const modalEle = modalPO.current;
    const bsModal = new Modal(modalEle, {
      backdrop: "static",
      keyboard: false,
    });
    bsModal.show();
  };
  const hideModalPO = () => {
    const modalEle = modalPO.current;
    const bsModal = Modal.getInstance(modalEle);
    bsModal.hide();
  };

  function handleOnSelectLocation(row, isSelect) {
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

  function onSelectLocationClick() {
    hideModal();
    console.log("Data dang search:", selectedLocation.id);
    // dispatch(getListPackageAction({ token: token, id: selectedLocation.id }));
  }

  function handleOnSelectPO(row, isSelect) {
    if (isSelect) {
      setSelectedPO(row.id);
    }
  }

  function onSelectPOClick() {
    hideModalPO();
    setIsChange(true);
    dispatch(getConfirmedPODetailsAction({ id: selectedPO, token: token }));
  }

  //todo: function
  function goBackClick() {
    history.goBack();
  }

  function clickDeleteVariant(rowIndex) {
    // console.log(rowIndex);
    // console.log(variantValues);
    // console.log((state) => state.filter((_, i) => i !== rowIndex));

    setList_BuyingProduct((state) => state.filter((_, i) => i !== rowIndex));
  }

  // function onChangeValueProduct(event) {
  //   console.log(event.target.id + " ");
  //   setList_BuyingProduct((state) =>
  //     state.map((element, index) =>
  //       index == event.target.id
  //         ? { ...element, [event.target.name]: event.target.value }
  //         : element
  //     )
  //   );
  //   console.log(event.target.value);
  // }

  function isDataInputEmpty(array) {
    const check1 = (element) => element.sku === "";
    const check2 = (element) => element.barcode === "";
    if (array.some(check1) || array.some(check2))
      return true;
    return false;
  }

  function saveGoodsReceipt() {
    if (selectedPO === "" || selectedLocation.id === "") {
      Swal.fire({
        title: "Error",
        text: "You need to fulfill data",
        icon: "error",
        showCancelButton: true,
        cancelButtonText: "Cancel",
        showConfirmButton: false,
      });
    } else {
      if (isDataInputEmpty(list_BuyingProduct)) {
        Swal.fire({
          title: "Error",
          text: "Please input barcode and sku",
          icon: "error",
          showCancelButton: true,
          cancelButtonText: "Cancel",
          showConfirmButton: false,
        });
      } else {
        const Data = {
          purchaseOrderNumber: selectedPO,
          locationId: selectedLocation.id,
          updateItems: list_BuyingProduct.map((product) => {
            return {
              productVariantId: product.productVariantId,
              quantityReceived: product.received,
              sku: product.sku,
              barcode: product.barcode,
            };
          }),
        };
        console.log(Data);
        dispatch(setCreateingGRRequestAction({ data: Data, token: token }));
      }
    }
  
  }

  // const handleChangeValue = (event) => {
  //   event.preventDefault();
  //   setIsChange(true);
  //   setFormData({
  //     name: event.target.name,
  //     value: event.target.value,
  //   });
  //   dispatch(
  //     getConfirmedPODetailsAction({ id: event.target.value, token: token })
  //   );
  // };


  function onClickDiscard(){
    
  }

  //@params: suppliers get details suppliers
  const suppliers = list_ConfirmPurchaseOrderID
    .filter((item) => item.id === selectedPO)
    .shift();

  useEffect(() => {
    dispatch(getConfirmedPOAction({ token: token }));
    dispatch(getAllLocationsAction({ token: token }));

    if (messages !== "") {
      history.push("/homepage/good-receipt/details", {
        goodsreceiptId: messages,
        fromPage: "CreatePage",
      });
    }
  }, [messages]);

  useEffect(() => {
    if (list_BuyingProductStore.length > 0) {
      setList_BuyingProduct(
        list_BuyingProductStore.map((product) => {
          return {
            id: product.id,
            name: product.productVariant.name,
            productId: product.productVariant.productId,
            productVariantId: product.productVariantId,
            orderQuantity: product.orderQuantity,
            sku: product.productVariant.sku,
            barcode: product.productVariant.barcode,
            received: 0,
          };
        })
      );
    }
  }, [list_BuyingProductStore]);
  return (
    <div>
      <NavigationBar
        listButton={listButton}
        titleBar="Create "
        actionGoBack={goBackClick}
        status=""
      />

      <div className="wrapper space-top">
        <div className="card">
          <h5 className="card-header fw-bold">Goods Receipt Information</h5>
          <ul class="list-group list-group-flush">
            <li class="list-group-item">
              <button
                class="btn btn-outline-secondary"
                type="button"
                onClick={showModalPO}
              >
                Select Purchase Order
              </button>
              {/* <div className="row g-3">
                <div class="col-auto">
                  <label for="search" class="form-label">
                    Purchase Order ID
                  </label>
                </div>
                <div class="input-group mb-3">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="eg. PO000001"
                    aria-label="eg. PO000001"
                    aria-describedby="button-addon2"
                    value=""
                  />
                  <button class="btn btn-outline-secondary" type="button"
                  onClick={showModalPO}
                  >
                    Search More
                  </button>
                </div>
              </div> */}
            </li>

            {isChange && (
              <li class="list-group-item">
                <p>
                  <strong>Purchase Order:</strong> {selectedPO}
                </p>
                <p>
                  <strong>Supplier:</strong> {suppliers.supplierName}
                </p>
                <p>
                  <strong>Email:</strong> {suppliers.supplierEmail}
                </p>
                <p>
                  <strong>Phone No:</strong> {suppliers.supplierPhone}
                </p>
              </li>
            )}

            <li class="list-group-item">
              {" "}
              <div className="mt-3">
                <BootstrapTable
                  keyField="id"
                  columns={columns}
                  data={list_BuyingProduct}
                  noDataIndication="Table is Empty"
                  cellEdit={cellEditFactory({
                    mode: "click",
                    blurToSave: true,
                  })}
                />
              </div>
            </li>
          </ul>
        </div>

        <div className="card mt-3 me-3">
          <h5 className="card-header fw-bold">Location</h5>
          <ul class="list-group list-group-flush">
            <li class="list-group-item">
              <button
                class="btn btn-outline-secondary"
                type="button"
                onClick={showModal}
              >
                Select Location
              </button>
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
          </ul>
        </div>
        {/* <div className="shadow wrapper-content">
          <form>
            <div className="mt-3">
              <label for="search" class="form-label">
                Purchase Order ID
              </label>
              <select
                name="orderid"
                value={formData.orderid || ""}
                class="form-select"
                aria-label="Default select example"
                onChange={handleChangeValue}
              >
                <option value="" disabled>
                  Select Order ID
                </option>

                {list_ConfirmPurchaseOrderID.map((purchaseOrder) => (
                  <option value={purchaseOrder.id}>{purchaseOrder.id}</option>
                ))}
              </select>
            </div>

            <div className="mt-3"></div>
          </form>
        </div> */}

        {/* {isChange && (
          <div className="shadow wrapper-content mt-3">
            <div className="mt-3">
              <label class="form-label" value="">
                Select Location
              </label>
              <button
                class="btn btn-outline-secondary"
                type="button"
                onClick={showModal}
              >
                Search Location
              </button>
            </div>
            <div className="mt-3">
              <p>
                <strong>Location ID:</strong> {selectedLocation.id}
              </p>
              <p>
                <strong>Location Name:</strong> {selectedLocation.locationName}
              </p>
              <p>
                <strong>Location Barcode:</strong>{" "}
                {selectedLocation.locationBarcode}
              </p>
            </div>
            <div className="mt-3">
              <label class="form-label" value="">
                Products
              </label>
              <Table
                listHeaderEdit={listEditHeader}
                listColumn={listValueColumn}
                listData={list_BuyingProduct}
                onChangeValueProduct={onChangeValueProduct}
              />
            </div>
          </div>
        )} */}
      </div>
      <ListLocationsModal
        modalRef={modalRef}
        hideModal={hideModal}
        listLocations={listLocationsStore}
        handleOnSelect={handleOnSelectLocation}
        onSelectLocationClick={onSelectLocationClick}
      />
      <ListPurchaseConfirmModal
        modalRef={modalPO}
        hideModal={hideModalPO}
        listPOConfirm={list_ConfirmPurchaseOrderID}
        handleOnSelect={handleOnSelectPO}
        onSelectConfirm={onSelectPOClick}
      />
    </div>
  );
}
