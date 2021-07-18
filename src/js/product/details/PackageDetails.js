import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";

//css
import "../product.css";
//components
import ListPackageTable from "../../table-receipt/ListReceiptsTable";
import { getDetailsPackageAction } from "./action";

export default function PackageDetails() {
  let history = useHistory();
  let dispatch = useDispatch();
  let location = useLocation();

  const {
    token,
    packageDetailsStore,
    supplierDetailsStore,
    goodsReceiptDetailsStore,
    productVariantStore,
    locationStore,
  } = useSelector((state) => ({
    token: state.client.token,
    packageDetailsStore: state.getDetailsProductReducer.package,
    supplierDetailsStore: state.getDetailsProductReducer.package.supplier,
    goodsReceiptDetailsStore:
      state.getDetailsProductReducer.package.goodsReceiptOrder,
    productVariantStore: state.getDetailsProductReducer.package.productVariant,
    locationStore: state.getDetailsProductReducer.package.location,
  }));
  console.log(packageDetailsStore);
  console.log(supplierDetailsStore);
  console.log(goodsReceiptDetailsStore);

  function goBackClick() {
    history.goBack();
  }

  useEffect(() => {
    dispatch(
      getDetailsPackageAction({
        id: location.state.packageId,
        token: token,
      })
    );
  }, []);
  return (
    <div>
      {/* todo: task heading */}
      {/* todo: gop chung 2 page voi 2 nut khâc nhau  */}
      <div className=" tab-fixed container-fluid  fixed-top">
        {/* todo: task heading */}
        <div className=" tab-fixed container-fluid  fixed-top">
          <div className=" d-flex mb-3 justify-content-end mt-4 ">
            <a className="me-2" onClick={goBackClick}>
              <h3>Back</h3>
            </a>
            <div class="me-auto">
              <h2 class="id-color fw-bold">{packageDetailsStore.id}</h2>
              {/* <div class="form-text id-color">Stock take complete</div> */}
            </div>
          </div>
        </div>
      </div>

      <div className="wrapper space-top">
        <div className="wrapper-content shadow">
          <nav>
            <div class="nav nav-tabs" id="nav-tab" role="tablist">
              <button
                class="nav-link active"
                id="nav-home-tab"
                data-bs-toggle="tab"
                data-bs-target="#nav-home"
                type="button"
                role="tab"
                aria-controls="nav-home"
                aria-selected="true"
              >
                General Information
              </button>
              <button
                class="nav-link"
                id="nav-profile-tab"
                data-bs-toggle="tab"
                data-bs-target="#nav-profile"
                type="button"
                role="tab"
                aria-controls="nav-profile"
                aria-selected="false"
              >
                Goods Receipt
              </button>
              <button
                class="nav-link"
                id="nav-location-tab"
                data-bs-toggle="tab"
                data-bs-target="#nav-location"
                type="button"
                role="tab"
                aria-controls="nav-location"
                aria-selected="false"
              >
                Location
              </button>
              <button
                class="nav-link"
                id="nav-contact-tab"
                data-bs-toggle="tab"
                data-bs-target="#nav-contact"
                type="button"
                role="tab"
                aria-controls="nav-contact"
                aria-selected="false"
              >
                Supplier
              </button>
            </div>
          </nav>
          <div class="tab-content" id="nav-tabContent">
            <div
              class="tab-pane fade show active"
              id="nav-home"
              role="tabpanel"
              aria-labelledby="nav-home-tab"
            >
              <div className="wrapper-content shadow mt-3">
                {/* Show info */}
                <div className="title-heading mt-2">
                  <span>Package Details</span>
                </div>
                <div className="row g-3 justify-content-between me-3">
                  <div className="col-4">
                    <p>
                      <strong>ID:</strong> {packageDetailsStore.id}
                    </p>
                    <p>
                      <strong>Price:</strong> {packageDetailsStore.price}
                    </p>
                    <p>
                      <strong>Total Price:</strong>{" "}
                      {packageDetailsStore.totalPrice}
                    </p>
                    <p>
                      <strong>Imported Date:</strong>{" "}
                      {packageDetailsStore.importedDate.split("T")[0]}
                    </p>
                  </div>
                  <div className="col-4">
                    <p>
                      <strong>Product ID:</strong>{" "}
                      {productVariantStore.productId}
                    </p>
                    <p>
                      <strong>Variant ID</strong> {productVariantStore.id}
                    </p>
                    <p>
                      <strong>Variant name:</strong> {productVariantStore.name}
                    </p>
                    <p>
                      <strong>SKU:</strong> {productVariantStore.sku}
                    </p>
                    <p>
                      <strong>Barcode:</strong> {productVariantStore.barcode}
                    </p>
                    <p>
                      <strong>Unit:</strong>
                      {productVariantStore.unit}
                    </p>
                    <p>
                      <strong>Actual Quantity:</strong>{" "}
                      {packageDetailsStore.quantity}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div
              class="tab-pane fade"
              id="nav-profile"
              role="tabpanel"
              aria-labelledby="nav-profile-tab"
            >
              <div className="wrapper-content shadow mt-3">
                {/* Show info */}
                <div className="title-heading mt-2">
                  <span>Goods Receipt Order Details</span>
                </div>
                <div className="row g-3 justify-content-between me-3">
                  <div className="col-4">
                    <p>
                      <strong>Goods Receipt ID:</strong>{" "}
                      {goodsReceiptDetailsStore.id}
                    </p>
                    <p>
                      <strong>Purchase Order Id</strong>{" "}
                      {goodsReceiptDetailsStore.purchaseOrderId}
                    </p>
                    <p>
                      <strong>Received Date</strong>{" "}
                      {goodsReceiptDetailsStore.receivedDate.split("T")[0]}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div
              class="tab-pane fade"
              id="nav-contact"
              role="tabpanel"
              aria-labelledby="nav-contact-tab"
            >
              <div className="wrapper-content shadow mt-3">
                {/* Show info */}
                <div className="title-heading mt-2">
                  <span>Supplier Details</span>
                </div>
                <div className="row g-3 justify-content-between me-3">
                  <div className="col-4">
                    <p>
                      <strong>Supplier ID:</strong> {supplierDetailsStore.id}
                    </p>
                    <p>
                      <strong>Received From:</strong>{" "}
                      {supplierDetailsStore.supplierName}
                    </p>
                    <p>
                      <strong>Seller Name:</strong>{" "}
                      {supplierDetailsStore.salePersonName}
                    </p>
                  </div>
                  <div className="col-4">
                    <p>
                      <strong>Email:</strong> {supplierDetailsStore.email}
                    </p>
                    <p>
                      <strong>Phone</strong> {supplierDetailsStore.phoneNumber}
                    </p>
                    <p>
                      <strong>Address:</strong> {supplierDetailsStore.address}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div
              class="tab-pane fade"
              id="nav-location"
              role="tabpanel"
              aria-labelledby="nav-location-tab"
            >
              <div className="wrapper-content shadow mt-3">
                <div className="title-heading mt-2">
                  <span>Location </span>
                </div>
                <div className="row g-3 justify-content-between me-3">
                  <div className="col-4">
                    <p>
                      <strong>Location ID:</strong>
                      {locationStore.id}
                    </p>
                    <p>
                      <strong>Location Barcode:</strong>
                      {locationStore.locationBarcode}
                    </p>
                    <p>
                      <strong>Location Name:</strong>
                      {locationStore.locationName}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <AdjustInventory /> */}
    </div>
  );
}
