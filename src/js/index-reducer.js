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
import {
  getAllConfirmedPurchaseOrderReducer,
  submitPRReducer,
  getDetailsPOReducer,
} from "./good-receipt/create/reducer";
import getGoodsReceiptReducer from "./good-receipt/manager/reducer";
import getAllAccountsReducer from "./manage-account/manager/account-manager/reducer";
import {
  getAllCategoriesReducer,
  updateCategoriesReducer,
  createCategoriesReducer,
} from "./product/manager/category-manager/reducer";
import getAllProductsReducer from "./product/manager/product-manager/reducer";
import getGoodsReceiptDetailsReducer from "./good-receipt/details/reducer";
import getAllPurchaseRequisitionReducer from "./sale-man/manager/reducer";
import {
  getDetailsPurchaseRequisitionReducer,
  updatePRReducer,
  submitDraftReducer,
  deletePRReducer,
} from "./sale-man/details/reducer";
import getAllSuppliersReducer from "./supplier/manager/reducer";
import {
  getDetailsSupplierReducer,
  updateSupplierReducer,
  deleteSupplierReducer,
} from "./supplier/details/reducer";
import getCreatedFormPurchaseRequisitionReducer from "./sale-man/create/reducer";
import {
  createProductReducer,
  getCategoriesCreateProductReducer,
} from "./product/create/reducer";
import createAccountReducer from "./manage-account/create/account/reducer";
import {
  getDetailsProductReducer,
  updateProductReducer,
  updateVariantReducer,
  gePackageReducer,
  getDetailsVariantReducer,
  getBrandReducer,
} from "./product/details/reducer";
import { createSupplierReducer } from "./supplier/create/reducer";
import getAllStocktakeReducer from "./stock-take/manager/reducer";
import {
  getDetailsStocktakeReducer,
  updateStocktakeReducer,
  rejectStocktakeReducer,
  adjustStocktakeReducer,
  submitStocktakeReducer,
} from "./stock-take/details/reducer";
import notificationReducer from "./notification-component/reducer";
import {
  createUserAccountReducer,
  getUserAccountDetail,
  updateAccountDetail,
} from "./manage-account/create/account/reducer";
import {
  createRolePermission,
  DetailRolePermission,
  UpdateRolePermission,
} from "./manage-account/create/role/reducer";
import { GetAllGoodIssues } from "./good-issue/manager/reducer";
import { DetailGoodIssue } from "./good-issue/good-issue-detail/reducer";
import {
  createStocktakeReducer,
  getDetailsPackageReducer,
} from "./stock-take/create/reducer";
import {
  locationManagerReducer,
  createLocationReducer,
  updateLocationReducer,
} from "./product/manager/location-manager/reducer";
import { getAllLocationsReducer } from "./components/location/reducer";
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
  getAllSuppliersReducer,
  getDetailsSupplierReducer,
  getCreatedFormPurchaseRequisitionReducer,
  createProductReducer,
  createAccountReducer,
  getDetailsProductReducer,
  createSupplierReducer,
  getAllStocktakeReducer,
  getDetailsStocktakeReducer,
  createProductReducer,
  // createUserAccountReducer,getDetailsProductReducer,getUserAccountDetail, updateAccountDetail,
  // createRolePermission, DetailRolePermission, UpdateRolePermission,
  DetailGoodIssue,
  GetAllGoodIssues,
  createStocktakeReducer,
  getDetailsPackageReducer,
  locationManagerReducer,
  notificationReducer,
  getAllLocationsReducer,
  updateStocktakeReducer,
  rejectStocktakeReducer,
  adjustStocktakeReducer,
  submitStocktakeReducer,
  submitPRReducer,
  getDetailsPOReducer,
  updatePRReducer,
  submitDraftReducer,
  deletePRReducer,
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
  updateSupplierReducer,
  deleteSupplierReducer,
});

export default IndexReducer;
