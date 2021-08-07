import { call, put, takeEvery } from "redux-saga/effects";

// component
import handleApiErrors from "../../auth/api-errors";
import {
  SEARCH_GOODS_RECEIPT,
  SEARCH_GOODS_RECEIPT_ERROR,
  SEARCH_GOODS_RECEIPT_SUCCESS,
} from "./constant";

function getAllhGoodsReceipt(action) {
  const url = `${process.env.REACT_APP_API}/goodsreceipt/search?${action.filter}`;

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

function* getFlow(action) {
  try {
    let json = yield call(getAllhGoodsReceipt, action);
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
