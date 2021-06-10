import React from "react";
import "./product.css";


import CreateProductHaveVariants from "./CreateProductHaveVariants";
import CreateProductNotHaveVariants from "./CreateProductNotHaveVariants";

export default function CreateNewProduct() {
  return (
    //TODO: 2 loai create product

    //? not have variants
   // <CreateProductNotHaveVariants/>
    //? have variants
<CreateProductHaveVariants/>

    // TODO: co the gop 2 cai create new product thanh 1
    // <div className="wrapper overflow-scroll">
    //   <div className=" tab-fixed fixed-top border-bottom shadow">
    //     <div className=" d-flex mb-3 justify-content-end mt-4">
    //       <h2 className=" supplierid-color me-auto">
    //         Create new product
    //       </h2>
    //       <button className="btn btn-default">Cancel</button>
    //       <button className="btn btn-primary button me-3 text-white">
    //         Save
    //       </button>
    //       <button className="btn btn-warning button me-3">Add Value</button>
    //     </div>
    //   </div>

    //   <div className="d-flex flex-column align-items-center wrapper-spacetop">
    //     <div className="wrapper_create  mt-3 shadow ">
    //       <form className="ms-3 me-3">
    //         <div class="mb-3">
    //           <div class="row g-3 align-items-center">
    //             <div class="col">
    //               <label for="productname" class="col-form-label">
    //                 Product Name
    //               </label>{" "}
    //               <input
    //                 type="text"
    //                 id="productname"
    //                 class="form-control"
    //                 placeholder="Write product name here"
    //                 //aria-describedby="passwordHelpInline"
    //               />
    //             </div>
    //             <div class="col-auto">
    //               <label for="barcode" class="col-form-label">
    //                 Barcode
    //               </label>{" "}
    //               <input
    //                 type="tel"
    //                 id="barcode"
    //                 class="form-control"
    //                 // aria-describedby="passwordHelpInline"
    //               />
    //             </div>
    //           </div>
    //         </div>

    //         <div class="mb-3">
    //           <div class="row g-3 align-items-center">
    //             <div class="col">
    //               <label for="category" class="col-form-label">
    //                 Category
    //               </label>{" "}
    //               <select
    //                 class="form-select"
    //                 aria-label="Default select example"
    //               >
    //                 <option selected>-- No Selected --</option>
    //                 <option value="1">One</option>
    //                 <option value="2">Two</option>
    //                 <option value="3">Three</option>
    //                 //TODO:Create new category
    //                 <option>
    //                   <a
    //                     class="btn btn-default me-md-2 add"
    //                     // data-bs-target="#NewCategoryModal"
    //                     // data-bs-toggle="modal"
    //                   >
    //                     <svg
    //                       xmlns="http://www.w3.org/2000/svg"
    //                       width="20"
    //                       height="20"
    //                       fill="currentColor"
    //                       class="bi bi-plus-lg"
    //                       viewBox="0 0 20 20"
    //                     >
    //                       <path d="M8 0a1 1 0 0 1 1 1v6h6a1 1 0 1 1 0 2H9v6a1 1 0 1 1-2 0V9H1a1 1 0 0 1 0-2h6V1a1 1 0 0 1 1-1z" />
    //                     </svg>
    //                     Add new attribute
    //                   </a>
    //                 </option>
    //               </select>
    //             </div>
    //             <div class="col-auto">
    //               <label for="brand" class="col-form-label">
    //                 Brand
    //               </label>{" "}
    //               <input
    //                 type="tel"
    //                 id="brand"
    //                 class="form-control"
    //                 // aria-describedby="passwordHelpInline"
    //               />
    //             </div>
    //             <div class="col-auto">
    //               <label for="unit" class="col-form-label">
    //                 Unit
    //               </label>{" "}
    //               <input
    //                 type="tel"
    //                 id="unit"
    //                 class="form-control"
    //                 // aria-describedby="passwordHelpInline"
    //               />
    //             </div>
    //           </div>
    //         </div>
    //       </form>
    //     </div>
    //   </div>

    //   <div className="d-flex flex-column align-items-center wrapper-spacetop">
    //     <div className="wrapper_create  mt-3 shadow ">
    //       <form className="ms-3 me-3">
    //         <div class="mb-3 form-check">
    //           <input type="checkbox" class="form-check-input" id="variants" />
    //           <label class="form-check-label" for="variants">
    //             Products has many attributes.
    //           </label>
    //           <div id="checkBoxHelp" class="form-text">
    //             Product variants are used to manage products having different
    //             variants like size, color,...
    //           </div>
    //         </div>

    //         <div class="mb-3">
    //           <div class="row g-3 align-items-center">
    //             <div class="col-auto">
    //               <label for="attribute" class="col-form-label">
    //                 Attribute
    //               </label>{" "}
    //               <input
    //                 type="text"
    //                 id="attribute"
    //                 class="form-control"
    //                 placeholder="Ex: Size, Color, Storage,etc"
    //                 //aria-describedby="passwordHelpInline"
    //               />
    //             </div>
    //             <div class="col">
    //               <label for="value" class="col-form-label">
    //                 Value
    //               </label>{" "}
    //               <input
    //                 type="tel"
    //                 id="value"
    //                 class="form-control"
    //                 placeholder="Ex: S, M, L, Pink, etc"

    //                 // aria-describedby="passwordHelpInline"
    //               />
    //             </div>
    //           </div>
    //         </div>
    //         <div class="mb-3">
    //           <a
    //             class="btn btn-default me-md-2 add"
    //             // data-bs-target="#NewCategoryModal"
    //             // data-bs-toggle="modal"
    //           >
    //             <svg
    //               xmlns="http://www.w3.org/2000/svg"
    //               width="20"
    //               height="20"
    //               fill="currentColor"
    //               class="bi bi-plus-lg"
    //               viewBox="0 0 20 20"
    //             >
    //               <path d="M8 0a1 1 0 0 1 1 1v6h6a1 1 0 1 1 0 2H9v6a1 1 0 1 1-2 0V9H1a1 1 0 0 1 0-2h6V1a1 1 0 0 1 1-1z" />
    //             </svg>
    //             Add new attribute
    //           </a>
    //         </div>
    //       </form>
    //     </div>
    //   </div>
    // </div>
  );
}
