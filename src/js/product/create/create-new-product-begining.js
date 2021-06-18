import React, { useState, useEffect, useReducer } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

//css
import "../product.css";

//components
import CreateNoVariants from "./create-no-variants/create-no-variants";
import CreateWithVariants from "./create-with-variants/create-with-variants";

//Category
import { GetAllCategoryCreatePageAction } from "../manager/category-manager/action";

const formReducer = (state, event) => {
  return {
    ...state,
    [event.name]: event.value,
  };
};

export default function () {
  const [formData, setFormData] = useReducer(formReducer, {});

  const [categorySelected, setCategorySelected] = useState({});
  const [isVariant, setIsVariant] = useState(false);

  const { isDefaultPage, setIsDefaultPage } = useState(true);

  let history = useHistory();
  let dispatch = useDispatch();

  const list_Categories = useSelector(
    (state) => state.getAllCategoriesReducer.listCategories
  );

  function goBackClick(event) {
    //event.preventDefault();

    history.goBack();
  }

  function onClickAddValueButton(event) {
    //event.preventDefault();

    //test thoi nhe
    setIsDefaultPage(false);
    //etIsVariant(true);
  }

  const handleChangeValue = (event) => {
    event.preventDefault();
    // setIsChange(true);
    setFormData({
      name: event.target.name,
      value: event.target.value,
    });
    // dispatch(getConfirmedPODetailsAction({ id: event.target.value }));
  };

  useEffect(() => {
    dispatch(GetAllCategoryCreatePageAction());
  }, []);

  return (
    // <CreateWithVariants />
    <div className="home_content ">
      {/* todo: task heading */}
      <div className=" tab-fixed container-fluid  fixed-top">
        <div className=" d-flex mb-3 justify-content-end mt-4 ">
          {/* testing */}
          <a className="me-2" onClick={goBackClick}>
            <h3>Back</h3>
          </a>
          <h2 className="id-color fw-bold me-auto">Create new Product</h2>
          <div>
            <button className="btn btn-default button-tab">Cancel</button>
            <button className="btn btn-primary button-tab me-3 text-white">
              Save
            </button>
            <button className="btn btn-warning button-tab me-3 text-white">
              Add Value
            </button>
          </div>
        </div>
      </div>
      {/* content */}

        <div className="wrapper space-top">
          {/* content 1 */}
          <div className="wrapper-content shadow">
            <div className="title-heading mt-2">
              <span>Product Details</span>
            </div>
            <form>
              <div class="mb-3">
                <div class="row g-3 align-items-center">
                  <div class="col">
                    <label for="name" class="col-form-label">
                      Product Name
                    </label>{" "}
                    <input
                      type="text"
                      id="name"
                      class="form-control"
                      placeholder="Write product name here"
                      name="name"
                      value={formData.name || ""}
                      onChange={handleChangeValue}
                      //aria-describedby="passwordHelpInline"
                    />
                  </div>
                  <div class="col-auto">
                    <label for="barcode" class="col-form-label">
                      Barcode
                    </label>{" "}
                    <input
                      name="barcode"
                      value={formData.barcode || ""}
                      onChange={handleChangeValue}
                      type="tel"
                      id="barcode"
                      class="form-control"
                    />
                  </div>
                </div>
              </div>

              <div class="mb-3">
                <div class="row g-3 align-items-center">
                  <div class="col">
                    <label for="category" class="col-form-label">
                      Category
                    </label>{" "}
                    <select
                      name="categoryID"
                      class="form-select"
                      aria-label="Default select example"
                      value={formData.categoryID || ""}
                      onChange={handleChangeValue}
                    >
                      <option value="" disabled>
                        -- No Selected --
                      </option>

                      {list_Categories.map((category) => {
                        setCategorySelected({
                          id: category.id,
                          name: category.categoryName,
                        });
                        <option value={category.id}>
                          {category.categoryName}
                        </option>;
                      })}

                      {/* <option>
                      <a
                        class="btn btn-default me-md-2 add"
                        // data-bs-target="#NewCategoryModal"
                        // data-bs-toggle="modal"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          fill="currentColor"
                          class="bi bi-plus-lg"
                          viewBox="0 0 20 20"
                        >
                          <path d="M8 0a1 1 0 0 1 1 1v6h6a1 1 0 1 1 0 2H9v6a1 1 0 1 1-2 0V9H1a1 1 0 0 1 0-2h6V1a1 1 0 0 1 1-1z" />
                        </svg>
                        Add new attribute
                      </a>
                    </option> */}
                    </select>
                  </div>
                  <div class="col-auto">
                    <label for="brand" class="col-form-label">
                      Brand
                    </label>{" "}
                    <input
                      name="brand"
                      type="string"
                      id="brand"
                      class="form-control"
                      value={formData.brand || ""}
                      onChange={handleChangeValue}
                      // aria-describedby="passwordHelpInline"
                    />
                  </div>
                  <div class="col-auto">
                    <label for="unit" class="col-form-label">
                      Unit
                    </label>{" "}
                    <input
                      name="unit"
                      type="number"
                      id="unit"
                      class="form-control"
                      value={formData.unit || ""}
                      onChange={handleChangeValue}
                    />
                  </div>
                </div>
              </div>
            </form>
          </div>

          {/* content 2 */}
          <div className="wrapper-content shadow mt-3">
            <form>
              <div class="mb-3 form-check">
                <input type="checkbox" class="form-check-input" id="variants" />
                <label class="form-check-label" for="variants">
                  Products has many attributes.
                </label>
                <div id="checkBoxHelp" class="form-text">
                  Product variants are used to manage products having different
                  variants like size, color,...
                </div>
              </div>

              {/* <div class="mb-3">
              <div class="row g-3 align-items-center">
                <div class="col-auto">
                  <label for="attribute" class="col-form-label">
                    Attribute
                  </label>{" "}
                  <input
                    type="text"
                    id="attribute"
                    class="form-control"
                    placeholder="Ex: Size, Color, Storage,etc"
                    //aria-describedby="passwordHelpInline"
                  />
                </div>
                <div class="col">
                  <label for="value" class="col-form-label">
                    Value
                  </label>{" "}
                  <input
                    type="tel"
                    id="value"
                    class="form-control"
                    placeholder="Ex: S, M, L, Pink, etc"

                    // aria-describedby="passwordHelpInline"
                  />
                </div>
              </div>
            </div>
            <div class="mb-3">
              <a
                class="btn btn-default me-md-2 add"
                // data-bs-target="#NewCategoryModal"
                // data-bs-toggle="modal"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="currentColor"
                  class="bi bi-plus-lg"
                  viewBox="0 0 20 20"
                >
                  <path d="M8 0a1 1 0 0 1 1 1v6h6a1 1 0 1 1 0 2H9v6a1 1 0 1 1-2 0V9H1a1 1 0 0 1 0-2h6V1a1 1 0 0 1 1-1z" />
                </svg>
                Add new attribute
              </a>
            </div> */}
            </form>
          </div>
        </div>
 
    </div>
  );
}

// function NoVariants(props) {
//   const [formData, setFormData] = useReducer(formReducer, {});

//   return (
//     <div className="wrapper space-top">
//       {/* show product details */}
//       {/* <h2 className="id-color fw-bold mb-3">Dell monitor 27" U2720DE</h2> */}
//       <div class="d-flex justify-content-around  mb-3">
//         <div>
//           <h5>Product Name</h5>
//           <h5 className="id-color">{formData.name}</h5>
//         </div>
//         <div>
//           <h5>Barcode</h5>
//           <h5 className="id-color"> {formData.barcode}</h5>
//         </div>
//         <div>
//           <h5>Category</h5>
//           <h5 className="id-color">{formData.categoryID}</h5>
//         </div>
//         <div>
//           <h5>Brand</h5>
//           <h5 className="id-color">{formData.brand}</h5>
//         </div>
//       </div>

//       {/* content  */}

//       <div className="wrapper-content shadow">
//         <form>
//           <div class="mb-3">
//             <label for="sku" class="col-form-label">
//               SKU
//             </label>{" "}
//             <input type="text" id="sku" class="form-control" />
//           </div>
//           <div class="mb-3">
//             <div class="row g-3 align-items-center">
//               <div class="col">
//                 <label for="salesprice" class="col-form-label">
//                   Salesprice
//                 </label>{" "}
//                 <input type="text" id="salesprice" class="form-control" />
//               </div>
//               <div class="col">
//                 <label for="quantity" class="col-form-label">
//                   Quantity
//                 </label>{" "}
//                 <input type="text" id="quantity" class="form-control" />
//               </div>
//               <div class="mb-3">
//                 <label for="salesprice" class="col-form-label">
//                   Location
//                 </label>{" "}
//                 <textarea
//                   class="form-control"
//                   id="salesprice"
//                   rows="3"
//                   placeholder="Write product location here"
//                 ></textarea>
//               </div>
//             </div>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }
