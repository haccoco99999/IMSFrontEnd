// import React, { useEffect, useState } from 'react'
// import { SearchToAddProduct } from '../../search-component/SearchComponentAll'
// import './FormAddProductModal.css'

// export default function FormAddProductModal(props) {
//   if (props.isShowAddProductPage) {
//     const [product, setProduct] = useState({
//       id: "",
//       orderId: "",
//       productVariantId: "",
//       orderQuantity: "",
//       unit: "",
//       price: 0,
//       discountAmount: 0,
//       totalAmount: 0,
//       name: "",
//       sku: "",
//     })

//     function getInfoProduct(info) {
//       setProduct({
//         id: info.id,
//         productVariantId: info.productVariantId,
//         orderQuantity: info.quantity,
//         unit: info.unit,
//         price: info.price,
//         discountAmount: 0,
//         totalAmount: 0,
//         name: info.name,
//         sku: info.sku,
//       })
//     }
//     function changeValueInput(event) {
//       setProduct((state) => ({
//         ...state, [event.target.name]: event.target.value
//       }))
//     }





//     return (
//       <div>
//         <div className="modal  modal-merge-pirce-quote"   >
//           <div className="modal-dialog modal-dialog-merge-pirce-quote" >
//             <div className="modal-content modal-content-merge-pirce-quote">
//               <div className="modal-header">
//                 <h5 className="modal-title">Filter</h5>
//                 <button
//                   onClick={() =>props.clickSetShowAddProductPage()}
//                   className="btn-close"

//                   aria-label="Close"
//                 ></button>
//               </div>
//               <div className="modal-body modal-body-merge-price-quote">
//                 <div>
//                   <SearchToAddProduct getInfoProduct={getInfoProduct} />
//                   <div class="form-group">
//                     <label for="">SKU</label>
//                     <input type="text" disabled
//                       value={product.sku} class="form-control" name="" id="" aria-describedby="helpId" placeholder="" />
//                   </div>
//                   <div class="form-group">
//                     <label for="">Product Name</label>
//                     <input type="text" disabled
//                       value={product.name} class="form-control" name="" id="" aria-describedby="helpId" placeholder="" />
//                   </div>
//                   <div class="form-group">
//                     <label for="">Quantity</label>
//                     <input type="text"
//                       value={product.orderQuantity} class="form-control" name="orderQuantity" onChange={changeValueInput} aria-describedby="helpId" placeholder="" />
//                   </div>
//                 </div>


//               </div>
//               <div className="modal-footer">
//                 <button
//                   onClick={() =>props.clickSetShowAddProductPage()}
//                   type="button"
//                   className="btn btn-default">
//                   Cancel
//                 </button>
//                 <button
//                   type="button"
//                   onClick={() => props.clickToAddProduct(product)}
//                   className="btn btn-default text-white button-save--modal " >
//                   Done
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     )
//   }
//   else {
//     return ""
//   }
// }


