import { call, put, takeEvery } from "redux-saga/effects";

//component
import {
  GET_ALL_CATEGORY_REQUEST,
  GET_ALL_CATEGORY_RESPONSE,
  GET_ALL_CATEGORY_ERROR,
  CREATE_CATEGORY_REQUEST,
  CREATE_CATEGORY_RESPONSE,
  CREATE_CATEGORY_ERROR,
  UPDATE_CATEGORY_REQUEST,
  UPDATE_CATEGORY_RESPONSE,
  UPDATE_CATEGORY_ERROR,
} from "../constants";

import handleApiErrors from "../../../auth/api-errors";

function getAllCategory(action) {
  const url = `http://imspublicapi.herokuapp.com/api/category?CurrentPage=${action.currentPage}&SizePerPage=${action.sizePerPage}`;

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

function createCategory(action) {
  const url = "http://imspublicapi.herokuapp.com/api/category/create";
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
    .then((response) => response)
    .catch((error) => {
      throw error;
    });
}

function updateCategory(action) {
  const url = "http://imspublicapi.herokuapp.com/api/category/update";
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

function* getAllCategoryFlow(action) {
  try {
    let json = yield call(getAllCategory, action);
    // console.log("JSON", json);
    yield put({ type: GET_ALL_CATEGORY_RESPONSE, json });
  } catch (error) {
    console.log(error);
    yield put({ type: GET_ALL_CATEGORY_ERROR });
  }
}

function* createCategoryFlow(action) {
  try {
    let json = yield call(createCategory, action);
    yield put({ type: CREATE_CATEGORY_RESPONSE, json });
  } catch (error) {
    yield put({ type: CREATE_CATEGORY_ERROR });
  }
}

function* updateCategoryFlow(action) {
  try {
    let json = yield call(updateCategory, action);
    yield put({ type: UPDATE_CATEGORY_RESPONSE, json });
  } catch (error) {
    yield put({ type: UPDATE_CATEGORY_ERROR });
  }
}

function* watcher() {
  yield takeEvery(GET_ALL_CATEGORY_REQUEST, getAllCategoryFlow);
  yield takeEvery(CREATE_CATEGORY_REQUEST, createCategoryFlow);
  yield takeEvery(UPDATE_CATEGORY_REQUEST, updateCategoryFlow);
}

export default watcher;
