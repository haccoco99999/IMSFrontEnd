import { call, put, takeEvery } from "redux-saga/effects";

//component
import {
  GET_ALL_CATEGORY_REQUEST,
  GET_ALL_CATEGORY_RESPONSE,
  GET_ALL_CATEGORY_ERROR,
  GET_ALL_CATEGORY_CREATE_PAGE_REQUEST,
  GET_ALL_CATEGORY_CREATE_PAGE_RESPONSE,
} from "../../constants";

import handleApiErrors from "../../../auth/api-errors";

const getAllCategoryURL =
  "https://imspublicapi.herokuapp.com/api/product/category/page=1&size=5";

const getAllCategoryCreatedPageURL =
  "https://imspublicapi.herokuapp.com/api/product/category/page=1&size=1000";

function getAllCategory() {
  return fetch(getAllCategoryURL, {
    method: "GET",
    headers: {
      Authorization:
        "Bearer " +
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjkyZThlZGFjLWFkNTQtNGFlNi1hZTIyLTBlMGM1MDJkYTYxMSIsIm5iZiI6MTYyMzk2MDEzOSwiZXhwIjoxNjI0NTY0OTM5LCJpYXQiOjE2MjM5NjAxMzl9.RZiTcJ-QV0XBtSkgfT2R2Nvv4HaKrqFps5qtmTry5VU",
      "Content-Type": "application/json",
      Origin: "",
    },
    credentials: "include",
  })
    .then((response) => handleApiErrors(response))
    .then((response) => response.json())
    .then((json) => json)
    .catch((error) => {
      // console.error(error);
    });
}

function getAllCategoryCreatedPage() {
  return fetch(getAllCategoryCreatedPageURL, {
    method: "GET",
    headers: {
      Authorization:
        "Bearer " +
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjkyZThlZGFjLWFkNTQtNGFlNi1hZTIyLTBlMGM1MDJkYTYxMSIsIm5iZiI6MTYyMzk2MDEzOSwiZXhwIjoxNjI0NTY0OTM5LCJpYXQiOjE2MjM5NjAxMzl9.RZiTcJ-QV0XBtSkgfT2R2Nvv4HaKrqFps5qtmTry5VU",
      "Content-Type": "application/json",
      Origin: "",
    },
    credentials: "include",
  })
    .then((response) => handleApiErrors(response))
    .then((response) => response.json())
    .then((json) => json)
    .catch((error) => {
      // console.error(error);
    });
}

function* getFlow(action) {
  try {
    
      let json = yield call(getAllCategory);
      // console.log("JSON", json);
      yield put({ type: GET_ALL_CATEGORY_RESPONSE, json });
  
  } catch (error) {
    console.log(error);
    yield put({ type: GET_ALL_CATEGORY_ERROR });
  }
}


function* getCreateCategoryFlow(){
  try {
    let json = yield call(getAllCategoryCreatedPage);
      // console.log("JSON", json);
      yield put({ type: GET_ALL_CATEGORY_CREATE_PAGE_RESPONSE, json });
  } catch (error) {
    console.log(error);
    yield put({ type: GET_ALL_CATEGORY_ERROR });
  }
}

function* watcher() {
  yield takeEvery(GET_ALL_CATEGORY_REQUEST, getFlow);
  yield takeEvery(GET_ALL_CATEGORY_CREATE_PAGE_REQUEST,getCreateCategoryFlow)
}

export default watcher;
