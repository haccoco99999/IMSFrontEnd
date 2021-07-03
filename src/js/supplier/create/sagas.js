import { call, put, takeEvery } from "redux-saga/effects";
import handleApiErrors from "../../auth/api-errors";

import {
  CREAT_SUPPLIER_REQUEST,
  CREAT_SUPPLIER_RESPONSE,
  CREAT_SUPPLIER_ERROR,
} from "./constants";

function createSupplier(action) {
  const url = "http://imspublicapi.herokuapp.com/api/supplier/create";
  return fetch(url, {
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

function* createSupplierFlow(action) {
  try {
    let json = yield call(createSupplier, action);
    yield put({ type: CREAT_SUPPLIER_RESPONSE, json });
  } catch (error) {
    console.log(error)
    yield put({ type: CREAT_SUPPLIER_ERROR });
  }
}

function* watcher() {
  yield takeEvery(CREAT_SUPPLIER_REQUEST, createSupplierFlow);
}
export default watcher;
