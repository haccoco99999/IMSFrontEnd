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
import RejectWrapper from "../../components/reject-wrapper/reject-component";
import NavigationBar from "../../components/navbar/navbar-component";
import { InfoPurchaseOrderLoader, TableLoading } from "../../components/loading/loading-component";
import { CLEAR_MESSAGE } from "./constants";
import FormAddProductModal from "../../components/add-product-form/FormAddProductModal";

export default function PurchaseRequisitionDetails() {
  let history = useHistory();
  let dispatch = useDispatch();
  let location = useLocation();
  const [reject, setReject] = useState({});
  const [isEditDisabled, setIsEditDisabled] = useState(true);
  const [deadline, setDeadline] = useState("");
  const [isCancel, setIsCancel] = useState(false);
  // const message = useSelector(
  //   (state) => state.getDetailsPurchaseRequisitionReducer.messages
  // );

  const [cleanListProducts, setCleanListProducts] = useState([]);
  const [returnData, setIsReturnData] = useState(false);
  const [status, setStatus] = useState("");
  const [classStatus, setClassStatus] = useState("");
  const [eventPage, setEventPage] = useState({
    isShowAddProduct: false,
  });
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
      (cleanListProducts[rowIndex].orderQuantity = parseInt(
        row.orderQuantity
      )),
      validator: (newValue, oldValue, row) => {
        if (isNaN(newValue)) {
          return {
            valid: false,
            message: "Quantity should be numeric",
          };
        } else {
          if (newValue < 0)
            return {
              valid: false,
              message: "Quantity should be bigger than 0",
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
          <div
            className="text-danger btn"
            onClick={() => clickDeleteCheckItems(rowIndex)}
          >
            <i class="bi bi-trash"></i>
          </div>

          // <button
          //   type="button"
          //   className="btn btn-danger"
          //   onClick={() => clickDeleteCheckItems(rowIndex)}
          // >
          //   Delete
          // </button>
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
    },
    {
      dataField: "unit",
      text: "Unit",
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
    getDetailsPurchaseRequisitionReducer,
    submitDraftReducer,
    updatePRReducer,
    deletePRReducer,
    transactionRecordCompacts,
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
    getDetailsPurchaseRequisitionReducer:
      state.getDetailsPurchaseRequisitionReducer,
    submitDraftReducer: state.submitDraftReducer,
    updatePRReducer: state.updatePRReducer,
    deletePRReducer: state.deletePRReducer,
    transactionRecordCompacts:
      state.getDetailsPurchaseRequisitionReducer.purchaseRequisitionDetails
        .transaction.transactionRecordCompacts,
  }));
  function goBackClick() {
    history.replace("/homepage/sale-man");
    // history.push("/homepage/sale-man");
  }

  function goToManagerPage() {
    history.push("/homepage/sale-man/");
  }

  function onSubmitClick(event) {
    Swal.fire({
      title: "Are you sure",
      text: "Do you want to submit?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: " #d33",
      confirmButtonText: "Confirm",
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(
          submitAction({
            id: location.state.purchaseRequisitionId,
            token: token,
          })
        );
      }
    });
  }

  function onEditClick() {
    setIsEditDisabled(!isEditDisabled);
    setDeadline(deadlineStore);
  }

  function onCancelClick() {
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

    Swal.fire({
      title: "Are you sure",
      text: "Do you want to delete this?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: " #d33",
      confirmButtonText: "Confirm",
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deletePRAction({ data: data, token: token }));
      }
    });
  }

  // function clickToAddProduct(productRaw) {
  //   let product = {
  //     id: productRaw.productId,
  //     orderId: "",
  //     productVariantId: productRaw.id,
  //     orderQuantity: 1,
  //     unit: productRaw.unit,
  //     price: productRaw.price,
  //     discountAmount: 0,
  //     totalAmount: 1,
  //     name: productRaw.name,
  //   };
  //   setCleanListProducts([...cleanListProducts, product]);
  // }

  function clickToAddProduct(product) {
    // console.log(product);
    if (checkProductExist(product.productVariantId)) {
      setCleanListProducts((state) =>
        state.map((item) =>
          item.productVariantId === product.productVariantId
            ? {
              ...item,
              orderQuantity: item.orderQuantity + product.orderQuantity,
            }
            : item
        )
      );
    } else {
      setCleanListProducts((state) => [...state, product]);
    }

    clickSetShowAddProductPage();
  }
  function checkProductExist(productVariantId) {
    return cleanListProducts.some(
      (product) => product.productVariantId === productVariantId
    );
  }

  // function clickDeleteProduct(id) {
  //   setCleanListProducts(
  //     cleanListProducts.filter((element) => element.productVariantId !== id)
  //   );
  // }
  function isDataInputEmpty(array) {
    const checkQuantity = (element) => element.orderQuantity === 0;
    return array.some(checkQuantity);
  }
  function onChangeDeadline(event) {
    setDeadline(moment.utc(event.target.value).format());
  }

  function onclickUpdate() {
    if (cleanListProducts.length === 0) {
      Swal.fire({
        title: "Error",
        text: "You need to select product",
        icon: "error",
        showCancelButton: true,
        cancelButtonText: "Cancel",
        showConfirmButton: false,
      });
    } else {
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
      if (isDataInputEmpty(cleanListProducts)) {
        Swal.fire({
          title: "Error",
          text: "Please input your order quantity bigger than zero",
          icon: "error",
          showCancelButton: true,
          cancelButtonText: "Cancel",
          showConfirmButton: false,
        });
      } else
        Swal.fire({
          title: "Are you sure",
          text: "Do you want to update?",
          icon: "question",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: " #d33",
          confirmButtonText: "Confirm",
          reverseButtons: true,
        }).then((result) => {
          if (result.isConfirmed) {
            dispatch(updateAction({ data: data, token: token }));
          }
        });
    }
  }
  function clickDeleteCheckItems(rowIndex) {
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

  const listButtons = setListButtonNav(statusStore);

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
            title: "Revert",
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

    return () => {
      dispatch({ type: CLEAR_MESSAGE });
    };
    // check tu page nao toi

    // if (location.state.fromPage !== "ManagerPage") {
    //   setIsFromManagerPage(false);
    // }
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
    }
  }, [listGetProductsStore]);

  useEffect(() => {
    if (getDetailsPurchaseRequisitionReducer.successful) {
      setIsReturnData(true);
    }
    //  else if (getDetailsPurchaseRequisitionReducer.errors === true) {
    // }
  }, [getDetailsPurchaseRequisitionReducer]);

  useEffect(() => {
    if (submitDraftReducer.requesting === true) {
      Swal.fire({
        title: "Progressing",
        html: "Waiting...",
        timerProgressBar: true,
        didOpen: () => {
          Swal.showLoading();
        },
      });
    } else if (submitDraftReducer.successful === true) {
      Swal.fire({
        icon: "success",
        title: "Your work has been saved",
        showCancelButton: false,
        confirmButtonColor: "#3085d6",
      }).then((result) => {
        if (result.isConfirmed) {
          dispatch(
            getPRDetailsAction({
              id: location.state.purchaseRequisitionId,
              token: token,
            })
          );
        }
      });
    } else if (submitDraftReducer.errors === true) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Something went wrong!",
        showCancelButton: false,
        confirmButtonColor: "#3085d6",
      });
    }
  }, [submitDraftReducer]);

  useEffect(() => {
    if (updatePRReducer.requesting) {
      Swal.fire({
        title: "Progressing",
        html: "Waiting...",
        timerProgressBar: true,
        didOpen: () => {
          Swal.showLoading();
        },
      });
    } else if (updatePRReducer.successful) {
      Swal.fire({
        icon: "success",
        title: "Your work has been saved",
        showCancelButton: false,
        confirmButtonColor: "#3085d6",
      }).then((result) => {
        if (result.isConfirmed) {
          dispatch(
            getPRDetailsAction({
              id: location.state.purchaseRequisitionId,
              token: token,
            })
          );
          setIsEditDisabled(true);
        }
      });
    } else if (updatePRReducer.errors) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Something went wrong!",
        showCancelButton: false,
        confirmButtonColor: "#3085d6",
      });
    }
  }, [updatePRReducer]);

  useEffect(() => {
    if (deletePRReducer.requesting) {
      Swal.fire({
        title: "Progressing",
        html: "Waiting...",
        timerProgressBar: true,
        didOpen: () => {
          Swal.showLoading();
        },
      });
    } else if (deletePRReducer.successful) {
      Swal.fire({
        icon: "success",
        title: "Your work has been saved",
        showCancelButton: false,
        confirmButtonColor: "#3085d6",
      }).then((result) => {
        if (result.isConfirmed) {
          dispatch(
            getPRDetailsAction({
              id: location.state.purchaseRequisitionId,
              token: token,
            })
          );
        }
      });
    } else if (deletePRReducer.errors) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Something went wrong!",
        showCancelButton: false,
        confirmButtonColor: "#3085d6",
      });
    }
  }, [deletePRReducer]);
  function clickSetShowAddProductPage() {
    setEventPage((state) => {
      return { ...state, isShowAddProduct: !state.isShowAddProduct };
    });
  }
  useEffect(() => {
    if (statusStore === 0) {
      setStatus("Draft");
      setClassStatus("bg-secondary");
    } else if (statusStore === 6) {
      setStatus("Confirmed");
      setClassStatus("bg-success");
    } else if (statusStore === 7) {
      setStatus("Done");
      setClassStatus("primary");
    } else if (statusStore < 0) {
      setStatus("Canceled");
      setClassStatus("bg-danger");
      setReject(transactionRecordCompacts.pop());
    } else {
      setStatus("Waiting confirm");
      setClassStatus("bg-warning text-dark");
    }
  }, [statusStore]);
  return (
    <div>

      <NavigationBar
        listButton={listButtons}
        titleBar={location.state.purchaseRequisitionId}
        actionGoBack={goBackClick}
        status={status}
        home="Purchase requisition"
        currentPage="Purchase requisition details"
        classStatus={classStatus}
      />
      <div className="wrapper">
        <div class="card">
          <div class="card-header fw-bold">
            Purchase Requisition Details
          </div>

          <ul class="list-group list-group-flush">
            {returnData ? <>
              {statusStore < 0 && (
                <li className="list-group-item">
                  <RejectWrapper
                    name={transactionRecordStore[0].applicationUser.fullname}
                    email={transactionRecordStore[0].applicationUser.email}
                    phoneNumber={
                      transactionRecordStore[0].applicationUser.phoneNumber
                    }
                    reason={reject.transactionName}
                    date={moment(reject.date)
                      .add(7, "h")
                      .format("DD-MM-YYYY")}
                  />
                </li>
              )}

              <li class="list-group-item">
                <div className="row g-3 justify-content-between me-3">
                  <div className="col-4">
                    <p>
                      <strong>Created by:</strong>
                      {/* {createdBy} */}
                      {transactionRecordStore[0].applicationUser.fullname}
                    </p>

                  </div>
                  <div className="col-4">
                    <p>
                      <strong>Created date: </strong>
                      {/* {createDate.split("T")[0]} */}
                      {moment(
                        transactionRecordStore[0].date.split("T")[0]
                      ).format("DD-MM-YYYY")}
                    </p>
                    <p>
                      <strong>Deadline: </strong>
                      {moment(deadlineStore).format("DD-MM-YYYY")}
                    </p>

                  </div>
                </div>
              </li> </>
              : <InfoPurchaseOrderLoader />}

            <div class="card-header fw-bold">
              Product List
            </div>
            { returnData?<>
            < li class="list-group-item">

            {!isEditDisabled && (
              <>
                <li class="list-group-item">
                  <div class="form-group col-md-4">
                    <label for="">Deadline</label>
                    <input
                      type="date"
                      name="deadline"
                      id="deadline"
                      class="form-control"
                      value={moment(deadline).format("YYYY-MM-DD")}
                      onChange={onChangeDeadline}
                    />
                  </div>

                  <div className="mt-2">
                    <button
                      onClick={() => clickSetShowAddProductPage()}
                      type="button"
                      class="btn btn-outline-secondary"
                    >
                      Add product
                    </button>
                  </div>

                  {eventPage.isShowAddProduct ? (
                    <FormAddProductModal
                      clickSetShowAddProductPage={
                        clickSetShowAddProductPage
                      }
                      clickToAddProduct={clickToAddProduct}
                    // addGroupProduct={addGroupProduct}
                    />
                  ) : (
                    ""
                  )}
                  {/* <SearchComponent clickToAddProduct={clickToAddProduct} /> */}
                </li>
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
             </> : <InfoPurchaseOrderLoader/>}
          </ul>
    </div>
      </div >


    </div >
  );
}
