import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import moment from "moment";
//css
import "../product.css";
//components
import { getDetailsPackageAction } from "./action";
import { RESET } from "./constants";
import NavigationBar from "../../components/navbar/navbar-component";
import { InfoOrderLoader, TableLoading } from "../../components/loading/loading-component";
import { parseNumberToPrice } from '../../helper/parsePrice'
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
    gePackageReducer,
  } = useSelector((state) => ({
    token: state.client.token,
    packageDetailsStore: state.gePackageReducer.package,
    supplierDetailsStore: state.gePackageReducer.package.supplier,
    goodsReceiptDetailsStore: state.gePackageReducer.package.goodsReceiptOrder,
    // productVariantStore: state.gePackageReducer.package.productVariant,
    locationStore: state.gePackageReducer.package.location,
    gePackageReducer: state.gePackageReducer,
  }));
  // console.log(packageDetailsStore);
  // console.log(supplierDetailsStore);
  // console.log(goodsReceiptDetailsStore);

  const [isReturnData, setIsReturnData] = useState(false);

  function goBackClick() {
    // history.goBack(-1);
    if (location.state.isHavingRequestSKU)
      history.push("/homepage/product/details/variant", {
        variantId: location.state.variantId,
        productId: location.state.productId,
        variantType: location.state.variantType,
        skuRequest: location.state.skuRequest,
        isHavingRequestSKU: true,
      });
    else
      history.push("/homepage/product/details/variant", {
        variantId: location.state.variantId,
        productId: location.state.productId,
        variantType: location.state.variantType,
        isHavingRequestSKU: false,
      });
  }

  const listButtons = setListButtonNav();
  function setListButtonNav() {
    return [];
  }

  useEffect(() => {
    dispatch(
      getDetailsPackageAction({
        id: location.state.packageId,
        token: token,
      })
    );
    return () => {
      dispatch({ type: RESET });
    };
  }, []);

  useEffect(() => {
    if (gePackageReducer.successful) setIsReturnData(true);
  }, [gePackageReducer]);
  return (
    <div>
     
        <>
          <NavigationBar
            listButton={listButtons}
            titleBar="Package details"
            actionGoBack={goBackClick}
            status=""
            home="Product"
            currentPage="Product details"
            level3={true}
            level3Page="Variant details"
            level4={true}
            level4Page="Package details"
          />
          <div className="wrapper mb-3">
            <div class="card">
              <div class="card-header fw-bold">Package Information</div>
              {isReturnData ? 

              <ul class="list-group list-group-flush">
                <li class="list-group-item">
                  <h5 class="card-title fw-bold"> General Information</h5>
                  <div className="row g-3 justify-content-between me-3">
                    <div className="col-4">
                      <p>
                        <strong>ID: </strong> {packageDetailsStore.id}
                      </p>

                      <p>
                        <strong>Quantity: </strong>
                        {packageDetailsStore.quantity}
                      </p>
                    </div>
                    <div className="col-4">
                      <p>
                        <strong>Unit Price: </strong> { parseNumberToPrice(packageDetailsStore.price) +" VND" }
                      </p>
                      <p>
                        <strong>Total Price: </strong>{" "}
                        {parseNumberToPrice(packageDetailsStore.totalPrice) +" VND"}
                      </p>
                    </div>
                  </div>
                </li>
                <li class="list-group-item">
                  <h5 class="card-title fw-bold"> Goods Receipt</h5>
                  <div className="row g-3 justify-content-between me-3">
                    <div className="col-4">
                      <p>
                        <strong>Goods Receipt ID: </strong>
                        {packageDetailsStore.goodsReceiptOrderId}
                      </p>

                      <p>
                        <strong>Imported Date: </strong>
                        {moment(packageDetailsStore.importedDate)
                          .add(7, "h")
                          .format("DD/MM/YYYY")}
                      </p>
                    </div>
                  </div>
                </li>
                <li class="list-group-item">
                  <h5 class="card-title fw-bold"> Supplier Information</h5>
                  <div className="row g-3 justify-content-between me-3">
                    <div className="col-4">
                      {/* <p>
                        <strong>Supplier ID:</strong> {supplierDetailsStore.id}
                      </p> */}
                      <p>
                        <strong>Received From: </strong>{" "}
                        {supplierDetailsStore.supplierName}
                      </p>
                      <p>
                        <strong>Seller Name: </strong>{" "}
                        {supplierDetailsStore.salePersonName}
                      </p>
                    </div>
                    <div className="col-4">
                      <p>
                        <strong>Email: </strong> {supplierDetailsStore.email}
                      </p>
                      <p>
                        <strong>Phone: </strong>{" "}
                        {supplierDetailsStore.phoneNumber}
                      </p>
                      <p>
                        <strong>Address: </strong> {supplierDetailsStore.address}
                      </p>
                    </div>
                  </div>
                </li>
                <li class="list-group-item">
                  <h5 class="card-title fw-bold"> Location Information</h5>
                  <div className="row g-3 justify-content-between me-3">
                    <div className="col-4">
                      <p>
                        <strong>Location ID: </strong>
                        {locationStore.id}
                      </p>
                      <p>
                        <strong>Location Barcode: </strong>
                        {locationStore.locationBarcode}
                      </p>
                      <p>
                        <strong>Location Name: </strong>
                        {locationStore.locationName}
                      </p>
                    </div>
                  </div>
                </li>
              </ul> : <InfoOrderLoader row={30}/> }
            </div>
          </div>
        </>
  
    </div>
  );
}
