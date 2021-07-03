import { call, put, takeEvery } from "redux-saga/effects";
import handleApiErrors from "../../auth/api-errors";

import {
  GET_DETAILS_PRODUCT_REQUEST,
  GET_DETAILS_PRODUCT_RESPONSE,
  GET_DETAILS_PRODUCT_ERROR,
  UPDATE_PRODUCT_REQUEST,
  UPDATE_PRODUCT_RESPONSE,
  UPDATE_PRODUCT_ERROR,
  GET_DETAILS_VARIANT_REQUEST,
  GET_DETAILS_VARIANT_RESPONSE,
  GET_DETAILS_VARIANT_ERROR,
} from "./constants";

function getDetailsProduct(action) {
  const url = `http://imspublicapi.herokuapp.com/api/product/${action.id}`;
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
function updateProduct(action) {
  const url = "http://imspublicapi.herokuapp.com/api/product/update";
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

function getDetailsVariant(action) {
  const url = `http://imspublicapi.herokuapp.com/api/productvariant/${action.id}`;
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

function* getDetailsProductFlow(action) {
  try {
    let json = yield call(getDetailsProduct, action);
    yield put({ type: GET_DETAILS_PRODUCT_RESPONSE, json });
  } catch (error) {
    yield put({ type: GET_DETAILS_PRODUCT_ERROR });
  }
}

function* updateProductFlow(action) {
  try {
    let json = yield call(updateProduct, action);
    yield put({ type: UPDATE_PRODUCT_RESPONSE, json });
  } catch (error) {
    yield put({ type: UPDATE_PRODUCT_ERROR });
  }
}

function* getDetailstVariantFlow(action) {
  try {
    let json = yield call(getDetailsVariant, action);
    yield put({ type: GET_DETAILS_VARIANT_RESPONSE, json });
  } catch (error) {
    yield put({ type: GET_DETAILS_VARIANT_ERROR });
  }
}

function* watcher() {
  yield takeEvery(UPDATE_PRODUCT_REQUEST, updateProductFlow);
  yield takeEvery(GET_DETAILS_PRODUCT_REQUEST, getDetailsProductFlow);
  yield takeEvery(GET_DETAILS_VARIANT_REQUEST, getDetailstVariantFlow);
}

export default watcher;
