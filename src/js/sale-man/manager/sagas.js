import { call, put, takeEvery } from "redux-saga/effects";
import handleApiErrors from "../../auth/api-errors";

//components
import {
  GET_ALL_PR_REQUEST,
  GET_ALL_PR_RESPONSE,
  GET_ALL_PR_ERROR,
} from "./constants";

const getAllPurchaseRequisitionURL =
  "https://imspublicapi.herokuapp.com/api/purchaseorder/search";

function getAllPurchaseRequisition(action) {
  return fetch(getAllPurchaseRequisitionURL, {
    method: "GET",
    headers: {
      Authorization:
        "Bearer " +
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImM3ODY3NmY2LTc1NTUtNGU3ZS05OWQ5LWE4OTcxZGI4NWU5MiIsIm5iZiI6MTYyMzU0NjI4MSwiZXhwIjoxNjI0MTUxMDgxLCJpYXQiOjE2MjM1NDYyODF9.m13k9zu5PBwB92rbqUdOBl7Mlb4jnmzPucrBPXUMafU",
      "Content-Type": "application/json",
      Origin: "",
    },
    credentials: "include",
    body: JSON.stringify({
      searchQuery: "",
      currentPage: action.currentPage,
      sizePerPage: action.sizePerPage,
      poSearchFilter: {
        status: -99,
      },
    }),
  })
    .then((response) => handleApiErrors(response))
    .then((response) => response.json())
    .then((json) => json)
    .catch((error) => {
      throw error;
    });
}

function* getAllPurchaseRequisitionFlow(action) {
  try {
    let json = yield call(getAllPurchaseRequisition, action);

    yield put({ type: GET_ALL_PR_RESPONSE, json });
  } catch (error) {
    console.log(error);

    yield put({ type: GET_ALL_PR_ERROR });
  }
}

function* watcher() {
  yield takeEvery(GET_ALL_PR_REQUEST, getAllPurchaseRequisitionFlow);
}

export default watcher;
