import React, { useState, useEffect, useReducer } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import Swal from "sweetalert2";
//css
import "../product.css";
//components
// import CreateNewProduct from "./CreateNewProduct";
// import CreateNoVariants from "./create-no-variants/CreateNoVariants";
import CreateWithVariants from "./create-with-variants/CreateWithVariants";
import CreateProduct from "./CreateProduct";
//action
import { getCategoriesAllAction } from "./action";
import { getAllBrandAction } from "../details/action";

const formReducer = (state, event) => {
  return {
    ...state,
    [event.name]: event.value,
  };
};
export default function CreateProductManager() {
  let dispatch = useDispatch();
  let history = useHistory();
  const [step, setStep] = useState(1);
  const [isSelectVariantType, setIsSelectVariantType] = useState(false);
  const [formData, setFormData] = useReducer(formReducer, {
    // barcode: "",
    sku: "",
  });
  const [variantValues, setVariantValues] = useState([
    {
      id: uuid(),
      name: "",
      price: 0,
      salePrice: 0,
      barcode: "",
      sku: "",
    },
  ]);
  //todo:declare store
  const {
    listCategoriesStore,
    token,
    listBrandStore,
    messages,
    createProductReducer,
    checkDuplicateProductReducer
  } = useSelector((state) => ({
    listCategoriesStore: state.getCategoriesCreateProductReducer.listCategories,
    token: state.client.token,
    listBrandStore: state.getBrandReducer.listBrand,
    // messages: state.createProductReducer.messages,
    createProductReducer: state.createProductReducer,
    checkDuplicateProductReducer:state.checkDuplicateProductReducer
  }));
  function prevStep() {
    setStep(step - 1);
  }
  function nextStep() {
    setStep(step + 1);
  }
  function onChangeVariantType() {
    setIsSelectVariantType(!isSelectVariantType);
  }
  function setFormDataManager(inputName, inputValue) {
    setFormData({
      name: inputName,
      value: inputValue,
    });
  }
  function setVariantValuesManager() {}
  console.log("A", variantValues);
  function clickToAddVariants() {
    let productVariants = {
      id: uuid(),
      name: "",
      price: 0,
      salePrice: 0,
      barcode: "",
      sku: "",
    };
    setVariantValues([...variantValues, productVariants]);
  }

  function clickDeleteVariant(rowIndex) {
    // console.log(rowIndex);
    // console.log(variantValues);
    // console.log((state) => state.filter((_, i) => i !== rowIndex));

    setVariantValues((state) => state.filter((_, i) => i !== rowIndex));
  }
  //@params: uuid set random ID
  function uuid() {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
      /[xy]/g,
      function (c) {
        var r = (Math.random() * 16) | 0,
          v = c == "x" ? r : (r & 0x3) | 0x8;
        return v.toString(16);
      }
    );
  }

  useEffect(() => {
    dispatch(getCategoriesAllAction({ token: token }));
    dispatch(getAllBrandAction({ token: token }));
  }, []);

  useEffect(() => {
    if (createProductReducer.requesting) {
      Swal.fire({
        title: "Progressing",
        html: "Waiting...",
        timerProgressBar: true,
        didOpen: () => {
          Swal.showLoading();
        },
      });
    } else if (createProductReducer.successful) {
      if (createProductReducer.errors) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Duplicate",
          showCancelButton: false,
          confirmButtonColor: "#3085d6",
        });
      } else {
        Swal.fire({
          icon: "success",
          title: "Your work has been saved",
          showCancelButton: false,
          confirmButtonColor: "#3085d6",
        }).then((result) => {
          if (result.isConfirmed) {
            history.push("/homepage/product/details", {
              productId: createProductReducer.messages,
            });
          }
        });
      }
    } else if (createProductReducer.errors) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Something went wrong!",
        showCancelButton: false,
        confirmButtonColor: "#3085d6",
      });
    }
  }, [createProductReducer]);
  switch (step) {
    case 1:
      return (
        <CreateProduct
          nextStep={nextStep}
          setFormDataManager={setFormDataManager}
          formData={formData}
          isSelectVariantType={isSelectVariantType}
          onChangeVariantType={onChangeVariantType}
          listBrands={listBrandStore}
          listCategories={listCategoriesStore}
          token={token}
        />
      );
    case 2:
      if (isSelectVariantType) {
        return (
          <CreateWithVariants
            formData={formData}
            prevStep={prevStep}
            token={token}
            // messages={messages}
            variantValues={variantValues}
            clickToAddVariants={clickToAddVariants}
            clickDeleteVariant={clickDeleteVariant}
            setVariantValuesManager={setVariantValuesManager}
          />
        );
      }
    //  else
    //   return (
    //     <CreateNoVariants
    //       formData={formData}
    //       prevStep={prevStep}
    //       token={token}
    //       messages={messages}
    //       setFormDataManager={setFormDataManager}
    //     />
    //   );
  }
}
