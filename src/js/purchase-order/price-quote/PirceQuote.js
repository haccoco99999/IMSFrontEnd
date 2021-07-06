// import React, { useEffect, useState } from 'react'
// import { connect, useDispatch, useSelector } from 'react-redux'
// import { useHistory, useLocation, withRouter } from 'react-router-dom'
// import { getDetailPurchaseOrder, confirmDetailPurchaseOrder, confirmPurchaseORderByManager, saveProductsPurchaseOrder } from './action'
// import NavigationBar from '../../navigation-bar-component/NavigationBar';
// import InfoDetailReceipt from '../../info-detail-receipt/InfoDetailReceipt';
// import ListProductsTable from '../../list-products-table/ListProductsTable';

// export default function PriceQuote() {
//     let dispatch = useDispatch()
//     let history = useHistory()
//     let location = useLocation()
//     let [eventPage, setEventPage] = getStateShowButton({
//         isShowEdit: true,
//         isShowPreview: true,
//         isShowCancel: false,
//         isShowSave: false,

//     })
//     let purchaseOrderDataGlobal = useSelector(state => state.getDetailPurchaseReducer.detailPurchaseOrder)
//     let [detailPurchaseState, setDetailPurchaseState] = useState(purchaseOrderDataGlobal)
    
//     useEffect(() => {
//         dispatch(getDetailPurchaseOrder(location.state.orderID))
//     }, [])

//     // console.log(detailPurchaseState, "alalla")
//     // useEffect(() => {
//     //     dispatch(getDetailPurchaseOrder(location.state.orderID))
//     // }, [])
//     // useEffect(() => {
//     //     setDetailPurchaseState({
//     //         ...purchaseOrderDataGlobal
//     //     }
//     //     )
//     // }, [purchaseOrderDataGlobal])


//     const listButton = [


//         {
//             isShow: eventPage.isShowEdit,
//             title: "Edit",
//             action: () => editClick(),
//             style: {
//                 "background-color": "#f9c421"
//             }
//         },
//         {
//             isShow: eventPage.isShowCancel,
//             title: "Cancel",
//             action: () => cancelEditClick(),
//             style: {
//                 background: "red"
//             }
//         },
//         {
//             isShow: eventPage.isShowSave,
//             title: "Save",
//             action: () => saveEditClick(),
//             style: {
//                 background: "#4ca962"
//             }
//         },


//         {
//             isShow: eventPage.isShowPreview,
//             title: "Preview Mail To Send",
//             action: () => clickPreview(),
//             style: {
//                 background: "#4e9ae8"
//             },


//         },
//     ]


//     return (
//         <div>
//             <NavigationBar actionGoBack={() => goBackClick()}
//                 titleBar="NO10235"
//                 listButton={listButton}
//             />
//             <InfoDetailReceipt
//                 createdBy={detailPurchaseState.transaction.createdBy}
//                 supplier={detailPurchaseState.supplier}
//                 date={
//                     {
//                         createDate: "10/20/2016",
//                         deadline: "20/28/200",

//                     }
//                 }
//             />
//             {console.log(detailPurchaseState.purchaseOrderProduct)}
//             <ListProductsTable


//                 onChangeValueProduct={onChangeValueProduct}

//                 listColumn={["Product No", "Product Name", "Unit", "Quantity", "Unit Price", "Ammount"]}
//                 listData={detailPurchaseState.purchaseOrderProduct} />
//         </div>
//     )
// }
