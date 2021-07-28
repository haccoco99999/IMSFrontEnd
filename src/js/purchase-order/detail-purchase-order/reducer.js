// import {GET_DETAIL_QUOTE_PRODUCT_ERROR,
//     GET_DETAIL_QUOTE_PRODUCT_SUCCESS,
//     GET_DETAIL_QUOTE_PRODUCT_REQUESTING,
//     } from './contants'


// const initalState = {
    
//     requesting: false,
//     successful: false,
//     messages: "",
//     errors: "",
//     priceQuoteOrder:  {
//         priceQuoteNumber: "",
//         supplierId: "",
//         supplier: {
//           supplierName: "",
//           description: "",
//           street: "",
//           city: "",
//           province: "",
//           country: "",
//           salePersonName: "",
//           phoneNumber: "",
//           email: ""
//         },
//         deadline: "",
//         mailDescription: "",
//         priceQuoteStatus: 0,
//         totalOrderAmount: 0,
//         purchaseOrderProduct: [
//           {
//             productVariant: {
//                 id: "",
//                 productId: "",
//                 name: "",
//                 price: 0,
//                 sku: "",
//                 unit: "",
//                 quantity: 0,
//                 storageLocation: "",
//                 createdDate: "",
//                 modifiedDate: "",
//                 isVariantType: true
//               },
//               id: "",
//               orderNumber: "",
//               productVariantId: "",
//               orderQuantity: 0,
//               unit: "",
//               price: 0,
//               discountAmount: 0,
//               totalAmount: 0
//           }
//         ],
//         transaction: {
//             name: "",
//             validUntil: "",
//             createdDate: "",
//             modifiedDate: "",
//             createdById: "",
//             createdBy: {
//               id: "",
//               username: "",
//               email: "",
//               fullname: "",
//               phoneNumber: "",
//               address: "",
//               dateOfBirth: "",
//               dateOfBirthNormalizedString: "",
//               isActive: true
//             },
//             confirmedById: "",
//             confirmedBy: {
//               id: "",
//               username: "",
//               email: "",
//               fullname: "",
//               phoneNumber: "",
//               address: "",
//               dateOfBirth: "",
//               dateOfBirthNormalizedString: "",
//               isActive: true
//             },
//             modifiedById: "",
//             modifiedBy: {
//               id: "",
//               username: "",
//               email: "",
//               fullname: "",
//               phoneNumber: "",
//               address: "",
//               dateOfBirth: "",
//               dateOfBirthNormalizedString: "",
//               isActive: true
//             },
//             type: 1,
//             transactionStatus: true
//           }
//       }
// }
//  const reducer = function PriceQuoteOrderReducer(state = initalState, action){
//     switch(action.type){
//         case GET_DETAIL_QUOTE_PRODUCT_REQUESTING:
//             return{...state,
//                 requesting: true,
//                 successful: false,
//                 messages: "",
//                 errors: "",
                
//             }
//         case GET_DETAIL_QUOTE_PRODUCT_SUCCESS:
            
//             return{...state,
//                 requesting: false,
//                 successful: true,
//                 messages: "",
//                 errors: "",
//                 priceQuoteOrder: action.json.priceQuoteOrders[0]
//             }
//         case GET_DETAIL_QUOTE_PRODUCT_ERROR:
//             return{...state,
//                 requesting: false,
//                 successful: false,
//                 messages: "",
//                 errors: "error",
                
//             }
//         default: 
//             return state
//     }
// }

// export default reducer


