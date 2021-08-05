import { call, put, takeEvery } from "redux-saga/effects";
import handleApiErrors from "../../auth/api-errors";

import {
  GET_DETAILS_PR_REQUEST,
  GET_DETAILS_PR_RESPONSE,
  GET_DETAILS_PR_ERROR,
  SUBMIT_PR_REQUEST,
  SUBMIT_PR_RESPONSE,
  SUBMIT_PR_ERROR,
  UPDATE_PR_REQUEST,
  UPDATE_PR_ERROR,
  UPDATE_PR_RESPONSE,
  DELETE_PR_REQUEST,
  DELETE_PR_RESPONSE,
  DELETE_PR_ERROR,
} from "./constants";

function getDetailsPR(action) {
  const url = `${process.env.REACT_APP_API}/purchaseorder/number/${action.id}`
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

function submitPR(action) {
  const data = {
    id: action.id,
  };
  const submitPRURL =
    `${process.env.REACT_APP_API}/requisition/submit`;

  return fetch(submitPRURL, {
    method: "POST",
    headers: {
      Authorization: "Bearer " + action.token,
      "Content-Type": "application/json",
      Origin: "",
    },
    credentials: "include",
    body: JSON.stringify(data),
  })
    .then((response) => handleApiErrors(response))
    .then((response) => response)

    .catch((error) => {
      throw error;
    });
}

function updatePR(action) {
  const url = `${process.env.REACT_APP_API}/requisition/update`;
  return fetch(url, {
    method: "PUT",
    headers: {
      Authorization: "Bearer " + action.token,
      "Content-Type": "application/json",
      Origin: "",
    },
    credentials: "include",
    body: JSON.stringify(action.data),
  })
    .then((response) => handleApiErrors(response))
    .then((response) => response.json)
    .catch((error) => {
      throw error;
    });
}

function deletePR(action) {
  const url = `${process.env.REACT_APP_API}/purchaseorder/reject`;

  return fetch(url, {
    method: "PUT",
    headers: {
      Authorization: "Bearer " + action.token,
      "Content-Type": "application/json",
      Origin: "",
    },
    credentials: "include",
    body: JSON.stringify(action.data)
  })
    .then((response) => handleApiErrors(response))
    .then((response) => response)
    .catch((error) => {
      throw error;
    });
}

function* getDetailsPRFlow(action) {
  try {
    let json = yield call(getDetailsPR, action);

    yield put({ type: GET_DETAILS_PR_RESPONSE, json });
  } catch (error) {
    yield put({ type: GET_DETAILS_PR_ERROR });
  }
}

function* submitPRFlow(action) {
  try {
    let json = yield call(submitPR, action);
    console.log("KET QUA", json);
    yield put({ type: SUBMIT_PR_RESPONSE, json });
  } catch (error) {
    console.log("submitPRFlow", error);
    yield put({ type: SUBMIT_PR_ERROR });
  }
}

function* updatePRFlow(action) {
  try {
    let json = yield call(updatePR, action);
    yield put({ type: UPDATE_PR_RESPONSE, json });
  } catch (error) {
    console.log("updatePRFlow", error);
    yield put({ type: UPDATE_PR_ERROR });
  }
}

function* deletePRFlow(action) {
  try {
    let json = yield call(deletePR, action);
    console.log("delete", json);
    yield put({ type: DELETE_PR_RESPONSE, json });
  } catch (error) {
    console.log(error);
    yield put({ type: DELETE_PR_ERROR });
  }
}

function* watcher() {
  yield takeEvery(GET_DETAILS_PR_REQUEST, getDetailsPRFlow);
  yield takeEvery(SUBMIT_PR_REQUEST, submitPRFlow);
  yield takeEvery(UPDATE_PR_REQUEST, updatePRFlow);
  yield takeEvery(DELETE_PR_REQUEST, deletePRFlow);
}

export default watcher;
