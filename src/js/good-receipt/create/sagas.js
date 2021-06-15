import { call, put, takeEvery } from "redux-saga/effects";

// component
import handleApiErrors from "../../auth/api-errors";

//api
const getListPurchaseOrderUrl =
  "https://imspublicapi.herokuapp.com/api/goodissue/search/all&status=4&page=1&size=1000";


function getListPurchaseOrder() {
  return fetch(getListPurchaseOrderUrl, {
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
    .catch((error) => {});
}

function* getFlow(action) {
  try {
      let json= yield call(getListPurchaseOrder);

      yield put({type:'', json});
  } catch (error) {}
}

function * watcher(){
    yield takeEvery('',getFlow);
}

export default watcher;
