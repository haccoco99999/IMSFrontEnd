import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";

//css
import "../product.css";
//components
import { getDetailsProductAction, updateProductAction } from "./action";
import ListProductsTable from "../../table-receipt/ListReceiptsTable";

export default function ProductDetails() {
  let history = useHistory();
  let location = useLocation();
  let dispatch = useDispatch();

  const { productDetailsStore, messages, token, listVariantsStores } =
    useSelector((state) => ({
      token: state.client.token,
      productDetailsStore: state.getDetailsProductReducer.productDetails,
      message: state.getDetailsProductReducer.messages,
      listVariantsStores:
        state.getDetailsProductReducer.productDetails.productVariants,
      // brandStore: state.getDetailsProductReducer.product.brand,
    }));
  console.log(productDetailsStore);
  console.log(productDetailsStore.brand);
  console.log(listVariantsStores);
  const [isFromManagerPage, setIsFromManagerPage] = useState(true);
  const [listVariants, setListVariants] = useState([]);
  const [isReturnData, setIsReturnData] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);
  const [productDetails, setProductDetails] = useState({});
  // const [listVariants, setListVariants] = useState([]);

  const [listColumn, setListColumn] = useState({
    id: true,
    name: true,
    sku: true,
    barcode: true,
    unit: true,
    storageQuantity: true,
    price: true,
    cost: true,
  });

  const [listEditHeader, setListEditHeader] = useState({
    id: "VariantID",
  });

  function onClickEdit() {
    setIsDisabled(false);
  }
  function onClickCancel() {
    setIsDisabled(true);
  }
  function goBackClick() {
    history.goBack();
  }

  function goToManagerPage() {
    history.push("/homepage/product");
  }
  function onClickToDetails(row) {
    history.push("/homepage/product/details/variant", {
      variantId: row.id,
    });
  }
  useEffect(() => {
    dispatch(
      getDetailsProductAction({ id: location.state.productId, token: token })
    );
  }, []);

  useEffect(() => {
    if (productDetailsStore !== {}) {
      setProductDetails(productDetailsStore);
    }
  }, [productDetailsStore]);

  useEffect(() => {
    if (listVariantsStores !== null) {
      setIsReturnData(true);
      setListVariants(listVariantsStores);
      setListVariants(
        listVariants.map((variant) => {
          delete variant["packages"];
          return variant;
        })
      );
    }
  }, [listVariantsStores]);
  console.log(listVariants);
  return (
    <>
      <div className=" tab-fixed container-fluid  fixed-top">
        <div className=" d-flex mb-3 justify-content-end mt-4 ">
          <a className="me-2" onClick={goBackClick}>
            <h3>Back</h3>
          </a>
          <h2 className="id-color fw-bold me-auto">Details</h2>
          <div>
            {/* <button
              className="btn btn-danger button-tab text-white button me-3"
              onClick={onClickDelete}
            >
              Delete
            </button> */}
            {isDisabled ? (
              <button
                className="btn btn-warning button-tab text-white button me-3"
                onClick={onClickEdit}
              >
                Edit
              </button>
            ) : (
              <button
                className="btn btn-secondary button-tab text-white button me-3"
                onClick={onClickCancel}
              >
                Cancel
              </button>
            )}

            <button
              className="btn btn-primary button-tab button me-3"
              disabled={isDisabled}
              //     onClick={onClickSave}
            >
              Save
            </button>
          </div>
        </div>
      </div>
      {/* content */}
      <div className="wrapper space-top">
        <div className="wrapper-content shadow">
          {/* Show info */}

          <div className="row g-3 justify-content-between me-3">
            <div className="col-4">
              <p>
                <strong>Product ID:</strong> {productDetails.id}
              </p>
              <p>
                <strong>Name:</strong>{" "}
                {isDisabled ? (
                  productDetails.name
                ) : (
                  <input
                    type="text"
                    className="form-control"
                    value={productDetails.name}
                  />
                )}
              </p>
              {!productDetails.isVariantType && (
                <>
                  <p>
                    <strong>Barcode:</strong>
                  </p>
                  <p>
                    <strong>Storage Quantity:</strong>
                  </p>
                </>
              )}

              <div class="form-check">
                <input
                  class="form-check-input"
                  type="checkbox"
                  value={""}
                  name="isVariantType"
                  checked={productDetails.isVariantType}
                  disabled={isDisabled}
                />
                <label class="form-check-label" for="flexCheckDefault">
                  <strong>Products has many attribute</strong>
                </label>
              </div>
            </div>
            <div className="col-4">
              <p>
                <strong>Brand:</strong>
                {/* {isDisabled ? (
                  productDetails.brand.brandName
                ) : (
                  <input
                    type="text"
                    className="form-control"
                    value={productDetails.brand.brandName}
                  />
                )} */}
              </p>
              <p>
                <strong>Category:</strong> {productDetails.category}
              </p>
              {!productDetails.isVariantType && (
                <>
                  <p>
                    <strong>SKU:</strong>
                  </p>
                  <p>
                    <strong>Price:</strong>
                  </p>
                </>
              )}
            </div>
          </div>
        </div>

        <div className="wrapper-content shadow mt-3">
          {/* Show info */}

          <div className="row g-3 justify-content-between me-3">
            <label for="supplierName" class="form-label">
              List variants
            </label>
            {isReturnData && (
              <ListProductsTable
                // clickToAddProduct={listVariantsStores}
                // onChangeValueProduct={onChangeValueProduct}
                listHeaderEdit={listEditHeader}
                listColumn={listColumn}
                listData={listVariantsStores}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
}
