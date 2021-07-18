import { call, put, takeEvery } from "redux-saga/effects";
import {
  CREATE_PRODUCT_REQUEST,
  CREATE_PRODUCT_RESPONSE,
  CREATE_PRODUCT_ERROR,
  GET_ALL_CATEGORY_CREATED_RESPONSE,
  GET_ALL_CATEGORY_CREATED_REQUEST,
  GET_ALL_CATEGORY_CREATED_ERROR,
  // GET_BRAND_REQUEST,
  // GET_BRAND_RESPONSE,
  // GET_BRAND_ERROR,
} from "./constants";

import handleApiErrors from "../../auth/api-errors";

function createProduct(action) {
  const createProductURL = `${process.env.REACT_APP_API}/product/create`;

  return fetch(createProductURL, {
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

function getAllCategoryCreatedPage(action) {
  const getAllCategoryCreatedPageURL = `${process.env.REACT_APP_API}/category?CurrentPage=0&SizePerPage=0`;
  return fetch(getAllCategoryCreatedPageURL, {
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

function getAllBrand(action) {
  const url = `${process.env.REACT_APP_API}/product/brands?CurrentPage=0&SizePerPage=0`;
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

function* createProductFlow(action) {
  try {
    let json = yield call(createProduct, action);
    yield put({ type: CREATE_PRODUCT_RESPONSE, json });
  } catch (error) {
    console.log(error);
    yield put({ type: CREATE_PRODUCT_ERROR });
  }
}

function* getAllCategoryCreatedPageFlow(action) {
  try {
    let json = yield call(getAllCategoryCreatedPage, action);
    console.log(json);

    yield put({ type: GET_ALL_CATEGORY_CREATED_RESPONSE, json });
  } catch (error) {
    console.log(error);

    yield put({ type: GET_ALL_CATEGORY_CREATED_ERROR });
  }
}

function* watcher() {
  yield takeEvery(CREATE_PRODUCT_REQUEST, createProductFlow);

  yield takeEvery(
    GET_ALL_CATEGORY_CREATED_REQUEST,
    getAllCategoryCreatedPageFlow
  );
}

export default watcher;
