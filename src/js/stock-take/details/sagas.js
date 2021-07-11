import { call, put, takeEvery,takeLatest } from "redux-saga/effects";
import handleApiErrors from "../../auth/api-errors";

import {
  GET_DETAILS_STOCKTAKE_REQUEST,
  GET_DETAILS_STOCKTAKE_RESPONSE,
  GET_DETAILS_STOCKTAKE_ERROR,
  REJECT_STOCKTAKE_REQUEST,
  REJECT_STOCKTAKE_RESPONSE,
  REJECT_STOCKTAKE_ERROR,
  SUBMIT_REQUEST,
  SUBMIT_ERROR,
  SUBMIT_RESPONSE,
  ADJUST_REQUEST,
  ADJUST_RESPONSE,
  ADJUST_ERROR,
  UPDATE_STOCKTAKE_REQUEST,
  UPDATE_STOCKTAKE_RESPONSE,
  UPDATE_STOCKTAKE_ERROR,
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

function submitStocktake(action) {
  const url = "http://imspublicapi.herokuapp.com/api/stocktake/submit";
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
    .then((response) => response)
    .catch((error) => {
      throw error;
    });
}

function adjustStocktake(action) {
  const url = "http://imspublicapi.herokuapp.com/api/stocktake/adjust";
  return fetch(url, {
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
    .then((response) => response)
    .catch((error) => {
      throw error;
    });
}

function rejectStocktake(action) {
  const url = "http://imspublicapi.herokuapp.com/api/stocktake/reject";
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
    .then((response) => response)
    .catch((error) => {
      throw error;
    });
}

function updateStocktake(action) {
  const url = "http://imspublicapi.herokuapp.com/api/stocktake/add";
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
    .then((response) => response)
    .catch((error) => {
      throw error;
    });
}

function* getDetailsStocktakeFlow(action) {
  try {
    let json = yield call(getDetailsStocktake, action);
    yield put({ type: GET_DETAILS_STOCKTAKE_RESPONSE, json });
  } catch (error) {
    console.log(error);
    yield put({ type: GET_DETAILS_STOCKTAKE_ERROR });
  }
}

function* submitStocktakeFlow(action) {
  try {
    let json = yield call(submitStocktake, action);
    yield put({ type: SUBMIT_RESPONSE, json });
  } catch (error) {
    console.log(error);
    yield put({ type: SUBMIT_ERROR });
  }
}

function* rejectStocktakeFlow(action) {
  try {
    let json = yield call(rejectStocktake, action);
    yield put({ type: REJECT_STOCKTAKE_RESPONSE, json });
  } catch (error) {
    console.log(error);
    yield put({ type: REJECT_STOCKTAKE_ERROR });
  }
}

function* adjustStocktakeFlow(action) {
  try {
    let json = yield call(adjustStocktake, action);
    yield put({ type: ADJUST_RESPONSE, json });
  } catch (error) {
    console.log(error);
    yield put({ type: ADJUST_ERROR });
  }
}

function* updateStocktakeFlow(action) {
  try {
    let json = yield call(updateStocktake, action);
    yield put({ type: UPDATE_STOCKTAKE_RESPONSE, json });
  } catch (error) {
    console.log(error);
    yield put({ type: UPDATE_STOCKTAKE_ERROR });
  }
}

function* watcher() {
  yield takeLatest(GET_DETAILS_STOCKTAKE_REQUEST, getDetailsStocktakeFlow);
  yield takeEvery(REJECT_STOCKTAKE_REQUEST, rejectStocktakeFlow);
  yield takeEvery(ADJUST_REQUEST, adjustStocktakeFlow);
  yield takeEvery(SUBMIT_REQUEST, submitStocktakeFlow);
  yield takeEvery(UPDATE_STOCKTAKE_REQUEST, updateStocktakeFlow);
}
export default watcher;
