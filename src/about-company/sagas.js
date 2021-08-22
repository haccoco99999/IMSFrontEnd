import { take, fork, cancel, call, put, cancelled, takeEvery } from 'redux-saga/effects'
import handleApiErrors from '../auth/api-errors'
import { updateCompanyInfo } from '../user/actions';
import {

    UPDATE_COMPANY_ERROR,
    UPDATE_COMPANY_REQUESTING,
    UPDATE_COMPANY_SUCCESS
} from './contants'
function uploadImgAPI(action) {
    const url = "https://api.cloudinary.com/v1_1/ims2021/upload";

    return fetch(url, {
        method: "POST",

        body: action.formData,
    })
        .then((response) => handleApiErrors(response))
        .then((response) => response.json())
        .then((json) => json)
        .catch((error) => {
            throw error;
        });
}
function updateCompanyAPI(aciton) {

    return fetch(`${process.env.REACT_APP_API}/company`, {
        method: 'PUT',
        headers: {
            "Authorization": "Bearer " + aciton.token,
            "Content-Type": "application/json",
            "Origin": ""
        },
        credentials: "include",
        body: JSON.stringify(aciton.data)
    })
        .then(response => handleApiErrors(response))
        .then(response => response.json())
        .then(json => json)
        .catch((error) => { throw error })
}
function* updateFlow(action) {
    let json
    try {
        if (action.formData !== undefined) {
            let jsonCloundinary = yield call(uploadImgAPI, action)
            action.data = { ...action.data, companyProfilePic: jsonCloundinary.url }
        }

        json = yield call(updateCompanyAPI, action)
        
        yield put(updateCompanyInfo(json))
        yield put({ type: UPDATE_COMPANY_SUCCESS })


    } catch (error) {
        console.log(error)
        yield put({ type: UPDATE_COMPANY_ERROR, error })
    }
}

function* updateWatcher() {

    yield takeEvery(UPDATE_COMPANY_REQUESTING, updateFlow);

}
export default updateWatcher



