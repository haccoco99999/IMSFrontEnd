import { call, put, takeEvery } from "redux-saga/effects";
import handleApiErrors from "../../auth/api-errors";

import { GET_SP_REQUEST, GET_SP_RESPONSE, GET_SP_ERROR } from "./constants";

const getAllSuppliersURL =
  "https://imspublicapi.herokuapp.com/api/suppliers/search?CurrentPage=1&SizePerPage=5";

function getAllSuppliers(action) {
  return fetch(getAllSuppliersURL, {
    method: "GET",
    headers: {
      Authorization:
        "Bearer " +
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjkyZThlZGFjLWFkNTQtNGFlNi1hZTIyLTBlMGM1MDJkYTYxMSIsIm5iZiI6MTYyMzk2MDEzOSwiZXhwIjoxNjI0NTY0OTM5LCJpYXQiOjE2MjM5NjAxMzl9.RZiTcJ-QV0XBtSkgfT2R2Nvv4HaKrqFps5qtmTry5VU",
      "Content-Type": "application/json",
      Origin: "",
    },
    credentials: "include",
    body: JSON.stringify({
      currentPage: action.currentPage,
      sizePerPage: action.sizePerPage,
    }),
  })
    .then((response) => handleApiErrors(response))
    .then((response) => response.json())
    .then((json) => json)
    .catch((error) => {
      throw error;
    });
}

function* getAllSuppliersFlow(action) {
  try {
    let json = yield call(getAllSuppliers, action);

    yield put({ type: GET_SP_RESPONSE, json });
  } catch (error) {
    yield put({ type: GET_SP_ERROR });
  }
}

function* watcher() {
  yield takeEvery(GET_SP_REQUEST, getAllSuppliersFlow);
}
export default watcher;
