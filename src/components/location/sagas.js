import { call, put, takeEvery } from "redux-saga/effects";
import handleApiErrors from "../../auth/api-errors";

import {
  GET_LOCATION_REQUEST,
  GET_LOCATION_RESPONSE,
  GET_LOCATION_ERROR,
} from "./constants";

function getAllLocations(action) {
  const url = `${process.env.REACT_APP_API}/package?CurrentPage=0&SizePerPage=0&IsLocationOnly=true`;
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

function* getAllLocationsFlow(action) {
  try {
    let json = yield call(getAllLocations, action);
    yield put({ type: GET_LOCATION_RESPONSE, json });
  } catch (error) {
    console.log(error);
    yield put({ type: GET_LOCATION_ERROR });
  }
}

function* watcher() {
  yield takeEvery(GET_LOCATION_REQUEST, getAllLocationsFlow);
}

export default watcher;
