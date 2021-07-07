import { call, put, takeEvery } from "redux-saga/effects";
import handleApiErrors from "../../auth/api-errors";
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
