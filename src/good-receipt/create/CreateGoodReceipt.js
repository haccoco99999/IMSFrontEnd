import React, { useState, useEffect, useRef } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Modal } from "bootstrap";
import BootstrapTable from "react-bootstrap-table-next";
import cellEditFactory from "react-bootstrap-table2-editor";
import Swal from "sweetalert2";
//css
import "../goodreceipt.css";
//component
import {
  getConfirmedPOAction,
  getConfirmedPODetailsAction,
  createGoodsReceiptAction,
  checkDuplicateSKUAction,
  checkSKUExistedAction,
} from "./action";
import { getAllLocationsAction } from "../../components/location/action";
import { RESET } from "./constant";
import ListLocationsModal from "../../stock-take/create/search-location-modal";
import NavigationBar from "../../components/navbar/navbar-component";
import ListPurchaseConfirmModal from "../components/purchase-accept-component";
// import { TableLoading } from "../../components/loading/loading-component";
import SpinnerComponent from "../../components/spinner/spinner-component";

export default function CreateGoodsReceiptComponent() {
  let history = useHistory();
  let dispatch = useDispatch();

  const [isChanging, setIsChanging] = useState(false);
  const [isValid, setIsValid] = useState(true);
  const [isCheckingNumeric, setIsCheckingNumeric] = useState(false);
  const [isReturnData, setIsReturnData] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState({
    id: "",
    locationName: "",
    locationBarcode: "",
  });
  const [selectedPO, setSelectedPO] = useState("");
  const [listCompare, setListCompare] = useState([]);
  const [list_BuyingProduct, setList_BuyingProduct] = useState([]);
  const [isShowSpinner, setIsShowSpinner] = useState(false);
  const [isShowTables, setIsShowTables] = useState(false);
  const [isDeleteItem, setIsDeleteItem] = useState(false);

  const {
    list_ConfirmPurchaseOrderID,
    list_BuyingProductStore,
    token,
    listLocationsStore,
    submitPRReducer,
    getDetailsPOReducer,
    getAllConfirmedPurchaseOrderReducer,
    getAllLocationsReducer,
    checkDuplicateSKUReducer,
    existRedisVariantSkus,
  } = useSelector((state) => ({
    token: state.client.token,
    list_ConfirmPurchaseOrderID:
      state.getAllConfirmedPurchaseOrderReducer.listConfirmedPurchaseOrder,
    list_BuyingProductStore:
      state.getDetailsPOReducer.listProducts.purchaseOrderProduct,
    // messages: state.getAllConfirmedPurchaseOrderReducer.messages,
    listLocationsStore: state.getAllLocationsReducer.listLocations,
    submitPRReducer: state.submitPRReducer,
    getDetailsPOReducer: state.getDetailsPOReducer,
    getAllConfirmedPurchaseOrderReducer:
      state.getAllConfirmedPurchaseOrderReducer,
    getAllLocationsReducer: state.getAllLocationsReducer,
    checkDuplicateSKUReducer: state.checkDuplicateSKUReducer,
    existRedisVariantSkus: state.checkSKUExistsReducer.existRedisVariantSkus,
  }));

  console.log(existRedisVariantSkus);
  //todo: check
  function checkDuplicateSKU(keySearch) {
    const url = `${process.env.REACT_APP_API}/dupcheck/productvariant`;

    let result = fetch(url, {
      method: "POST",
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
        Origin: "",
      },
      credentials: "include",
      body: JSON.stringify({ value: keySearch }),
    })
      .then((response) => response.json())
      .then((json) => json)
      .catch((error) => {
        throw error;
      });
    return result;
  }

  const columns = [
    {
      dataField: "id",
      text: "ID",
      hidden: true,
    },
    {
      dataField: "productId",
      text: "Product ID",
      editable: false,
      hidden: true,
    },
    {
      dataField: "productVariantId",
      text: "Variant ID",
      editable: false,
      hidden: true,
    },
    {
      dataField: "name",
      text: "Name",
      editable: false,
    },

    {
      dataField: "barcode",
      text: "Barcode",
      editable: false,
    },
    {
      dataField: "sku",
      text: "SKU",
      editable: (content, row, rowIndex, columnIndex) => {
        return row.hasSKU;
      },
      // editable: true,
      validator: (newValue, oldValue, row, done) => {
        let check = false;
        checkDuplicateSKU(newValue).then((result) => {
          console.log(result);
          if (result.hasMatch) {
            setIsCheckingNumeric(true);
            check = true;
          } else {
            setIsCheckingNumeric(false);
          }
        });
        setTimeout(() => {
          if (check)
            return done({
              valid: false,
              message: "SKU has existed",
            });
          return done();
        }, 2000);

        return { async: true };
      },
    },
    {
      dataField: "orderQuantity",
      text: "Ordered",
      editable: false,
    },
    {
      dataField: "received",
      text: "Received",
      editable: true,
      validator: (newValue, oldValue, row, columns) => {
        if (isNaN(newValue)) {
          setIsCheckingNumeric(true);
          return {
            valid: false,
            message: "Sale price should be numeric",
          };
        } else {
          if (newValue < 0) {
            setIsCheckingNumeric(true);
            return {
              valid: false,
              message: "Quantity should be bigger than 0",
            };
          }
          if (newValue > oldValue.orderQuantity) {
            setIsCheckingNumeric(true);
            return {
              valid: false,
              message: "Received quantity should be below ordered quantity",
            };
          }
          setIsCheckingNumeric(false);
        }
      },
      formatter: (cellContent, row, rowIndex) =>
        (list_BuyingProduct[rowIndex].received = parseInt(row.received)),
    },
    {
      dataField: "id",
      text: "Action",
      editable: false,
      formatter: (cellContent, row, rowIndex) => {
        return (
          <div
            className="text-danger btn"
            onClick={() => clickDeleteVariant(rowIndex)}
          >
            <i class="bi bi-trash"></i>
          </div>
        );
      },
    },
  ];

  //todo: function Nav button
  const listButton = setListButtonNav();

  function setListButtonNav() {
    if (isChanging)
      return [
        {
          isShow: true,
          title: "Revert",
          action: () => onRevertClick(),
          class: "btn-secondary",
        },
        {
          isShow: true,
          title: "Save",
          action: () => saveGoodsReceipt(),
          class: "btn-primary",
          disabled: isCheckingNumeric,
        },
      ];
    else
      return [
        {
          isShow: true,
          title: "Save",
          action: () => saveGoodsReceipt(),
          class: "btn-primary",
          disabled: isCheckingNumeric,
        },
      ];
  }

  function openLocationList() {
    showModal();
    dispatch(getAllLocationsAction({ token: token }));
  }
  //todo:modal location declare
  const modalRef = useRef();
  const showModal = () => {
    const modalEle = modalRef.current;
    const bsModal = new Modal(modalEle, {
      backdrop: "static",
      keyboard: false,
    });
    bsModal.show();
  };
  const hideModal = () => {
    const modalEle = modalRef.current;
    const bsModal = Modal.getInstance(modalEle);
    bsModal.hide();
  };

  function openConfirmedPOList() {
    dispatch(getConfirmedPOAction({ token: token }));
    showModalPO();
  }
  //todo: modal po confirm modal
  const modalPO = useRef();
  const showModalPO = () => {
    const modalEle = modalPO.current;
    const bsModal = new Modal(modalEle, {
      backdrop: "static",
      keyboard: false,
    });
    bsModal.show();
  };
  const hideModalPO = () => {
    const modalEle = modalPO.current;
    const bsModal = Modal.getInstance(modalEle);
    bsModal.hide();
  };

  function handleOnSelectLocation(row, isSelect) {
    if (isSelect) {
      // console.log(row.id);
      // console.log(row.locationName);
      setSelectedLocation({
        id: row.id,
        locationName: row.locationName,
        locationBarcode: row.locationBarcode,
      });
    }
  }

  function onSelectLocationClick() {
    hideModal();
    console.log("Data dang search:", selectedLocation.id);
    // dispatch(getListPackageAction({ token: token, id: selectedLocation.id }));
  }

  function handleOnSelectPO(row, isSelect) {
    if (isSelect) {
      setSelectedPO(row.id);
    }
  }

  function onSelectPOClick() {
    hideModalPO();
    setIsReturnData(true);

    dispatch(checkSKUExistedAction({ id: selectedPO, token: token }));
    dispatch(getConfirmedPODetailsAction({ id: selectedPO, token: token }));
  }

  //todo: function
  function goBackClick() {
    history.goBack();
  }

  function clickDeleteVariant(rowIndex) {
    setList_BuyingProduct((state) => state.filter((_, i) => i !== rowIndex));
    setListCompare((state) => state.filter((_, i) => i !== rowIndex));
    setIsDeleteItem(true);
    setIsChanging(true);
  }

  // function onChangeValueProduct(event) {
  //   console.log(event.target.id + " ");
  //   setList_BuyingProduct((state) =>
  //     state.map((element, index) =>
  //       index == event.target.id
  //         ? { ...element, [event.target.name]: event.target.value }
  //         : element
  //     )
  //   );
  //   console.log(event.target.value);
  // }

  function isDataInputEmpty(array) {
    const checkReceived = (element) => element.received === 0;
    const checkSKU = (element) => element.sku === "";
    if (array.some(checkReceived)) return true;
    // const checkBarcode = (element) => element.barcode === "";
    if (array.some(checkSKU) && array.some(checkReceived)) return true;
    // else if (array.some(checkSKU) && !array.some(checkBarcode)) return false;
    // else if (!array.some(checkSKU) && array.some(checkBarcode)) return false;
    return false;
  }

  function saveGoodsReceipt() {
    if (selectedPO === "" || selectedLocation.id === "") {
      Swal.fire({
        title: "Error",
        text: "You need to fulfill requested field",
        icon: "error",
        showCancelButton: true,
        cancelButtonText: "Cancel",
        showConfirmButton: false,
      });
    } else {
      if (isDataInputEmpty(list_BuyingProduct)) {
        Swal.fire({
          title: "Error",
          text: "Please input valid  sku or number should be bigger than zero",
          icon: "error",
          showCancelButton: true,
          cancelButtonText: "Cancel",
          showConfirmButton: false,
        });
      } else {
        const Data = {
          purchaseOrderNumber: selectedPO,
          locationId: selectedLocation.id,
          updateItems: list_BuyingProduct.map((product) => {
            let temp;
            if (product.sku !== "Validating") temp = product.sku;
            else temp = null;
            return {
              productVariantId: product.productVariantId,
              quantityReceived: product.received,
              sku: temp,
              // barcode: product.barcode,
            };
          }),
        };
        Swal.fire({
          title: "Are you sure",
          text: "Do you want to save?",
          icon: "question",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: " #d33",
          confirmButtonText: "Confirm",
          reverseButtons: true,
        }).then((result) => {
          if (result.isConfirmed) {
            dispatch(createGoodsReceiptAction({ data: Data, token: token }));
          }
        });

        console.log(Data);
      }

      // if (!isValid) {
      //   Swal.fire({
      //     title: "Error",
      //     text: "Please input valid  sku",
      //     icon: "error",
      //     showCancelButton: true,
      //     cancelButtonText: "Cancel",
      //     showConfirmButton: false,
      //   });
      // } else {

      // }
    }
  }

  // const handleChangeValue = (event) => {
  //   event.preventDefault();
  //   setIsChange(true);
  //   setFormData({
  //     name: event.target.name,
  //     value: event.target.value,
  //   });
  //   dispatch(
  //     getConfirmedPODetailsAction({ id: event.target.value, token: token })
  //   );
  // };

  function onRevertClick() {
    //revert
    setList_BuyingProduct(
      list_BuyingProductStore
        .filter((product) => product.quantityLeftAfterReceived !== 0)
        .map((product) => {
          return {
            id: product.id,
            name: product.productVariant.name,
            productId: product.productVariant.productId,
            productVariantId: product.productVariantId,
            //todo: Sua lai data
            orderQuantity: product.quantityLeftAfterReceived,
            // orderQuantity: product.orderQuantity,
            sku: product.productVariant.sku,
            barcode: product.productVariant.barcode,
            received: 0,
          };
        })
    );
    setListCompare(
      list_BuyingProductStore
        .filter((product) => product.quantityLeftAfterReceived !== 0)
        .map((product) => {
          var isValid = true;
          if (product.sku === "" && product.barcode === "") isValid = false;

          return {
            id: product.id,
            sku: product.productVariant.sku,
            barcode: product.productVariant.barcode,
            isChanging: false,
            isValid: isValid,
          };
        })
    );
    //revert
    setIsDeleteItem(false);
    setIsChanging(false);
  }

  //@params: suppliers get details suppliers
  const suppliers = list_ConfirmPurchaseOrderID
    .filter((item) => item.id === selectedPO)
    .shift();

  const checkSKUSHasExistedInCache = (variantId) => {
    const check = (element) => element.productVariantId === variantId;
    console.log(existRedisVariantSkus.some(check));
    return existRedisVariantSkus.some(check);
  };
  ///////////////Hung edit
  const location = useLocation();

  useEffect(() => {
    if (location.state !== undefined) {
      if (location.state.isRedirectFromPO) {
        dispatch(getConfirmedPOAction({ token: token }));
        setSelectedPO(location.state.orderId);
        setIsReturnData(true);

        dispatch(
          checkSKUExistedAction({ id: location.state.orderId, token: token })
        );
        dispatch(
          getConfirmedPODetailsAction({
            id: location.state.orderId,
            token: token,
          })
        );
      }
    }
    return () => {
      dispatch({ type: RESET });
    };
  }, []);

  console.log(listCompare);
  useEffect(() => {
    if (list_BuyingProductStore.length > 0) {
      setList_BuyingProduct(
        list_BuyingProductStore
          .filter((product) => product.quantityLeftAfterReceived !== 0)
          .map((product) => {
            let tempSku;
            if (checkSKUSHasExistedInCache(product.productVariantId))
              tempSku = "Validating";
            else tempSku = product.productVariant.sku;
            // let hasSKU;
            // if (tempSKU !== "") hasSKU = false;
            // else hasSKU = true;
            return {
              id: product.id,
              name: product.productVariant.name,
              productId: product.productVariant.productId,
              productVariantId: product.productVariantId,

              //todo: Sua lai data
              orderQuantity: product.quantityLeftAfterReceived,
              // orderQuantity: product.orderQuantity,
              // sku: product.productVariant.sku,
              sku: tempSku,
              barcode: product.productVariant.barcode,
              received: 0,
              // hasSKU: product.productVariant.sku === "",
              hasSKU: tempSku === "",
            };
          })
      );
      setListCompare(
        list_BuyingProductStore
          .filter((product) => product.quantityLeftAfterReceived !== 0)
          .map((product) => {
            var isValid = true;
            if (product.sku === "" && product.barcode === "") isValid = false;

            return {
              id: product.id,
              sku: product.productVariant.sku,
              barcode: product.productVariant.barcode,
              isChanging: false,
              isValid: isValid,
            };
          })
      );
    }
  }, [list_BuyingProductStore]);
  useEffect(() => {
    const checkIsChanging = (element) => element.isChanging === true;
    const checkisValid = (element) => element.isValid === false;

    if (listCompare.length > 0) {
      if (listCompare.some(checkIsChanging)) setIsChanging(true);
      else if (!isDeleteItem) setIsChanging(false);

      console.log(isChanging);
      if (listCompare.some(checkisValid)) setIsValid(false);
      else setIsValid(true);
      // console.log(isValid);
    }
  }, [listCompare]);

  useEffect(() => {
    if (getAllLocationsReducer.errors) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Something went wrong!",
        showCancelButton: false,
        confirmButtonColor: "#3085d6",
      }).then((result) => {
        if (result.isConfirmed) {
          hideModal();
        }
      });
    }
  }, [getAllLocationsReducer]);

  useEffect(() => {
    if (getDetailsPOReducer.requesting) {
      setIsShowTables(true);
      setIsShowSpinner(true);
    } else if (getDetailsPOReducer.successful) {
      setIsShowSpinner(false);
    }
    if (getDetailsPOReducer.errors === true) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Something went wrong!",
        showCancelButton: false,
        confirmButtonColor: "#3085d6",
      });
    }
  }, [getDetailsPOReducer]);

  useEffect(() => {
    if (getAllConfirmedPurchaseOrderReducer.errors === true)
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Something went wrong!",
        showCancelButton: false,
        confirmButtonColor: "#3085d6",
      });
  }, [getAllConfirmedPurchaseOrderReducer]);

  useEffect(() => {
    if (submitPRReducer.requesting === true) {
      Swal.fire({
        title: "Progressing",
        html: "Waiting...",
        timerProgressBar: true,
        didOpen: () => {
          Swal.showLoading();
        },
      });
    } else if (submitPRReducer.successful === true) {
      Swal.fire({
        icon: "success",
        title: "Your work has been saved",
        showCancelButton: false,
        confirmButtonColor: "#3085d6",
      }).then((result) => {
        if (result.isConfirmed)
          history.push("/homepage/good-receipt/details", {
            goodsreceiptId: submitPRReducer.messages,
          });
      });
    } else if (submitPRReducer.errors === true) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Something went wrong!",
        showCancelButton: false,
        confirmButtonColor: "#3085d6",
      });
    }
  }, [submitPRReducer]);
  return (
    <div>
      <NavigationBar
        listButton={listButton}
        titleBar="Create goods receipt"
        actionGoBack={goBackClick}
        status=""
        home="Goods receipt"
        currentPage="Create goods receipt"
      />

      <div className="wrapper">
        <div className="card">
          <h5 className="card-header fw-bold">Goods Receipt Information</h5>
          <ul class="list-group list-group-flush">
            <li class="list-group-item">
              <button
                class="btn btn-outline-secondary"
                type="button"
                onClick={openConfirmedPOList}
              >
                Select Purchase Order
              </button>
            </li>

            {isReturnData && suppliers !== undefined && (
              <li class="list-group-item">
                <p>
                  <strong>Purchase Order:</strong> {selectedPO}
                </p>
                <p>
                  <strong>Supplier:</strong> {suppliers.supplierName}
                </p>
                <p>
                  <strong>Email:</strong> {suppliers.supplierEmail}
                </p>
                <p>
                  <strong>Phone No:</strong> {suppliers.supplierPhone}
                </p>
              </li>
            )}

            <li class="list-group-item">
              <div className="card-title fw-bold">List of items</div>
              {isShowTables && (
                <div className="mt-3">
                  {isShowSpinner ? (
                    <SpinnerComponent />
                  ) : (
                    <BootstrapTable
                      keyField="id"
                      columns={columns}
                      data={list_BuyingProduct}
                      noDataIndication="Table is Empty"
                      cellEdit={cellEditFactory({
                        mode: "click",
                        blurToSave: true,
                        // nonEditableRows: () =>
                        //   list_BuyingProduct.map((item) => {
                        //     let findEle = listCompare.find(
                        //       (e) => e.id === item.id
                        //     );
                        //     if (item.sku !== ""
                        //     //  && item.sku === findEle.sku
                        //      )
                        //       return item.id;
                        //   }),
                        beforeSaveCell(oldValue, newValue, row, column, done) {
                          let findEle = listCompare.find(
                            (e) => e.id === row.id
                          );
                          // console.log(findEle);

                          if (column.dataField === "sku") {
                            console.log("Dang check SKU");
                            let currentBarcode = row.barcode;
                            if (
                              newValue !== findEle.sku ||
                              currentBarcode !== findEle.barcode
                            ) {
                              setListCompare([
                                ...listCompare,
                                listCompare.map((e) =>
                                  e === findEle ? (e.isChanging = true) : e
                                ),
                              ]);
                              //todo: check invalid
                              if (newValue === "" && currentBarcode === "") {
                                setListCompare([
                                  ...listCompare,
                                  listCompare.map((e) =>
                                    e === findEle ? (e.isValid = false) : e
                                  ),
                                ]);
                              } else
                                setListCompare([
                                  ...listCompare,
                                  listCompare.map((e) =>
                                    e === findEle ? (e.isValid = true) : e
                                  ),
                                ]);
                            } else
                              setListCompare([
                                ...listCompare,
                                listCompare.map((e) =>
                                  e === findEle ? (e.isChanging = false) : e
                                ),
                              ]);
                          }
                          // else if (column.dataField === "barcode") {
                          //   console.log("Dang check barcode");
                          //   let currentSKU = row.sku;
                          //   if (
                          //     newValue.barcode !== findEle ||
                          //     currentBarcode !== findEle.barcode
                          //   ) {
                          //     setListCompare([
                          //       ...listCompare,
                          //       listCompare.map((e) =>
                          //         e === findEle ? (e.isChanging = true) : e
                          //       ),
                          //     ]);
                          //     //todo: check invalid
                          //     if (newValue === "" && currentSKU === "") {
                          //       setListCompare([
                          //         ...listCompare,
                          //         listCompare.map((e) =>
                          //           e === findEle ? (e.isValid = false) : e
                          //         ),
                          //       ]);
                          //     } else
                          //       setListCompare([
                          //         ...listCompare,
                          //         listCompare.map((e) =>
                          //           e === findEle ? (e.isValid = true) : e
                          //         ),
                          //       ]);
                          //   } else
                          //     setListCompare([
                          //       ...listCompare,
                          //       listCompare.map((e) =>
                          //         e === findEle ? (e.isChanging = false) : e
                          //       ),
                          //     ]);
                          // }
                        },
                      })}
                    />
                  )}
                </div>
              )}
            </li>
          </ul>
        </div>
      </div>
      <div className="wrapper">
        <div className="card mt-3 mb-3">
          <h5 className="card-header fw-bold">Location</h5>
          <ul class="list-group list-group-flush">
            <li class="list-group-item">
              <button
                class="btn btn-outline-secondary"
                type="button"
                onClick={openLocationList}
              >
                Select Location
              </button>
            </li>
            <li class="list-group-item">
              <div className="mt-3">
                <p>
                  <strong>Location ID:</strong> {selectedLocation.id}
                </p>
                <p>
                  <strong>Location Name:</strong>{" "}
                  {selectedLocation.locationName}
                </p>
                <p>
                  <strong>Location Barcode:</strong>{" "}
                  {selectedLocation.locationBarcode}
                </p>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <ListLocationsModal
        modalRef={modalRef}
        hideModal={hideModal}
        listLocations={listLocationsStore}
        handleOnSelect={handleOnSelectLocation}
        onSelectLocationClick={onSelectLocationClick}
      />
      <ListPurchaseConfirmModal
        modalRef={modalPO}
        hideModal={hideModalPO}
        listPOConfirm={list_ConfirmPurchaseOrderID}
        handleOnSelect={handleOnSelectPO}
        onSelectConfirm={onSelectPOClick}
      />
    </div>
  );
}
