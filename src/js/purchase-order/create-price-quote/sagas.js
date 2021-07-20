import { call, put, takeEvery } from "@redux-saga/core/effects"
import {SEND_MAIL_PRICE_QUOTE,
    SEND_MAIL_PRICE_QUOTE_ERROR,
    SEND_MAIL_PRICE_QUOTE_SUCCESS} from './containts'
import handleApiErrors from '../../auth/api-errors'



export default updateWatcher