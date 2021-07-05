import { call, put, takeEvery } from "redux-saga/effects";

//component
import {
  GET_ALL_GOOD_ISSUE_REQUEST,
  GET_ALL_GOOD_ISSUE_RESPONSE,
  GET_ALL_GOOD_ISSUE_ERROR,
} from "./constants";

import handleApiErrors from "../../auth/api-errors";

function getAllStocktake(action) {
  const url = `http://imspublicapi.herokuapp.com/api/goodsissue/search?CurrentPage=${action.currentPage}&SizePerPage=${action.sizePerPage}`;
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
    yield put({ type: GET_ALL_GOOD_ISSUE_RESPONSE, json });
  } catch (error) {
    console.log(error);
    yield put({ type: GET_ALL_GOOD_ISSUE_ERROR });
  }
}

function* watcher() {
  yield takeEvery(GET_ALL_GOOD_ISSUE_REQUEST, getAllStocktakeFlow);
}

export default watcher;
