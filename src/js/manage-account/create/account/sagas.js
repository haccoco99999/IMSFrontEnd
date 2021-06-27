import { call, put, takeEvery } from "redux-saga/effects";

import handleApiErrors from "../../../auth/api-errors";

import {
  CREATE_ACC_REQUEST,
  CREATE_ACC_RESPONSE,
  CREATE_ACC_ERR,
} from "./constants";

function createProduct(action) {
  const url = "http://imspublicapi.herokuapp.com/api/registration";

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
    .then((response) => response.json())
    .then((json) => json)
    .catch((error) => {
      throw error;
    });
}

function* CreateProductFlow(action) {
  try {
    let json = yield call(createProduct, action);
    yield put({ type: CREATE_ACC_RESPONSE, json });
  } catch (error) {
    yield put({ type: CREATE_ACC_ERR });
  }
}

function* watcher() {
  yield takeEvery(CREATE_ACC_REQUEST, CreateProductFlow);
}

export default watcher;
