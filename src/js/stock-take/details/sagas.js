import { call, put, takeEvery } from "redux-saga/effects";
import handleApiErrors from "../../auth/api-errors";

import {
    GET_DETAILS_STOCKTAKE_REQUEST,
    GET_DETAILS_STOCKTAKE_RESPONSE,
    GET_DETAILS_STOCKTAKE_ERROR,
} from "./constants";

function getDetailsStocktake(action) {
  const url = `http://imspublicapi.herokuapp.com/api/stocktake/${action.id}`;
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

function* getDetailsStocktakeFlow(action) {
    try {
        let json = yield call(getDetailsStocktake,action)
        yield put({ type:GET_DETAILS_STOCKTAKE_RESPONSE,json})
    } catch (error) {
        console.log(error)
        yield put({ type:GET_DETAILS_STOCKTAKE_ERROR})
    }
}

function* watcher() {
    yield takeEvery(GET_DETAILS_STOCKTAKE_REQUEST,getDetailsStocktakeFlow)
}
export default watcher
