import React from 'react';
import 'bootstrap/js/dist/carousel'
import './detail-purchse-order.css'
class DetailPurhcaseOrder extends React.Component {



    render() {

        return (
            <div>
                <div className="name-oder" >
                    <button type="button" name="" id="" class="btn btn-primary">Create Price quote request</button>
                    <h3>No.SGH12006</h3>
                    <p>Warning</p>
                </div>
                <div className="info-purchase-order">
                    <div className="info-create">
                        <p>Create by: <span>Mrs Hoa</span></p>
                        <div className="info-create-detail">
                            <p>Email : <span>thljf@gmail.com</span></p>
                            <p>Phone No: <span>102032146545</span></p>
                        </div>

                    </div>
                    <div className="info-create">
                        <p>Supplier: <span>TNHH ABC</span></p>
                        <div className="info-create-detail">
                            <p>Email : <span>thljf@gmail.com</span></p>
                            <p>Phone No: <span>102032146545</span></p>
                        </div>

                    </div>
                    <div className="info-date">
                        <p>Create Date <span>Tue, 05/08/2021</span></p>
                        <p>Deadline  <span>Tue, 05/08/2021</span></p>

                    </div>


                </div>
                <div className="detail-purchase-container" >
                    <table class="table">
                        <thead>
                            <tr>
                                <th scope="col">Product No.</th>
                                <th scope="col">Product Name</th>
                                <th scope="col">Unit</th>
                                <th scope="col">Quanity</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th scope="row">1</th>
                                <td>Mark</td>
                                <td>Otto</td>
                                <td>@mdo</td>
                            </tr>
                            <tr>
                                <th scope="row">2</th>
                                <td>Jacob</td>
                                <td>Thornton</td>
                                <td>@fat</td>
                            </tr>
                            <tr>
                                <th scope="row">3</th>
                                <td colspan="2">Larry the Bird</td>
                                <td>@twitter</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

        );
    }
}
export default DetailPurhcaseOrder