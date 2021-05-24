import React, { Component } from 'react'
import { BrowserRouter, Route, Link } from "react-router-dom";


export default class RouterManager extends Component {
    render() {
        return (
           <Route>
               <div>
                   <Route exact path="/"  />
               </div>
           </Route>
        )
    }
}
