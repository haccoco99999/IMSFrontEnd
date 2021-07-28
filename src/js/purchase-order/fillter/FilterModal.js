import React, { useEffect, useRef, useState } from "react";
import { SeachSupplier } from "../../search-component/SearchComponentAll";
import "./fillter.css";

export default function FilterModal(props) {
 if(props.isShowFilter){
  const [filter, setFilter] = useState({ ...props.filterValue })
  const [eventAddSelect, setEventAddSelect] = useState(false)
  
  const listSelection = [
    {
      id: "supplier",
      name: "Supplier",

    },
    {
      id: "totalPrice",
      name: "Total Price",

    },
    {
      id: "deliveryDate",
      name: "Delivery Date",

    },
    {
      id: "confirmedDate",
      name: "Confirmed Date",

    },
    {
      id: "createdDate",
      name: "Created Date",

    },
    {
      id: "modifiedDate",
      name: "Modified Date",

    },
    {
      id: "status",
      name: "Find Status",

    },
  ]

  // const [listSelected, setLiselecte] = useState([])
  const [listselectFilter, setListselectFilter] = useState([])
  const [childComponent, setChildComponent] = useState([])
  console.log(childComponent)
  console.log(listselectFilter)
  const [supplierInfo, setSupplier] = useState({
    id: "",
    address: "",
    supplierName: "",
    phoneNumber: "",
    email: "",
  })
  useEffect(() =>{
  
    setListselectFilter([
      ...props.listKeyArrayFilter
    ])
   
  },[])
  const [selectOption, setSelectOtion] = useState([])
  console.log(filter)
  useEffect(() => {
    setFilter((state) => (
      props.filterValue
    ))
  }, [props.filterValue])

  useEffect(() => {
    
    setChildComponent([listselectFilter.map(option => getFilterIsSelected(option))])
    // setChildComponent((state) =>[...state])
  }, [filter, listselectFilter])
  function selectedOption() {

  }

  function getDataSupplier(supplier) {
    setFilter((state) => ({
      ...state, supplier: {
        SupplierId: supplier.id,
        supplierName: supplier.supplierName
      }
    }))
  }

  function showFilterItem(event) {
    console.log(event.target.value)
    setEventAddSelect(false)
    setListselectFilter((state) => [...state, event.target.value])
    // setListselectFilter((state) =>(
    //   state.map((option,i) => option.id === event.target.value? {...option, isSelected: true, index: count} : option)
    // ))

    //  childComponent.current.push("abl bla")

    setChildComponent((state) => [...state, getFilterIsSelected(event.target.value)])
    // if (event.value.target === "") {
    //   setChildComponent((state) => [...state,])
    // }
    //  else if (event.target.value === "supplier") {
    //    setChildComponent((state) =>([...state, (  
    //     <p>Supplier <SeachSupplier supplierInfo={filter.supplier} getDataSupplier={getDataSupplier} /> </p>
    //    )]))
    //   }

  }
  function onChangeFilter(event) {

    if (event.target.name === "FromStatus") {
      setFilter((state) => ({
        ...state, FromStatus: event.target.value, ToStatus: event.target.value
      }))
    }
    else {
      setFilter((state) => ({
        ...state, [event.target.name]: event.target.value
      }))
    }

  }
  function getFilterIsSelected(filterName) {
    if (filterName === "createdDate") {
      return (
        <div>
          <div class="mb-3">

          </div>
          <div class="row g-3 align-items-center">
            <label for="role" class="col-form-label">
              Create Date
            </label>
            <div class="col">

              <input
                onChange={onChangeFilter}
                name="FromCreatedDate"
                type="date"
                id="fromTime"
                class="form-control"
                value={filter.FromCreatedDate}

              />
            </div>
            <div class="col">

              <input
                onChange={onChangeFilter}
                name="ToCreatedDate"
                type="date"
                id="toTime"
                class="form-control"
                value={filter.ToCreatedDate}

              />
            </div>
          </div>
        </div>
      )
    }
    else if (filterName === "supplier") {
      return (
        <p>Supplier <SeachSupplier supplierInfo={filter.supplier} getDataSupplier={getDataSupplier} /> </p>
      )
    }
    else if (filterName === "totalPrice") {
      return (
        <div>
          <div class="mb-3">

          </div>
          <div class="row g-3 align-items-center">
            <label for="role" class="col-form-label">
              Range Price:
            </label>
            <div class="col">

              <input
                onChange={onChangeFilter}
                name="FromTotalOrderPrice"
                type="number"
                id="fromTime"
                class="form-control"
                value={filter.FromTotalOrderPrice}

              />
            </div>
            <div class="col">

              <input
                onChange={onChangeFilter}
                name="ToTotalOrderPrice"
                type="number"
                id="toTime"
                class="form-control"
                value={filter.onChangeFilter}

              // aria-describedby="passwordHelpInline"
              />
            </div>
          </div>
        </div>
      )
    }
    else if (filterName === "deliveryDate") {
      return (
        <div>
          <div class="mb-3">
            {/* <label for="address" class="col-form-label">
          Create Date
        </label>
        <input type="date" class="form-control" id="address" /> */}
          </div>
          <div class="row g-3 align-items-center">
            <label for="role" class="col-form-label">
              Delivery Date
            </label>
            <div class="col">
              {/* <label for="inputEmail" class="col-form-label">
          
        </label>{" "} */}
              <input
                onChange={onChangeFilter}
                name="FromDeliveryDate"
                type="date"
                id="fromTime"
                class="form-control"
                value={filter.FromDeliveryDate}
              //aria-describedby="passwordHelpInline"
              />
            </div>
            <div class="col">
              {/* <label for="inputphoneno" class="col-form-label">
          Phone No.
        </label>{" "} */}
              <input
                onChange={onChangeFilter}
                name="ToDeliveryDate"
                type="date"
                id="toTime"
                class="form-control"
                value={filter.ToDeliveryDate}

              // aria-describedby="passwordHelpInline"
              />
            </div>
          </div>
        </div>
      )
    }
    else if (filterName === "confirmedDate") {
      return (
        <div>
          <div class="mb-3">
            {/* <label for="address" class="col-form-label">
          Create Date
        </label>
        <input type="date" class="form-control" id="address" /> */}
          </div>
          <div class="row g-3 align-items-center">
            <label for="role" class="col-form-label">
              Confirmed Date
            </label>
            <div class="col">
              {/* <label for="inputEmail" class="col-form-label">
          
        </label>{" "} */}
              <input
                onChange={onChangeFilter}
                name="FromConfirmedDate"
                type="date"
                id="fromTime"
                class="form-control"
                value={filter.FromConfirmedDate}

              //aria-describedby="passwordHelpInline"
              />
            </div>
            <div class="col">
              {/* <label for="inputphoneno" class="col-form-label">
          Phone No.
        </label>{" "} */}
              <input
                onChange={onChangeFilter}
                name="ToConfirmedDate"
                type="date"
                id="toTime"
                class="form-control"
                value={filter.ToConfirmedDate}

              // aria-describedby="passwordHelpInline"
              />
            </div>
          </div>
        </div>
      )
    }
    else if (filterName === "modifiedDate") {
      return (
        <div>
          <div class="mb-3">
            {/* <label for="address" class="col-form-label">
          Create Date
        </label>
        <input type="date" class="form-control" id="address" /> */}
          </div>
          <div class="row g-3 align-items-center">
            <label for="role" class="col-form-label">
              Modified Date
            </label>
            <div class="col">
              {/* <label for="inputEmail" class="col-form-label">
          
        </label>{" "} */}
              <input
                onChange={onChangeFilter}
                name="FromModifiedDate"
                type="date"
                id="fromTime"
                class="form-control"
                value={filter.FromModifiedDate}

              //aria-describedby="passwordHelpInline"
              />
            </div>
            <div class="col">
              {/* <label for="inputphoneno" class="col-form-label">
          Phone No.
        </label>{" "} */}
              <input
                onChange={onChangeFilter}
                name="ToModifiedDate"
                type="date"
                id="toTime"
                class="form-control"
                value={filter.ToModifiedDate}

              // aria-describedby="passwordHelpInline"
              />
            </div>
          </div>
        </div>
      )
    }
    else if (filterName === "status") {
      return (
        <div className="mb-3">
          <label htmlFor="role" className="col-form-label">
            Status:
          </label>
          <select type="number" name="FromStatus" onChange={onChangeFilter} className="form-select" aria-label="Default select example">
            <option value={-99} selected>- No. Selected -</option>
            <option value={3}>POCreated</option>
            <option value={4}>POWaitingConfirmation</option>
            <option value={5}>POConfirm </option>
            <option value={6}>Done</option>
            <option value={-1}>POCanceled</option>

          </select>
        </div>
      )
    }
  }
  return (
    <div>
      <div
        className="modal modal-filter-customize"
        // tabIndex="-1"
        // id="FilterModal"
        // data-bs-keyboard="false"
        // data-bs-backdrop="static"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Filter</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">

              <form>
                {childComponent}
                <div className="mb-3">
                  <label htmlFor="role" className="col-form-label">
                    
                  </label>

                 { eventAddSelect? <select type="number" name="FromStatus" onChange={showFilterItem} className="form-select" aria-label="Default select example">
                    <option value={-99} selected>- No. Selected -</option>
                    {listSelection.map((option) => !listselectFilter.includes(option.id) ? (<option value={option.id}>{option.name}</option>) : "")}
                    {console.log("tao render laij ne")}

                  </select> : ""}
                </div>

                {/* select option */}


                {/* <SeachSupplier/> */}



                {/* create date  */}

                {/* DeliveryDate */}




                {/* phone no  */}

                {/* <div class="mb-3">
                  <label for="role" class="col-form-label">
                    Supplier Phone No.
                  </label>

                  <select
                    class="form-select"
                    aria-label="Default select example"
                  >
                    <option selected>- No. Selected -</option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                  </select>
                </div> */}

                {/* email */}

                {/* <div class="mb-3">
                  <label for="role" class="col-form-label">
                    Supplier Email
                  </label>

                  <select
                    class="form-select"
                    aria-label="Default select example"
                  >
                    <option selected>- No. Selected -</option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                  </select>
                </div> */}

                {/* id  */}
                {/* <div class="mb-3">
                  <label for="role" class="col-form-label">
                    Supplier ID
                  </label>

                  <select
                    class="form-select"
                    aria-label="Default select example"
                  >
                    <option selected>- No. Selected -</option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                  </select>
                </div> */}
                {/* add  */}
                { !eventAddSelect? <a onClick={() => setEventAddSelect(true)}
                  class="btn btn-default me-md-2 add"
                // data-bs-target="#"
                // data-bs-toggle="modal"
                >
                  {/* <AddAccountModal isShowing={isShowing} hide={toggle} /> */}
                  <svg
                    class="svg-icon"
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    fill="#4caf50"
                    class="bi bi-plus-lg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M8 0a1 1 0 0 1 1 1v6h6a1 1 0 1 1 0 2H9v6a1 1 0 1 1-2 0V9H1a1 1 0 0 1 0-2h6V1a1 1 0 0 1 1-1z"></path>
                  </svg>
                  Add
                </a> : ""
                }
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-default"
                data-bs-dismiss="modal"
               onClick={() => props.cancelClick()}
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn btn-default"
                data-bs-dismiss="modal"
                onClick={() => props.resetFilter()}
              >
                Reset Filter
              </button>
              <button
                onClick={() => props.submitFilter(listselectFilter,filter)}
                type="button"
                className="btn btn-default addaccountmodal-done "
                data-bs-dismiss="modal"
              >
                Filter
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
              }
              else{
                return ""
              }
           
}
