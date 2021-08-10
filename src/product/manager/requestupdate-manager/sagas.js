import { call, put, takeEvery } from "redux-saga/effects";
import handleApiErrors from "../../../auth/api-errors";

import {
  GET_ALL_VARIANTS_REQUEST,
  GET_ALL_VARIANTS_ERROR,
  GET_ALL_VARIANTS_RESPONSE,
  AGREE_UPDATE_SKU_REQUEST,
  AGREE_UPDATE_SKU_RESPONSE,
  AGREE_UPDATE_SKU_ERR,
  REJECT_UPDATE_SKU_REQUEST,
  REJECT_UPDATE_SKU_RESPONSE,
  REJECT_UPDATE_SKU_ERR,
} from "../constants";

function getAllVariants(action) {
  const url = `${process.env.REACT_APP_API}/productvariant/search?CurrentPage=${action.currentPage}&SizePerPage=${action.sizePerPage}&IsLocationOnly=true`;
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

function agreeUpdateSku(action) {
  const url = `${process.env.REACT_APP_APP}/product/skuaccept`;
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

function rejectUpdateSKu(action) {
  const url = `${process.env.REACT_APP_APP}/product/skureject`;
  return (
    fetch(url, {
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
      // .then((json) => json)
      .catch((error) => {
        throw error;
      })
  );
}

function* getAllVariantsFlow(action) {
  try {
    let json = yield call(getAllVariants, action);
    yield put({ type: GET_ALL_VARIANTS_RESPONSE, json });
  } catch (error) {
    console.log(error);
    yield put({ type: GET_ALL_VARIANTS_ERROR });
  }
}

function* agreeUpdateSkuFlow(action) {
  try {
    let json = yield call(agreeUpdateSku, action);
    yield put({ type: AGREE_UPDATE_SKU_RESPONSE, json });
  } catch (error) {
    console.log(error);
    yield put({ type: AGREE_UPDATE_SKU_ERR });
  }
}

function* rejectUpdateSKuFlow(action) {
  try {
    let json = yield call(rejectUpdateSKu, action);
    yield put({ type: REJECT_UPDATE_SKU_RESPONSE, json });
  } catch (error) {
    console.log(error);
    yield put({ type: REJECT_UPDATE_SKU_ERR });
  }
}

function* watcher() {
  // yield takeEvery(
  //   yield takeEvery(GET_ALL_VARIANTS_REQUEST, getAllVariantsFlow)
  // );
  yield takeEvery(AGREE_UPDATE_SKU_REQUEST, agreeUpdateSkuFlow);
  yield takeEvery(REJECT_UPDATE_SKU_REQUEST, rejectUpdateSKuFlow);
}

export default watcher;
