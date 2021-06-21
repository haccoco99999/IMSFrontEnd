import { call, put, takeEvery } from "redux-saga/effects";
import handleApiErrors from '../../auth/api-errors'
import {
  GET_GR_DETAILS_REQUEST,
  GET_GR_DETAILS_RESPONSE,
  GET_GR_DETAILS_ERROR,
} from "./constants";

const getGoodsReceiptDetailsURL =
  "https://imspublicapi.herokuapp.com/api/goodsreceipt/id/";

function getGoodsReceiptDetails(action) {
  return fetch(getGoodsReceiptDetailsURL + action.id, {
    method: "GET",
    headers: {
      Authorization:
        "Bearer " +
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImM3ODY3NmY2LTc1NTUtNGU3ZS05OWQ5LWE4OTcxZGI4NWU5MiIsIm5iZiI6MTYyMzU0NjI4MSwiZXhwIjoxNjI0MTUxMDgxLCJpYXQiOjE2MjM1NDYyODF9.m13k9zu5PBwB92rbqUdOBl7Mlb4jnmzPucrBPXUMafU",
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

function* getGoodsReceiptDetailsFlow(action) {
  try {
    let json = yield call(getGoodsReceiptDetails, action);
    //console.log(json);
    yield put({ type: GET_GR_DETAILS_RESPONSE, json });
  } catch (error) {
    console.log(error);
    yield put({ type: GET_GR_DETAILS_ERROR });
  }
}

function* watcher() {
  yield takeEvery(GET_GR_DETAILS_REQUEST, getGoodsReceiptDetailsFlow);
}

export default watcher;
