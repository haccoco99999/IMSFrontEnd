import React, { useEffect, useState } from "react";
import { Typeahead, AsyncTypeahead } from "react-bootstrap-typeahead";

export function SearchToAddProduct(props) {


  const SEARCH_URI = 'https://imspublicapi.herokuapp.com/api/productvariant/search';


  const [isLoading, setIsLoading] = useState(false);
  const [options, setOptions] = useState([]);
  const handleSearch = (query) => {
      setIsLoading(true);

      fetch(`${SEARCH_URI}?SearchQuery=${query}&CurrentPage=1&SizePerPage=20`)
          .then((resp) => resp.json())
          .then((items) => {
              console.log(items)
              const options = items.paging.resultList.map((i) => ({
                  name: i.name,
                  sku: i.sku,
                  filter: i.sku + " " + i.name,
                  product: i,
              }));

              setOptions(options);
              setIsLoading(false);
          });
  };
  const filterBy = () => true;


  return (

      <AsyncTypeahead
          filterBy={filterBy}
          id="async-example"
          labelKey="filter"
          minLength={1}
          onSearch={handleSearch}
          options={options}
          placeholder="Search for a Github user..."

          renderMenuItemChildren={(option) => (
              <div onClick={() => props.getInfoProduct(option.product)} key={option.id}>
                  <img src="https://github.com/mdo.png" alt="@mdo" width="32" height="32" class="rounded me-2" loading="lazy" />
                  <span>
                      <strong>{option.name}</strong> {option.sku}

                  </span>



              </div>
          )}
      />

  )
}
export function Search() {
  const SEARCH_URI = "https://api.github.com/search/users";

  const [isLoading, setIsLoading] = useState(false);
  const [options, setOptions] = useState([]);
  const handleSearch = (query) => {
    setIsLoading(true);

    fetch(`${SEARCH_URI}?q=${query}+in:login&page=1&per_page=50`)
      .then((resp) => resp.json())
      .then(({ items }) => {
        const options = items.map((i) => ({
          avatar_url: i.avatar_url,
          id: i.id,
          login: i.login,
        }));

        setOptions(options);
        setIsLoading(false);
      });
  };
  const filterBy = () => true;

  return (
    <AsyncTypeahead
      filterBy={filterBy}
      id="async-example"
      isLoading={isLoading}
      labelKey="login"
      minLength={3}
      onSearch={handleSearch}
      options={options}
      placeholder="Search for a Github user..."
      renderMenuItemChildren={(option, props) => (
        <div onClick={() => console.log(option.id)} key={option.id}>
          <img
            alt={option.login}
            src={option.avatar_url}
            style={{
              height: "24px",
              marginRight: "10px",
              width: "24px",
            }}
          />
          <span>{option.login}</span>
        </div>
      )}
    />
  );
}

export function searchPackageByLocation(){
    const SEARCH_URI =
    "https://imspublicapi.herokuapp.com/api/productvariant/search";

  const [isLoading, setIsLoading] = useState(false);
  const [options, setOptions] = useState([]);
  const handleSearch = (query) => {
    setIsLoading(true);

    fetch(`${SEARCH_URI}?SearchQuery=${query}&CurrentPage=1&SizePerPage=20`)
      .then((resp) => resp.json())
      .then((items) => {
        console.log(items);
        const options = items.paging.resultList.map((i) => ({
          name: i.name,
          sku: i.sku,
          filter: i.sku + " " + i.name,
        }));

        setOptions(options);
        setIsLoading(false);
      });
  };
  const filterBy = () => true;

  return (
    <AsyncTypeahead
      filterBy={filterBy}
      id="async-example"
      isLoading={isLoading}
      labelKey="filter"
      minLength={1}
      onSearch={handleSearch}
      options={options}
      placeholder="Search for a Github user..."
      renderMenuItemChildren={(option, props) => (
        <div onClick={() => console.log(option.id)} key={option.id}>
          <p>{option.name}</p>
          <p>{option.sku}</p>
        </div>
      )}
    />
  );
}


export function SelectStatusPurchaseOrder(props) {
  const optionsInit = [
      { key: "PurchaseOrder", value: "Draft" },
      { key: "POWaitingConfirmation", value: "Watting Confirm" },
      { key: "POConfirm", value: "Confirmed" },
      { key: "Done", value: "Done" },
      { key: "POCanceled", value: "Canceled" },

  ]
  
  const [options, setOptions] = useState([...optionsInit])
 function handelOnChanged(selected){
     props.selectStatus(selected)
 }
  return (
      <Typeahead
          defaultSelected={options.slice(0, 4)}
          id="public-methods-example"
          labelKey="value"
          multiple
          options={options}
          placeholder="Choose a state..."
          onChange={handelOnChanged}
      />
  )
}
export function ProductSearchSuggestion(props) {


  const SEARCH_URI = 'https://imspublicapi.herokuapp.com/api/product/els/';

  const [keySearch, setKeySearch] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [options, setOptions] = useState([]);
  const [selected, setSelected] = useState([{ name: "" }]);

  const handleSearch = (query) => {
      setIsLoading(true);
      setKeySearch(query)
      fetch(`${SEARCH_URI}${query}`)
          .then((resp) => resp.json())
          .then((items) => {
              console.log(items)
              const options = items.suggestions.map((i) => ({
                  name: i,

              }));

              setOptions(options);
              setIsLoading(false);
          });
  };
  const filterBy = () => true;

  function handleChanged(select) {
      setSelected(select)

      // setKeySearch(select[0].name)
  }
  console.log(keySearch)
  return (
      <span>
          <AsyncTypeahead
              size="small"
              filterBy={filterBy}
              id="async-example"
              labelKey="name"
              minLength={1}
              onSearch={handleSearch}
              options={options}
              selected={selected}
              placeholder="Search for a Github user..."
              onChange={handleChanged}
              renderMenuItemChildren={(option, index) => (
                  <div key={index} onClick={() => props.getListProduct(option.name)}>

                      {option.name}

                  </div>
              )}
          />
          <button onClick={() => props.getListProduct(keySearch)}>Search</button>
      </span>
  )
}
export function PurchaseOrderSuggestion(props) {


  const SEARCH_URI = 'https://imspublicapi.herokuapp.com/api/po/els/';

  const [keySearch, setKeySearch] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [options, setOptions] = useState([]);
  const [selected, setSelected] = useState([{ name: "" }]);
  const handleSearch = (query) => {
      setIsLoading(true);
      setKeySearch(query)
      fetch(`${SEARCH_URI}${query}`)
          .then((resp) => resp.json())
          .then((items) => {
              console.log(items)
              const options = items.suggestions.map((i) => ({
                  name: i,

              }));

              setOptions(options);
              setIsLoading(false);
          });
  };
  const filterBy = () => true;

  function handleChanged(select) {
      setSelected(select)
      //  setKeySearch(select[0].name)
  }
  return (
      <div>
          <AsyncTypeahead
              filterBy={filterBy}
              id="async-example"
              labelKey="name"
              minLength={1}
              onSearch={handleSearch}
              options={options}
              selected={selected}
              placeholder="Search Purchase Order"
              onChange={handleChanged}
              renderMenuItemChildren={(option, index) => (
                  <div key={index} onClick={() => props.searchKeyWordPurchaseOrder(option.name)} >

                      {option.name}

                  </div>
              )}
          />
          {/* <button onClick={() => props.searchKeyWordPurchaseOrder(keySearch)}>Search</button> */}

      </div>
  )
}
export function SearchPurchaseOrder(props) {


  const SEARCH_URI = 'https://imspublicapi.herokuapp.com/api/po/els/';


  const [isLoading, setIsLoading] = useState(false);
  const [options, setOptions] = useState([]);
  const [selected, setSelected] = useState([{ name: "" }]);
  const handleSearch = (query) => {
      setIsLoading(true);
      props.searchKeyWordPurchaseOrder(query)
      fetch(`${SEARCH_URI}${query}`)
          .then((resp) => resp.json())
          .then((items) => {
              console.log(items)
              const options = items.suggestions.map((i) => ({
                  name: i,

              }));

              setOptions(options);
              setIsLoading(false);
          });
  };
  const filterBy = () => true;

  function handleChanged(select) {
      setSelected(select)
      //  setKeySearch(select[0].name)
  }
  return (
      <div>
          <AsyncTypeahead
              filterBy={filterBy}
              id="async-example"
              labelKey="name"
              minLength={1}
              onSearch={handleSearch}
              options={options}
              selected={selected}
              placeholder="Search Purchase Order"
              onChange={handleChanged}
              renderMenuItemChildren={(option, index) => (
                  <div key={index} onClick={() => props.searchKeyWordPurchaseOrder(option.name)} >

                      {option.name}

                  </div>
              )}
          />
          {/* <button onClick={() => props.searchKeyWordPurchaseOrder(keySearch)}>Search</button> */}

      </div>
  )
}
export function SeachSupplier(props) {


  const SEARCH_URI = 'https://imspublicapi.herokuapp.com/api/suppliers/search';


  const [isLoading, setIsLoading] = useState(false);
  const [options, setOptions] = useState([]);
  const [selected, setSelected] = useState([{ ...props.supplierInfo }]);

  function handleSelect(s) {

      // console.log((s[0] ? s[0].DataType : 'Nothing') + ' selected');
      setSelected(s);
  }
  console.log(selected)
  function handlePreset() {
      let s = props.options[2];
      console.log('Preset', s);
      setSelected([s]);
  }
  useEffect(() => {
      setSelected([props.supplierInfo]);

  }, [props.supplierInfo])
  const handleSearch = (query) => {
      setIsLoading(true);

      fetch(`${SEARCH_URI}?SearchQuery=${query}&CurrentPage=1&SizePerPage=20`)
          .then((resp) => resp.json())
          .then((json) => {

              const options = json.paging.resultList.map((i) => ({

                  id: i.id,
                  address: i.address,
                  supplierName: i.supplierName,
                  phoneNumber: i.phoneNumber,
                  email: i.email,
              }));

              setOptions(options);
              setIsLoading(false);
          });
  };
  const filterBy = () => true;


  return (<div><AsyncTypeahead
      selected={selected}
      filterBy={filterBy}
      id="async-example"
      labelKey="supplierName"
      minLength={1}
      onSearch={handleSearch}
      options={options}
      onChange={handleSelect}
      placeholder="Search for a supplier "
      renderMenuItemChildren={(option) => (


          <div style={{ "border-bottom": "1px solid gray" }} onClick={() => props.getDataSupplier(option)} key={option.supplier} key={option.id}>
              {option.supplierName}
              <div>
                  <small>Capital: {option.phoneNumber}</small>
              </div>
          </div>


      )}

  >
      {isLoading ? <div className="rbt-aux">
          <div style={{ fontSize: "10px" }} class="spinner-border spinner-grow-sm " role="status">

          </div>
      </div> : ""}</AsyncTypeahead>


  </div>)
}

export function SelectSupplier(props) {
  const SEARCH_URI = 'https://imspublicapi.herokuapp.com/api/suppliers/search';
  const [listSupplier, setListSupplier] = useState([])
  const [selected, setSelected] = useState({})

  useEffect(() => {

      if (props.supplierInfo.id !== "") {

          setSelected({
              ...props.supplierInfo
          })
      }
  }, [props.supplierInfo])

  useEffect(() => {



      fetch(`${SEARCH_URI}`)
          .then((resp) => resp.json())
          .then((json) => {

              setListSupplier(json.paging.resultList.map((i) => {
                  return {

                      id: i.id,
                      address: i.address,
                      supplierName: i.supplierName,
                      phoneNumber: i.phoneNumber,
                      email: i.email,
                  }
              }))


          })


  }, [])
  function onChangeValue(event) {

      props.getDataSupplier(JSON.parse(event.target.value))
  }
  return (



      <div class="form-group">
          <label for="">Select Supplier</label>
          <select disabled={props.isDisabled} onChange={onChangeValue} value={JSON.stringify(selected)} class="form-select" id="validationCustom04" required>
              <option selected disabled value={JSON.stringify({})}>Choose...</option>
      //         {listSupplier.map(supplier => <option value={JSON.stringify(supplier)} >{supplier.supplierName}</option>)}
          </select>
      </div>



      // <div class="form-floating">

      //     <select disabled={props.isDisabled} onChange={onChangeValue} value={JSON.stringify(selected)} class="form-select" id="validationCustom04" required>
      //         <option selected disabled value={JSON.stringify({})}>Choose...</option>
      //         {listSupplier.map(supplier => <option value={JSON.stringify(supplier)} >{supplier.supplierName}</option>)}
      //     </select>
      //     <label for="floatingSelect">Select Supplier</label>
      //     <div class="invalid-feedback">
      //         Please select a valid state.
      //     </div>
      // </div>
  )
}