import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import moment from "moment";
import BootstrapTable from "react-bootstrap-table-next";
import cellEditFactory, { Type } from "react-bootstrap-table2-editor";
import Swal from "sweetalert2";

//css
import "../sale-man.css";
//components
// import Table from "../../list-products-table/ListProductsTable";
import {
  getPRDetailsAction,
  submitAction,
  updateAction,
  deletePRAction,
} from "./action";
import SearchComponent from "../../search-component/SearchComponent";
import NavigationBar from "../../components/navbar/navbar-component";

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
  const [isReturnData, setIsReturnData] = useState(false);
  const [status,setStatus] = useState('')
  //todo: declare button
  const columnsEdit = [
    {
      dataField: "productVariantId",
      hidden: true,
    },
    {
      dataField: "name",
      text: "Product Name",
      editable: false,
    },
    { dataField: "unit", text: "Unit", editable: false },
    {
      dataField: "orderQuantity",
      text: "Order Quantity",
      formatter: (cellContent, row, rowIndex) =>
        (cleanListProducts[rowIndex].orderQuantity = row.orderQuantity),
      validator: (newValue, oldValue, row) => {
        if (isNaN(newValue)) {
          return {
            valid: false,
            message: "Quantity should be numeric",
          };
        }
      },
    },
    // { dataField: "price", text: "Price", editable: false },
    // {
    //   dataField: "totalAmount",
    //   text: "Total Amount",
    //   editable: false,
    //   formatter: (cellContent, row, rowIndex) => (
    //     <div>
    //       <span>{cleanListProducts[rowIndex].orderQuantity * row.price}</span>
    //     </div>
    //   ),
    // },
    {
      dataField: "name",
      text: "Action",
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

  const columnsShow = [
    {
      dataField: "productVariantId",
      hidden: true,
    },
    {
      dataField: "name",
      text: "Product Name",
      // editable: false,
    },
    {
      dataField: "unit",
      text: "Unit",
      //  editable: false
    },
    {
      dataField: "orderQuantity",
      text: "Order Quantity",
      // formatter: (cellContent, row, rowIndex) =>
      //   (purchaseOrderProduct[rowIndex].orderQuantity = row.orderQuantity),
      // validator: (newValue, oldValue, row) => {
      //   if (isNaN(newValue)) {
      //     return {
      //       valid: false,
      //       message: "Quantity should be numeric",
      //     };
      //   }
      // },
    },
    // {
    //   dataField: "price",
    //   text: "Price",
    //   //  editable: false
    // },
    // {
    //   dataField: "totalAmount",
    //   text: "Total Amount",
    //   // editable: false,
    //   // formatter: (cellContent, row, rowIndex) => (
    //   //   <div>
    //   //     <span>
    //   //       {purchaseOrderProduct[rowIndex].orderQuantity * row.price}
    //   //     </span>
    //   //   </div>
    //   // ),
    // },
  ];

  const {
    statusStore,
    listGetProductsStore,
    token,
    deadlineStore,
    transactionRecordStore,
  } = useSelector((state) => ({
    statusStore:
      state.getDetailsPurchaseRequisitionReducer.purchaseRequisitionDetails
        .purchaseOrderStatus,
    listGetProductsStore:
      state.getDetailsPurchaseRequisitionReducer.purchaseRequisitionDetails
        .purchaseOrderProduct,
    token: state.client.token,
    deadlineStore:
      state.getDetailsPurchaseRequisitionReducer.purchaseRequisitionDetails
        .deadline,
    transactionRecordStore:
      state.getDetailsPurchaseRequisitionReducer.purchaseRequisitionDetails
        .transaction.transactionRecord,
  }));
  console.log(transactionRecordStore);
  function goBackClick() {
    history.goBack();
  }

  function goToManagerPage() {
    history.push("/homepage/sale-man/");
  }

  function onSubmitClick(event) {
    dispatch(
      submitAction({ id: location.state.purchaseRequisitionId, token: token })
    );
  }

  function onEditClick() {
    setIsEditDisabled(!isEditDisabled);
    setDeadline(deadlineStore);
  }

  function onCancelClick() {
    console.log(cleanListProducts);
    console.log(listGetProductsStore);
    setIsEditDisabled(!isEditDisabled);
    // setIsCancel(true);
    //reset
    setCleanListProducts(
      listGetProductsStore.map((product) => {
        // product.name = product.productVariant.name;
        // delete product["productVariant"];
        // return product;
        return {
          name: product.productVariant.name,
          productVariantId: product.productVariantId,
          orderQuantity: product.orderQuantity,
          unit: product.unit,
          price: product.price,
          discountAmount: product.discountAmount,
          totalAmount: product.totalAmount,
        };
      })
    );

    setDeadline(deadlineStore);
    setIsCancel(!isCancel);
  }

  function onDeletePRClick() {
    const data = {
      id: location.state.purchaseRequisitionId,
      cancelReason: "Delete purchase requisition status 0",
    };
    dispatch(deletePRAction({ data: data, token: token }));
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
      totalAmount: 1,
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
      // supplierId: "50715",
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
  function clickDeleteCheckItems(rowIndex) {
    // console.log(rowIndex);
    if (cleanListProducts.length === 1)
      Swal.fire({
        title: "Error",
        text: "Do not let list product empty",
        icon: "error",
        showCancelButton: true,
        cancelButtonText: "Cancel",
        showConfirmButton: false,
      });
    else {
      setCleanListProducts((state) => state.filter((_, i) => i !== rowIndex));
    }
  }
  // function onChangeValueProduct(event) {
  //   setCleanListProducts(
  //     cleanListProducts.map((element, index) =>
  //       index == event.target.id
  //         ? {
  //             ...element,
  //             [event.target.name]: event.target.value,
  //             totalAmount:
  //               [event.target.name] === "orderQuantity"
  //                 ? event.target.value * element.price
  //                 : event.target.value * element.orderQuantity,
  //           }
  //         : element
  //     )
  //   );
  // }

  const listButtons = setListButtonNav(status);

  function setListButtonNav(status) {
    if (status === 0) {
      if (isEditDisabled) {
        return [
          {
            isShow: true,
            title: "Delete",
            action: () => onDeletePRClick(),
            class: "btn-danger",
          },
          {
            isShow: true,
            title: "Edit",
            action: () => onEditClick(),
            class: "btn-warning text-white",
          },
          {
            isShow: true,
            title: "Submit",
            action: () => onSubmitClick(),
            class: "btn-primary",
          },
        ];
      } else {
        return [
          {
            isShow: true,
            title: "Cancel",
            action: () => onCancelClick(),
            class: "btn-secondary",
          },
          {
            isShow: true,
            title: "Update",
            action: () => onclickUpdate(),
            class: "btn-primary",
          },
        ];
      }
    } else return [];
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
    if (listGetProductsStore.length > 0) {
      setCleanListProducts(
        listGetProductsStore.map((product) => {
          return {
            name: product.productVariant.name,
            productVariantId: product.productVariantId,
            orderQuantity: product.orderQuantity,
            unit: product.unit,
            price: product.price,
            discountAmount: product.discountAmount,
            totalAmount: product.totalAmount,
          };
        })
      );
      setIsReturnData(true);
    }
  }, [listGetProductsStore]);
  console.log(listGetProductsStore);
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
      dispatch(
        getPRDetailsAction({
          id: location.state.purchaseRequisitionId,
          token: token,
        })
      );
    }
  }, [message]);

  return (
    <div>
      <NavigationBar
        listButton={listButtons}
        titleBar={location.state.purchaseRequisitionId}
        actionGoBack={goBackClick}
        status=""
      />
      <div className="wrapper space-top">
        <div class="card">
          <div class="card-header fw-bold">Purchase Requisition Details</div>
          <ul class="list-group list-group-flush">
            <li class="list-group-item">
              <div className="row g-3 justify-content-between me-3">
                <div className="col-4">
                  <p>
                    <strong>Created by:</strong>
                    {/* {createdBy} */}
                    {transactionRecordStore[0].applicationUser.fullname}
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
                    {/* {createDate.split("T")[0]} */}
                    {moment(transactionRecordStore[0].date).format(
                      "DD-MM-YYYY HH:mm"
                    )}
                  </p>
                  <p>
                    <strong>Deadline:</strong>
                    {moment(deadlineStore).format("DD-MM-YYYY HH:mm")}
                  </p>
                  {/* <p>
                    <strong>Submit date:</strong> 05/12/2021
                </p>
                <p>
                    <strong>Adjust date:</strong> 05/21/2021
                </p> */}
                </div>
              </div>
            </li>
            <li class="list-group-item">
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
                {isEditDisabled ? (
                  <BootstrapTable
                    keyField="productVariantId"
                    data={cleanListProducts}
                    columns={columnsShow}
                    noDataIndication="Table is Empty"
                  />
                ) : (
                  <BootstrapTable
                    keyField="productVariantId"
                    data={cleanListProducts}
                    columns={columnsEdit}
                    noDataIndication="Table is Empty"
                    cellEdit={cellEditFactory({
                      mode: "click",
                      blurToSave: true,

                      afterSaveCell: (oldValue, newValue, row, column) => {
                        row.totalAmount = row.orderQuantity * row.price;
                      },
                    })}
                  />
                )}
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
