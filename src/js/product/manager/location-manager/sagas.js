import { call, put, takeEvery } from "redux-saga/effects";
import handleApiErrors from "../../../auth/api-errors";

import {
  GET_ALL_LOCATIONS_REQUEST,
  GET_ALL_LOCATIONS_RESPONSE,
  GET_ALL_LOCATIONS_ERROR,
  CREATE_LOCATION_REQUEST,
  CREATE_LOCATION_ERROR,
  CREATE_LOCATION_RESPONSE,
  UPDATE_LOCATION_REQUEST,
  UPDATE_LOCATION_ERROR,
  UPDATE_LOCATION_RESPONSE,
} from "../constants";

function getAllLocations(action) {
  const url = `${process.env.REACT_APP_API}/package?IsLocationOnly=true&CurrentPage=${action.currentPage}&SizePerPage=${action.sizePerPage}`;
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

function createLocation(action) {
  const url = `${process.env.REACT_APP_API}/location/create`;
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
function updateLocation(action) {
  const url = `${process.env.REACT_APP_API}/location/update`;
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
function* getAllLocationsFlow(action) {
  try {
    let json = yield call(getAllLocations, action);
    yield put({ type: GET_ALL_LOCATIONS_RESPONSE, json });
  } catch (error) {
    console.log(error);
    yield put({ type: GET_ALL_LOCATIONS_ERROR });
  }
}

function* createLocationFlow(action) {
  try {
    let json = yield call(createLocation, action);
    yield put({ type:CREATE_LOCATION_RESPONSE , json });
  } catch (error) {
    console.log(error);
    yield put({ type: CREATE_LOCATION_ERROR });
  }
}

function* updateLocationFlow(action) {
  try {
    let json = yield call(getAllLocations, action);
    yield put({ type: UPDATE_LOCATION_RESPONSE, json });
  } catch (error) {
    console.log(error);
    yield put({ type: UPDATE_LOCATION_ERROR });
  }
}

function* watcher() {
  yield takeEvery(GET_ALL_LOCATIONS_REQUEST, getAllLocationsFlow);
  yield takeEvery(CREATE_LOCATION_REQUEST,createLocationFlow);
  yield takeEvery(UPDATE_LOCATION_REQUEST,updateLocationFlow)
}

export default watcher;