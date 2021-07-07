import { call, put, takeEvery } from "redux-saga/effects";

import handleApiErrors from "../../auth/api-errors";

import {
    GET_GOOD_ISSUE_DETAIL_REQUEST,
    GET_GOOD_ISSUE_DETAIL_SUCCESS,
    GET_GOOD_ISSUE_DETAIL_ERROR,
    CREATE_GOOD_ISSUEL_REQUEST,
    CREATE_GOOD_ISSUE_ERROR,
    CREATE_GOOD_ISSUE_SUCCESS,
    UPDATE_GOOD_ISSUEL_REQUEST,
    UPDATE_GOOD_ISSUE_ERROR,
    UPDATE_GOOD_ISSUE_SUCCESS,
    
    } from './contants'


function getAllGoodIssueAPI(action) {
  const url = "https://imspublicapi.herokuapp.com/api/goodsissue/" + action.issueId;

  return fetch(url, {
    method: "GET",
    headers: {
        // Authorization: "Bearer " + action.token,
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
function updateGoodIssueAPI(action) {
  const url = "https://imspublicapi.herokuapp.com/api/goodsissue/" + action.issueId;

  return fetch(url, {
    method: "GET",
    headers: {
        // Authorization: "Bearer " + action.token,
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
function createGoodIssueAPI(action) {
  const url = "https://imspublicapi.herokuapp.com/api/goodsissue/" + action.issueId;

  return fetch(url, {
    method: "GET",
    headers: {
        // Authorization: "Bearer " + action.token,
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





function* createGoodIssueFlow(action) {
    console.log("ok da chayj r")
  try {
    let json = yield call(getAllGoodIssueAPI, action);
    console.log(json)
    yield put({ type: GET_GOOD_ISSUE_DETAIL_SUCCESS, json });
  } catch (error) {
 
    yield put({ type: GET_GOOD_ISSUE_DETAIL_ERROR });
  }
}
function* updateGoodIssueFlow(action) {
    console.log("ok da chayj r")
  try {
    let json = yield call(getAllGoodIssueAPI, action);
    console.log(json)
    yield put({ type: GET_GOOD_ISSUE_DETAIL_SUCCESS, json });
  } catch (error) {
 
    yield put({ type: GET_GOOD_ISSUE_DETAIL_ERROR });
  }
}
function* getGoodIssueDetailFlow(action) {
    console.log("ok da chayj r")
  try {
    let json = yield call(getAllGoodIssueAPI, action);
    console.log(json)
    yield put({ type: GET_GOOD_ISSUE_DETAIL_SUCCESS, json });
  } catch (error) {
 
    yield put({ type: GET_GOOD_ISSUE_DETAIL_ERROR });
  }
}

function* watcher() {
  yield takeEvery(GET_GOOD_ISSUE_DETAIL_REQUEST, getGoodIssueDetailFlow);
  yield takeEvery(GET_GOOD_ISSUE_DETAIL_REQUEST, getGoodIssueDetailFlow);
  yield takeEvery(GET_GOOD_ISSUE_DETAIL_REQUEST, getGoodIssueDetailFlow);

}

export default watcher;
