import React, { useEffect, useRef, useState } from 'react'
import { ProductSearchSuggestion, SearchToAddProduct } from '../../search-component/SearchComponentAll'
import './FormAddProductModal.css'

export default function FormAddProductModal(props) {
  const productInit = {
    id: "",
    productVariantId: 0,
    orderQuantity: 0,
    unit: "",
    price: 0,
    discountAmount: 0,
    totalAmount: 0,
    name: "",
    sku: "",
  }
  if (props.isShowAddProductPage) {
    const [product, setProduct] = useState(productInit)
    const [eventNavTabs, setEventNavTabs] = useState({
      addOneProduct: true,
      addGroupProduct: false,
    })
    const [listGroupNameProduct, setListGroupNameProduct] = useState([])
    function getInfoProduct(info) {
    console.log(info)
     
        setProduct({
     
          productVariantId: info.productVariantId,
          orderQuantity: 0,
          unit: info.unit,
          price: 0,
          discountAmount: 0,
          totalAmount: 0,
          name: info.name,
          sku: info.sku,
        })
      
    }
    function changeValueInput(event) {
      setProduct((state) => ({
        ...state, [event.target.name]: event.target.valueAsNumber
      }))
    }
    function changeNavTabs(event) {
      setEventNavTabs((state) => ({
        [event.target.name]: true

      }))
    }
    const searchKey = useRef("")
    async function getListProduct(keySearch) {

      const updateUrl = "https://imspublicapi.herokuapp.com/api/product/search?SearchQuery=" + keySearch

      let json = await fetch(updateUrl, {

        method: 'GET',
        headers: {
          "Content-Type": "application/json",
          "Origin": ""
        },
        credentials: "include",

      }).then(response => response.json())
        .then(json => json)
        .catch((error) => { throw error })

      setListGroupNameProduct(json.paging.resultList.map(product => {
        return {
          isChecked: false,
          haveProduct: false,
          productId: product.id,
          name: product.name,
          listProductVariant: []
        }

      }))




    }
    console.log(listGroupNameProduct)
    async function getListProductVariant(productId, index) {

      const updateUrl = "https://imspublicapi.herokuapp.com/api/product/" + productId

      let json = await fetch(updateUrl, {

        method: 'GET',
        headers: {
          "Content-Type": "application/json",
          "Origin": ""
        },
        credentials: "include",

      }).then(response => response.json())
        .then(json => json)
        .catch((error) => { throw error })


      setListGroupNameProduct((state) => state.map((element, i) => i === index ? {
        ...element, haveProduct: true,
        listProductVariant: json.product.productVariants.map(productVariant => {
          return {
            
        
            productVariantId: productVariant.id,
            orderQuantity: 0,
            unit: productVariant.unit,
            price: 0,
            discountAmount: 0,
            totalAmount: 0,
            name: productVariant.name,
            sku: productVariant.sku,
          }
        })
      } : element)
      )




    }

    function selectGroupProduct(event, index, haveProduct, orderId) {
      setListGroupNameProduct((state) => state.map((element, i) => i === index ? {
        ...element, isChecked: event.target.checked
      } : element)
      )
      !haveProduct ? getListProductVariant(orderId, index) : null
    }

    return (
      <div>
        <div className="modal  modal-merge-pirce-quote"   >
          <div className="modal-dialog modal-dialog-merge-pirce-quote" >
            <div className="modal-content modal-content-merge-pirce-quote">
              <div className="modal-header">
                <h5 className="modal-title">Add Product</h5>
                <button
                  onClick={() => props.clickSetShowAddProductPage()}
                  className="btn-close"

                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body modal-body-merge-price-quote">

                <nav>
                  <div class="nav nav-tabs" id="nav-tab" role="tablist">
                    <button onClick={(e) => changeNavTabs(e)} name="addOneProduct" class="nav-link show active customize-nav-tabs" id="nav-home-tab" data-bs-toggle="tab" data-bs-target="#nav-home" type="button" role="tab" aria-controls="nav-home" aria-selected="true">One Product</button>
                    <button onClick={(e) => changeNavTabs(e)} name="addGroupProduct" class="nav-link customize-nav-tabs" id="nav-profile-tab" data-bs-toggle="tab" data-bs-target="#nav-profile" type="button" role="tab" aria-controls="nav-profile" aria-selected="false">Group Product</button>
                  </div>
                </nav>
                <div class="tab-content" id="nav-tabContent">
                  {eventNavTabs.addOneProduct ? (<div>
                    <SearchToAddProduct getInfoProduct={getInfoProduct} />
                    <div class="form-group">
                      <label for="">SKU</label>
                      <input type="text" disabled
                        value={product.sku} class="form-control" name="" id="" aria-describedby="helpId" placeholder="" />
                    </div>
                    <div class="form-group">
                      <label for="">Product Name</label>
                      <input type="text" disabled
                        value={product.name} class="form-control" name="" id="" aria-describedby="helpId" placeholder="" />
                    </div>
                    <div class="form-group">
                      <label for="">Quantity</label>
                      <input type="number"
                        value={product.orderQuantity} class="form-control" name="orderQuantity" onChange={changeValueInput} aria-describedby="helpId" placeholder="" />
                    </div>
                  </div>) : ""}
                  {eventNavTabs.addGroupProduct ? (<div>

                    <ProductSearchSuggestion getListProduct={getListProduct} />


                    <div>
                      {listGroupNameProduct.map((product, index) => {
                        return (
                          <div>
                            <div class="form-check">

                              <input class="form-check-input" type="checkbox" checked={product.isChecked} onChange={(e) => selectGroupProduct(e, index, product.haveProduct, product.productId)} />
                              <label class="form-check-label" data-bs-toggle="collapse" data-bs-target={"#collapsediv" + index} onClick={() => !product.haveProduct ? getListProductVariant(product.productId, index) : null}  >{product.name}</label>
                            </div>

                            <div id={"collapsediv" + index} class="collapse">

                              <table class="table">
                                <thead>
                                  <tr>
                                    <th scope="col">SKU</th>
                                    <th scope="col">Name</th>


                                  </tr>
                                </thead>
                                <tbody>
                                  {product.listProductVariant.map((productVariant, index) => {
                                    return (
                                      <tr>
                                        <td>{productVariant.sku}</td>
                                        <td>{productVariant.name}</td>


                                      </tr>
                                    )
                                  })}
                                </tbody>
                              </table>
                            </div>
                          </div>
                        )
                      })}


                    </div>
                  </div>) : ""}

                </div>









              </div>
              <div className="modal-footer">
                <button
                  onClick={() => props.clickSetShowAddProductPage()}
                  type="button"
                  className="btn btn-default">
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() =>
                    eventNavTabs.addOneProduct ? props.clickToAddProduct(product) :
                      props.addGroupProduct(listGroupNameProduct)
                  }
                  className="btn btn-default text-white button-save--modal " >
                  Done
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
  else {
    return ""
  }
}


