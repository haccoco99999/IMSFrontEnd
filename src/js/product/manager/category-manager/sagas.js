import { call, put, takeEvery } from "redux-saga/effects";

//component
import {
  GET_ALL_CATEGORY_REQUEST,
  GET_ALL_CATEGORY_RESPONSE,
  GET_ALL_CATEGORY_ERROR,
} from "../../constants";

import handleApiErrors from "../../../auth/api-errors";

const getAllCategoryURL =
  "https://imspublicapi.herokuapp.com/api/product/category/page=1&size=5";

function getAllCategory() {
  return fetch(
    getAllCategoryURL,
    {
      method: "GET",
      headers: {
        Authorization:
          "Bearer " +
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjkyZThlZGFjLWFkNTQtNGFlNi1hZTIyLTBlMGM1MDJkYTYxMSIsIm5iZiI6MTYyMzk2MDEzOSwiZXhwIjoxNjI0NTY0OTM5LCJpYXQiOjE2MjM5NjAxMzl9.RZiTcJ-QV0XBtSkgfT2R2Nvv4HaKrqFps5qtmTry5VU",
        "Content-Type": "application/json",
        Origin: "",
      },
      credentials: "include",
    }
      .then((response) => handleApiErrors(response))
      .then((response) => response.json())
      .then((json) => json)
      .catch((error) => {})
  );
}

function* getFlow(action) {
  try {
    let json = yield call(getAllCategory);

    yield put({ type: GET_ALL_CATEGORY_RESPONSE, json });
  } catch (error) {
    yield put({ type: GET_ALL_CATEGORY_ERROR });
  }
}

function* watcher() {
  yield takeEvery(GET_ALL_CATEGORY_REQUEST, getFlow);
}

export default watcher;
