import { combineReducers } from "redux";
import client from "./user/reducer";
import login from "./login/reducer";
import updateProfileClient from "./about-account/reducer";
import searchPurchaseOrderReducer from "./purchase-order/purchase-quote-order/reducer";
// import updateProfile from './about-account/reducer'
import getAllRoleReducer from "./manage-account/manager/role-manager/reducer";
// import getAllConfirmedPurchaseOrderReducer from "./good-receipt/create/reducer";
// import getGoodsReceiptReducer from "./good-receipt/manager/reducer";
import getAllAccountsReducer from "./manage-account/manager/account-manager/reducer";
// import getAllCategoriesReducer from "./product/manager/category-manager/reducer";
// import getAllProductsReducer from "./product/manager/product-manager/reducer";
// import getGoodsReceiptDetailsReducer from "./good-receipt/details/reducer";
// import getAllPurchaseRequisitionReducer from "./sale-man/manager/reducer";
// import getDetailsPurchaseRequisitionReducer from "./sale-man/details/reducer";
// import getAllSuppliersReducer from "./supplier/manager/reducer";
// import getDetailsSupplierReducer from "./supplier/details/reducer";
// import getCreatedFormPurchaseRequisitionReducer from "./sale-man/create/reducer";
// import createProductReducer from "./product/create/reducer";
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
// import getDetailsProductReducer from "./product/details/reducer";
// import createSupplierReducer from "./supplier/create/reducer";
// import getAllStocktakeReducer from "./stock-take/manager/reducer";
// import getDetailsStocktakeReducer from "./stock-take/details/reducer";
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
// import createStocktakeReducer from "./stock-take/create/reducer";
// import locationManagetReducer from "./product/manager/location-manager/reducer";

//Good Receipt
import {
  getAllConfirmedPurchaseOrderReducer,
  submitPRReducer,
  getDetailsPOReducer,
} from "./good-receipt/create/reducer";
import getGoodsReceiptReducer from "./good-receipt/manager/reducer";
import getGoodsReceiptDetailsReducer from "./good-receipt/details/reducer";
//Product Manager
import {
  getAllCategoriesReducer,
  updateCategoriesReducer,
  createCategoriesReducer,
} from "./product/manager/category-manager/reducer";
import getAllProductsReducer from "./product/manager/product-manager/reducer";
import {
  createProductReducer,
  getCategoriesCreateProductReducer,
  // checkDuplicateProductReducer
} from "./product/create/reducer";
import {
  getDetailsProductReducer,
  updateProductReducer,
  updateVariantReducer,
  gePackageReducer,
  getDetailsVariantReducer,
  getBrandReducer,
} from "./product/details/reducer";
import {
  locationManagerReducer,
  createLocationReducer,
  updateLocationReducer,
} from "./product/manager/location-manager/reducer";
////SALE MAN

import getAllPurchaseRequisitionReducer from "./sale-man/manager/reducer";
import getCreatedFormPurchaseRequisitionReducer from "./sale-man/create/reducer";
//Stock take
import getAllStocktakeReducer from "./stock-take/manager/reducer";
import {
  getDetailsStocktakeReducer,
  updateStocktakeReducer,
  rejectStocktakeReducer,
  adjustStocktakeReducer,
  submitStocktakeReducer,
} from "./stock-take/details/reducer";
import {
  createStocktakeReducer,
  getDetailsPackageReducer,
} from "./stock-take/create/reducer";
//sUPPLIER
import getAllSuppliersReducer from "./supplier/manager/reducer";
import {
  getDetailsSupplierReducer,
  updateSupplierReducer,
  deleteSupplierReducer,
} from "./supplier/details/reducer";
import { createSupplierReducer } from "./supplier/create/reducer";

const IndexReducer = combineReducers({
  login,
  client,
  updateProfileClient,
  searchPurchaseOrderReducer,
  getAllRoleReducer,
  getAllAccountsReducer,

  createUserAccountReducer, getUserAccountDetail, updateAccountDetail,

  createRolePermission,DetailRolePermission , UpdateRolePermission , setActiveAccount,

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

   //Good Receipt\
   getGoodsReceiptReducer,
  getAllConfirmedPurchaseOrderReducer,
  getGoodsReceiptDetailsReducer,
  submitPRReducer,
  getDetailsPOReducer,
  //Product Manager
  locationManagerReducer,
  createProductReducer,
  createProductReducer,
  getAllCategoriesReducer,
  getAllProductsReducer,
  getDetailsProductReducer,
  getCategoriesCreateProductReducer,
  updateProductReducer,
  updateVariantReducer,
  gePackageReducer,
  getDetailsVariantReducer,
  getBrandReducer,
  updateCategoriesReducer,
  createCategoriesReducer,
  createLocationReducer,
  updateLocationReducer,
  //SALE MAN
  
  getAllPurchaseRequisitionReducer,
  getCreatedFormPurchaseRequisitionReducer,
  //STOCK TAKE
  getAllStocktakeReducer,
  getDetailsStocktakeReducer,
  createStocktakeReducer,
  getDetailsPackageReducer,
  updateStocktakeReducer,
  rejectStocktakeReducer,
  adjustStocktakeReducer,
  submitStocktakeReducer,

  //SUPPLIER
  getAllSuppliersReducer,
  getDetailsSupplierReducer,
  createSupplierReducer,
  updateSupplierReducer,
  deleteSupplierReducer,
});

export default IndexReducer;
