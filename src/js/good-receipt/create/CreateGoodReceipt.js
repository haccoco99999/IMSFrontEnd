import React, { useState, useEffect, useReducer, useRef } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Modal } from "bootstrap";
//css
import "../goodreceipt.css";
// import NavigationBar from "../../navigation-bar-component/NavigationBar";
import NavigationBar from "../../stock-take/components/navbar-component";
//component
import {
  getConfirmedPOAction,
  getConfirmedPODetailsAction,
  setCreateingGRRequestAction,
  getAllLocationsAction,
} from "./action";
import Table from "../../list-products-table/ListProductsTable";
import ListLocationsModal from "../../stock-take/create/search-location-modal";

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

  const [list_BuyingProduct, setList_BuyingProduct] = useState(null);

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

  //todo: function Nav button
  const listButton = setListButtonNav();

  function setListButtonNav() {
    return [
      //   {
      //   isShow:true,
      //   title: "Cancel",
      //   action:()=>
      //   class:"btn-danger",
      // },
      {
        isShow: true,
        title: "Save",
        action: () => saveGoodsReceipt(),
        class: "btn-primary",
      },
    ];
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

  function goBackClick() {
    history.goBack();
  }

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

  function onChangeValueProduct(event) {
    console.log(event.target.id + " ");
    setList_BuyingProduct((state) =>
      state.map((element, index) =>
        index == event.target.id
          ? { ...element, [event.target.name]: event.target.value }
          : element
      )
    );
    console.log(event.target.value);
  }

  function saveGoodsReceipt() {
    const Data = {
      purchaseOrderNumber: formData.orderid,
      locationId: selectedLocation.id,
      updateItems: list_BuyingProduct.map((product) => {
        return {
          productVariantId: product.productVariantId,
          quantityReceived: product.orderQuantity,
          sku: product.sku,
          barcode: product.barcode,
        };
      }),
    };

    dispatch(setCreateingGRRequestAction({ data: Data, token: token }));
  }

  const handleChangeValue = (event) => {
    event.preventDefault();
    setIsChange(true);
    setFormData({
      name: event.target.name,
      value: event.target.value,
    });
    dispatch(
      getConfirmedPODetailsAction({ id: event.target.value, token: token })
    );
  };

  //filter
  const suppliers = list_ConfirmPurchaseOrderID
    .filter((item) => item.id === formData.orderid)
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
    setList_BuyingProduct(list_BuyingProductStore);
  }, [list_BuyingProductStore]);
  return (
    <div>
      {/* 
        <div className=" tab-fixed container-fluid  fixed-top">
          <div className=" d-flex mb-3 justify-content-end mt-4 ">
            <a className="me-2" onClick={goBackClick}>
              <h3>Back</h3>
            </a>
            <h2 className="id-color fw-bold me-auto">Create Goods Receipt</h2>
            <div>
              <button className="btn btn-danger me-3 button-tab">Cancel</button>

              <button
                onClick={saveGoodsReceipt}
                className="btn btn-primary me-3 text-white button-tab "
              >
                Save
              </button>
            </div>
          </div>
        </div> */}
      <NavigationBar
        listButton={listButton}
        titleBar="Create "
        actionGoBack={goBackClick}
        status=""
      />

      {/* content */}
      <div className="wrapper space-top">
        <div className="shadow wrapper-content">
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
            {/* Details  */}
            <div className="mt-3">
              {isChange && (
                <>
                  <p>
                    <strong>Supplier:</strong> {suppliers.supplierName}
                  </p>
                  <p>
                    <strong>Email:</strong> {suppliers.supplierEmail}
                  </p>
                  <p>
                    <strong>Phone No:</strong> {suppliers.supplierPhone}
                  </p>
                </>
              )}
            </div>
          </form>
        </div>

        {isChange && (
          <div className="shadow wrapper-content mt-3">
            <div className="mt-3">
              <label class="form-label" value="">
                Select Location
              </label>
              {/* <input
                type="text"
                class="form-control"
                name="storageLocation"
                value={formData.storageLocation || ""}
              /> */}
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
        )}
      </div>
      <ListLocationsModal
        modalRef={modalRef}
        hideModal={hideModal}
        listLocations={listLocationsStore}
        handleOnSelect={handleOnSelectLocation}
        onSelectLocationClick={onSelectLocationClick}
      />
    </div>
  );
}
