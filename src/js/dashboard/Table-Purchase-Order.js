import React from 'react'
import './Table-Purchase-Order.css'
class TablePurchase extends React.Component {
    render() {
        return (
            <div className="purchase-container">
                <div class="form-group search-purchase">
                  <img src="..\src\js\images\search.svg" alt="icon-search" />
                  <input type="text" class="form-control"  placeholder="Search by Order ID or Supplier Name"/>
                 
                </div>
                <table class="table table-hover table-purchase">
                    <thead>
                        <tr>
                            <th scope="col"><input type="checkbox" /></th>
                            <th scope="col">First</th>
                            <th scope="col">Last</th>
                            <th scope="col">Handle</th>
                            <th scope="col">Handle</th>
                            <th scope="col">Handle</th>
                            <th scope="col">Handle</th>
                            <th scope="col">Handle</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th scope="row"><input type="checkbox" /></th>
                            <td>Mark</td>
                            <td>Otto</td>
                            <td>@mdo</td>
                            <td>@mdo</td>
                            <td>@mdo</td>
                            <td>@mdo</td>
                            <td>@mdo</td>
                        </tr>
                        <tr>
                            <th scope="row"><input type="checkbox" /></th>
                            <td>Jacob</td>
                            <td>Thornton</td>
                            <td>@fat</td>
                            <td>@fat</td>
                            <td>@fat</td>
                            <td>@fat</td>
                            <td>@fat</td>
                        </tr>
                        <tr>
                            <th scope="row"><input type="checkbox" /></th>
                            <td colspan="2">Larry the Bird</td>
                            <td>@twitter</td>
                            <td>@twitter</td>
                            <td>@twitter</td>
                            <td>@twitter</td>
                            <td>@twitter</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        );

    }
}
export default  TablePurchase