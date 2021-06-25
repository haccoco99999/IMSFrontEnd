import { call, put, takeEvery } from "redux-saga/effects";
import handleApiErrors from "../../auth/api-errors";

import { GET_SP_REQUEST, GET_SP_RESPONSE, GET_SP_ERROR } from "./constants";

const getAllSuppliersURL =
  "https://imspublicapi.herokuapp.com/api/suppliers/all";

function getAllSuppliers(action) {
  return fetch(getAllSuppliersURL, {
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
      currentPage: action.currentPage,
      sizePerPage: action.sizePerPage,
    }),
  })
    .then((response) => handleApiErrors(response))
    .then((response) => response.json())
    .then((json) => json)
    .catch((error) => {
      throw error;
    });
}

function* getAllSuppliersFlow(action) {
  try {
    let json = yield call(getAllSuppliers, action);

    yield put({ type: GET_SP_RESPONSE, json });
  } catch (error) {
    yield put({ type: GET_SP_ERROR });
  }
}

function* watcher() {
  yield takeEvery(GET_SP_REQUEST, getAllSuppliersFlow);
}
export default watcher;
