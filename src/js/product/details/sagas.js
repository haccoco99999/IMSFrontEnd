import { call, put, takeEvery } from "redux-saga/effects";
import handleApiErrors from "../../auth/api-errors";

import {
  GET_DETAILS_PRODUCT_REQUEST,
  GET_DETAILS_PRODUCT_RESPONSE,
  GET_DETAILS_PRODUCT_ERROR,
  UPDATE_PRODUCT_REQUEST,
  UPDATE_PRODUCT_RESPONSE,
  UPDATE_PRODUCT_ERROR,
  GET_DETAILS_VARIANT_REQUEST,
  GET_DETAILS_VARIANT_RESPONSE,
  GET_DETAILS_VARIANT_ERROR,
  GET_BRAND_RESPONSE,
  GET_BRAND_REQUEST,
  GET_BRAND_ERROR,
  GET_DETAILS_PACKAGE_REQUEST,
  GET_DETAILS_PACKAGE_RESPONSE,
  GET_DETAILS_PACKAGE_ERROR,
  UPDATE_VARIANTS_REQUEST,
  UPDATE_VARIANTS_RESPONSE,
  UPDATE_VARIANTS_ERROR,
} from "./constants";

function getDetailsProduct(action) {
  const url = `${process.env.REACT_APP_API}/product/${action.id}`;
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
function updateProduct(action) {
  const url = `${process.env.REACT_APP_API}/product/update`;
  return fetch(url, {
    method: "PUT",
    headers: {
      Authorization: "Bearer " + action.token,
      "Content-Type": "application/json",
      Origin: "",
    },
    credentials: "include",
    body: JSON.stringify(action.data),
  })
    .then((response) => handleApiErrors(response))
    .then((response) => response)
    .catch((error) => {
      throw error;
    });
}

function getDetailsVariant(action) {
  const url = `${process.env.REACT_APP_API}/productvariant/${action.id}`;
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

function getDetailsPackage(action) {
  const url = `${process.env.REACT_APP_API}/package/${action.id}`;
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

function updateVariant(action) {
  const url = `${process.env.REACT_APP_API}/productvariant/update`;
  return fetch(url, {
    method: "PUT",
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

function* getDetailsProductFlow(action) {
  try {
    let json = yield call(getDetailsProduct, action);
    yield put({ type: GET_DETAILS_PRODUCT_RESPONSE, json });
  } catch (error) {
    yield put({ type: GET_DETAILS_PRODUCT_ERROR });
  }
}

function* updateProductFlow(action) {
  try {
    let json = yield call(updateProduct, action);
    yield put({ type: UPDATE_PRODUCT_RESPONSE, json });
  } catch (error) {
    yield put({ type: UPDATE_PRODUCT_ERROR });
  }
}

function* getDetailstVariantFlow(action) {
  try {
    let json = yield call(getDetailsVariant, action);
    yield put({ type: GET_DETAILS_VARIANT_RESPONSE, json });
  } catch (error) {
    yield put({ type: GET_DETAILS_VARIANT_ERROR });
  }
}

function* getAllBrandFlow(action) {
  try {
    let json = yield call(getAllBrand, action);
    yield put({ type: GET_BRAND_RESPONSE, json });
  } catch (error) {
    yield put({ type: GET_BRAND_ERROR });
  }
}

function* getDetailsPackageFlow(action) {
  try {
    let json = yield call(getDetailsPackage, action);
    yield put({ type: GET_DETAILS_PACKAGE_RESPONSE, json });
  } catch (error) {
    yield put({ type: GET_DETAILS_PACKAGE_ERROR });
  }
}

function* updateVariantFlow(action) {
  try {
    let json = yield call(updateVariant, action);
    yield put({ type: UPDATE_VARIANTS_RESPONSE, json });
  } catch (error) {
    console.log(error);
    yield put({ type: UPDATE_VARIANTS_ERROR });
  }
}

function* watcher() {
  yield takeEvery(UPDATE_PRODUCT_REQUEST, updateProductFlow);
  yield takeEvery(GET_DETAILS_PRODUCT_REQUEST, getDetailsProductFlow);
  yield takeEvery(GET_DETAILS_VARIANT_REQUEST, getDetailstVariantFlow);
  yield takeEvery(GET_BRAND_REQUEST, getAllBrandFlow);
  yield takeEvery(GET_DETAILS_PACKAGE_REQUEST, getDetailsPackageFlow);
  yield takeEvery(UPDATE_VARIANTS_REQUEST, updateVariantFlow);
}

export default watcher;
