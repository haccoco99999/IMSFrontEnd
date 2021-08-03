import { call, put, takeEvery, takeLatest } from "redux-saga/effects";
import handleApiErrors from "../../auth/api-errors";

//components
import {
  GET_ALL_STOCKTAKE_REQUEST,
  GET_ALL_STOCKTAKE_RESPONSE,
  GET_ALL_STOCKTAKE_ERROR,
} from "./constants";

const baseUrl = process.env.REACT_APP_API

function getAllStocktake(action) {
  console.log(baseUrl);
  const url = `${baseUrl}/stocktake/search?${action.filter}`;
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
function* getAllStocktakeFlow(action) {
  try {
    let json = yield call(getAllStocktake, action);
    yield put({ type: GET_ALL_STOCKTAKE_RESPONSE, json });
  } catch (error) {
    console.log(error);
    yield put({ type: GET_ALL_STOCKTAKE_ERROR });
  }
}

function* watcher() {
  // yield debounce(500,GET_ALL_STOCKTAKE_REQUEST, getAllStocktakeFlow);
  yield takeLatest(GET_ALL_STOCKTAKE_REQUEST, getAllStocktakeFlow);
}

export default watcher;
