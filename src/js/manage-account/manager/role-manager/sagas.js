import { call, put, takeEvery } from "redux-saga/effects";

import {
  GET_ALL_ROLE_REQUEST,
  GET_ALL_ROLE_RESPONSE,
  GET_ALL_ROLE_ERROR,
} from "../../constants";
import handleApiErrors from "../../../auth/api-errors";

const getAllRoleUrl = "https://imspublicapi.herokuapp.com/api/getroles";

function getAllRole() {
  return fetch(getAllRoleUrl, {
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

function* getFlow() {
  try {
    let json = yield call(getAllRole);
    console.log("KET QUA:", json);
    yield put({ type: GET_ALL_ROLE_RESPONSE, json });
  } catch (error) {
    yield put({ type: GET_ALL_ROLE_ERROR });
  }
}

function* watcher() {
  yield takeEvery(GET_ALL_ROLE_REQUEST, getFlow);
}
export default watcher;
