import { call, put, takeEvery } from "redux-saga/effects";
import handleApiErrors from "../../auth/api-errors";

import {
  GET_DETAILS_SUPPLIER_REQUEST,
  GET_DETAILS_SUPPLIER_RESPONSE,
  GET_DETAILS_SUPPLIER_ERROR,
} from "./constants";

const getDetailsSupplierURL =
  "https://imspublicapi.herokuapp.com/api/suppliers/search";

function getDetailsSupplier(action) {
  return fetch(getDetailsSupplierURL, {
    method: "POST",
    headers: {
      Authorization:
        "Bearer " +
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImM3ODY3NmY2LTc1NTUtNGU3ZS05OWQ5LWE4OTcxZGI4NWU5MiIsIm5iZiI6MTYyMzU0NjI4MSwiZXhwIjoxNjI0MTUxMDgxLCJpYXQiOjE2MjM1NDYyODF9.m13k9zu5PBwB92rbqUdOBl7Mlb4jnmzPucrBPXUMafU",
      "Content-Type": "application/json",
      Origin: "",
    },
    credentials: "include",
    body: JSON.stringify({
      query: action.id,
      currentPage: 1,
      sizePerPage: 1,
    }),
  })
    .then((response) => handleApiErrors(response))
    .then((response) => response.json())
    .then((json) => json)
    .catch((error) => {
      throw error;
    });
}

function* getDetailsSupplierFlow(action){
    try {
        let json = yield call(getDetailsSupplier,action)

        yield put({type:GET_DETAILS_SUPPLIER_RESPONSE,json})
    } catch (error) {
        yield put({type:GET_DETAILS_SUPPLIER_ERROR})
    }
}

function* watcher() {
    yield takeEvery(GET_DETAILS_SUPPLIER_REQUEST,getDetailsSupplierFlow)
}

export default watcher