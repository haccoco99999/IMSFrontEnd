import { call, put, takeEvery } from "redux-saga/effects";
import handleApiErrors from "../../../auth/api-errors";

import {
    GET_ALL_VARIANTS_REQUEST,
    GET_ALL_VARIANTS_ERROR,
    GET_ALL_VARIANTS_RESPONSE,
} from "../constants";

function getAllVariants(action) {
  const url = `http://imspublicapi.herokuapp.com/api/productvariant/search?CurrentPage=${action.currentPage}&SizePerPage=${action.sizePerPage}&IsLocationOnly=true`;
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

function * getAllVariantsFlow(action) {
    try {
        let json= yield call(getAllVariants,action)
        yield put({type: GET_ALL_VARIANTS_RESPONSE,json})
    } catch (error) {
        console.log(error)
        yield put({ type:GET_ALL_VARIANTS_ERROR})
    }
}

function* watcher() {
    yield takeEvery(
     yield takeEvery(GET_ALL_VARIANTS_REQUEST,getAllVariantsFlow)
    )
}

export default watcher()