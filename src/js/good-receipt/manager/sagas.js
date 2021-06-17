import { call, put, takeEvery } from "redux-saga/effects";

// component
import handleApiErrors from "../../auth/api-errors";
import {
  SEARCH_GOODS_RECEIPT,
  SEARCH_GOODS_RECEIPT_ERROR,
  SEARCH_GOODS_RECEIPT_SUCCESS,
} from "./constant";

const baseUrl =
  "https://imspublicapi.herokuapp.com/api/goodsreceipt/all&page=1&size=5";
const getListGoodReceiptUrl = baseUrl + "/api/goodsreceipt/all&?page=1&size=5";
const token = "";

function searchGoodsReceipt() {
  return fetch(baseUrl, {
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
    .catch((error) => {});
}

function* getFlow(action) {
  try {
    let json = yield call(searchGoodsReceipt);
    // console.log("KET QUA:", json);

    yield put({ type: SEARCH_GOODS_RECEIPT_SUCCESS, json });
  } catch (error) {
    console.log("SEARCH_GOODS_RECEIPT_ERROR", error);
    yield put({ type: SEARCH_GOODS_RECEIPT_ERROR });
  }
}

function* watcher() {
  yield takeEvery(SEARCH_GOODS_RECEIPT, getFlow);
}

export default watcher;
