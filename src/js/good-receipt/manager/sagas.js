import { call, put, takeEvery, takeLatest } from "redux-saga/effects";

// component
import handleApiErrors from "../../auth/api-errors";
import { SEARCH_GOODS_RECEIPT, SEARCH_GOODS_RECEIPT_ERROR, SEARCH_GOODS_RECEIPT_SUCCESS } from "./constant";

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
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjhlNzBiODJjLWMzOWUtNDZmYy1iYTBiLWNiYWE3ODBmYTY5YiIsIm5iZiI6MTYyMzY4NDY0NiwiZXhwIjoxNjI0Mjg5NDQ2LCJpYXQiOjE2MjM2ODQ2NDZ9.Ov0NWFNy8NepEgFLPFI6ZQ8boLy9Po-L2bJVIiochs0",
      "Content-Type": "application/json",
      Origin: "",
    },
    credentials: "include",
  })
    .then((response) => handleApiErrors(response))
    .then(response => response.json())
    .then(json => json)
    .catch((error) => {
      //
      console.log("Loi error get ", error);
    });
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
