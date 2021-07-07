import { call, put, takeEvery } from "redux-saga/effects";

import handleApiErrors from "../../auth/api-errors";
import {GET_ALL_GOOD_ISSUE_ERROR,GET_ALL_GOOD_ISSUE_REQUESTING,GET_ALL_GOOD_ISSUE_SUCCESS} from './contants'



function getAllGoodIssueAPI(action) {
  const url = "https://imspublicapi.herokuapp.com/api/goodsissue/search?CurrentPage=1&SizePerPage=10&FromStatus=1&ToStatus=10";

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

function* watcher() {
  yield takeEvery(GET_ALL_GOOD_ISSUE_REQUESTING, getAllGoodIssueFlow);

}

export default watcher;
