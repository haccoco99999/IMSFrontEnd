import { call, put, takeEvery } from "redux-saga/effects";

// component
import {
  GET_CONFIRMED_PURCHASE_ORDER_REQUEST,
  GET_CONFIRMED_PURCHASE_ORDER_RESPONSE,
  GET_CONFIRMED_PURCHASE_ORDER_ERROR,
  //PO
  GET_DETAILS_PO_REQUEST,
  GET_DETAILS_PO_RESPONSE,
  GET_DETAILS_PO_ERROR,

  //SAVE
  SEND_CREATING_GOODS_RECEIPT_REQUEST,
  SEND_CREATING_GOODS_RECEIPT_RESPONSE,
  SEND_CREATING_GOODS_RECEIPT_ERROR,

  //LOCATION
  GET_LOCATION_REQUEST,
  GET_LOCATION_RESPONSE,
  GET_LOCATION_ERROR,
} from "./constant";
import handleApiErrors from "../../auth/api-errors";

//api

function getListConfirmedPurchaseOrder(action) {
  const url = `${process.env.REACT_APP_API}/purchaseorder/search?CurrentPage=0&SizePerPage=0&FromStatus=5&ToStatus=5`;

  return fetch(url, {
    method: "GET",
    headers: {
      Authorization: "Bearer " + action.token,
      "Content-Type": "application/json",
      Origin: "",
    },
    credentials: "include",
  })
    .then((response) => handleApiErrors(response))
    .then((response) => response.json())
    .then((json) => json)
    .catch((error) => {
      throw error;
    });
}

function getDetailsPO(action) {
  // const get_details_confirmed_po =
  // "https://imspublicapi.herokuapp.com/api/purchaseorder/number/";
  const url = `${process.env.REACT_APP_API}/purchaseorder/number/${action.id}`;
  return fetch(url, {
    method: "GET",
    headers: {
      Authorization: "Bearer " + action.token,
      "Content-Type": "application/json",
      Origin: "",
    },
    credentials: "include",
  })
    .then((response) => handleApiErrors(response))
    .then((response) => response.json())
    .then((json) => json)
    .catch((error) => {
      throw error;
    });
}

function setReceivingPurchaseOrderQuantity(action) {
  // const set_receiving_purchase_order_quantity =
  // "https://imspublicapi.herokuapp.com/api/goodsreceipt/update";
  const url = `${process.env.REACT_APP_API}/goodsreceipt/update`;
  return fetch(url, {
    method: "PUT",
    headers: {
      Authorization: "Bearer " + action.token,
      "Content-Type": "application/json",
      Origin: "",
    },
    credentials: "include",
    body: JSON.stringify(action.data),
  })
    .then((response) => handleApiErrors(response))
    .then((response) => response.json())
    .then((json) => json)
    .catch((error) => {
      throw error;
    });
}
function getAllLocations(action) {
  const url = `${process.env.REACT_APP_API}/package?CurrentPage=0&SizePerPage=0&IsLocationOnly=true"`;
  return fetch(url, {
    method: "GET",
    headers: {
      Authorization: "Bearer " + action.token,
      "Content-Type": "application/json",
      Origin: "",
    },
    credentials: "include",
  })
    .then((response) => handleApiErrors(response))
    .then((response) => response.json())
    .then((json) => json)
    .catch((error) => {
      throw error;
    });
}

function* getListPurchaseOrderFlow(action) {
  try {
    let json = yield call(getListConfirmedPurchaseOrder, action);

    yield put({ type: GET_CONFIRMED_PURCHASE_ORDER_RESPONSE, json });
  } catch (error) {
    yield put({ type: GET_CONFIRMED_PURCHASE_ORDER_ERROR });
  }
}

function* getDetailsPOFlow(action) {
  try {
    let json = yield call(getDetailsPO, action);

    yield put({ type: GET_DETAILS_PO_RESPONSE, json });
  } catch (error) {
    yield put({ type: GET_DETAILS_PO_ERROR });
  }
}
function* setReceivingPurchaseOrderQuantityFlow(action) {
  try {
    let json = yield call(setReceivingPurchaseOrderQuantity, action);
    console.log(json);
    yield put({ type: SEND_CREATING_GOODS_RECEIPT_RESPONSE, json });
  } catch (error) {
    yield put({ type: SEND_CREATING_GOODS_RECEIPT_ERROR });
  }
}
function* getAllLocationsFlow(action) {
  try {
    let json = yield call(getAllLocations, action);
    yield put({ type: GET_LOCATION_RESPONSE, json });
  } catch (error) {
    console.log(error);
    yield put({ type: GET_LOCATION_ERROR });
  }
}
function* watcher() {
  yield takeEvery(
    GET_CONFIRMED_PURCHASE_ORDER_REQUEST,
    getListPurchaseOrderFlow
  );

  yield takeEvery(GET_DETAILS_PO_REQUEST, getDetailsPOFlow);

  yield takeEvery(
    SEND_CREATING_GOODS_RECEIPT_REQUEST,
    setReceivingPurchaseOrderQuantityFlow
  );
  yield takeEvery(GET_LOCATION_REQUEST, getAllLocationsFlow);
}

export default watcher;
