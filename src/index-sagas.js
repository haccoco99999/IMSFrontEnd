import LoginSaga from "./login/sagas";
import UpdateSaga from "./about-account/sagas";

import searchPurchaseOrder from "./purchase-order/purchase-quote-order/sagas";
import PurchaseOrderSaga from "./purchase-order/create-purchase-order/sagas";

import getGoodsReceipt from "./good-receipt/manager/sagas";
import getAllRole from "./manage-account/manager/role-manager/sagas";
import getAllConfirmedPurchaseOrder from "./good-receipt/create/sagas";
import getAllAccounts from "./manage-account/manager/account-manager/sagas";
import getAllProducts from "./product/manager/product-manager/sagas";
import getAllCategories from "./product/manager/category-manager/sagas";
import getGoodsReceiptDetails from "./good-receipt/details/sagas";
import getAllPurchaseRequisition from "./sale-man/manager/sagas";
import getDetailsPurchaseRequisition from "./sale-man/details/sagas";
import getAllSuppliers from "./supplier/manager/sagas";
import getDetailsSupplier from "./supplier/details/sagas";
import getCreatedFormPurchaseRequisition from "./sale-man/create/sagas";
import createProduct from "./product/create/sagas";
import createAccount from "./manage-account/create/account/sagas";
import getDetailsProduct from "./product/details/sagas";
import createSupplier from "./supplier/create/sagas";
// import getAllGoodIssue from "./good-issue/manager/sagas";
import getAllStocktake from "./stock-take/manager/sagas";
import getDetailsStocktake from "./stock-take/details/sagas";
import GetDetailGoodIssueSaga from "./good-issue/good-issue-detail/sagas";
import listGoodIssueSaga from "./good-issue/manager/sagas";
import createStocktake from "./stock-take/create/sagas";
import locationManagerSaga from "./product/manager/location-manager/sagas";
import notificationSaga from "./notification-component/sagas";
import requestUpdateManagerSaga from "./product/manager/requestupdate-manager/sagas";
import { all } from "@redux-saga/core/effects";
export default function* IndexSaga() {
  yield all([
    LoginSaga(),
    UpdateSaga(),
    //////PQ PO
    PurchaseOrderSaga(),
    searchPurchaseOrder(),
    ////Good -u
    GetDetailGoodIssueSaga(),
    listGoodIssueSaga(),
    /////
    getGoodsReceipt(),
    getAllRole(),
    getAllConfirmedPurchaseOrder(),
    getAllAccounts(),
    getAllCategories(),
    getAllProducts(),
    getGoodsReceiptDetails(),
    getAllPurchaseRequisition(),
    getDetailsPurchaseRequisition(),
    getAllSuppliers(),
    getDetailsSupplier(),
    getCreatedFormPurchaseRequisition(),
    createProduct(),
    createAccount(),
    getDetailsProduct(),
    createSupplier(),
    getAllStocktake(),
    getDetailsStocktake(),
    createStocktake(),
    locationManagerSaga(),
    notificationSaga(),
    requestUpdateManagerSaga(),
  ]);
}
