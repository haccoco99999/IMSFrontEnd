import React, { useState, useEffect, useReducer } from "react";
import { useSelector, useDispatch } from "react-redux";
//css
import "../product.css";
//components
import CreateNewProduct from "./CreateNewProduct";
import CreateNoVariants from "./create-no-variants/CreateNoVariants";
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

  const [step, setStep] = useState(1);
  const [isSelectVariantType, setIsSelectVariantType] = useState(false);
  const [formData, setFormData] = useReducer(formReducer, {});
  //todo:declare store
  const { listCategoriesStore, token, listBrandStore, messages } = useSelector(
    (state) => ({
      listCategoriesStore: state.createProductReducer.listCategories,
      token: state.client.token,
      listBrandStore: state.getDetailsProductReducer.listBrand,
      messages: state.createProductReducer.messages,
    })
  );
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

  useEffect(() => {
    dispatch(getCategoriesAllAction({ token: token }));
    dispatch(getAllBrandAction({ token: token }));
  }, []);

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
        />
      );
    case 2:
      if (isSelectVariantType) {
        return (
          <CreateWithVariants
            formData={formData}
            prevStep={prevStep}
            formReducer={formReducer}
            token={token}
            messages={messages}
          />
        );
      } else
        return (
          <CreateNoVariants
            formData={formData}
            prevStep={prevStep}
            formReducer={formReducer}
            token={token}
            messages={messages}
          />
        );
  }
}
