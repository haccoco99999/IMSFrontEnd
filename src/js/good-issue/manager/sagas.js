import { call, put, takeEvery } from "redux-saga/effects";

import handleApiErrors from "../../auth/api-errors";
import {GET_ALL_GOOD_ISSUE_ERROR,GET_ALL_GOOD_ISSUE_REQUESTING,GET_ALL_GOOD_ISSUE_SUCCESS,
GET_ALL_GOOD_ISSUE_REQUISITION_SUCCESS,GET_ALL_GOOD_ISSUE_REQUISITION_REQUESTING, GET_ALL_GOOD_ISSUE_REQUISITION_ERROR

} from './contants'



function getAllGoodIssueAPI(action) {
  const url = `https://imspublicapi.herokuapp.com/api/goodsissue/search?${action.filter}`;

  return fetch(url, {
    method: "GET",
    headers: {
     
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
function getAllGoodIssueRequisitionAPI(action) {
  const url = "https://imspublicapi.herokuapp.com/api/goodsissue/search?CurrentPage=1&SizePerPage=99&Statuses=IssueRequisition";

  return fetch(url, {
    method: "GET",
    headers: {
     
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





function* getAllGoodIssueFlow(action) {
  try {
    let json = yield call(getAllGoodIssueAPI, action);
    
    yield put({ type: GET_ALL_GOOD_ISSUE_SUCCESS, json });
  } catch (error) {
 
    yield put({ type: GET_ALL_GOOD_ISSUE_ERROR });
  }
}

function* getAllGoodIssueRequisitionFlow(action) {
  try {
    let json = yield call(getAllGoodIssueRequisitionAPI, action);
    
    yield put({ type: GET_ALL_GOOD_ISSUE_REQUISITION_SUCCESS, json });
  } catch (error) {
 
    yield put({ type: GET_ALL_GOOD_ISSUE_REQUISITION_ERROR });
  }
}

function* watcher() {
  yield takeEvery(GET_ALL_GOOD_ISSUE_REQUESTING, getAllGoodIssueFlow);
  yield takeEvery(GET_ALL_GOOD_ISSUE_REQUISITION_REQUESTING, getAllGoodIssueRequisitionFlow);

}

export default watcher;
