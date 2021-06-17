import { call, put, takeEvery } from "redux-saga/effects";

import handleApiErrors from "../../../auth/api-errors";

import {
  GET_ALL_ACCOUNT_REQUEST,
  GET_ALL_ACCOUNT_RESPONSE,
  GET_ALL_ACCOUNT_ERROR,
} from "../../constants";

const getAllAccountURL = "https://imspublicapi.herokuapp.com/api/users";

function getAllAccount() {
  return fetch(getAllAccountURL, {
    method: "GET",
    headers: {
      Authorization:
        "Bearer " +
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjkyZThlZGFjLWFkNTQtNGFlNi1hZTIyLTBlMGM1MDJkYTYxMSIsIm5iZiI6MTYyMzk2MDEzOSwiZXhwIjoxNjI0NTY0OTM5LCJpYXQiOjE2MjM5NjAxMzl9.RZiTcJ-QV0XBtSkgfT2R2Nvv4HaKrqFps5qtmTry5VU",
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

function* getAllAccountFlow() {
  try {
    let json = yield call(getAllAccount);

    yield put({ type: GET_ALL_ACCOUNT_RESPONSE, json });
  } catch (error) {
    yield put({ type: GET_ALL_ACCOUNT_ERROR });
  }
}

function* watcher() {
  yield takeEvery(GET_ALL_ACCOUNT_REQUEST, getAllAccountFlow);
}

export default watcher;
