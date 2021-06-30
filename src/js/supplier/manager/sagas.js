import { call, put, takeEvery } from "redux-saga/effects";
import handleApiErrors from "../../auth/api-errors";

import { GET_SP_REQUEST, GET_SP_RESPONSE, GET_SP_ERROR } from "./constants";

function getAllSuppliers(action) {
  const getAllSuppliersURL = `http://imspublicapi.herokuapp.com/api/suppliers/search?CurrentPage=${action.currentPage}&SizePerPage=${action.sizePerPage}`;

  return fetch(getAllSuppliersURL, {
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

function* getAllSuppliersFlow(action) {
  try {
    let json = yield call(getAllSuppliers, action);

    yield put({ type: GET_SP_RESPONSE, json });
  } catch (error) {
    console.log(error);
    yield put({ type: GET_SP_ERROR });
  }
}

function* watcher() {
  yield takeEvery(GET_SP_REQUEST, getAllSuppliersFlow);
}
export default watcher;
