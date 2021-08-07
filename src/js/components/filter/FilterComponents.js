import React from 'react'
import filter from '../../good-receipt/filter'
import { SelectGoodsIssueStatus } from '../../search-component/SearchComponentAll'
import { SearchPurchaseOrder, SelectSupplier, SelectStatusPurchaseOrder } from '../../search-component/SearchComponentAll'

export function GoodReceiptFilter(props) {

    return (
        <div class="">
            <div class="card">


                <div class="card-header text-white bg-secondary">Filter Product Variant
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-filter" viewBox="0 0 16 16">
                        <path d="M6 10.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5zm-2-3a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm-2-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5z" />
                    </svg></div>
                <div class="card-body">




                    <div className="row">
                        <div class="form-group">
                            <label for="">Search:</label>
                            <input type="text" value={props.filter.SearchQuery}
                                class="form-control" name="SearchQuery" id="" aria-describedby="helpId" placeholder="" />

                        </div>

                        <div className="col-md-6">


                            <div className="row">
                                <label for="">Create Date:</label>
                                <div class="form-group col-md-6" >

                                    <input type="date"
                                        onChange={props.onChangeValueFilter} value={props.filter.FromCreatedDate}
                                        class="form-control" name="FromCreatedDate" id="" aria-describedby="helpId" placeholder="" />
                                </div>
                                <div class="form-group col-md-6">

                                    <input type="date"
                                        onChange={props.onChangeValueFilter} value={props.filter.ToCreatedDate}
                                        class="form-control" name="ToCreatedDate" id="" aria-describedby="helpId" placeholder="" />
                                </div>
                            </div>




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

export function GoodsIssueFilter(props) {

    return (
        <div class="">
            <div class="card">


                <div class="card-header text-white bg-secondary">Filter Product Variant
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-filter" viewBox="0 0 16 16">
                        <path d="M6 10.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5zm-2-3a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm-2-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5z" />
                    </svg></div>
                <div class="card-body">



                    <div className="row">
                        <div class="form-group">
                            <label for="">Search</label>
                            <input type="text" onChange={props.onChangeValueFilter} value={props.filter.searchQuery}
                                class="form-control" name="searchQuery" id="" aria-describedby="helpId" placeholder="" />
                        </div>
                        <div className="col-md-6">


                            <div class="form-group">
                                <label for="">Select Status</label>
                                <SelectGoodsIssueStatus selected={props.filter.statuses} selectStatus={props.selectStatusFilter} />
                            </div>



                        </div>
                        <div className="col-md-6">


                            <div className="row">
                                <label for="">Create Date:</label>
                                <div class="form-group col-md-6" >

                                    <input type="date"
                                        onChange={props.onChangeValueFilter} value={props.filter.fromCreatedDate}
                                        class="form-control" name="fromCreatedDate" id="" aria-describedby="helpId" placeholder="" />
                                </div>
                                <div class="form-group col-md-6">

                                    <input type="date"
                                        onChange={props.onChangeValueFilter} value={props.filter.toCreatedDate}
                                        class="form-control" name="toCreatedDate" id="" aria-describedby="helpId" placeholder="" />
                                </div>
                            </div>

                            <div className="row">
                                <label for="">Delivery Date:</label>
                                <div class="form-group col-md-6" >

                                    <input type="date"
                                        onChange={props.onChangeValueFilter} value={props.filter.fromDeliveryDate}
                                        class="form-control" name="fromDeliveryDate" id="" aria-describedby="helpId" placeholder="" />
                                </div>
                                <div class="form-group col-md-6">

                                    <input type="date"
                                        onChange={props.onChangeValueFilter} value={props.filter.toDeliveryDate}
                                        class="form-control" name="toDeliveryDate" id="" aria-describedby="helpId" placeholder="" />
                                </div>
                            </div>


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
export function PurchaseOrderFilter(props) {
    return (
        <div class="p-3">
            <div class="card">


                <div class="card-header text-white bg-secondary">Filter
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-filter" viewBox="0 0 16 16">
                        <path d="M6 10.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5zm-2-3a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm-2-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5z" />
                    </svg></div>
                <div class="card-body">




                    <div className="row">
                        <div class="form-group ">
                            <label for="">Search</label>
                            {/* <SearchPurchaseOrder searchKeyWordPurchaseOrder={searchKeyWordPurchaseOrder} /> */}
                            <input type="text"
                                onChange={props.onChangeValueFilter} value={props.filter.SearchQuery}
                                class="form-control" name="SearchQuery" id="" aria-describedby="helpId" placeholder="" />
                        </div>

                        <div className="col-md-6">

                            <div class="form-group ">

                                <SelectSupplier isDisabled={false} supplierInfo={props.filter.supplier} getDataSupplier={props.setFilterSupplier} />
                            </div>
                            <div class="form-group">
                                <label for="">Select Status</label>

                                <SelectStatusPurchaseOrder selectStatus={props.selectStatusFilter} selected={props.filter.Statuses} />
                            </div>
                            <div className="row">
                                <label for="">Price:</label>
                                <div class="form-group col-md-6" >

                                    <input type="text"
                                        onChange={props.onChangeValueFilter} step="0.01" value={props.filter.FromTotalOrderPrice}
                                        class="form-control" name="FromTotalOrderPrice" id="" aria-describedby="helpId" placeholder="" />
                                </div>
                                <div class="form-group col-md-6">

                                    <input type="text" step="0.01"
                                        onChange={props.onChangeValueFilter} value={props.filter.ToTotalOrderPrice}
                                        class="form-control" name="ToTotalOrderPrice" id="" aria-describedby="helpId" placeholder="" />
                                </div>
                            </div>


                        </div>
                        <div className="col-md-6">


                            <div className="row">
                                <label for="">Create Date:</label>
                                <div class="form-group col-md-6" >

                                    <input type="date"
                                        onChange={props.onChangeValueFilter} value={props.filter.FromCreatedDate}
                                        class="form-control" name="FromCreatedDate" id="" aria-describedby="helpId" placeholder="" />
                                </div>
                                <div class="form-group col-md-6">

                                    <input type="date"
                                        onChange={props.onChangeValueFilter} value={props.filter.ToCreatedDate}
                                        class="form-control" name="ToCreatedDate" id="" aria-describedby="helpId" placeholder="" />
                                </div>
                            </div>
                            <div className="row">
                                <label for="">Confirmed Date:</label>
                                <div class="form-group col-md-6" >

                                    <input type="date"
                                        onChange={props.onChangeValueFilter} value={props.filter.FromConfirmedDate}
                                        class="form-control" name="FromConfirmedDate" id="" aria-describedby="helpId" placeholder="None date" />
                                </div>
                                <div class="form-group col-md-6">

                                    <input type="date"
                                        onChange={props.onChangeValueFilter} value={props.filter.ToConfirmedDate}
                                        class="form-control" name="ToConfirmedDate" id="" aria-describedby="helpId" placeholder="None date" />
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
export function SupplierFilter(props) {
    return (
        <div class="p-3">
            <div class="card">


                <div class="card-header text-white bg-secondary">Filter
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-filter" viewBox="0 0 16 16">
                        <path d="M6 10.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5zm-2-3a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm-2-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5z" />
                    </svg></div>
                <div class="card-body">




                    <div className="row">
                        <div class="form-group ">
                            <label for="">Search</label>
                            {/* <SearchPurchaseOrder searchKeyWordPurchaseOrder={searchKeyWordPurchaseOrder} /> */}
                            <input type="text"
                                onChange={props.onChangeValueFilter} value={props.filter.SearchQuery}
                                class="form-control" name="SearchQuery" id="" aria-describedby="helpId" placeholder="" />
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