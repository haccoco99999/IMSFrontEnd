import { call, put, takeEvery } from "redux-saga/effects";

import handleApiErrors from "../../../auth/api-errors";

import {
  CREATE_ACC_REQUEST,
  CREATE_ACC_RESPONSE,
  CREATE_ACC_ERR,
  GET_DETAIL_ACC_REQUEST,
  GET_DETAIL_ACC_SUCCESS,
  GET_DETAIL_ACC_ERR,
  UPDATE_DETAIL_ACC_REQUEST,
  UPDATE_DETAIL_ACC_SUCCESS,
  UPDATE_DETAIL_ACC_ERR,

  SET_ACTIVE_ACC_SUCCESS,
  SET_ACTIVE_ACC_ERR,
  SET_ACTIVE_ACC_REQUEST,
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
function updateUserAccountAPI(action) {
  console.log(action.data)
  const url = "https://imspublicapi.herokuapp.com/api/user/edit";

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
function getUserAccountDetailAPI(action) {
  const url = "https://imspublicapi.herokuapp.com/api/users/"+ action.userID;
  console.log(action.token)
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
function setActiveAccountAPI(action) {
  const url ='http://imspublicapi.herokuapp.com/api/deactivate'
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

function* CreateProductFlow(action) {
  try {
    let json = yield call(createProduct, action);
    yield put({ type: CREATE_ACC_RESPONSE, json });
    yield put({})
  } catch (error) {
    yield put({ type: CREATE_ACC_ERR });
  }
}
function* updateUserAccountFlow(action) {
  try {
    let json = yield call(updateUserAccountAPI, action);
    yield put({ type: UPDATE_DETAIL_ACC_SUCCESS, json });
  } catch (error) {
    yield put({ type: UPDATE_DETAIL_ACC_ERR });
  }
}

function* getUserAccountDetailFlow(action) {
  try {
    let json = yield call(getUserAccountDetailAPI, action);
    
    yield put({ type: GET_DETAIL_ACC_SUCCESS, json });
  } catch (error) {
 
    yield put({ type: GET_DETAIL_ACC_ERR });
  }
}
function* setActiveAccountFlow(action) {
  try {

    console.log(action.data)
    let json = yield call(setActiveAccountAPI, action);
    
    yield put({ type: SET_ACTIVE_ACC_SUCCESS });
  } catch (error) {
 
    yield put({ type: SET_ACTIVE_ACC_ERR });
  }
}

function* watcher() {
  yield takeEvery(CREATE_ACC_REQUEST, CreateProductFlow);
  yield takeEvery(GET_DETAIL_ACC_REQUEST, getUserAccountDetailFlow);
  yield takeEvery(UPDATE_DETAIL_ACC_REQUEST, updateUserAccountFlow);
  yield takeEvery(SET_ACTIVE_ACC_REQUEST, setActiveAccountFlow);
}

export default watcher;
