import { call, put, takeEvery } from "redux-saga/effects";
import handleApiErrors from "../../auth/api-errors";

import {
  GET_DETAILS_PR_REQUEST,
  GET_DETAILS_PR_RESPONSE,
  GET_DETAILS_PR_ERROR,
} from "./constants";

const getDetailsPRURL =
  "https://imspublicapi.herokuapp.com/api/purchaseorder/number/";

function getDetailsPR(action) {
  return fetch(getDetailsPRURL + action.id, {
    method: "GET",
    headers: {
      Authorization:
        "Bearer " +
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImU5ZjUxNWNjLTcyZjQtNDI3Ni1iOWE5LThhM2EzMTA0MTUwMiIsIm5iZiI6MTYyNDE3NDUzNywiZXhwIjoxNjI0MzQ3MzM3LCJpYXQiOjE2MjQxNzQ1Mzd9.rKQllv-JADJYAYcBoIkGxRnSwgMKknKk1xlZTJwxXmc",
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

function* getDetailsPRFlow(action) {
  try {
    let json = yield call(getDetailsPR, action);

    yield put({ type: GET_DETAILS_PR_RESPONSE, json });
  } catch (error) {
    yield put({ type: GET_DETAILS_PR_ERROR });
  }
}

function* watcher() {
  yield takeEvery(GET_DETAILS_PR_REQUEST, getDetailsPRFlow);
}

export default watcher;
