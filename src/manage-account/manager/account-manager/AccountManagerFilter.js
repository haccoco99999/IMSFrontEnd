import React from 'react'
import { SelectRolePurchaseOrder } from '../../../search-component/SearchComponentAll'

export default function AccountManagementFilter(props) {

    return (
        <div class="p-3">
            <div class="card">


                <div class="card-header text-white bg-secondary">Filter Product Variant
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-filter" viewBox="0 0 16 16">
                        <path d="M6 10.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5zm-2-3a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm-2-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5z" />
                    </svg></div>
                <div class="card-body">



                    {/* onChange={props.onChangeValueFilter} value={props.filter.SearchQuery} */}
                    <div className="row">
                        <div class="form-group">
                            <label for="">Search:</label>
                            <input type="text" value={props.filter.searchQuery}  onChange={props.onChangeAccountFilter}
                                class="form-control" name="searchQuery" id="" aria-describedby="helpId" placeholder="" />
                        </div>
                        <div className="col-md-6">
                            <div class="form-group">
                                <label for="">Select Role:</label>
                                <SelectRolePurchaseOrder selected={props.filter.role} selectStatus={props.selectStatus} />
                            </div>
                        </div>
                        <div className="col-md-6">



                        </div>

                    </div>



                </div>
                <div className="card-body">
                    <div className="row">

                        <div className="">
                            <button className="btn btn-primary me-md-2 btn-sm" type="button" onClick={() => props.resetFilter()}>Reset Filter</button>
                            <button className="btn btn-primary btn-sm" type="button" onClick={() => props.submitFilter()}>Filter</button>
                        </div>

                    </div>
                </div>


            </div>
        </div>
    )
}