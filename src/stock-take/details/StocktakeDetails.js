import React, { useState, useEffect, useRef } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Table from "react-bootstrap-table-next";
import cellEditFactory, { Type } from "react-bootstrap-table2-editor";
import { Modal } from "bootstrap";
import Swal from "sweetalert2";
import moment from "moment";
//css
import "../stocktake.css";
//components
import {
  getDetailsStockTakeAction,
  submitAction,
  rejectAction,
  adjustAction,
  updateAction,
} from "./action";
import { RESET } from "./constants";
import {
  InfoPurchaseOrderLoader,
  TableLoading,
} from "../../components/loading/loading-component";
import NavigationBar from "../../components/navbar/navbar-component";
import RejectModal from "../components/reject-component";
import AdjustModal from "../components/adjust-component";
import RejectWrapper from "../../components/reject-wrapper/reject-component";
export default function StocktakeDetailsComponent() {
  let history = useHistory();
  let dispatch = useDispatch();
  let location = useLocation();

  const [isLoading, setIsLoading] = useState(false);
  const [listCheckedItems, setListCheckedItems] = useState([]);
  const [listCompare, setListCompare] = useState([]);
  const [isChanging, setIsChanging] = useState(false);
  const [titleStatus, setTitleStatus] = useState("");
  //todo: check valid truoc khi submit
  const [isChecking, setIsChecking] = useState(false);
  const [transactionRecordCompacts, setTransactionRecordCompacts] = useState(
    []
  );
  const [applicationUser, setApplicationUser] = useState({});
  const [reject, setReject] = useState({});
  const [classStatus, setClassStatus] = useState("");
  const [showLoader, setShowLoader] = useState(true);
  //todo: store state
  const {
    token,
    role,
    stocktakeDetailsStore,
    groupLocationStore,
    statusStocktakeStore,
    IDStocktakeStore,
    transactionRecordStore,
    updateStocktakeReducer,
    rejectStocktakeReducer,
    adjustStocktakeReducer,
    submitStocktakeReducer,
    pageAuthorized,
  } = useSelector((state) => ({
    token: state.client.token,
    pageAuthorized: state.client.pageAuthorized,
    role: state.client.userRole,
    stocktakeDetailsStore: state.getDetailsStocktakeReducer,
    groupLocationStore:
      state.getDetailsStocktakeReducer.stocktake.groupLocations,
    statusStocktakeStore:
      state.getDetailsStocktakeReducer.stocktake.stockTakeOrderType,
    IDStocktakeStore: state.getDetailsStocktakeReducer.stocktake.id,
    transactionRecordStore:
      state.getDetailsStocktakeReducer.stocktake.transaction,

    updateStocktakeReducer: state.updateStocktakeReducer,
    rejectStocktakeReducer: state.rejectStocktakeReducer,
    adjustStocktakeReducer: state.adjustStocktakeReducer,
    submitStocktakeReducer: state.submitStocktakeReducer,
  }));

  //todo: reject modal declare
  const modalRef = useRef();
  const showRejectModal = () => {
    const modalEle = modalRef.current;
    const bsModal = new Modal(modalEle, {
      backdrop: "static",
      keyboard: false,
    });
    bsModal.show();
  };
  const hideRejectModal = () => {
    const modalEle = modalRef.current;
    const bsModal = Modal.getInstance(modalEle);
    bsModal.hide();
  };
  //todo: adjust modal
  const adjustModal = useRef();
  const showAdjustModal = () => {
    const modalEle = adjustModal.current;
    const bsModal = new Modal(modalEle, {
      backdrop: "static",
      keyboard: false,
    });
    bsModal.show();
  };
  const hideAdjustModal = () => {
    const modalEle = adjustModal.current;
    const bsModal = Modal.getInstance(modalEle);
    bsModal.hide();
  };

  //todo: declare bootstrap table
  const columns = [
    {
      dataField: "pkgId",
      text: "Package Id",
      editable: false,
    },
    {
      // dataField: "package.productVariantId",
      dataField: "sku",
      text: "SKU",
      editable: false,
      // hidden: true,
    },
    {
      //   dataField: "package.productVariant.name",
      dataField: "variantName",
      text: "Name",
      editable: false,
    },
    {
      //   dataField: "package.quantity",
      dataField: "quantity",
      text: "Quantity",
      editable: false,
    },
    {
      dataField: "actualQuantity",
      text: "Counted",
      type: "number",
      editable: true,
      validator: (newValue, oldValue, row) => {
        if (isNaN(newValue)) {
          setIsChecking(true);
          return {
            valid: false,
            message: "Counted should be numeric",
          };
        } else if (newValue < 0) {
          setIsChecking(true);
          return {
            valid: false,
            message: "Counted number should be bigger than 0",
          };
        } else {
          setIsChecking(false);
        }
      },
      formatter: (cellContent, row, rowIndex) =>
        (listCheckedItems[rowIndex].actualQuantity = row.actualQuantity),
    },
    {
      dataField: "note",
      text: "Note",
      editor: {
        type: Type.TEXTAREA,
      },
      formatter: (cellContent, row, rowIndex) =>
        (listCheckedItems[rowIndex].note = row.note),
    },
    {
      dataField: "pkgId",
      text: "Action",
      formatter: (cellContent, row, rowIndex) => (
        // <div>

        //   <button
        //     type="button"
        //     className="btn btn-danger"
        //     onClick={() => clickDeleteCheckItems(rowIndex)}
        //   >
        //     Delete
        //   </button>
        // </div>

        <div
          className="text-danger btn"
          onClick={() => clickDeleteCheckItems(rowIndex)}
        >
          <i class="bi bi-trash"></i>
        </div>
      ),
    },
  ];

  const columnsNotProgressing = [
    {
      dataField: "pkgId",
      text: "Package Id",
      // hidden: true,
    },
    {
      // dataField: "package.productVariantId",
      dataField: "sku",
      text: "SKU",
      // hidden: true,
    },
    {
      //   dataField: "package.productVariant.name",
      dataField: "variantName",
      text: " Name",
    },
    {
      //   dataField: "package.quantity",
      dataField: "quantity",
      text: "Quantity",
    },
    {
      dataField: "actualQuantity",
      text: "Counted",
    },
    {
      dataField: "note",
      text: "Note",
    },
  ];
  //todo: function Nav Button
  const listButton = setListButtonNav(statusStocktakeStore);
  function setListButtonNav(status) {
    if (
      status === 0 &&
      pageAuthorized.includes(status === 0 ? "Progressing" : undefined)
    ) {
      return [
        {
          isShow: true,
          title: "Delete",
          action: () => onDeleteClick(),
          // action: () => testSWAL(),
          class: "btn-danger ",
          // style: {},
        },

        {
          isShow: true,
          title: "Submit",
          action: () => onSubmitClick(),
          // action: () => clicktTest(),
          class: "btn-primary",
          // style: {},
          disabled: isChecking,
        },
      ];
    } else if (
      status === 2 &&
      pageAuthorized.includes(status === 2 ? "AwaitingAdjustment" : undefined)
    ) {
      return [
        {
          isShow: true,
          title: "Reject",
          action: () => showRejectModal(),
          class: "btn-danger",
          // style: {},
        },

        {
          isShow: true,
          title: "Adjust",
          action: () => onAdjustClick(),
          class: "btn-primary",
          // style: {},
        },
      ];
    } else {
      return [];
    }
  }

  //todo: function button
  function goBackClick() {
    history.replace("/homepage/stock-take");
    // history.push("/homepage/stock-take");
  }

  function clickDeleteCheckItems(rowIndex) {
    console.log(rowIndex);
    setListCheckedItems((state) => state.filter((_, i) => i !== rowIndex));

    // console.log("Da xoa:",listCheckedItems)
  }

  function onSaveClick() {
    console.log(listCheckedItems);
    const data = {
      stockTakeGroupLocation: [
        {
          locationId: groupLocationStore[0].location.id,
          checkItems: listCheckedItems.map((checkItem) => {
            return {
              pkgId: checkItem.pkgId,
              productVariantName: checkItem.variantName,
              sku: checkItem.sku,
              storageQuantity: checkItem.quantity,
              actualQuantity: checkItem.actualQuantity,
              note: checkItem.note,
            };
          }),
        },
      ],
      stockTakeId: location.state.stocktakeId,
    };
    console.log("Data Update:", data);

    Swal.fire({
      title: "Are you sure?",
      text: "You want to save this ?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: " #d33",
      confirmButtonText: "Submit",
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(updateAction({ token: token, data: data }));
      }
    });
  }
  function onRejectClick(reason) {
    hideRejectModal();
    const data = {
      stockTakeId: location.state.stocktakeId,
      cancelReason: reason,
    };
    dispatch(rejectAction({ token: token, data: data }));
  }
  // function testSWAL() {

  // }
  function onDeleteClick() {
    const data = {
      stockTakeId: location.state.stocktakeId,
      cancelReason: "Progressing cancel",
    };
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: " #3085d6",
      confirmButtonText: "Delete",
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(rejectAction({ token: token, data: data }));
        // Swal.fire("Deleted!", "Your stocktake has been deleted.", "success");
      }
    });
  }
  function onSubmitClick() {
    const data = {
      id: location.state.stocktakeId,
    };

    // Swal.fire("The Internet?", "That thing is still around?", "question");
    Swal.fire({
      title: "Are you sure?",
      text: "You want to submit",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: " #d33",
      confirmButtonText: "Submit",
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(submitAction({ token: token, data: data }));
        // Swal.fire("Success!", "Your stocktake has been submitted.", "success");
      }
    });
  }
  function onAdjustClick() {
    const data = {
      stockTakeId: location.state.stocktakeId,
    };
    // hideAdjustModal();
    Swal.fire({
      title: "Do you want to adjust inventory?",
      text: "  Inventory balance will change the amount of inventory in the system with the following products",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: " #d33",
      confirmButtonText: "Confirm",
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        // dispatch(createStocktkaeAction({ token: token, data: data }));
        dispatch(adjustAction({ token: token, data: data }));
      }
    });
  }

  //todo: discard the input
  //reset default
  function onRevertClick() {
    Swal.fire({
      title: "Are you sure",
      text: "All your unsaved data will be lost!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: " #d33",
      confirmButtonText: "Confirm",
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        setListCheckedItems(
          groupLocationStore[0].checkItems.map((item) => {
            return {
              pkgId: item.pkgId,
              sku: item.sku,
              variantName: item.productVariantName,
              quantity: item.storageQuantity,
              actualQuantity: item.actualQuantity,
              note: item.note,
            };
          })
        );
      }
    });
  }

  //todo: useEffect
  useEffect(() => {
    dispatch(
      getDetailsStockTakeAction({
        id: location.state.stocktakeId,
        token: token,
      })
    );
    return () => {
      // setShowLoader(true);
      dispatch({ type: RESET });
    };
  }, []);

  useEffect(() => {
    if (groupLocationStore.length > 0 && groupLocationStore[0] !== undefined) {
      setShowLoader(false);
      setIsLoading(true);
      setListCheckedItems(
        groupLocationStore[0].checkItems.map((item) => {
          return {
            pkgId: item.pkgId,
            sku: item.sku,
            variantName: item.productVariantName,
            quantity: item.storageQuantity,
            actualQuantity: item.actualQuantity,
            note: item.note,
          };
        })
      );

      setListCompare(
        groupLocationStore[0].checkItems.map((item) => {
          return {
            pkgId: item.pkgId,
            actualQuantity: item.actualQuantity,
            note: item.note,
            isChanging: false,
          };
        })
      );
    }
  }, [groupLocationStore]);

  useEffect(() => {
    const check = (element) => element.isChanging === true;
    if (listCompare.length > 0) {
      if (listCompare.some(check)) setIsChanging(true);
      else setIsChanging(false);
    }
  }, [listCompare]);
  // console.log()
  // useEffect(() => {
  //   if (messages !== "") {
  //     if (
  //       messages === "Submit Success" ||
  //       messages === "Adjust Success" ||
  //       messages === "Update Success" ||
  //       messages === "Reject Success"
  //     )

  //   }
  // }, [messages]);

  useEffect(() => {
    if (statusStocktakeStore !== "") {
      if (statusStocktakeStore === 0) {
        setTitleStatus("Progressing");
        setClassStatus("bg-primary");
      } else if (statusStocktakeStore === 1) {
        setTitleStatus("Complete");
        setClassStatus("bg-success");
      } else if (statusStocktakeStore === 2) {
        setTitleStatus("Validating");
        setClassStatus("bg-secondary");
      } else if (statusStocktakeStore === -1) {
        setTitleStatus("Cancel");
        setClassStatus("bg-danger");
      }
    }
  }, [statusStocktakeStore]);

  useEffect(() => {
    if (
      // transactionRecordStore.transactionRecord.length > 0 &&
      transactionRecordStore !== undefined
    )
      // setIsLoading(true);
      console.log(transactionRecordStore);
    setTransactionRecordCompacts(
      transactionRecordStore.transactionRecordCompacts
    );

    setApplicationUser(
      transactionRecordStore.transactionRecord[0].applicationUser
    );
    if (statusStocktakeStore === -1)
      setReject(transactionRecordStore.transactionRecordCompacts.pop());

    // setTransactionRecord(transactionRecordStore.transactionRecord);
  }, [transactionRecordStore]);

  useEffect(() => {
    if (rejectStocktakeReducer.requesting === true) {
      Swal.fire({
        title: "Progressing",
        html: "Waiting...",
        timerProgressBar: true,
        didOpen: () => {
          Swal.showLoading();
        },
      });
    } else if (rejectStocktakeReducer.successful === true) {
      Swal.fire({
        icon: "success",
        title: "Your work has been saved",
        showCancelButton: false,
        confirmButtonColor: "#3085d6",
        allowOutsideClick: false,
      }).then((result) => {
        if (result.isConfirmed)
          dispatch(
            getDetailsStockTakeAction({
              id: location.state.stocktakeId,
              token: token,
            })
          );
      });
    } else if (rejectStocktakeReducer.errors === true) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Something went wrong!",
      });
    }
  }, [rejectStocktakeReducer]);

  useEffect(() => {
    if (updateStocktakeReducer.requesting === true) {
      Swal.fire({
        title: "Progressing",
        html: "Waiting...",
        timerProgressBar: true,
        didOpen: () => {
          Swal.showLoading();
        },
      });
    } else if (updateStocktakeReducer.successful === true) {
      Swal.fire({
        icon: "success",
        title: "Your work has been saved",
        showCancelButton: false,
        confirmButtonColor: "#3085d6",
        allowOutsideClick: false,
      }).then((result) => {
        if (result.isConfirmed)
          dispatch(
            getDetailsStockTakeAction({
              id: location.state.stocktakeId,
              token: token,
            })
          );
      });
    } else if (updateStocktakeReducer.errors === true) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Something went wrong!",
      });
    }
  }, [updateStocktakeReducer]);

  useEffect(() => {
    if (adjustStocktakeReducer.requesting === true) {
      Swal.fire({
        title: "Progressing",
        html: "Waiting...",
        timerProgressBar: true,
        didOpen: () => {
          Swal.showLoading();
        },
      });
    } else if (adjustStocktakeReducer.successful === true) {
      Swal.fire({
        icon: "success",
        title: "Quantity has been adjusted",
        showCancelButton: false,
        confirmButtonColor: "#3085d6",
        allowOutsideClick: false,
      }).then((result) => {
        if (result.isConfirmed)
          dispatch(
            getDetailsStockTakeAction({
              id: location.state.stocktakeId,
              token: token,
            })
          );
      });
    } else if (adjustStocktakeReducer.error === true) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Something went wrong!",
      });
    }
  }, [adjustStocktakeReducer]);

  useEffect(() => {
    if (submitStocktakeReducer.requesting === true) {
      Swal.fire({
        title: "Progressing",
        html: "Waiting...",
        timerProgressBar: true,
        didOpen: () => {
          Swal.showLoading();
        },
      });
    } else if (submitStocktakeReducer.successful === true) {
      Swal.fire({
        icon: "success",
        title: "Your work has been submitted",
        showCancelButton: false,
        confirmButtonColor: "#3085d6",
        allowOutsideClick: false,
      }).then((result) => {
        if (result.isConfirmed)
          dispatch(
            getDetailsStockTakeAction({
              id: location.state.stocktakeId,
              token: token,
            })
          );
      });
    } else if (submitStocktakeReducer.error === true) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Something went wrong!",
      });
    }
  }, [submitStocktakeReducer]);
  useEffect(() => {
    if (stocktakeDetailsStore.messages === true) {
    }
  }, [stocktakeDetailsStore]);
  return (
    <div>
      <>
        {statusStocktakeStore === -1 && (
          <NavigationBar
            listButton={listButton}
            titleBar={IDStocktakeStore}
            actionGoBack={goBackClick}
            status={titleStatus}
            home="Stocktake"
            currentPage="Stocktake details "
            classStatus={classStatus}
          />
        )}
        {statusStocktakeStore === 1 && (
          <NavigationBar
            listButton={listButton}
            titleBar={IDStocktakeStore}
            actionGoBack={goBackClick}
            status={titleStatus}
            home="Stocktake"
            currentPage="Stocktake details "
            classStatus={classStatus}
            isShowProgressBarStocktake={true}
            // currentStep={3}
          />
        )}
        {statusStocktakeStore === 2 && (
          <NavigationBar
            listButton={listButton}
            titleBar={IDStocktakeStore}
            actionGoBack={goBackClick}
            status={titleStatus}
            home="Stocktake"
            currentPage="Stocktake details "
            classStatus={classStatus}
            isShowProgressBarStocktake={true}
            currentStep={2}
          />
        )}
        {statusStocktakeStore === 0 && (
          <NavigationBar
            listButton={listButton}
            titleBar={IDStocktakeStore}
            actionGoBack={goBackClick}
            status={titleStatus}
            home="Stocktake"
            currentPage="Stocktake details "
            classStatus={classStatus}
            isShowProgressBarStocktake={true}
            currentStep={1}
          />
        )}

        <div className="wrapper">
          <div class="card">
            <div class="card-header fw-bold">Stocktake Information</div>
            <ul class="list-group list-group-flush">
              {!showLoader ? (
                <li class="list-group-item">
                  {isLoading && statusStocktakeStore === -1 && (
                    <RejectWrapper
                      name={applicationUser.fullname}
                      email={applicationUser.email}
                      phoneNumber={applicationUser.phoneNumber}
                      reason={reject.transactionName}
                      date={moment(reject.date)
                        .add(7, "h")
                        .format("DD-MM-YYYY")}
                    />
                  )}
                  {isLoading && (
                    <div className="row g-3 justify-content-between me-3">
                      <div className="col-4">
                        <p>
                          <strong>Location ID: </strong>
                          {groupLocationStore[0].location.id}
                        </p>
                        <p>
                          <strong>Location Name: </strong>
                          {groupLocationStore[0].location.locationName}
                        </p>
                        <p>
                          <strong>Location Barcode: </strong>
                          {groupLocationStore[0].location.locationBarcode}
                        </p>
                      </div>
                      <div className="col-4">
                        <p>
                          <strong>Created By: </strong>
                          {transactionRecordCompacts[0].user}
                        </p>
                        <p>
                          <strong>Created Date: </strong>
                          {moment(transactionRecordCompacts[0].date)
                            .add(7, "h")
                            .format("DD-MM-YYYY")}
                        </p>
                      </div>
                    </div>
                  )}
                </li>
              ) : (
                <InfoPurchaseOrderLoader />
              )}
              <li class="list-group-item">
                <h5 class="card-title fw-bold mb-3">List checked items</h5>
                {!showLoader ? (
                  <div>
                    {isChanging && (
                      <>
                        <button
                          type="button"
                          class="btn btn-primary"
                          onClick={onSaveClick}
                        >
                          Save
                        </button>
                        <button
                          type="button"
                          class="btn btn-secondary ms-1"
                          onClick={onRevertClick}
                        >
                          Revert
                        </button>
                      </>
                    )}
                    <div className="mt-3">
                      {isLoading &&
                        (statusStocktakeStore === 0 ? (
                          <Table
                            keyField="pkgId"
                            columns={columns}
                            data={listCheckedItems}
                            noDataIndication="Table is Empty"
                            cellEdit={cellEditFactory({
                              mode: "click",
                              blurToSave: true,
                              beforeSaveCell(
                                oldValue,
                                newValue,
                                row,
                                column,
                                done
                              ) {
                                let findEle = listCompare.find(
                                  (e) => e.pkgId === row.pkgId
                                );
                                if (column.dataField === "actualQuantity") {
                                  console.log("Actual quantity");
                                  let currentNote = row.note;
                                  console.log(currentNote);
                                  if (
                                    newValue !== findEle.actualQuantity ||
                                    currentNote !== findEle.note
                                  ) {
                                    setListCompare([
                                      ...listCompare,
                                      listCompare.map((e) =>
                                        e === findEle
                                          ? (e.isChanging = true)
                                          : e
                                      ),
                                    ]);
                                  } else {
                                    // if (currentNote === findEle.note)
                                    setListCompare([
                                      ...listCompare,
                                      listCompare.map((e) =>
                                        e === findEle
                                          ? (e.isChanging = false)
                                          : e
                                      ),
                                    ]);
                                  }
                                } else if (column.dataField === "note") {
                                  console.log("Note");
                                  let currentQuantity = row.actualQuantity;
                                  if (
                                    newValue !== findEle.note ||
                                    currentQuantity !== findEle.actualQuantity
                                  )
                                    setListCompare([
                                      ...listCompare,
                                      listCompare.map((e) =>
                                        e === findEle
                                          ? (e.isChanging = true)
                                          : e
                                      ),
                                    ]);
                                  else
                                    setListCompare([
                                      ...listCompare,
                                      listCompare.map((e) =>
                                        e === findEle
                                          ? (e.isChanging = false)
                                          : e
                                      ),
                                    ]);
                                }
                              },
                            })}
                          />
                        ) : (
                          <Table
                            keyField="pkgId"
                            columns={columnsNotProgressing}
                            data={listCheckedItems}
                            noDataIndication="Table is Empty"
                          />
                        ))}
                    </div>
                  </div>
                ) : (
                  <InfoPurchaseOrderLoader />
                )}
              </li>
            </ul>
          </div>
        </div>
      </>

      <RejectModal
        modalRef={modalRef}
        hideModal={hideRejectModal}
        onRejectClick={onRejectClick}
      />
      <AdjustModal
        modalRef={adjustModal}
        hideModal={hideAdjustModal}
        onAdjustClick={onAdjustClick}
      />
    </div>
  );
}
