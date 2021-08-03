import { combineReducers } from "redux";
import client from "./user/reducer";
import login from "./login/reducer";
import updateProfileClient from "./about-account/reducer";
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
import getAllSuppliersReducer from "./supplier/manager/reducer";
import getDetailsSupplierReducer from "./supplier/details/reducer";
import getCreatedFormPurchaseRequisitionReducer from "./sale-man/create/reducer";
import createProductReducer from "./product/create/reducer";
import {createUserAccountReducer, getUserAccountDetail, updateAccountDetail, setActiveAccount} from "./manage-account/create/account/reducer";
import { createRolePermission,DetailRolePermission , UpdateRolePermission } from "./manage-account/create/role/reducer";
import { getDetailPurchaseReducer,
  rejectPurchaserOrder,
  mailOrderData, PriceQuoteUpdate ,
  submitPurchaseOrder,
  confirmPurchaserOrder,
   updatePurchaseOrder,
   createPurchaserOrder,
   createPriceQuote,
   
  } from "./purchase-order/create-purchase-order/reducer";
import getDetailsProductReducer from "./product/details/reducer";
import createSupplierReducer from "./supplier/create/reducer";
import getAllStocktakeReducer from "./stock-take/manager/reducer";
import getDetailsStocktakeReducer from "./stock-take/details/reducer";
import notificationReducer from "./notification-component/reducer";
// import {
//   createUserAccountReducer,
//   getUserAccountDetail,
//   updateAccountDetail,
// } from "./manage-account/create/account/reducer";
// import {
//   createRolePermission,
//   DetailRolePermission,
//   UpdateRolePermission,
// } from "./manage-account/create/role/reducer";
import { GetAllGoodsIssues, getAllGoodsIssuesRequisition } from "./good-issue/manager/reducer";
import{ DetailGoodIssue, CreateGoodIssue , UpadateGoodIssue, RejectGoodIssue} from "./good-issue/good-issue-detail/reducer";
import createStocktakeReducer from "./stock-take/create/reducer";
import locationManagetReducer from "./product/manager/location-manager/reducer";
const IndexReducer = combineReducers({
  login,
  client,
  updateProfileClient,
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
  getAllSuppliersReducer,
  getDetailsSupplierReducer,
  getCreatedFormPurchaseRequisitionReducer,
  createProductReducer,
  createUserAccountReducer, getUserAccountDetail, updateAccountDetail,
  getDetailsProductReducer,
  createSupplierReducer,
  getAllStocktakeReducer,
  getDetailsStocktakeReducer,
  createProductReducer,
  // createUserAccountReducer,getDetailsProductReducer,getUserAccountDetail, updateAccountDetail,
  createRolePermission,DetailRolePermission , UpdateRolePermission , setActiveAccount,

  createStocktakeReducer,
  locationManagetReducer,
  notificationReducer,

  //purchase order reducer
  getDetailPurchaseReducer,
  rejectPurchaserOrder,
  mailOrderData, PriceQuoteUpdate ,
  submitPurchaseOrder,
  confirmPurchaserOrder,
   updatePurchaseOrder,
   createPurchaserOrder,
   createPriceQuote,
   //Good issue
   GetAllGoodsIssues, getAllGoodsIssuesRequisition ,
   DetailGoodIssue, CreateGoodIssue , UpadateGoodIssue, RejectGoodIssue,
});

export default IndexReducer;
