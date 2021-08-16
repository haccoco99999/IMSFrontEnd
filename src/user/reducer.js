import { CLIENT_SET, CLIENT_UNSET, CLIENT_UPDATE, CLIENT_UPDATE_COMPANY } from './constants'

const initialState = {
  id: null,
  token: null,
  isNotAllowed: null,
  email: null,
  emailConfirmed: null,
  fullname: null,
  phoneNumber: null,
  accessFailedCount: null,
  address: null,
  dateOfBirth: null,
  isActive: null,
  userRole: null,
  pageAuthorized: [],
  profileImageLink: null,
  companyInfo: {

  }
}

const reducer = function clientReducer(state = initialState, action) {
  switch (action.type) {
    case CLIENT_SET:

      return {
        token: action.respone_login.token,
        isNotAllowed: action.respone_login.isNotAllowed,
        email: action.respone_login.applicationUser.email,
        id: action.respone_login.applicationUser.id,
        emailConfirmed: action.respone_login.applicationUser.emailConfirmed,
        fullname: action.respone_login.applicationUser.fullname,
        phoneNumber: action.respone_login.applicationUser.phoneNumber,
        accessFailedCount: action.respone_login.applicationUser.accessFailedCount,
        address: action.respone_login.applicationUser.address,
        dateOfBirth: action.respone_login.applicationUser.dateOfBirth,
        isActive: action.respone_login.applicationUser.isActive,
        profileImageLink: action.respone_login.applicationUser.profileImageLink,
        companyInfo: action.respone_login.companyInfo,

        userRole: action.respone_login.userRole,
        pageAuthorized: getPageAuthorized(action.respone_login.userRole),
      }
    case CLIENT_UPDATE:

      return {
        ...state,
        email: action.respone_login.applicationUser.email,
        emailConfirmed: action.respone_login.applicationUser.emailConfirmed,
        fullname: action.respone_login.applicationUser.fullname,
        phoneNumber: action.respone_login.applicationUser.phoneNumber,
        accessFailedCount: action.respone_login.applicationUser.accessFailedCount,
        address: action.respone_login.applicationUser.address,
        dateOfBirth: action.respone_login.applicationUser.dateOfBirth,
        isActive: action.respone_login.applicationUser.isActive,
        profileImageLink: action.respone_login.applicationUser.profileImageLink,
      }
    case CLIENT_UPDATE_COMPANY:

      return {
        ...state,
        companyInfo: action.json
      }
    case CLIENT_UNSET:
      return initialState

    default:
      return state
  }
}

function getPageAuthorized(role) {
  if (role === "Manager") {
    return ["Product", "Setting", "PurchaseOrderMenu", "GoodsReceipt", "GoodsIssue", "Stocktake", "Supplier", "Account", "Report", "Location", "CompanyInfo",
      //PO
      "Requisition", "PriceQuote", "PurchaseOrder", "POWaitingConfirmation", "POConfirm",
      //Goods Issue
      "IssueRequisition",
      //Stocktake
      "AwaitingAdjustment", "CreateStocktake", "Progressing"
      //
    ]
  }
  else if (role === "Accountant") {
    return ["Supplier", "Setting", "PurchaseOrderMenu", "GoodsReceipt", "GoodsIssue", "Stocktake",
      //PO
      "Requisition", "PriceQuote", "PurchaseOrder", "POConfirm",
      //Goods Issue
      "IssueRequisition",
      //Stocktake
      "CreateStocktake", "Progressing"
    ]
  }
  else if (role === "StockKeeper") {
    return ["Setting", "GoodsReceipt", "GoodsIssue",
      //Goods Rêcipt
      "CreateGoodsReceipt",
      //Goods Issue,

      "Packing", "Shipping",
      //Stocktake


    ]
  }
  else if (role === "Saleman") {
    return ["Setting", "PurchaseRequistion",
    ]
  }
}

export default reducer