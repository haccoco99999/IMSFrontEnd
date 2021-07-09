import React, { useEffect, useState } from 'react'
import './FormAddProductModal.css'

export default function FormAddProductModal(props) {








 
    return (
      <div>
        <div className="modal  modal-merge-pirce-quote"   >
          <div className="modal-dialog modal-dialog-merge-pirce-quote" >
            <div className="modal-content modal-content-merge-pirce-quote">
              <div className="modal-header">
                <h5 className="modal-title">Filter</h5>
                <button
                 
                  className="btn-close"

                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body modal-body-merge-price-quote">
                <div>
                
                
                  </div>


              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-default">
                  Cancel
                </button>
                <button 
                  type="button"
                 
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


