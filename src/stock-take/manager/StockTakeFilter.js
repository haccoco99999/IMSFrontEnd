import React from 'react'
import { SelectStatusStockTake } from '../../search-component/SearchComponentAll'

export default function StockTakeFilter(props){

    return (
        <div class="pb-3">
        <div class="card">


            <div class="card-header text-white bg-secondary">Filter Stock Take
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-filter" viewBox="0 0 16 16">
                    <path d="M6 10.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5zm-2-3a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm-2-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5z" />
                </svg></div>
            <div class="card-body">




                <div className="row">
                    <div class="form-group">
                      <label for="">Search:</label>
                      <input type="text" onChange={props.onChangeValueFilter} value={props.filter.SearchQuery}
                        class="form-control" name="SearchQuery" id="" aria-describedby="helpId" placeholder=""/>    
                    </div>
                    <div className="col-md-6">

                     <div class="form-group">
                       <label for="">Create By Name:</label>
                       <input type="text" onChange={props.onChangeValueFilter} value={props.filter.CreatedByName}
                         class="form-control" name="CreatedByName" id="" aria-describedby="helpId" placeholder=""/>
                      
                     </div>
                    
                     <div class="form-group">
                     <label for="">Select Status</label>
                      <SelectStatusStockTake selected={props.filter.Statuses} selectStatus={props.selectStatus} />
                     </div>
                    
                      

                    </div>
                    <div className="col-md-6">


                        <div className="row">
                            <label for="">Create Date:</label>
                            <div class="form-group col-md-6" >

                                <input type="date"
                                    onChange={props.onChangeValueFilter}  value={props.filter.FromCreatedDate}
                                    class="form-control" name="FromCreatedDate" id="" aria-describedby="helpId" placeholder="" />
                            </div>
                            <div class="form-group col-md-6">

                                <input type="date" value={props.filter.ToCreatedDate}
                                    onChange={props.onChangeValueFilter}
                                    class="form-control" name="ToCreatedDate" id="" aria-describedby="helpId" placeholder="" />
                            </div>
                        </div>
                     
                        <div className="row">
                            <label for="">Modified Date:</label>
                            <div class="form-group col-md-6" >

                                <input type="date"
                                    onChange={props.onChangeValueFilter} value={props.filter.FromModifiedDate}
                                    class="form-control" name="FromModifiedDate" id="" aria-describedby="helpId" placeholder="" />
                            </div>
                            <div class="form-group col-md-6">

                                <input type="date"
                                    onChange={props.onChangeValueFilter} value={props.filter.ToModifiedDate}
                                    class="form-control" name="ToModifiedDate" id="" aria-describedby="helpId" placeholder="" />
                            </div>
                        </div>
                        <div className="row">
                            <label for="">Delivery Date:</label>
                            <div class="form-group col-md-6" >

                                <input type="date"
                                    onChange={props.onChangeValueFilter} value={props.filter.FromDeliveryDate}
                                    class="form-control" name="FromDeliveryDate" id="" aria-describedby="helpId" placeholder="" />
                            </div>
                            <div class="form-group col-md-6">

                                <input type="date"
                                    onChange={props.onChangeValueFilter} value={props.filter.ToDeliveryDate}
                                    class="form-control" name="ToDeliveryDate" id="" aria-describedby="helpId" placeholder="" />
                            </div>
                        </div>


                    </div>

                </div>



            </div>
            <div className="card-body">
                <div className="row">

                    <div className="">
                        <button className="btn btn-primary me-md-2 btn-sm" type="button"  onClick={() => props.resetFilter()}>Reset Filter</button>
                        <button className="btn btn-primary btn-sm" type="button" onClick={() => props.submitFilter()}>Filter</button>
                    </div>

                </div>
            </div>


        </div>
    </div>
    )
}