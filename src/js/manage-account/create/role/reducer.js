import {
  CREATE_ROLE_ERROR, CREATE_ROLE_REQUESTING, CREATE_ROLE_SUCCESS,
  GET_DETAIL_ROLE_ERROR, GET_DETAIL_ROLE_REQUESTING, GET_DETAIL_ROLE_SUCCESS,
  UPDATE_DETAIL_ROLE_ERROR, UPDATE_DETAIL_ROLE_REQUESTING, UPDATE_DETAIL_ROLE_SUCCESS,

} from './contants'

const initalState = {
  requesting: false,
  success: false,
  messages: "",
  errors: "",
  result: {},
};

export function createRolePermission(state = initalState, action) {
  switch (action.type) {
    case CREATE_ROLE_REQUESTING:
      return {
        requesting: true,
        success: false,
        messages: "",
        errors: "",
        result: {},
      };
    case CREATE_ROLE_SUCCESS:
      return {
        requesting: false,
        successful: true,
        messages: "",
        errors: "",
        result: action.json,
      };
    case CREATE_ROLE_ERROR:
      return {
        requesting: false,
        success: false,
        messages: "",
        errors: "",
        result: {},
      };
    default:
      return state;
  }
};



const permissions = [
  { name: "Create", isChecked: false },
  { name: "Read", isChecked: false },
  { name: "Update", isChecked: false },
  { name: "Delete", isChecked: false },
  { name: "Approve", isChecked: false },
  { name: "Reject", isChecked: false }
]
const pagePermissions = [
  {
    isCheck: false,

    name: "StockTakeOrder",
    listPermission: [
      ...permissions
    ],
  }, {
    isCheck: false,

    name: "GoodsIssue",
    listPermission: [
      ...permissions
    ]
  },
  {
    isCheck: false,

    name: "UserDetail",
    listPermission: [
      ...permissions
    ]
  },
  {
    isCheck: false,

    name: "RolePermissionUpdate",
    listPermission: [
      ...permissions
    ]
  },
  {
    isCheck: false,

    name: "Product",

    listPermission: [
      ...permissions
    ]
  },
  {

    isCheck: false,

    name: "PriceQuoteOrder",
    listPermission: [
      ...permissions
    ]
  },
  {
    isCheck: false,

    name: "PurchaseOrder",
    listPermission: [
      ...permissions
    ]
  },
  {
    isCheck: false,

    name: "Requisition",
    listPermission: [
      ...permissions
    ]
  },
  {
    isCheck: false,

    name: "Supplier",
    listPermission: [
      ...permissions
    ]
  },
  {
    isCheck: false,

    name: "GoodsReceipt",
    listPermission: [
      ...permissions
    ]
  },
  {
    isCheck: false,

    name: "Transaction",
    listPermission: [
      ...permissions
    ]
  },
  {
    isCheck: false,

    name: "Registration",
    listPermission: [
      ...permissions
    ]
  },
  {
    isCheck: false,

    name: "Category",
    listPermission: [
      ...permissions
    ]
  },
  {
    isCheck: false,

    name: "Report",
    listPermission: [
      ...permissions
    ]
  },
]

const initalRoleDetailState = {
  requesting: false,
  success: false,
  messages: "",
  errors: "",
  detailRole: {
    roleId: "",
    roleName: "",
    pagePermissions: pagePermissions
  }
};

export const DetailRolePermission = function getDetailRolePermission(state = initalRoleDetailState, action) {
  switch (action.type) {
    case GET_DETAIL_ROLE_REQUESTING:
      return {
        
        requesting: true,
        success: false,
        messages: "",
        errors: "",
        detailRole: {
          roleId: "",
          roleName: "",
          pagePermissions: pagePermissions
        }
      };
    case GET_DETAIL_ROLE_SUCCESS:
      // let a;
    //  Object.entries(action.json.pagePermissions).map( object =>
    //     a= state.pagePermissions.map(item => item.name === object[0] ? {
    //       ...item, isCheck: true, listPermission: object[1].map(namePermission => {
    //         item.listPermission.map(permission => permission.name === namePermission ? { ...permission, isChecked: true } : permission)
    //       })
    //     } : item

    //     )
    //  )
  

        
     
      // console.log(a)
      return {

        requesting: false,
        successful: true,
        messages: "",
        errors: "",
        detailRole: {
          roleId: action.json.role.id,
          roleName: action.json.role.name,
          pagePermissions:   state.detailRole.pagePermissions.map(item => {
            let itemTemp
           Object.entries(action.json.pagePermissions).every(object =>{
             
               if(item.name ===  object[0]){
                
                 itemTemp ={
                   ...item, isCheck: true,
                   listPermission:   item.listPermission.map(permission =>{
                     let arrayTemp
                     object[1].every(permissionName =>{
                       if(permissionName === permission.name){
                         arrayTemp =  {...permission, isChecked:true}
                         return false
                       }
                       arrayTemp = permission
                       return true
                     })
                     return arrayTemp
                   })
                 }
                 return false
        
               }
               else{
                 itemTemp = item
                 return true
               }
             })
            
             return itemTemp
           })
        }
      };
    case GET_DETAIL_ROLE_ERROR:
      return {
        requesting: false,
        success: false,
        messages: "",
        errors: "",
        result: {},
      };
    default:
      return state;
  }
};


const initalUpdateRoleDetailState = {
  requesting: false,
  success: false,
  messages: "",
  errors: "",
  detailRole: {
    roleId: "",
    roleName: "",
    pagePermissions: {

    }
  }
};
export const UpdateRolePermission = function updateRolePermission(state = initalUpdateRoleDetailState, action) {
  switch (action.type) {
    case UPDATE_DETAIL_ROLE_REQUESTING:
      return {
        ...state,
        requesting: true,
        success: false,
        messages: "",
        errors: "",

      };
    case UPDATE_DETAIL_ROLE_SUCCESS:
      console.log(action.json)
      return {
        requesting: false,
        successful: true,
        messages: "",
        errors: "",
        detailRole: {
          roleId: action.json.role.id,
          roleName: action.json.role.name,
          pagePermissions: action.json.pagePermissions
        }
      };
    case UPDATE_DETAIL_ROLE_ERROR:
      return {
        requesting: false,
        success: false,
        messages: "",
        errors: "",
        result: {},
      };
    default:
      return state;
  }
};


