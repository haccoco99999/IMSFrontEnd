import React, { useState, useEffect, useReducer } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

//css
import "../goodreceipt.css";
// import NavigationBar from "../../navigation-bar-component/NavigationBar";

//component
import Table from "../../list-products-table/ListProductsTable";
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
  let history = useHistory();
  let dispatch = useDispatch();

  const [formData, setFormData] = useReducer(formReducer, {});
  const [isChange, setIsChange] = useState(false);
  const [storageLocation, setStorageLocation] = useState("");

  // const [purchasedOrderGoodsReceive, setPurchasedOrderGoodsReceive] = useState(
  //   []
  // );

  // const [fakeData, setFakeData] = useState({
  //   purchaseOrderNumber: formData.orderid,
  //   storageLocation: storageLocation,
  //   updateItems: list_BuyingProduct
  // });



  const list_ConfirmPurchaseOrderID = useSelector(
    (state) =>
      state.getAllConfirmedPurchaseOrderReducer.listConfirmedPurchaseOrder
  );

  const list_BuyingProductStore = useSelector(
    (state) =>
      state.getAllConfirmedPurchaseOrderReducer.listProducts
        .purchaseOrderProduct
  );

  const [list_BuyingProduct, setList_BuyingProduct] = useState(null);

  useEffect(() => {
    setList_BuyingProduct(list_BuyingProductStore);
  }, [list_BuyingProductStore]);
  console.log(list_BuyingProduct);

  const message = useSelector(
    (state) => state.getAllConfirmedPurchaseOrderReducer.messages
  );
  // console.log("list_BuyingProduct", list_BuyingProduct);

  const [listValueColumn, setListValueColumn] = useState([
    {
      productVariantId: "ID",
    },
    {
      name: "Product Name",
    },
    {
      orderQuantity: "Quantity",
      input: true,
    },
  ]);

  const [listEditHeader, setListEditHeader] = useState({
    // id: "Goods Receipt ID",
  });

  function goBackClick() {
    history.goBack();
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
      storageLocation: storageLocation,
      updateItems: list_BuyingProduct.map((product) => {
        return {
          productVariantId: product.productVariantId,
          quantityReceived: product.orderQuantity,
        };
      }),
    };

    dispatch(setCreateingGRRequestAction({ data: Data }));
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

    if (message !== "") {
      history.push("/homepage/good-receipt/details", {
        goodsreceiptId: message,
        fromPage: "CreatePage",
      });
    }
  }, [message]);

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
                // disabled={false}
                onChangeValueProduct={onChangeValueProduct}
                //       disabled={this.state.isShowEdit}

                // onChangeValueProduct={this.onChangeValueProduct}
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
