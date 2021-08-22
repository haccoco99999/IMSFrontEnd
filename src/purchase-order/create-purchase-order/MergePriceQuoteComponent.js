import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import './MergePriceQuote.css'

export default function MergePriceQuote(props) {

  // if (props.isShowMergePage) {
    const {token} = useSelector((state) =>({
      token : state.client.token
    }))
  const [listPriceQuote, setListPriceQuote] = useState([])

  async function getPriceQuoteAPI() {
    let query =""
     props.mergedRequisitionIds.forEach(element => {
      query +="&IgnoreOrderIds=" +element
    });
    const updateUrl = `${process.env.REACT_APP_API}/purchaseorder/search?HideMerged=true&Statuses=Requisition`+query

    let json = await fetch(updateUrl, {

      method: 'GET',
      headers: {
        "Authorization": "Bearer " + token,
        "Content-Type": "application/json",
        "Origin": ""
      },
      credentials: "include",

    })

      .then(response => response.json())
      .then(json => json)
      .catch((error) => { throw error })

    setListPriceQuote(
      json.paging.resultList.map(priceQuote => {
        return {
          isChecked: false,
          haveProduct: false,
          orderId: priceQuote.id,
          
          listProductOrder: []
        }
      })
    )
  }

  async function getListProdcutOrder(orderId, index) {
    const updateUrl = `${process.env.REACT_APP_API}/purchaseorder/number/` + orderId

    let json = await fetch(updateUrl, {

      method: 'GET',
      headers: {
        "Authorization": "Bearer " + token,
        "Content-Type": "application/json",
        "Origin": ""
      },
      credentials: "include",

    }).then(response => response.json())
      .then(json => json)
      .catch((error) => { throw error })



    console.log(json)
    setListPriceQuote((state) => state.map((element, i) => i === index ? {
      ...element, haveProduct: true,
      listProductOrder: json.purchaseOrder.purchaseOrderProduct.map(product => {
        return {
      
          productVariantId: product.productVariantId,
          orderQuantity: product.orderQuantity,
          unit: product.unit,
          price: product.price,
          discountAmount: product.discountAmount,
          totalAmount: product.totalAmount,
          name: product.productVariant.name,
          sku: product.productVariant.sku,
        }
      })
    } : element)
    )


  }
  function selectPriceQuote(event, index, haveProduct, orderId) {
    setListPriceQuote((state) => state.map((element, i) => i === index ? {
      ...element, isChecked: event.target.checked
    } : element)
    )
    if(!haveProduct) getListProdcutOrder(orderId, index)
  }

 
  useEffect(() => {
    getPriceQuoteAPI()
  }, [])


  console.log(listPriceQuote)


    return (
      <div>
        <div className="modal  modal-merge-pirce-quote"   >
          <div className="modal-dialog modal-dialog-merge-pirce-quote" >
            <div className="modal-content modal-content-merge-pirce-quote">
              <div className="modal-header">
                <h5 className="modal-title">Purchase Requistion</h5>
                <button
                  onClick={() => props.clickSetEventMergePriceQuote()}
                  className="btn-close"

                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body modal-body-merge-price-quote">
                <div>
                  {listPriceQuote.map((order, index) => {
                    return (
                      <div>
                        <div class="form-check">
                          <input class="form-check-input" type="checkbox" checked={order.isChecked} onChange={(e) => selectPriceQuote(e, index, order.haveProduct, order.orderId)} />
                          <label class="form-check-label pointer" data-bs-toggle="collapse" data-bs-target={"#collapsediv" + index} onClick={() => !order.haveProduct ? getListProdcutOrder(order.orderId, index) : null}  >{order.orderId}</label>
                        </div>

                        <div id={"collapsediv" + index} class="collapse">

                          <table class="table">
                            <thead>
                              <tr>
                                <th scope="col">SKU</th>
                                <th scope="col">Name</th>
                                <th scope="col">Quantity</th>

                              </tr>
                            </thead>
                            <tbody>
                              {order.listProductOrder.map((product, index) => {
                                return (
                                  <tr>
                                    <td>{product.sku}</td>
                                    <td>{product.name}</td>
                                    <td>{product.orderQuantity}</td>

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


              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-default"
                  onClick={() => props.clickSetEventMergePriceQuote()}
                >
                  Cancel
                </button>
                <button 
                  type="button"
                  onClick = {() =>{props.mergePriceQuote(listPriceQuote); props.clickSetEventMergePriceQuote()}}
                  className="btn btn-default text-white button-save--modal " >
                  Done
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  // }
  // else {
  //   return ""
  // }
}
