import React, { useState } from "react";
import "./search-component.css";

export default function SearchComponent(props) {
  let [listSearchProduct, setListSearchProduct] = useState([]);
  async function searchProduct(keySearch) {
    //         }

    // }

    const updateUrl = `https://imspublicapi.herokuapp.com/api/product/search?SearchQuery=${keySearch}&CurrentPage=1&SizePerPage=10`;
    let json = await fetch(updateUrl, {
      method: "GET",
      headers: {
        Authorization:
          "Bearer " +
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImU5ZjUxNWNjLTcyZjQtNDI3Ni1iOWE5LThhM2EzMTA0MTUwMiIsIm5iZiI6MTYyNDQyMzUxNywiZXhwIjoxNjI0NTk2MzE3LCJpYXQiOjE2MjQ0MjM1MTd9.rKbu5lAjeSK3eMARoQgcT4TFNStoHXsvH3tXdN_b5H4",
        "Content-Type": "application/json",
        Origin: "",
      },
      credentials: "include",
    })
      .then((response) => response.json())
      .then((json) => json)
      .catch((error) => {
        throw error;
      });
    setListSearchProduct(json.paging.resultList);
    console.log(json.paging.resultList);
  }

  function changeInput(event) {
    if (event.target.value === "") {
      console.log("da xoa");
      setListSearchProduct([]);
    } else {
      searchProduct(event.target.value);
    }
  }
  function onblur() {
    console.log("ok la");
  }

  return (
    <div className="search-container-customize">
      <div onBlur={onblur} class="form-group form-input-search-customize ">
        <i class="far fa-search"></i>
        <input
          name="keySearch"
          onChange={changeInput}
          type="text"
          class="form-control"
          placeholder="Search by Order ID or Supplier Name"
        />
        {listSearchProduct.length !== 0 ? (
          <ul className="list-search">
            {listSearchProduct.map((product, index) => {
              return (
                <li key={index} className="item-search">
                  <div className="info-item-search">
                    <img
                      className="avt-product"
                      src="data:image/jpeg;base64,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"
                    />
                    <div>
                      <div>{product.name}</div>
                      <div>SKU:{product.sku}</div>
                    </div>
                  </div>
                  <h4
                    onClick={() => setListSearchProduct([])}
                    onMouseUp={() => props.clickToAddProduct(product)}
                    className="text-add-product"
                  >
                    +Add
                  </h4>
                </li>

                // <li key={index} className="item-search"><div>{product.name} <button onClick={() => setListSearchProduct([])} onMouseUp={() => props.clickToAddProduct(product)}>ADD</button></div></li>
              );
            })}
          </ul>
        ) : (
          ""
        )}
        {/* <ul className="list-search">
            <li className="item-search">
                <div className="info-item-search">
                    <img className="avt-product" src="data:image/jpeg;base64,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" />
                    <div>
                        <div>Name Product</div>
                        <div>SKU 123456 789</div>
                    </div>
                </div>
                <h4 className="text-add-product">+Add</h4></li>
        </ul> */}
      </div>
    </div>
  );
}
