import { call, put, takeEvery, take, fork } from "redux-saga/effects";
import {
  CREATE_PRODUCT_REQUEST,
  CREATE_PRODUCT_RESPONSE,
  CREATE_PRODUCT_ERROR,
  GET_ALL_CATEGORY_CREATED_RESPONSE,
  GET_ALL_CATEGORY_CREATED_REQUEST,
  GET_ALL_CATEGORY_CREATED_ERROR,
  CHECK_DUPLICATE_REQUEST,
  CHECK_DUPLICATE_RESPONSE,
  CHECK_DUPLICATE_ERROR,
  // GET_BRAND_REQUEST,
  // GET_BRAND_RESPONSE,
  // GET_BRAND_ERROR,
} from "./constants";

import handleApiErrors from "../../auth/api-errors";

function createProduct(action) {
  const createProductURL = `${process.env.REACT_APP_API}/product/create`;

  return fetch(createProductURL, {
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

function getAllCategoryCreatedPage(action) {
  const getAllCategoryCreatedPageURL = `${process.env.REACT_APP_API}/category?CurrentPage=0&SizePerPage=0`;
  return fetch(getAllCategoryCreatedPageURL, {
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

function checkDuplicateProduct(action) {
  const url = `${process.env.REACT_APP_API}/dupcheck/product`;
  return fetch(url, {
    method: "POST",
    headers: {
      Authorization: "Bearer " + action.token,
      "Content-Type": "application/json",
      Origin: "",
    },
    credentials: "include",
    body: JSON.stringify({
      value: action.data.name,
    }),
  })
    .then((response) => handleApiErrors(response))
    .then((response) => response.json())
    .then((json) => json)
    .catch((error) => {
      throw error;
    });
}

function checkDuplicateSku(action) {
  const url = `${process.env.REACT_APP_API}/dupcheck/productvariant`;
  return fetch(url, {
    method: "POST",
    headers: {
      Authorization: "Bearer " + action.token,
      "Content-Type": "application/json",
      Origin: "",
    },
    credentials: "include",
    body: JSON.stringify({
      value: action.data.productVariants[0].sku,
    }),
  })
    .then((response) => handleApiErrors(response))
    .then((response) => response.json())
    .then((json) => json)
    .catch((error) => {
      throw error;
    });
}

function getAllBrand(action) {
  const url = `${process.env.REACT_APP_API}/product/brands?CurrentPage=0&SizePerPage=0`;
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

function* checkDuplicateFlow(action) {
  try {
    let resultCheckDup = yield call(checkDuplicateProduct, action);
    return resultCheckDup;
  } catch (error) {
    console.log(error);
    yield put({ type: CREATE_PRODUCT_ERROR });
  }
}

function* checkDuplicateSkuFlow(action) {
  try {
    let resultCheckDup = yield call(checkDuplicateSku, action);
    return resultCheckDup;
  } catch (error) {
    console.log(error);
    yield put({ type: CREATE_PRODUCT_ERROR });
  }
}
function* createProductFlow(action) {
  let checkName = yield call(checkDuplicateFlow, action);
  let checkSku = false;
  if (action.needCheckSku) checkSku = yield call(checkDuplicateSkuFlow, action);

  if (checkName.hasMatch || checkSku.hasMatch) {
    let errorMsg = "Duplicate at ";
    if (checkName.hasMatch) errorMsg += " name";
    if (checkSku.hasMatch)
      if (checkName.hasMatch) errorMsg += " and sku";
      else errorMsg += " sku";

    try {
      yield put({ type: CREATE_PRODUCT_RESPONSE, errorMsg });
    } catch (error) {
      console.log(error);
      yield put({ type: CREATE_PRODUCT_ERROR });
    }
  } else {
    try {
      let json = yield call(createProduct, action);
      yield put({ type: CREATE_PRODUCT_RESPONSE, json });
    } catch (error) {
      console.log(error);
      yield put({ type: CREATE_PRODUCT_ERROR });
    }
  }
}

function* getAllCategoryCreatedPageFlow(action) {
  try {
    let json = yield call(getAllCategoryCreatedPage, action);
    console.log(json);

    yield put({ type: GET_ALL_CATEGORY_CREATED_RESPONSE, json });
  } catch (error) {
    console.log(error);

    yield put({ type: GET_ALL_CATEGORY_CREATED_ERROR });
  }
}

function* watcher() {
  yield takeEvery(CREATE_PRODUCT_REQUEST, createProductFlow);

  yield takeEvery(
    GET_ALL_CATEGORY_CREATED_REQUEST,
    getAllCategoryCreatedPageFlow
  );
}

export default watcher;
