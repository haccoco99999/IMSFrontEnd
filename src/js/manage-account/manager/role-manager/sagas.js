import { call, put, takeEvery } from "redux-saga/effects";

import {
  GET_ALL_ROLE_REQUEST,
  GET_ALL_ROLE_RESPONSE,
  GET_ALL_ROLE_ERROR,
} from "../../constants";
import handleApiErrors from "../../../auth/api-errors";


function getAllRole(action) {
  const getAllRoleUrl = `https://imspublicapi.herokuapp.com/api/getroles?CurrentPage=${action.currentPage}&SizePerPage=${action.sizePerPage}`;

  return fetch(getAllRoleUrl, {
    method: "GET",
    headers: {
      Authorization:
        "Bearer " + action.token,
      "Content-Type": "application/json",
      Origin: "",
    },
    credentials: "include",
  })
    .then((response) => handleApiErrors(response))
    .then((response) => response.json())
    .then((json) => json)
    .catch((error) => {throw error});
}

function* getFlow(action) {
  try {
    let json = yield call(getAllRole,action);
    console.log("KET QUA:", json);
    yield put({ type: GET_ALL_ROLE_RESPONSE, json });
  } catch (error) {
    yield put({ type: GET_ALL_ROLE_ERROR });
  }
}

function* watcher() {
  yield takeEvery(GET_ALL_ROLE_REQUEST, getFlow);
}
export default watcher;
