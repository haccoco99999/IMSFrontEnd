import { call, put, takeEvery } from "redux-saga/effects";
import handleApiErrors from "../../auth/api-errors";

import {
  CREATE_GOODISSUE_REQUEST,
  CREATE_GOODISSUE_RESPONSE,
  CREATE_GOODISSUE_ERROR,
  GET_LOCATION_REQUEST,
  GET_LOCATION_RESPONSE,
  GET_LOCATION_ERROR,
} from "./constants";

function createStocktake(action) {
  const url = "";
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
  const url="http://imspublicapi.herokuapp.com/api/package?CurrentPage=0&SizePerPage=0&IsLocationOnly=true"
  return fetch(url,{
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
    yield put({ type: CREATE_GOODISSUE_RESPONSE, json });
  } catch (error) {
    console.log(error);
    yield put({ type: CREATE_GOODISSUE_ERROR });
  }
}

function* getAllLocationsFlow(action){
  try {
    let json = yield call(createStocktake, action);
    yield put({ type: GET_LOCATION_RESPONSE, json });
  } catch (error) {
    console.log(error);
    yield put({ type: GET_LOCATION_ERROR });
  }
}

function* watcher() {
  yield takeEvery(CREATE_GOODISSUE_REQUEST, createStocktakeFlow);
  yield takeEvery(GET_LOCATION_REQUEST,getAllLocationsFlow)
}

export default watcher;
