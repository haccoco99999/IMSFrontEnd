import { call, put, takeEvery } from "redux-saga/effects";
import handleApiErrors from "../../auth/api-errors";

//components
import {
  GET_ALL_PR_REQUEST,
  GET_ALL_PR_RESPONSE,
  GET_ALL_PR_ERROR,
} from "./constants";



function getAllPurchaseRequisition(action) {
  const getAllPurchaseRequisitionURL =
  `${process.env.REACT_APP_API}/purchaseorder/search?CurrentPage=${action.currentPage}&SizePerPage=${action.sizePerPage}`

  return fetch(getAllPurchaseRequisitionURL, {
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
    .catch((error) => {
      throw error;
    });
}

function* getAllPurchaseRequisitionFlow(action) {
  try {
    let json = yield call(getAllPurchaseRequisition, action);

    yield put({ type: GET_ALL_PR_RESPONSE, json });
  } catch (error) {
    console.log(error);

    yield put({ type: GET_ALL_PR_ERROR });
  }
}

function* watcher() {
  yield takeEvery(GET_ALL_PR_REQUEST, getAllPurchaseRequisitionFlow);
}

export default watcher;
