import {GET_DETAIL_QUOTE_PRODUCT_ERROR,
GET_DETAIL_QUOTE_PRODUCT_SUCCESS,
GET_DETAIL_QUOTE_PRODUCT_REQUESTING,
} from './contants'

export default function getDetailPriceQuote({id}){
    
    return{
        type:GET_DETAIL_QUOTE_PRODUCT_REQUESTING,
        id,
    }
}