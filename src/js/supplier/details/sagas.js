import { call, put, takeEvery,takeLatest } from "redux-saga/effects";
import handleApiErrors from "../../auth/api-errors";

import {
  GET_DETAILS_SUPPLIER_REQUEST,
  GET_DETAILS_SUPPLIER_RESPONSE,
  GET_DETAILS_SUPPLIER_ERROR,
  UPDATE_SUPPLIER_REQUEST,
  UPDATE_SUPPLIER_RESPONSE,
  UPDATE_SUPPLIER_ERROR,
  DELETE_SUPPLIER_REQUEST,
  DELETE_SUPPLIER_RESPONSE,
  DELETE_SUPPLIER_ERROR,
} from "./constants";

function getDetailsSupplier(action) {
  const getDetailsSupplierURL = `${process.env.REACT_APP_API}/suppliers/search?SearchQuery=${action.id}`;

  return fetch(getDetailsSupplierURL, {
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

function updateSupplier(action) {
  const url = "http://imspublicapi.herokuapp.com/api/supplier/edit";
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

function deleteSupplier(action) {
  const url = `http://imspublicapi.herokuapp.com/api/supplier/${action.id}`;
  return fetch(url, {
    method: "DELETE",
    headers: {
      Authorization: "Bearer " + action.token,
      "Content-Type": "application/json",
      Origin: "",
    },
    credentials: "include",
  })
    .then((response) => handleApiErrors(response))
    .then((response) => response)
    .catch((error) => {
      throw error;
    });
}

function* getDetailsSupplierFlow(action) {
  try {
    let json = yield call(getDetailsSupplier, action);

    yield put({ type: GET_DETAILS_SUPPLIER_RESPONSE, json });
  } catch (error) {
    yield put({ type: GET_DETAILS_SUPPLIER_ERROR });
  }
}

function* updateSupplierFlow(action) {
  try {
    let json = yield call(updateSupplier, action);
    yield put({ type: UPDATE_SUPPLIER_RESPONSE, json });
  } catch (error) {
    console.log(error);
    yield put({ type: UPDATE_SUPPLIER_ERROR });
  }
}

function* deleteSupplierFlow(action) {
  try {
    let json = yield call(deleteSupplier, action);
    yield put({ type: DELETE_SUPPLIER_RESPONSE, json });
  } catch (error) {
    console.log(error);
    yield put({ type: DELETE_SUPPLIER_ERROR });
  }
}

function* watcher() {
  yield takeLatest(GET_DETAILS_SUPPLIER_REQUEST, getDetailsSupplierFlow);
  yield takeEvery(UPDATE_SUPPLIER_REQUEST, updateSupplierFlow);
  yield takeEvery(DELETE_SUPPLIER_REQUEST, deleteSupplierFlow);
}

export default watcher;
