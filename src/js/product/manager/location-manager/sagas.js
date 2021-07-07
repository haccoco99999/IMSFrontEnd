import { call, put, takeEvery } from "redux-saga/effects";
import handleApiErrors from "../../../auth/api-errors";

import {
  GET_ALL_LOCATIONS_REQUEST,
  GET_ALL_LOCATIONS_RESPONSE,
  GET_ALL_LOCATIONS_ERROR,
} from "../constants";

function getAllLocations(action) {
  const url = `http://imspublicapi.herokuapp.com/api/package?CurrentPage=${action.currentPage}&SizePerPage=${action.sizePerPage}&IsLocationOnly=true`;
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

function * getAllLocationsFlow(action) {
    try {
        let json= yield call(getAllLocations,action)
        yield put({type: GET_ALL_LOCATIONS_RESPONSE,json})
    } catch (error) {
        console.log(error)
        yield put({ type:GET_ALL_LOCATIONS_ERROR})
    }
}

function* watcher() {
    yield takeEvery(
     yield takeEvery(GET_ALL_LOCATIONS_REQUEST,getAllLocationsFlow)
    )
}

export default watcher()