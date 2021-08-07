import { call, put, takeEvery } from "redux-saga/effects";

import handleApiErrors from "../../../auth/api-errors";

import {
  CREATE_ROLE_ERROR,CREATE_ROLE_REQUESTING,CREATE_ROLE_SUCCESS,
  GET_DETAIL_ROLE_ERROR,GET_DETAIL_ROLE_REQUESTING, GET_DETAIL_ROLE_SUCCESS,
  UPDATE_DETAIL_ROLE_ERROR, UPDATE_DETAIL_ROLE_REQUESTING,UPDATE_DETAIL_ROLE_SUCCESS
} from './contants'

function createRoleAPI(action) {
  console.log(action.data)
  const url = "https://imspublicapi.herokuapp.com/api/role/create";

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
function getRoleDetailAPI(action) {
  
  const url = "https://imspublicapi.herokuapp.com/api/getrole/" + action.roleId;

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
function updateRoleDetailAPI(action) {
  console.log(action.data)
  const url = "https://imspublicapi.herokuapp.com/api/role/edit";

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

function* createRoleFlow(action) {
  try {
    console.log(action)
    console.log(action.data)
    let json = yield call(createRoleAPI, action);
    yield put({ type: CREATE_ROLE_SUCCESS, json });
  } catch (error) {
    yield put({ type: CREATE_ROLE_ERROR });
  }
}
function* getRoleDetailFlow(action) {
  try {
  
    let json = yield call(getRoleDetailAPI, action);
    
    yield put({ type: GET_DETAIL_ROLE_SUCCESS, json });
  } catch (error) {
    yield put({ type: GET_DETAIL_ROLE_ERROR });
  }
}
function* updateRoleDetailFlow(action) {
  try {

    let json = yield call(updateRoleDetailAPI, action);
    console.log(json)
    // yield put({ type: UPDATE_DETAIL_ROLE_SUCCESS, json });
  } catch (error) {
    // yield put({ type: UPDATE_DETAIL_ROLE_ERROR });
  }
}

function* watcher() {
  yield takeEvery(CREATE_ROLE_REQUESTING, createRoleFlow);
  yield takeEvery(GET_DETAIL_ROLE_REQUESTING, getRoleDetailFlow);
  yield takeEvery(UPDATE_DETAIL_ROLE_REQUESTING, updateRoleDetailFlow);
}

export default watcher;
