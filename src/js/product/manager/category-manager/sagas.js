import { call, put, takeEvery } from "redux-saga/effects";

//component
import {
  GET_ALL_CATEGORY_REQUEST,
  GET_ALL_CATEGORY_RESPONSE,
  GET_ALL_CATEGORY_ERROR,
} from "../../constants";

import handleApiErrors from "../../../auth/api-errors";


function getAllCategory(action) {
  var url;
  console.log(action.page);
  if (action.page == "manager") {
    url = `https://imspublicapi.herokuapp.com/api/product/category?CurrentPage=${action.currentPage}&SizePerPage=${action.sizePerPage}`;
  } else {
    url = "https://imspublicapi.herokuapp.com/api/product/category?CurrentPage=1&SizePerPage=1000";
  }
  return fetch(url, {
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

function* getAllCategoryFlow(action) {
  try {
    let json = yield call(getAllCategory, action);
    // console.log("JSON", json);
    yield put({ type: GET_ALL_CATEGORY_RESPONSE, json });
  } catch (error) {
    console.log(error);
    yield put({ type: GET_ALL_CATEGORY_ERROR });
  }
}

function* watcher() {
  yield takeEvery(GET_ALL_CATEGORY_REQUEST, getAllCategoryFlow);
}

export default watcher;
