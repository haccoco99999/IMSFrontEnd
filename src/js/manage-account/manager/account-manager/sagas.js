import { call, put, takeEvery } from "redux-saga/effects";

import handleApiErrors from "../../../auth/api-errors";

import {
  GET_ALL_ACCOUNT_REQUEST,
  GET_ALL_ACCOUNT_RESPONSE,
  GET_ALL_ACCOUNT_ERROR,
} from "../../constants";

function getAllAccount(action) {
  const getAllAccountURL = `http://imspublicapi.herokuapp.com/api/users?CurrentPage=${action.currentPage}&SizePerPage=${action.sizePerPage}`;
  const authorization = "Bearer " + action.token;

  return fetch(getAllAccountURL, {
    method: "GET",
    headers: {
      Authorization: authorization,
      // "Bearer " +
      // "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjkyZThlZGFjLWFkNTQtNGFlNi1hZTIyLTBlMGM1MDJkYTYxMSIsIm5iZiI6MTYyNDU0NzQzMSwiZXhwIjoxNjI0NzIwMjMxLCJpYXQiOjE2MjQ1NDc0MzF9.3WQh0R850BrprGEoaulVtsilSkLA0BEqndgm_aVo7xo",
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

function* getAllAccountFlow(action) {
  try {
    let json = yield call(getAllAccount, action);

    yield put({ type: GET_ALL_ACCOUNT_RESPONSE, json });
  } catch (error) {
    console.log(error)
    yield put({ type: GET_ALL_ACCOUNT_ERROR });
  }
}

function* watcher() {
  yield takeEvery(GET_ALL_ACCOUNT_REQUEST, getAllAccountFlow);
}

export default watcher;
