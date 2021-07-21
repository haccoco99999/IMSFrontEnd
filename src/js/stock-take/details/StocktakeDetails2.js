import React, { useState, useEffect, useRef } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Table from "react-bootstrap-table-next";
import cellEditFactory, { Type } from "react-bootstrap-table2-editor";
import { Modal } from "bootstrap";
import Swal from "sweetalert2";
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
import NavigationBar from "../../components/navbar/navbar-component";
import RejectModal from "../components/reject-component";
import AdjustModal from "../components/adjust-component";

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

  //todo: store state
  const {
    token,
    messages,
    stocktakeDetailsStore,
    groupLocationStore,
    statusStocktakeStore,
    IDStocktakeStore,
    transactionRecordStore,
  } = useSelector((state) => ({
    token: state.client.token,
    messages: state.getDetailsStocktakeReducer.messages,
    stocktakeDetailsStore: state.getDetailsStocktakeReducer.stocktake,
    groupLocationStore:
      state.getDetailsStocktakeReducer.stocktake.groupLocations,
    statusStocktakeStore:
      state.getDetailsStocktakeReducer.stocktake.stockTakeOrderType,
    IDStocktakeStore: state.getDetailsStocktakeReducer.stocktake.id,
    transactionStore:
      state.getDetailsStocktakeReducer.stocktake.transaction.transactionRecord,
  }));
  console.log(stocktakeDetailsStore);
  console.log(groupLocationStore[0]);
  // console.log(groupLocationStore[0].checkItems);
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
      dataField: "packageId",
      text: "Package Id",
      editable: true,
    },
    {
      // dataField: "package.productVariantId",
      dataField: "variantId",
      text: "Variant ID",
      editable: false,
    },
    {
      //   dataField: "package.productVariant.name",
      dataField: "variantName",
      text: "Variant Name",
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
      dataField: "packageId",
      text: "Action",
      formatter: (cellContent, row, rowIndex) => (
        <div>
          <button
            type="button"
            className="btn btn-danger"
            onClick={() => clickDeleteCheckItems(rowIndex)}
          >
            Delete
          </button>
        </div>
      ),
    },
  ];

  const columnsNotProgressing = [
    {
      dataField: "packageId",
      text: "Package Id",
    },
    {
      // dataField: "package.productVariantId",
      dataField: "variantId",
      text: "Variant ID",
    },
    {
      //   dataField: "package.productVariant.name",
      dataField: "variantName",
      text: "Variant Name",
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
  // function clicktTest() {
  //   console.log(listCompare);
  // }
  function setListButtonNav(status) {
    if (status === 0) {
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
    } else if (status === 2) {
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
          action: () => showAdjustModal(),
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
    history.goBack();
  }

  function clickDeleteCheckItems(rowIndex) {
    console.log(rowIndex);
    setListCheckedItems((state) => state.filter((_, i) => i !== rowIndex));

    // console.log("Da xoa:",listCheckedItems)
  }

  function onSaveClick() {
    const data = {
      stockTakeGroupLocation: [
        {
          locationId: groupLocationStore[0].location.id,
          checkItems: listCheckedItems.map((checkItem) => {
            return {
              packageId: checkItem.packageId,
              actualQuantity: checkItem.actualQuantity,
              note: checkItem.note,
            };
          }),
        },
      ],
      stockTakeId: location.state.stocktakeId,
    };
    console.log("Data Update:", data);
    dispatch(updateAction({ token: token, data: data }));
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
        Swal.fire("Deleted!", "Your stocktake has been deleted.", "success");
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
        Swal.fire("Success!", "Your stocktake has been submitted.", "success");
      }
    });
  }
  function onAdjustClick() {
    hideAdjustModal();
    const data = {
      stockTakeId: location.state.stocktakeId,
    };
    dispatch(adjustAction({ token: token, data: data }));
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
              packageId: item.packageId,
              variantId: item.package.productVariantId,
              variantName: item.package.productVariant.name,
              quantity: item.package.quantity,
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
  }, []);

  useEffect(() => {
    if (groupLocationStore.length > 0 && groupLocationStore[0] !== undefined) {
      setIsLoading(true);
      setListCheckedItems(
        groupLocationStore[0].checkItems.map((item) => {
          return {
            packageId: item.packageId,
            variantId: item.package.productVariantId,
            variantName: item.package.productVariant.name,
            quantity: item.package.quantity,
            actualQuantity: item.actualQuantity,
            note: item.note,
          };
        })
      );

      setListCompare(
        groupLocationStore[0].checkItems.map((item) => {
          return {
            packageId: item.packageId,
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
      // console.log(listCompare.some(check))
      if (listCompare.some(check)) setIsChanging(true);
      else setIsChanging(false);
    }
  }, [listCompare]);
  // console.log()
  useEffect(() => {
    if (messages !== "") {
      if (
        messages === "Submit Success" ||
        messages === "Adjust Success" ||
        messages === "Update Success" ||
        messages === "Reject Success"
      )
        dispatch(
          getDetailsStockTakeAction({
            id: location.state.stocktakeId,
            token: token,
          })
        );
    }
  }, [messages]);

  useEffect(() => {
    if (statusStocktakeStore !== "") {
      if (statusStocktakeStore === 0) setTitleStatus("Progressing");
      else if (statusStocktakeStore === 1) setTitleStatus("Complete");
      else if (statusStocktakeStore === 2) setTitleStatus("Validating");
      else if (statusStocktakeStore === -1) setTitleStatus("Cancel");
    }
  }, [statusStocktakeStore]);
  return (
    <div>
      <NavigationBar
        listButton={listButton}
        titleBar={IDStocktakeStore}
        actionGoBack={goBackClick}
        status={titleStatus}
      />

      <div className="wrapper space-top">
        <div className="wrapper-content shadow">
          {/* Show info */}
          <div className="title-heading mt-2">
            <span>Stocktake Details</span>
          </div>

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
                Checked Items
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
                {isLoading && (
                  <div className="row g-3 justify-content-between me-3">
                    <div className="col-4">
                      <p>
                        <strong>Location ID:</strong>
                        {groupLocationStore[0].location.id}
                      </p>
                      <p>
                        <strong>Location Name:</strong>
                        {groupLocationStore[0].location.locationName}
                      </p>
                      <p>
                        <strong>Location Barcode:</strong>
                        {groupLocationStore[0].location.locationBarcode}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div
              class="tab-pane fade"
              id="nav-profile"
              role="tabpanel"
              aria-labelledby="nav-profile-tab"
            >
              <div className="wrapper-content shadow mt-3">
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
                      class="btn btn-secondary"
                      onClick={onRevertClick}
                    >
                      Revert
                    </button>
                  </>
                )}
                {/* <button type="button" class="btn btn-secondary">
                  Discard
                </button>
                <button type="button" class="btn btn-primary">
                  Save
                </button> */}

                {isLoading &&
                  (statusStocktakeStore === 0 ? (
                    <Table
                      keyField="packageId"
                      columns={columns}
                      data={listCheckedItems}
                      noDataIndication="Table is Empty"
                      cellEdit={cellEditFactory({
                        mode: "click",
                        blurToSave: true,
                        beforeSaveCell(oldValue, newValue, row, column, done) {
                          let findEle = listCompare.find(
                            (e) => e.packageId === row.packageId
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
                                  e === findEle ? (e.isChanging = true) : e
                                ),
                              ]);
                            } else {
                              // if (currentNote === findEle.note)
                              setListCompare([
                                ...listCompare,
                                listCompare.map((e) =>
                                  e === findEle ? (e.isChanging = false) : e
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
                                  e === findEle ? (e.isChanging = true) : e
                                ),
                              ]);
                            else
                              setListCompare([
                                ...listCompare,
                                listCompare.map((e) =>
                                  e === findEle ? (e.isChanging = false) : e
                                ),
                              ]);
                          }
                        },
                      })}
                    />
                  ) : (
                    <Table
                      keyField="packageId"
                      columns={columnsNotProgressing}
                      data={listCheckedItems}
                      noDataIndication="Table is Empty"
                    />
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
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
