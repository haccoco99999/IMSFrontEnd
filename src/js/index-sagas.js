import LoginSaga from './login/sagas'
import UpdateSaga from './about-account/sagas'
import { all } from '@redux-saga/core/effects'
export default function* IndexSaga () {  
    yield all ([
        LoginSaga(),
        UpdateSaga(),
    ])
  }