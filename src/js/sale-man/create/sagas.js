import { call, put, takeEvery } from "redux-saga/effects";
import {
  CREATE_PR_REQUEST,
  CREATE_PR_RESPONSE,
  CREATE_PR_ERROR,
  GET_ALL_SUPPLIER_REQUEST,
  GET_ALL_SUPPLIER_RESPONSE,
  GET_ALL_SUPPLIER_ERROR,
} from "./constants";

import handleApiErrors from "../../auth/api-errors";

function createPurchaseRequisition(action) {
  const createPRURL =
    "https://imspublicapi.herokuapp.com/api/requisition/create";

  return fetch(createPRURL, {
    method: "POST",
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

function getAllSuppliers(action) {
  const getAllSuppliersURL = `http://imspublicapi.herokuapp.com/api/suppliers/search?CurrentPage=0&SizePerPage=0`;

  return fetch(getAllSuppliersURL, {
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

function* getAllSuppliersFlow(action) {
  try {
    let json = yield call(getAllSuppliers, action);

    yield put({ type: GET_ALL_SUPPLIER_RESPONSE, json });
  } catch (error) {
    console.log(error);
    yield put({ type: GET_ALL_SUPPLIER_ERROR });
  }
}

function* createPurchaseRequisitionFlow(action) {
  try {
    let json = yield call(createPurchaseRequisition, action);

    yield put({ type: CREATE_PR_RESPONSE, json });
  } catch (error) {
    console.log(error);
    yield put({ type: CREATE_PR_ERROR });
  }
}

function* watcher() {
  yield takeEvery(CREATE_PR_REQUEST, createPurchaseRequisitionFlow);
  yield takeEvery(GET_ALL_SUPPLIER_REQUEST, getAllSuppliersFlow);
}

export default watcher;
