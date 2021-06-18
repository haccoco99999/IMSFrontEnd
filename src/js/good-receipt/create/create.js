import React, { useState, useEffect, useReducer } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

//css
import "../goodreceipt.css";
// import NavigationBar from "../../navigation-bar-component/NavigationBar";

//component
import Table from "../../table-receipt/ListReceiptsTable";
import {
  getConfirmedPOAction,
  getConfirmedPODetailsAction,
  setCreateingGRRequestAction,
} from "./action";

const formReducer = (state, event) => {
  return {
    ...state,
    [event.name]: event.value,
  };
};

export default function () {
  const [formData, setFormData] = useReducer(formReducer, {});
  const [isChange, setIsChange] = useState(false);

  const [fakeData, setFakeData] = useState({
    purchaseOrderNumber: "POK6GM0KJC",
    updateItems: [
      {
        productVariantId: "44319",
        quantityReceived: 18,
      },
      { productVariantId: "44687", quantityReceived: 25 },
    ],
  });

  let history = useHistory();
  let dispatch = useDispatch();

  const list_ConfirmPurchaseOrderID = useSelector(
    (state) =>
      state.getAllConfirmedPurchaseOrderReducer.listConfirmedPurchaseOrder
  );

  const list_BuyingProduct = useSelector(
    (state) =>
      state.getAllConfirmedPurchaseOrderReducer.listProducts
        .purchaseOrderProduct
  );
  // console.log("list_BuyingProduct", list_BuyingProduct);

  const [listValueColumn, setListValueColumn] = useState({
    id: true,
    name: true,
    orderQuantity: true,
  });

  const [listEditHeader, setListEditHeader] = useState({
    // id: "Goods Receipt ID",
  });

  function goBackClick() {
    history.goBack();
  }

  function saveGoodsReceipt() {
    dispatch(setCreateingGRRequestAction({ data: fakeData }));
  }

  const handleChangeValue = (event) => {
    event.preventDefault();
    setIsChange(true);
    setFormData({
      name: event.target.name,
      value: event.target.value,
    });
    dispatch(getConfirmedPODetailsAction({ id: event.target.value }));
  };


  //filter
  const suppliers = list_ConfirmPurchaseOrderID
    .filter((item) => item.id === formData.orderid)
    .shift();

  useEffect(() => {
    dispatch(getConfirmedPOAction());
  }, []);

  return (
    <div>
      {/* todo: task heading */}
      {/* todo: gop chung 2 page voi 2 nut khâc nhau  */}
      <div className=" tab-fixed container-fluid  fixed-top">
        {/* todo: task heading */}
        <div className=" tab-fixed container-fluid  fixed-top">
          <div className=" d-flex mb-3 justify-content-end mt-4 ">
            {/* testing */}
            <a className="me-2" onClick={goBackClick}>
              <h3>Back</h3>
            </a>
            {/* title */}
            <h2 className="id-color fw-bold me-auto">Create Goods Receipt</h2>
            {/* list button */}
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
        </div>

        {/* content */}
        <div className="wrapper space-top">
          <div className="shadow wrapper-content">
            <form>
              <div className="mt-3">
                {/* search */}
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
            <div className="mt-3">
              <Table
                listHeaderEdit={listEditHeader}
                listColumn={listValueColumn}
                listData={list_BuyingProduct}
                // onRowClick={}
                // backPagingClick={}
                // nextPagingClick={}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
