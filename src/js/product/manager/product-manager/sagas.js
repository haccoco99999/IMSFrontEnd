import { call, put, takeEvery } from "redux-saga/effects";

//component
import {
  GET_ALL_PRODUCTS_REQUEST,
  GET_ALL_PRODUCTS_RESPONSE,
  GET_ALL_PRODUCTS_ERROR,
} from "../../constants";

import handleApiErrors from "../../../auth/api-errors";

const getAllProductsURL =
  "https://imspublicapi.herokuapp.com/api/product/category?CurrentPage=1&SizePerPage=5";

function getAllProducts() {
  return fetch(getAllProductsURL, {
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
      throw error
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