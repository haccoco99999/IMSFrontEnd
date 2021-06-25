import { call, put, takeEvery } from "redux-saga/effects";
import {
  CREATE_PR_REQUEST,
  CREATE_PR_RESPONSE,
  CREATE_PR_ERROR,
} from "./constants";

import handleApiErrors from "../../auth/api-errors";

const createPRURL = "https://imspublicapi.herokuapp.com/api/requisition/update";

function createPurchaseRequisition(action) {
  console.log(JSON.stringify(action.data));

  return fetch(createPRURL, {
    method: "PUT",
    headers: {
      Authorization:
        "Bearer " +
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImU5ZjUxNWNjLTcyZjQtNDI3Ni1iOWE5LThhM2EzMTA0MTUwMiIsIm5iZiI6MTYyNDQyMzUxNywiZXhwIjoxNjI0NTk2MzE3LCJpYXQiOjE2MjQ0MjM1MTd9.rKbu5lAjeSK3eMARoQgcT4TFNStoHXsvH3tXdN_b5H4",
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
    console.log(error)
    yield put({ type: CREATE_PR_ERROR });
  }
}

function* watcher() {
  yield takeEvery(CREATE_PR_REQUEST, createPurchaseRequisitionFlow);
}

export default watcher;
