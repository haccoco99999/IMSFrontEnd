import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";

//css
import "../product.css";
//components
import ListPackageTable from "../../table-receipt/ListReceiptsTable";
import { getDetailsVariant } from "./action";

export default function VariantDetails() {
  let history = useHistory();
  let location = useLocation();
  let dispatch = useDispatch();

  const [isDisabled, setIsDisabled] = useState(true);
  const [variant, setVariant] = useState({});
  const [listPackage, setListPackage] = useState([]);
  const [isReturnData, setIsReturnData] = useState(false);
  const [listColumn, setListColumn] = useState({
    id: true,
    quantity: true,
    price: true,
    totalPrice: true,
    location: true,
  });

  const [listHeaderEdit, setListEditHeader] = useState({
    id: "Package ID",
  });

  const { variantStore, listPackageStore, token } = useSelector((state) => ({
    variantStore: state.getDetailsProductReducer.productVariant,
    listPackageStore: state.getDetailsProductReducer.productVariant.packages,
    token: state.client.token,
  }));
  console.log(variantStore);
  console.log(listPackageStore);
  function goBackClick() {
    history.goBack();
  }

  useEffect(() => {
    dispatch(getDetailsVariant({ id: location.state.variantId, token: token }));
  }, []);

  useEffect(() => {
    if (variantStore !== {}) setVariant(variantStore);
    if (listPackageStore !== null) {
      setIsReturnData(true);
      setListPackage(listPackageStore);
    }
  }, [variantStore, listPackageStore]);

  return (
    <div className="overflow-scroll">
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
                //     onClick={onClickEdit}
              >
                Edit
              </button>
            ) : (
              <button
                className="btn btn-secondary button-tab text-white button me-3"
                //   onClick={onClickCancel}
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
          <div className="title-heading mt-2">
            <span>Variant Details </span>
          </div>
          <div className="mt-3">
            <div className="row g-3 justify-content-between me-3">
              <div className="col-4">
                <p>
                  <strong>Variant ID:</strong>
                  {variant.id}
                </p>
                <p>
                  <strong>Product ID:</strong>
                  {variant.productId}
                </p>
                <p>
                  <strong>Name:</strong>
                  {variant.name}
                </p>
                <p>
                  <strong>SKU:</strong>
                  {variant.sku}
                </p>
                <p>
                  <strong>Barcode:</strong>
                  {variant.barcode}
                </p>
              </div>
              <div className="col-4">
                <p>
                  <strong>Quantity:</strong>
                  {variant.storageQuantity}
                </p>
                <p>
                  <strong>Price:</strong>
                  {variant.price}
                </p>
                <p>
                  <strong>Total Price:</strong>
                  {variant.cost}
                </p>
              </div>
            </div>
          </div>
        </div>
        {isReturnData && (
          <div className="wrapper-content shadow">
            <div className="title-heading mt-2">
              <span>Package </span>
            </div>
            <div className="mt-3">
              <ListPackageTable
                listHeaderEdit={listHeaderEdit}
                listColumn={listColumn}
                listData={listPackage}
                // onRowClick={onClickToDetails}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
