import { call, put, takeEvery, takeLatest } from "redux-saga/effects";
import handleApiErrors from "../../auth/api-errors";

import {
  CREATE_STOCKTAKE_REQUEST,
  CREATE_STOCKTAKE_RESPONSE,
  CREATE_STOCKTAKE_ERROR,
  GET_LOCATION_REQUEST,
  GET_LOCATION_RESPONSE,
  GET_LOCATION_ERROR,
  GET_PACKAGE_REQUEST,
  GET_PACKAGE_RESPONSE,
  GET_PACKAGE_ERROR,
} from "./constants";

function createStocktake(action) {
  const url = "http://imspublicapi.herokuapp.com/api/stocktake/add";
  return fetch(url, {
    method: "PUT",
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

function getAllLocations(action) {
  const url = `${process.env.REACT_APP_API}/package?IsLocationOnly=true&CurrentPage=0&SizePerPage=0`;
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

function getPackages(action) {
  const url = `${process.env.REACT_APP_API}/package?SearchQuery=${action.id}&IsLocationOnly=false&CurrentPage=0&SizePerPage=0`;
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
function* createStocktakeFlow(action) {
  try {
    let json = yield call(createStocktake, action);
    yield put({ type: CREATE_STOCKTAKE_RESPONSE, json });
  } catch (error) {
    console.log(error);
    yield put({ type: CREATE_STOCKTAKE_ERROR });
  }
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
function* getPackagesFlow(action) {
  try {
    let json = yield call(getPackages, action);
    yield put({ type: GET_PACKAGE_RESPONSE, json });
  } catch (error) {
    console.log(error);
    yield put({ type: GET_PACKAGE_ERROR });
  }
}
function* watcher() {
  yield takeEvery(CREATE_STOCKTAKE_REQUEST, createStocktakeFlow);
  yield takeLatest(GET_LOCATION_REQUEST, getAllLocationsFlow);
  yield takeLatest(GET_PACKAGE_REQUEST, getPackagesFlow);
}

export default watcher;
