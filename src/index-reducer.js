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

// import getAllSuppliersReducer from "./supplier/manager/reducer";
// import getDetailsSupplierReducer from "./supplier/details/reducer";
// import getCreatedFormPurchaseRequisitionReducer from "./sale-man/create/reducer";
// import createProductReducer from "./product/create/reducer";
import { getValueDashboard } from "./dashboard/reducer";
import {
  createUserAccount,
  getUserAccountDetail,
  updateAccountDetail,
  setActiveAccount,
  updateImage,
} from "./manage-account/create/account/reducer";
import {
  createRolePermission,
  DetailRolePermission,
  UpdateRolePermission,
} from "./manage-account/create/role/reducer";
import {
  getDetailPurchaseReducer,
  rejectPurchaserOrder,
  mailOrderData,
  PriceQuoteUpdate,
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

import {
  GetAllGoodsIssues,
  getAllGoodsIssuesRequisition,
} from "./good-issue/manager/reducer";
import {
  DetailGoodIssue,
  createGoodIssue,
  upadateGoodIssue,
  RejectGoodIssue,
} from "./good-issue/good-issue-detail/reducer";
// import createStocktakeReducer from "./stock-take/create/reducer";
// import locationManagetReducer from "./product/manager/location-manager/reducer";

//Good Receipt
import {
  getAllConfirmedPurchaseOrderReducer,
  submitPRReducer,
  getDetailsPOReducer,
  checkDuplicateSKUReducer,
  checkSKUExistsReducer,
} from "./good-receipt/create/reducer";
import getGoodsReceiptReducer from "./good-receipt/manager/reducer";
import getGoodsReceiptDetailsReducer from "./good-receipt/details/reducer";
//Product Manager
import {
  getAllCategoriesReducer,
  updateCategoriesReducer,
  createCategoriesReducer,
} from "./product/manager/category-manager/reducer";
import getAllProductsReducer, {
  getAllUpdateRequestReducer,
} from "./product/manager/product-manager/reducer";
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
import {
  getDetailsPurchaseRequisitionReducer,
  updatePRReducer,
  submitDraftReducer,
  deletePRReducer,
} from "./sale-man/details/reducer";
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
//LOCATION
import { getAllLocationsReducer } from "./components/location/reducer";
//REQUEST UPDATE
import {
  agreeUpdateRequestSkuReducer,
  rejectUpdateRequestSkuReducer,
} from "./product/manager/requestupdate-manager/reducer";
import {updateCompany} from "./about-company/reducer";
const IndexReducer = combineReducers({
  login,
  client,
  updateProfileClient,
  searchPurchaseOrderReducer,
  getAllRoleReducer,
  getAllAccountsReducer,

  createUserAccount,
  getUserAccountDetail,
  updateAccountDetail,
  updateImage,

  createRolePermission,
  DetailRolePermission,
  UpdateRolePermission,
  setActiveAccount,

  notificationReducer,

  //purchase order reducer
  getDetailPurchaseReducer,
  rejectPurchaserOrder,
  mailOrderData,
  PriceQuoteUpdate,
  submitPurchaseOrder,
  confirmPurchaserOrder,
  updatePurchaseOrder,
  createPurchaserOrder,
  createPriceQuote,
  //Good issue
  GetAllGoodsIssues,
  getAllGoodsIssuesRequisition,
  DetailGoodIssue,
  createGoodIssue,
  upadateGoodIssue,
  RejectGoodIssue,

  //Good Receipt\
  getGoodsReceiptReducer,
  getAllConfirmedPurchaseOrderReducer,
  getGoodsReceiptDetailsReducer,
  submitPRReducer,
  getDetailsPOReducer,

  checkDuplicateSKUReducer,
  checkSKUExistsReducer,
  getAllUpdateRequestReducer,

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
  getDetailsPurchaseRequisitionReducer,
  updatePRReducer,
  submitDraftReducer,
  deletePRReducer,
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
  //LOCATION
  getAllLocationsReducer,
  //request update sku
  agreeUpdateRequestSkuReducer,
  rejectUpdateRequestSkuReducer,
  //DashBoard
  getValueDashboard,
  //Company
  updateCompany
});

export default IndexReducer;
