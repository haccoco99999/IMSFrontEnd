import React, { useState } from "react";
import { Typeahead, AsyncTypeahead } from "react-bootstrap-typeahead";

export function SearchToAddProduct() {
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