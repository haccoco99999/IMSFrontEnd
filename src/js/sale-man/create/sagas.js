import { call, put, takeEvery } from "redux-saga/effects";
import {
  CREATE_PR_REQUEST,
  CREATE_PR_RESPONSE,
  CREATE_PR_ERROR,
} from "./constants";

import handleApiErrors from "../../auth/api-errors";

function createPurchaseRequisition(action) {
  const createPRURL =
    "https://imspublicapi.herokuapp.com/api/requisition/create";

  return fetch(createPRURL, {
    method: "POST",
    headers: {
      Authorization: "Bearer " + action.token,
      "Content-Type": "application/json",
      Origin: "",
    },
    credentials: "include",
    body: JSON.stringify(action.data),
  })
    .then((response) => handleApiErrors(response))
    .then((response) => response.json())
    .then((json) => json)
    .catch((error) => {
      throw error;
    });
}

function* createPurchaseRequisitionFlow(action) {
  try {
    let json = yield call(createPurchaseRequisition, action);

    yield put({ type: CREATE_PR_RESPONSE, json });
  } catch (error) {
    console.log(error);
    yield put({ type: CREATE_PR_ERROR });
  }
}

function* watcher() {
  yield takeEvery(CREATE_PR_REQUEST, createPurchaseRequisitionFlow);
}

export default watcher;
