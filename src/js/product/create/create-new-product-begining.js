import React, { useState, useEffect, useReducer } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

//css
import "../product.css";

//components

//Category
//import { GetAllCategoryAction } from "../manager/category-manager/action";
import { getCategoriesAllAction } from "./action";

const formReducer = (state, event) => {
  return {
    ...state,
    [event.name]: event.value,
  };
};

export default function () {
  let history = useHistory();
  let dispatch = useDispatch();

  const [formData, setFormData] = useReducer(formReducer, {});
  const [categorySelected, setCategorySelected] = useState({});
  const [isVariant, setIsVariant] = useState(false);
  const [variantValues, setVariantValues] = useState([{}]);

  const onChangeValue = (event) => {
    setVariantValues(
      variantValues.map((element, index) =>
        index == event.target.id
          ? {
              ...element,
              [event.target.name]: event.target.value,
            }
          : element
      )
    );
  };

  const listCategoriesStore = useSelector(
    (state) => state.createProductReducer.listCategories
  );

  function goBackClick() {
    history.goBack();
  }

  function onClickContinue() {
    if (isVariant) {
      history.push("/homepage/product/create/variants", {
        formData: formData,
        categorySelected: categorySelected,
        variantValues: variantValues,
      });
    } else
      history.push("/homepage/product/create/novariants", {
        formData: formData,
        categorySelected: categorySelected,
      });
  }

  const handleChangeValue = (event) => {
    event.preventDefault();

    setFormData({
      name: event.target.name,
      value: event.target.value,
    });
  };

  const handleChangeCategory = (e) => {
    // event.preventDefault();
    const index = e.target.selectedIndex;
    const el = e.target.childNodes[index];

    // console.log(event.target.id);
    setCategorySelected({
      id: el.getAttribute("id"),
      name: el.getAttribute("value"),
    });
    console.log(categorySelected);
  };

  const onChangeFormVariants = (event) => {
    setIsVariant(!isVariant);
    // console.log([...Array(count)]);
  };

  function addAttribute() {
    setVariantValues((state) => [...state, { attribute: "", value: "" }]);
  }

  const deleteVarriant = (index) => {
    console.log(index);
    setVariantValues((state) => state.filter((_, i) => i !== index));
  };

  useEffect(() => {
    dispatch(getCategoriesAllAction());
  }, []);

  return (
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
            <button
              type="button"
              className="btn btn-warning button-tab me-3 text-white"
              onClick={onClickContinue}
            >
              Continue
            </button>
          </div>
        </div>
      </div>

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
                    defaultValue=""
                    onChange={handleChangeCategory}
                  >
                    <option value="" disabled>
                      -- No Selected --
                    </option>

                    {listCategoriesStore.map((category) => (
                      <option id={category.id} value={category.categoryName}>
                        {category.categoryName}
                      </option>
                    ))}
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
                  />
                </div>
                <div class="col-auto">
                  <label for="unit" class="col-form-label">
                    Unit
                  </label>{" "}
                  <input
                    name="unit"
                    type="text"
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
              <input
                type="checkbox"
                class="form-check-input"
                id="variants"
                defaultChecked={isVariant}
                onClick={onChangeFormVariants}
              />
              <label class="form-check-label" for="variants">
                Products has many attributes.
              </label>
              <div id="checkBoxHelp" class="form-text">
                Product variants are used to manage products having different
                variants like size, color,...
              </div>
            </div>

            {isVariant && (
              <>
                <div class="mb-3">
                  <a
                    class="btn btn-default me-md-2 add"
                    // data-bs-target="#NewCategoryModal"
                    // data-bs-toggle="modal"
                    onClick={() => addAttribute()}
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
                </div>

                <ComponentsCheckVariant
                  dataAtrribute={variantValues}
                  onChangeValue={onChangeValue}
                  deleteVarriant={deleteVarriant}
                />
              </>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}

function ComponentsCheckVariant(props) {
  return (
    <>
      {props.dataAtrribute.map((element, index) => (
        <div class="mb-3">
          <form>
            <div class="row g-3 align-items-center">
              <p onClick={() => props.deleteVarriant(index)}>Delete</p>
              <div class="col-auto">
                <label for="attribute" class="col-form-label">
                  Attribute
                </label>{" "}
                <input
                  type="text"
                  id={index}
                  name="attribute"
                  class="form-control"
                  value={element.attribute}
                  placeholder="Ex: Size, Color, Storage,etc"
                  onChange={props.onChangeValue}
                />
              </div>
              <div class="col">
                <label for="value" class="col-form-label">
                  Value
                </label>{" "}
                <input
                  name="value"
                  type="tel"
                  id={index}
                  value={element.value}
                  class="form-control"
                  placeholder="Ex: S, M, L, Pink, etc"
                  onChange={props.onChangeValue}
                />
              </div>
            </div>
          </form>
        </div>
      ))}
    </>
  );
}

// {/* content3 */}
// <div className="wrapper-content shadow mt-3"></div>
// </div> */}
