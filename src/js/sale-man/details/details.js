import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import moment from "moment";
//css
import "../sale-man.css";
//components
import Table from "../../list-products-table/ListProductsTable";
import {
  getPRDetailsAction,
  submitAction,
  updateAction,
  deletePRAction,
} from "./action";
import SearchComponent from "../../search-component/SearchComponent";

export default function details() {
  let history = useHistory();
  let dispatch = useDispatch();
  let location = useLocation();
  const [isFromManagerPage, setIsFromManagerPage] = useState(true);
  const [isEditDisabled, setIsEditDisabled] = useState(true);
  const [deadline, setDeadline] = useState("");
  const [isCancel, setIsCancel] = useState(false);

  const message = useSelector(
    (state) => state.getDetailsPurchaseRequisitionReducer.messages
  );

  const [cleanListProducts, setCleanListProducts] = useState([]);
  const [listProductReset, setListProductReset] = useState(cleanListProducts);

  const [listValueColumn, setListColumn] = useState([
    {
      productVariantId: "Product Id",
    },
    {
      name: "Product Name",
    },
    {
      orderQuantity: "Order Quantity",
      input: true,
    },
    {
      price: "Price",
    },
  ]);

  const {
    status,
    createdBy,
    createDate,
    listGetProductsStore,
    token,
    deadlineStore,
  } = useSelector((state) => ({
    status:
      state.getDetailsPurchaseRequisitionReducer.purchaseRequisitionDetails
        .purchaseOrderStatus,
    createdBy:
      state.getDetailsPurchaseRequisitionReducer.purchaseRequisitionDetails
        .transaction.createdBy.userName,
    createDate:
      state.getDetailsPurchaseRequisitionReducer.purchaseRequisitionDetails
        .transaction.createdDate,
    listGetProductsStore:
      state.getDetailsPurchaseRequisitionReducer.purchaseRequisitionDetails
        .purchaseOrderProduct,
    token: state.client.token,
    deadlineStore:
      state.getDetailsPurchaseRequisitionReducer.purchaseRequisitionDetails
        .deadline,
  }));

  function goBackClick() {
    history.goBack();
  }

  function goToManagerPage() {
    history.push("/homepage/sale-man/");
  }

  function onSubmitClick(event) {
    event.preventDefault();
    dispatch(
      submitAction({ id: location.state.purchaseRequisitionId, token: token })
    );
  }

  function onEditClick() {
    setIsEditDisabled(!isEditDisabled);
    setDeadline(deadlineStore);
  }

  function onCancelClick() {
    setIsEditDisabled(!isEditDisabled);
    setIsCancel(true);
    setCleanListProducts(listGetProductsStore);
    setDeadline(deadlineStore);
    setIsCancel(!isCancel);
  }

  function onDeletePRClick() {
    dispatch(
      deletePRAction({ id: location.state.purchaseRequisitionId, token: token })
    );
  }

  function clickToAddProduct(productRaw) {
    let product = {
      id: productRaw.productId,
      orderId: "",
      productVariantId: productRaw.id,
      orderQuantity: 1,
      unit: productRaw.unit,
      price: productRaw.price,
      discountAmount: 0,
      totalAmount: productRaw.price * 1,
      name: productRaw.name,
    };
    setCleanListProducts([...cleanListProducts, product]);
  }
  function clickDeleteProduct(id) {
    setCleanListProducts(
      cleanListProducts.filter((element) => element.productVariantId !== id)
    );
  }
  function onChangeDeadline(event) {
    setDeadline(moment.utc(event.target.value).format());
  }

  function onclickUpdate() {
    const data = {
      requisitionId: location.state.purchaseRequisitionId,
      deadline: deadline,
      orderItems: cleanListProducts.map((product) => {
        return {
          productVariantId: product.productVariantId,
          orderQuantity: product.orderQuantity,
          unit: product.unit,
          price: product.price,
          discountAmount: product.discountAmount,
          totalAmount: product.totalAmount,
        };
      }),
    };

    dispatch(updateAction({ data: data, token: token }));
  }

  function onChangeValueProduct(event) {
    setCleanListProducts(
      cleanListProducts.map((element, index) =>
        index == event.target.id
          ? {
              ...element,
              [event.target.name]: event.target.value,
              totalAmount:
                [event.target.name] === "orderQuantity"
                  ? event.target.value * element.price
                  : event.target.value * element.orderQuantity,
            }
          : element
      )
    );
  }
  useEffect(() => {
    dispatch(
      getPRDetailsAction({
        id: location.state.purchaseRequisitionId,
        token: token,
      })
    );
    // check tu page nao toi

    if (location.state.fromPage !== "ManagerPage") {
      setIsFromManagerPage(false);
    }
  }, []);

  useEffect(() => {
    if (listGetProductsStore !== null) {
      if (listGetProductsStore !== []) {
        setCleanListProducts(
          listGetProductsStore.map((product) => {
            product.name = product.productVariant.name;
            delete product["productVariant"];
            return product;
          })
        );
      }
    }
  }, [listGetProductsStore]);

  useEffect(() => {
    if (message === "Submit Success") {
      dispatch(
        getPRDetailsAction({
          id: location.state.purchaseRequisitionId,
          token: token,
        })
      );
    } else if (message === "Update Success") {
      dispatch(
        getPRDetailsAction({
          id: location.state.purchaseRequisitionId,
          token: token,
        })
      );
    } else if (message === "Delete Success") {
      getPRDetailsAction({
        id: location.state.purchaseRequisitionId,
        token: token,
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
            {isFromManagerPage ? (
              <a className="me-2" onClick={goBackClick}>
                <h3>Back</h3>
              </a>
            ) : (
              <a className="me-2" onClick={goToManagerPage}>
                <h3>ManagerPage</h3>
              </a>
            )}

            <div class="me-auto">
              <h2 class="id-color fw-bold">
                {location.state.purchaseRequisitionId}
              </h2>
              <div class="form-text id-color">{status}</div>
            </div>
            {status === 0 && (
              <div>
                {isEditDisabled ? (
                  <>
                    <button
                      type="button"
                      className="btn btn-danger button-tab me-3 text-white"
                      onClick={onDeletePRClick}
                    >
                      Delete
                    </button>
                    <button
                      type="button"
                      className="btn btn-warning button-tab me-3 text-white"
                      onClick={onEditClick}
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={onSubmitClick}
                      className="btn btn-primary me-3 text-white button-tab "
                    >
                      Submit
                    </button>
                  </>
                ) : (
                  <>
                    {" "}
                    <button
                      type="button"
                      className="btn btn-secondary button-tab me-3 text-white"
                      onClick={onCancelClick}
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      onClick={onclickUpdate}
                      className="btn btn-primary me-3 text-white button-tab "
                    >
                      Update
                    </button>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="wrapper space-top">
        <div className="wrapper-content shadow">
          {/* Show info */}

          <div className="row g-3 justify-content-between me-3">
            <div className="col-4">
              <p>
                <strong>Created by:</strong> {createdBy}
              </p>
              {/* <p>
                    <strong>Submitted by:</strong> Huy Nguyen{" "}
                </p>
                <p>
                    <strong>Adjusted by:</strong> Mr. Hung
                </p> */}
            </div>
            <div className="col-4">
              <p>
                <strong>Create date:</strong>
                {createDate.split("T")[0]}
              </p>
              {/* <p>
                    <strong>Submit date:</strong> 05/12/2021
                </p>
                <p>
                    <strong>Adjust date:</strong> 05/21/2021
                </p> */}
            </div>
          </div>
        </div>
        <div className="wrapper-content shadow mt-3">
          {!isEditDisabled && (
            <>
              <div className="mt-2">
                <label for="deadline" class="form-label">
                  Deadline
                </label>
                <input
                  type="datetime-local"
                  name="deadline"
                  defaultValue={deadline}
                  class="form-control"
                  onChange={onChangeDeadline}
                />
              </div>
              <div className="mt-2">
                <label for="deadline" class="form-label">
                  Search
                </label>
                <SearchComponent clickToAddProduct={clickToAddProduct} />
              </div>
            </>
          )}
          <div className="mt-2">
            <Table
              clickToAddProduct={clickToAddProduct}
              listColumn={listValueColumn}
              listData={cleanListProducts}
              disabled={isEditDisabled}
              clickDeleteProduct={clickDeleteProduct}
              onChangeValueProduct={onChangeValueProduct}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
