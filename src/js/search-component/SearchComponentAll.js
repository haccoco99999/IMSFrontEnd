import React, { useState } from "react";
import { Typeahead, AsyncTypeahead } from "react-bootstrap-typeahead";
import { useSelector } from "react-redux";

export function SearchToAddProduct(props) {
  const { token } = useSelector((state) => ({
    token: state.client.token,
  }));
  const SEARCH_URI =
    "https://imspublicapi.herokuapp.com/api/productvariant/search";

  const [isLoading, setIsLoading] = useState(false);
  const [options, setOptions] = useState([]);
  const handleSearch = (query) => {
    setIsLoading(true);

    fetch(`${SEARCH_URI}?SearchQuery=${query}&CurrentPage=1&SizePerPage=20`, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
        Origin: "",
      },
      credentials: "include",
    })
      .then((resp) => resp.json())
      .then((items) => {
        console.log(items);
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
        <div
          onClick={() => props.getInfoProduct(option.product)}
          key={option.id}
        >
          <img
            src="https://github.com/mdo.png"
            alt="@mdo"
            width="32"
            height="32"
            class="rounded me-2"
            loading="lazy"
          />
          <span>
            <strong>{option.name}</strong> {option.sku}
          </span>
        </div>
      )}
    />
  );
}
export function ProductSearchSuggestion(props) {
  const SEARCH_URI = "https://imspublicapi.herokuapp.com/api/product/els/";

  const [keySearch, setKeySearch] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [options, setOptions] = useState([]);
  const [selected, setSelected] = useState([{ name: "" }]);

  const handleSearch = (query) => {
    setIsLoading(true);
    setKeySearch(query);
    fetch(`${SEARCH_URI}${query}`)
      .then((resp) => resp.json())
      .then((items) => {
        console.log(items);
        const options = items.suggestions.map((i) => ({
          name: i,
        }));

        setOptions(options);
        setIsLoading(false);
      });
  };
  const filterBy = () => true;

  function handleChanged(select) {
    setSelected(select);

    // setKeySearch(select[0].name)
  }
  console.log(keySearch);
  return (
    <div>
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
    </div>
  );
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

export function searchPackageByLocation() {
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
