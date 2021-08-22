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

    REJECT_GOOD_ISSUE_REQUEST,
    REJECT_GOOD_ISSUE_SUCCESS,
    REJECT_GOOD_ISSUE_ERROR,
    
    } from './contants'


function getAllGoodIssueAPI(action) {
  const url = "https://imspublicapi.herokuapp.com/api/goodsissue/" + action.issueId;

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
function updateGoodIssueAPI(action) {
  const url = `${process.env.REACT_APP_API}/goodsissue/update`
  console.log(action.data)
  return fetch(url, {
    method: "PUT",
    headers: {
         Authorization: "Bearer " + action.token,
      "Content-Type": "application/json",
      Origin: "",
    },
    body: JSON.stringify(action.data),
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
  const url = `${process.env.REACT_APP_API}/goodsissue/create`

  return fetch(url, {
    method: "POST",
    headers: {
         Authorization: "Bearer " + action.token,
      "Content-Type": "application/json",
      Origin: "",
    },
    credentials: "include",
    body: JSON.stringify(action.data)
  })
    .then((response) => handleApiErrors(response))
    .then((response) => response.json())
    .then((json) => json)
    .catch((error) => {
      throw error;
    });
}
function rejectGoodIssueDetaiAPI(action) {
  const url = `${process.env.REACT_APP_API}/goodsissue/reject`

  return fetch(url, {
    method: "PUT",
    headers: {
         Authorization: "Bearer " + action.token,
      "Content-Type": "application/json",
      Origin: "",
    },
    credentials: "include",
    body: JSON.stringify(action.data)
  })
    .then((response) => handleApiErrors(response))
    .then((response) => response.json())
    .then((json) => json)
    .catch((error) => {
      throw error;
    });
}





function* createGoodIssueFlow(action) {
    console.log(action.data)
  try {
    let json = yield call(createGoodIssueAPI, action);
    console.log(json)
    yield put({ type: CREATE_GOOD_ISSUE_SUCCESS });
    yield put({ type: GET_GOOD_ISSUE_DETAIL_SUCCESS, json });
  } catch (error) {
 
    yield put({ type: CREATE_GOOD_ISSUE_ERROR });
  }
}
function* updateGoodIssueFlow(action) {
    console.log(action.data)
  try {
    let json = yield call(updateGoodIssueAPI, action);
    console.log(json)
    yield put({ type: UPDATE_GOOD_ISSUE_SUCCESS });
    yield put({ type: GET_GOOD_ISSUE_DETAIL_SUCCESS, json });
  } catch (error) {
 
    yield put({ type: UPDATE_GOOD_ISSUE_ERROR });
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
function* rejectGoodIssueDetailFlow(action) {
    
  try {
    let json = yield call(rejectGoodIssueDetaiAPI, action);
    yield put({ type: REJECT_GOOD_ISSUE_SUCCESS });
    yield put({ type: GET_GOOD_ISSUE_DETAIL_SUCCESS, json });
  } catch (error) {
 
    yield put({ type: REJECT_GOOD_ISSUE_ERROR });
  }
}

function* watcher() {
  yield takeEvery(GET_GOOD_ISSUE_DETAIL_REQUEST, getGoodIssueDetailFlow);
  yield takeEvery(CREATE_GOOD_ISSUEL_REQUEST, createGoodIssueFlow);
  yield takeEvery(UPDATE_GOOD_ISSUEL_REQUEST, updateGoodIssueFlow);
  yield takeEvery(REJECT_GOOD_ISSUE_REQUEST, rejectGoodIssueDetailFlow);

}

export default watcher;
