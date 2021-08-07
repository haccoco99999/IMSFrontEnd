import { call, put, takeEvery } from "redux-saga/effects";
import { IgnorePlugin } from "webpack";
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

function checkDuplicateVariant(data, token) {
  // let dataCheck = action.data.productVariantsUpdate[0].name;

  const url = `${process.env.REACT_APP_API}/dupcheck/productvariant`;
  return fetch(url, {
    method: "POST",
    headers: {
      Authorization: "Bearer " + token,
      "Content-Type": "application/json",
      Origin: "",
    },
    credentials: "include",
    body: JSON.stringify({
      value: data,
    }),
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
function* checkDuplicateProductFlow(action) {
  try {
    let resultCheckDup = yield call(checkDuplicateProduct, action);
    return resultCheckDup;
  } catch (error) {
    yield put({ type: UPDATE_PRODUCT_ERROR });
  }
}

function* checkDuplicateVariantFlow(data, token) {
  try {
    // let dataCheck = ;
    // console.log(action.productVariantsUpdate[0].name);
    let resultCheckDup = yield call(checkDuplicateVariant, data, token);
    return resultCheckDup;
  } catch (error) {
    console.log(error);
    yield put({ type: UPDATE_VARIANTS_ERROR });
  }
}

function* updateProductFlow(action) {
  if (action.needCheckName) {
    let check = yield call(checkDuplicateProductFlow, action);
    try {
      if (!check.hasMatch) {
        let json = yield call(updateProduct, action);
        yield put({ type: UPDATE_PRODUCT_RESPONSE, json });
      } else yield put({ type: UPDATE_PRODUCT_RESPONSE });
    } catch (error) {
      yield put({ type: UPDATE_PRODUCT_ERROR });
    }
  } else {
    try {
      let json = yield call(updateProduct, action);
      yield put({ type: UPDATE_PRODUCT_RESPONSE, json });
    } catch (error) {
      yield put({ type: UPDATE_PRODUCT_ERROR });
    }
  }
}

function* updateVariantFlow(action) {
  let checkName = false;
  let checkSku = false;

  if (action.needCheckName) {
    checkName = yield call(
      checkDuplicateVariantFlow,
      action.data.productVariantsUpdate[0].name,
      action.token
    );
  }
  if (action.needCheckSku) {
    checkSku = yield call(
      checkDuplicateVariantFlow,
      action.data.productVariantsUpdate[0].sku,
      action.token
    );
  }

  if(action.page === "Create")
  {

    if (checkName.hasMatch || checkSku.hasMatch) {  
      let errorMsg = "Duplicate at ";
      if (checkName.hasMatch) errorMsg += " name";
      if (checkSku.hasMatch) {
        if (checkName.hasMatch) errorMsg += " and sku";
        else errorMsg += " sku";
      } 
  
      try {
        yield put({ type: UPDATE_VARIANTS_RESPONSE, errorMsg });
      } catch (error) {
        console.log(error);
        yield put({ type: UPDATE_VARIANTS_ERROR });
      }
    } else {
      try {
        let json = yield call(updateVariant, action);
        yield put({ type: UPDATE_VARIANTS_RESPONSE, json });
      } catch (error) {
        console.log(error);
        yield put({ type: UPDATE_VARIANTS_ERROR });
      }
    }

  }else if(action.page === "Details")
  {
    if (checkName.hasMatch || checkSku.hasMatch) {
     
  
  
      let errorMsg = "Duplicate at ";
      if (checkName.hasMatch) errorMsg += " name";
      if (checkSku.hasMatch) {
        if (checkName.hasMatch) errorMsg += " and sku";
        else errorMsg += " sku";
      } 
  
      if(checkSku.hasMatch && checkSku.redisMatchList.length > 0) {
          let productVariantIdCheck = checkSku.redisMatchList[0].productVariantId
          let productVariantIdInput = action.data.productVariantsUpdate[0].id
          
  
      }



      try {
        yield put({ type: UPDATE_VARIANTS_RESPONSE, errorMsg });
      } catch (error) {
        console.log(error);
        yield put({ type: UPDATE_VARIANTS_ERROR });
      }
    } else {
      try {
        let json = yield call(updateVariant, action);
        yield put({ type: UPDATE_VARIANTS_RESPONSE, json });
      } catch (error) {
        console.log(error);
        yield put({ type: UPDATE_VARIANTS_ERROR });
      }
    }
  }


  

  // if (action.needCheckName) {
  //   let checkName = yield call(
  //     checkDuplicateVariantFlow,
  //     action.data.productVariantsUpdate[0].name,
  //     action.token
  //   );

  //   try {
  //     if (!check.hasMatch) {
  //       let json = yield call(updateVariant, action);
  //       yield put({ type: UPDATE_VARIANTS_RESPONSE, json });
  //     } else yield put({ type: UPDATE_VARIANTS_RESPONSE });
  //   } catch (error) {
  //     console.log(error);
  //     yield put({ type: UPDATE_VARIANTS_ERROR });
  //   }
  // } else {
  //   try {
  //     let json = yield call(updateVariant, action);
  //     yield put({ type: UPDATE_VARIANTS_RESPONSE, json });
  //   } catch (error) {
  //     console.log(error);
  //     yield put({ type: UPDATE_VARIANTS_ERROR });
  //   }
  // }
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
