import { call, put, takeEvery } from "redux-saga/effects";

import {
  GET_ALL_NOTIFICATIONS_REQUEST,
  GET_ALL_NOTIFICATIONS_RESPONSE,
  GET_ALL_NOTIFICATIONS_ERROR,
} from "./constant";

import handleApiErrors from "../auth/api-errors";

function getAllNotifications(action) {
  const url = `${process.env.REACT_APP_API}/notification?CurrentPage=1&SizePerPage=6&Channel=Manager`;
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

function* getAllNotificationsFlow(action) {
  try {
    let json = yield call(getAllNotifications, action);

    yield put({ type: GET_ALL_NOTIFICATIONS_RESPONSE, json });
  } catch (error) {
    console.log(error);

    yield put({ type: GET_ALL_NOTIFICATIONS_ERROR });
  }
}

function* watcher() {
  yield takeEvery(GET_ALL_NOTIFICATIONS_REQUEST, getAllNotificationsFlow);
}

export default watcher;
