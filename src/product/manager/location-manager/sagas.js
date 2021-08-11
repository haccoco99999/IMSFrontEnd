import { call, put, takeEvery, takeLatest } from "redux-saga/effects";
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
  const url = `${process.env.REACT_APP_API}/package?${action.filter}`;
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

function checkDupLocation(action) {
  const url = `${process.env.REACT_APP_API}/dupcheck/location`;
  return fetch(url, {
    method: "POST",
    headers: {
      Authorization: "Bearer " + action.token,
      "Content-Type": "application/json",
      Origin: "",
    },
    credentials: "include",
    body: JSON.stringify({
      value: action.data.locationName,
    }),
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
    yield put({ type: GET_ALL_LOCATIONS_RESPONSE, json });
  } catch (error) {
    console.log(error);
    yield put({ type: GET_ALL_LOCATIONS_ERROR });
  }
}

function* checkDupLocationFlow(action, flow) {
  try {
    let resultCheckDup = yield call(checkDupLocation, action);
    return resultCheckDup;
  } catch (error) {
    console.log(error);
    if (flow === "create") yield put({ type: CREATE_LOCATION_ERROR });
    else yield put({ type: UPDATE_LOCATION_ERROR });
  }
}

function* createLocationFlow(action) {
  let check = yield call(checkDupLocationFlow, action, "create");
  try {
    if (!check.hasMatch) {
      let json = yield call(createLocation, action);
      yield put({ type: CREATE_LOCATION_RESPONSE, json });
    } else yield put({ type: CREATE_LOCATION_RESPONSE });
  } catch (error) {
    console.log(error);
    yield put({ type: CREATE_LOCATION_ERROR });
  }
}

function* updateLocationFlow(action) {
  if (action.needCheckName) {
    let check = yield call(checkDupLocationFlow, action, "update");
    try {
      if (!check.hasMatch) {
        let json = yield call(updateLocation, action);
        yield put({ type: UPDATE_LOCATION_RESPONSE, json });
      } else yield put({ type: UPDATE_LOCATION_RESPONSE });
    } catch (error) {
      console.log(error);
      yield put({ type: UPDATE_LOCATION_ERROR });
    }
  } else {
    try {
      let json = yield call(updateLocation, action);
      yield put({ type: UPDATE_LOCATION_RESPONSE, json });
    } catch (error) {
      console.log(error);
      yield put({ type: UPDATE_LOCATION_ERROR });
    }
  }
}

function* watcher() {
  yield takeEvery(GET_ALL_LOCATIONS_REQUEST, getAllLocationsFlow);
  yield takeEvery(CREATE_LOCATION_REQUEST, createLocationFlow);
  yield takeEvery(UPDATE_LOCATION_REQUEST, updateLocationFlow);
}

export default watcher;
