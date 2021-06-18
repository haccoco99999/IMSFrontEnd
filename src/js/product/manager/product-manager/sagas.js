import { call, put, takeEvery } from "redux-saga/effects";

//component
import {
  GET_ALL_PRODUCTS_REQUEST,
  GET_ALL_PRODUCTS_RESPONSE,
  GET_ALL_PRODUCTS_ERROR,
} from "../../constants";

import handleApiErrors from "../../../auth/api-errors";

const getAllProductsURL =
  "https://imspublicapi.herokuapp.com/api/product/search/all&page=1&size=5";

function getAllProducts() {
  return fetch(getAllProductsURL, {
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
      let json = yield call(getAllProducts);
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