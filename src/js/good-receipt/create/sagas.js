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
} from "./constant";
import handleApiErrors from "../../auth/api-errors";

//api
const getListPurchaseOrderUrl =
  "https://imspublicapi.herokuapp.com/api/purchaseorder/all&status=4&page=1&size=1000";

const get_details_confirmed_po =
  "https://imspublicapi.herokuapp.com/api/purchaseorder/number/";

function getListPurchaseOrder() {
  return fetch(getListPurchaseOrderUrl, {
    method: "GET",
    headers: {
      Authorization:
        "Bearer " +
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImM3ODY3NmY2LTc1NTUtNGU3ZS05OWQ5LWE4OTcxZGI4NWU5MiIsIm5iZiI6MTYyMzU0NjI4MSwiZXhwIjoxNjI0MTUxMDgxLCJpYXQiOjE2MjM1NDYyODF9.m13k9zu5PBwB92rbqUdOBl7Mlb4jnmzPucrBPXUMafU",
      "Content-Type": "application/json",
      Origin: "",
    },
    credentials: "include",
  })
    .then((response) => handleApiErrors(response))
    .then((response) => response.json())
    .then((json) => json)
    .catch((error) => {});
}

function getDetailsPO(action) {
  return fetch(get_details_confirmed_po + action.id, {
    method: "GET",
    headers: {
      Authorization:
        "Bearer " +
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImM3ODY3NmY2LTc1NTUtNGU3ZS05OWQ5LWE4OTcxZGI4NWU5MiIsIm5iZiI6MTYyMzU0NjI4MSwiZXhwIjoxNjI0MTUxMDgxLCJpYXQiOjE2MjM1NDYyODF9.m13k9zu5PBwB92rbqUdOBl7Mlb4jnmzPucrBPXUMafU",
      "Content-Type": "application/json",
      Origin: "",
    },
    credentials: "include",
  })
    .then((response) => handleApiErrors(response))
    .then((response) => response.json())
    .then((json) => json)
    .catch((error) => {});
}

function* getListPurchaseOrderFlow() {
  try {
    let json = yield call(getListPurchaseOrder);

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

function* watcher() {
  yield takeEvery(
    GET_CONFIRMED_PURCHASE_ORDER_REQUEST,
    getListPurchaseOrderFlow
  );

  yield takeEvery(GET_DETAILS_PO_REQUEST, getDetailsPOFlow);
}

export default watcher;
