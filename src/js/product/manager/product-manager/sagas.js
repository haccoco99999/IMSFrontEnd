import { call, put, takeEvery } from "redux-saga/effects";

//component
import {
  GET_ALL_PRODUCTS_REQUEST,
  GET_ALL_PRODUCTS_RESPONSE,
  GET_ALL_PRODUCTS_ERROR,
  GET_ALL_UPDATES_REQUEST,
  GET_ALL_UPDATES_RESPONSE,
  GET_ALL_UPDATES_ERROR,
} from "../constants";

import handleApiErrors from "../../../auth/api-errors";

function getAllProducts(action) {
  const getAllProductsURL = `${process.env.REACT_APP_API}/product/search?CurrentPage=${action.currentPage}&SizePerPage=${action.sizePerPage}`;

  return fetch(getAllProductsURL, {
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

function getAllUpdateProduct(action) {
  const url = `${process.env.REACT_APP_API}/product/updatemessage`;
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
function* getFlow(action) {
  try {
    let json = yield call(getAllProducts, action);
    //   console.log("JSON", json);
    yield put({ type: GET_ALL_PRODUCTS_RESPONSE, json });
  } catch (error) {
    console.log(error);
    yield put({ type: GET_ALL_PRODUCTS_ERROR });
  }
}

function* getAllUpdateProductFlow(action) {
  try {
    let json = yield call(getAllUpdateProduct, action);
    //   console.log("JSON", json);
    yield put({ type: GET_ALL_UPDATES_RESPONSE, json });
  } catch (error) {
    console.log(error);
    yield put({ type: GET_ALL_UPDATES_ERROR });
  }
}

function* watcher() {
  yield takeEvery(GET_ALL_PRODUCTS_REQUEST, getFlow);
  yield takeEvery(GET_ALL_UPDATES_REQUEST, getAllUpdateProductFlow);
}

export default watcher;
