import { combineReducers } from "redux";
import client from "./user/reducer";
import login from "./login/reducer";
import updateProfile from "./about-account/reducer";
import listPriceQuote from "./Gallery/reducer";
import controlPurchaseQuotePage from "./purchase-order/reducer";
import detailPriceQuote from "./purchase-order/detail-purchase-order/reducer";
import sendMailReducer from "./purchase-order/create-price-quote/reducer";
import searchPurchaseOrderReducer from "./purchase-order/purchase-quote-order/reducer";
// import updateProfile from './about-account/reducer'
import getAllRoleReducer from "./manage-account/manager/role-manager/reducer";
import getAllConfirmedPurchaseOrderReducer from "./good-receipt/create/reducer";
import getGoodsReceiptReducer from "./good-receipt/manager/reducer";
import getAllAccountsReducer from "./manage-account/manager/account-manager/reducer";
import getAllCategoriesReducer from "./product/manager/category-manager/reducer";
import getAllProductsReducer from "./product/manager/product-manager/reducer";
import getGoodsReceiptDetailsReducer from "./good-receipt/details/reducer";
import getAllPurchaseRequisitionReducer from "./sale-man/manager/reducer";
import getDetailsPurchaseRequisitionReducer from "./sale-man/details/reducer";
const IndexReducer = combineReducers({
  login,
  client,
  updateProfile,
  listPriceQuote,
  controlPurchaseQuotePage,
  detailPriceQuote,
  sendMailReducer,
  searchPurchaseOrderReducer,
  getGoodsReceiptReducer,
  getAllRoleReducer,
  getAllConfirmedPurchaseOrderReducer,
  getAllAccountsReducer,
  getAllCategoriesReducer,
  getAllProductsReducer,
  getGoodsReceiptDetailsReducer,
  getAllPurchaseRequisitionReducer,
  getDetailsPurchaseRequisitionReducer,
});

export default IndexReducer;
