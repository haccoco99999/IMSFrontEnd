import React from 'react';
import 'bootstrap/js/dist/carousel'
import './create-purchase-order.css'
import TextEditor from '../text-editor-compoent/text-editor-compoent';

class CreatePurchaseOrder extends React.Component {



    render() {

        return (
            <div>
                 <div className="menu-back-create-purchase-order"><h4>Back</h4></div>
                <div className="name-oder-edit" >
                    <button type="button" name="" id="" class="btn btn-primary">Submit</button>
                    <h3>No.SGH12006</h3>
                   
                </div>
              
                <div className="detail-edit-container" >
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
                                <td><span className="edit-quanity">-</span> 14215 <span className="edit-quanity">+</span> </td>
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

              <div className="text-edit-container">  <TextEditor/></div>
            </div>

        );
    }
}
export default CreatePurchaseOrder