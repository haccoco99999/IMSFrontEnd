import { call, put, takeEvery } from "redux-saga/effects";

//component
import {
  GET_ALL_PRODUCTS_REQUEST,
  GET_ALL_PRODUCTS_RESPONSE,
  GET_ALL_PRODUCTS_ERROR,
} from "../../constants";

import handleApiErrors from "../../../auth/api-errors";

function getAllProducts(action) {
  console.log(action);
  const getAllProductsURL = `http://imspublicapi.herokuapp.com/api/product/search?CurrentPage=${action.currentPage}&SizePerPage=${action.sizePerPage}`;

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

function* watcher() {
  yield takeEvery(GET_ALL_PRODUCTS_REQUEST, getFlow);
}

export default watcher;
