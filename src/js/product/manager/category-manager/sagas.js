import { call, put, takeEvery } from "redux-saga/effects";

//component
import {
  GET_ALL_CATEGORY_REQUEST,
  GET_ALL_CATEGORY_RESPONSE,
  GET_ALL_CATEGORY_ERROR,
} from "../../constants";

import handleApiErrors from "../../../auth/api-errors";

const getAllCategoryURL =
  "https://imspublicapi.herokuapp.com/api/product/category?CurrentPage=1&SizePerPage=5";

const getAllCategoryCreatedPageURL =
  "https://imspublicapi.herokuapp.com/api/product/category?CurrentPage=1&SizePerPage=1000";

function getAllCategory(action) {
  var url;
  console.log(action.page);
  if (action.page == "manager") {
    url = getAllCategoryURL;
  } else {
    url = getAllCategoryCreatedPageURL;
  }
  return fetch(url, {
    method: "GET",
    headers: {
      Authorization:
        "Bearer " +
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjkyZThlZGFjLWFkNTQtNGFlNi1hZTIyLTBlMGM1MDJkYTYxMSIsIm5iZiI6MTYyNDU0NzQzMSwiZXhwIjoxNjI0NzIwMjMxLCJpYXQiOjE2MjQ1NDc0MzF9.3WQh0R850BrprGEoaulVtsilSkLA0BEqndgm_aVo7xo",
      "Content-Type": "application/json",
      Origin: "",
    },
    credentials: "include",
  })
    .then((response) => handleApiErrors(response))
    .then((response) => response.json())
    .then((json) => json)
    .catch((error) => {
      // console.error(error);
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
