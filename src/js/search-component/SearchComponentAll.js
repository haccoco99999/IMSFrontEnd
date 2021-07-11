import React, { useState } from 'react'
import { Typeahead, AsyncTypeahead } from 'react-bootstrap-typeahead';

export  function SearchToAddProduct(props) {


    const SEARCH_URI = 'https://imspublicapi.herokuapp.com/api/productvariant/search';


    const [isLoading, setIsLoading] = useState(false);
    const [options, setOptions] = useState([]);
    const handleSearch = (query) => {
        setIsLoading(true);

        fetch(`${SEARCH_URI}?SearchQuery=${query}&CurrentPage=1&SizePerPage=20`)
            .then((resp) => resp.json())
            .then(( items ) => {
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


    return (<AsyncTypeahead
        filterBy={filterBy}
        id="async-example"
        isLoading={isLoading}
        labelKey="filter"
        minLength={3}
        onSearch={handleSearch}
        options={options}
        placeholder="Search for a Github user..."
        renderMenuItemChildren={(option) => (
            <div onClick={() => props.getInfoProduct(option.product)} key={option.id}>
               
                <p>{option.name}</p>
                <p>{option.sku}</p>
                
            </div>
        )}
    />)
}

export  function SeachSupplier(props) {


    const SEARCH_URI = 'https://imspublicapi.herokuapp.com/api/suppliers/search';


    const [isLoading, setIsLoading] = useState(false);
    const [options, setOptions] = useState([{ 
        supplier: "1231",
        supplierName: "aaa",
        phoneNumber: "ádfas",
        id: "Aaa",
    }]);
    const handleSearch = (query) => {
        setIsLoading(true);

        fetch(`${SEARCH_URI}?SearchQuery=${query}&CurrentPage=1&SizePerPage=20`)
            .then((resp) => resp.json())
            .then(( json ) => {
               
                const options = json.paging.resultList.map((i) => ({
                    supplier: i,
                    supplierName: i.supplierName,
                    phoneNumber: i.phoneNumber,
                    id: i.id,
                }));

                setOptions(options);
                setIsLoading(false);
            });
    };
    const filterBy = () => true;


    return (<AsyncTypeahead
        defaultSelected={options.slice(0, 1)}
        filterBy={filterBy}
        id="async-example"
        isLoading={isLoading}
        labelKey="supplierName"
        minLength={1}
        onSearch={handleSearch}
        options={options}
        placeholder="Search for a Github user..."
        renderMenuItemChildren={(option) => (
            <div onClick={() => props.getDataSupplier(option.supplier)} key={option.supplier} key={option.id}>
               
                <p>{option.supplierName}</p>
                <span>{option.phoneNumber}</span>
                
            </div>
        )}
    />)
}
export  function Search() {


    const SEARCH_URI = 'https://api.github.com/search/users';


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


    return (<AsyncTypeahead
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
                        height: '24px',
                        marginRight: '10px',
                        width: '24px',
                    }}
                />
                <span>{option.login}</span>
                
            </div>
        )}
    />)
}