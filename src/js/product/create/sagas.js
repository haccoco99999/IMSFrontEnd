import { call, put, takeEvery } from "redux-saga/effects";
import {
  CREATE_PRODUCT_REQUEST,
  CREATE_PRODUCT_RESPONSE,
  CREATE_PRODUCT_ERROR,
  GET_ALL_CATEGORY_CREATED_RESPONSE,
  GET_ALL_CATEGORY_CREATED_REQUEST,
  GET_ALL_CATEGORY_CREATED_ERROR,
} from "./constants";

import handleApiErrors from "../../auth/api-errors";

const createProductURL =
  "https://imspublicapi.herokuapp.com/api/product/create";

const getAllCategoryCreatedPageURL =
  "https://imspublicapi.herokuapp.com/api/product/category?CurrentPage=1&SizePerPage=1000";

function createProduct(action) {
  return fetch(createProductURL, {
    method: "POST",
    headers: {
      Authorization:
        "Bearer " +
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjkyZThlZGFjLWFkNTQtNGFlNi1hZTIyLTBlMGM1MDJkYTYxMSIsIm5iZiI6MTYyNDU0NzQzMSwiZXhwIjoxNjI0NzIwMjMxLCJpYXQiOjE2MjQ1NDc0MzF9.3WQh0R850BrprGEoaulVtsilSkLA0BEqndgm_aVo7xo",
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

function getAllCategoryCreatedPage() {
  return fetch(getAllCategoryCreatedPageURL, {
    method: "GET",
    headers: {
      Authorization:
        "Bearer " +
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjkyZThlZGFjLWFkNTQtNGFlNi1hZTIyLTBlMGM1MDJkYTYxMSIsIm5iZiI6MTYyNDU0NzQzMSwiZXhwIjoxNjI0NzIwMjMxLCJpYXQiOjE2MjQ1NDc0MzF9.3WQh0R850BrprGEoaulVtsilSkLA0BEqndgm_aVo7xo",
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

function* getAllCategoryCreatedPageFlow() {
  try {
    let json = yield call(getAllCategoryCreatedPage);
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
