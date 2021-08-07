import { call, put, takeEvery } from "redux-saga/effects";
import handleApiErrors from "../../auth/api-errors";

import {
  CREAT_SUPPLIER_REQUEST,
  CREAT_SUPPLIER_RESPONSE,
  CREAT_SUPPLIER_ERROR,
} from "./constants";

function createSupplier(action) {
  const url = `${process.env.REACT_APP_API}/supplier/create`;
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

function checkDuplicateSupplier(data, token) {
  // console.log(action);
  const url = `${process.env.REACT_APP_API}/dupcheck/supplier`;
  return fetch(url, {
    method: "POST",
    headers: {
      Authorization: "Bearer " + token,
      "Content-Type": "application/json",
      Origin: "",
    },
    credentials: "include",
    body: JSON.stringify({
      // value: action.data.supplierName,
      value: data,
    }),
  })
    .then((response) => handleApiErrors(response))
    .then((response) => response.json())
    .then((json) => json)
    .catch((error) => {
      throw error;
    });
}

function* checkDuplicateSupplierFlow(data, token) {
  try {
    let resultCheckDup = yield call(checkDuplicateSupplier, data, token);
    return resultCheckDup;
  } catch (error) {
    console.log(error);
    yield put({ type: CREAT_SUPPLIER_ERROR });
  }
}

function* createSupplierFlow(action) {
  let checkSupplierName = yield call(
    checkDuplicateSupplierFlow,
    action.data.supplierName,
    action.token
  );
  let checkSupplierEmail = yield call(
    checkDuplicateSupplierFlow,
    action.data.email,
    action.token
  );
  if (checkSupplierName.hasMatch || checkSupplierEmail.hasMatch) {
    let errorMsg = "Duplicate at ";
    if (checkSupplierName.hasMatch) errorMsg = errorMsg + " name";
    if (checkSupplierEmail.hasMatch) {
      if (checkSupplierName.hasMatch) errorMsg = errorMsg + " and email";
      else errorMsg = errorMsg + " email";
    }
    try {
      yield put({ type: CREAT_SUPPLIER_RESPONSE, errorMsg });
    } catch (error) {
      console.log(error);
      yield put({ type: CREAT_SUPPLIER_ERROR });
    }
  } else {
    try {
      let json = yield call(createSupplier, action);
      yield put({ type: CREAT_SUPPLIER_RESPONSE, json });
    } catch (error) {
      console.log(error);
      yield put({ type: CREAT_SUPPLIER_ERROR });
    }
  }
  // try {
  //   if (!check.hasMatch) {
  //     let json = yield call(createSupplier, action);
  //     yield put({ type: CREAT_SUPPLIER_RESPONSE, json });
  //   } else yield put({ type: CREAT_SUPPLIER_RESPONSE });
  // } catch (error) {
  //   console.log(error);
  //   yield put({ type: CREAT_SUPPLIER_ERROR });
  // }
}

function* watcher() {
  yield takeEvery(CREAT_SUPPLIER_REQUEST, createSupplierFlow);
}
export default watcher;
