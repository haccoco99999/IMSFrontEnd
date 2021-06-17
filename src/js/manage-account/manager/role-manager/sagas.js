import { call, put, takeEvery } from "redux-saga/effects";

import {
  GET_ALL_ROLE_REQUEST,
  GET_ALL_ROLE_RESPONSE,
  GET_ALL_ROLE_ERROR,
} from "../../constains";
import handleApiErrors from "../../../auth/api-errors";


const getAllRoleUrl = "https://imspublicapi.herokuapp.com/api/getroles";

function getAllRole() {
  return fetch(getAllRoleUrl, {
    method: "GET",
    headers: {
      Authorization:
        "Bearer " +
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjkwMTJlNGRlLTJiZmMtNGRmOC05ODU5LTYwZjEwNDk2NTcyNyIsIm5iZiI6MTYyMzg0MzE2NCwiZXhwIjoxNjI0NDQ3OTY0LCJpYXQiOjE2MjM4NDMxNjR9.xu_UPSKwIMBryuoq8hv-mcYRzG7AdjqcwFmK6fLKtkw",
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
