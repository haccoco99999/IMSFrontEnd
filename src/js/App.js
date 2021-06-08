import React, { Component } from "react";

import AccountManagerView from "./AccountManager/AccountManagerView";
import SupplierManager from "./Suppliers/SupplierManager";
import GoodsReceiptManager from "./GoodsRecepit/GoodsReceiptManager"
import SalesmanManager from "./Salesman/SalesmanManager";
import ProductManager from "./Product/ProductManager"
import Stocktake from "./Stocktake/StocktakeManager";
class App extends Component {
  render() {
    return (
      <div>
        <Stocktake />
      </div>
    );
  }
}

export default App;
