import React from 'react'

export default function LocationsFilter(props){

    return (
        <div class="p-3">
        <div class="card">


            <div class="card-header text-white bg-secondary">Filter Product Variant
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
                         <label for="">Category</label>
                         <select  onChange={props.onChangeValueFilter} class="form-control" name="Category" id="">
                           <option>A</option>
                           <option>B</option>
                           <option>C</option>
                         </select>
                       </div>
                    
                        <div className="row">
                            <label for="">Price:</label>
                            <div class="form-group col-md-6" >

                                <input type="text" value={props.filter.FromPrice}
                                    onChange={props.onChangeValueFilter} step="0.01"
                                    class="form-control" name="FromPrice" id="" aria-describedby="helpId" placeholder="" />
                            </div>
                            <div class="form-group col-md-6">

                                <input type="text" step="0.01"
                                    onChange={props.onChangeValueFilter} value={props.filter.ToPrice}
                                    class="form-control" name="ToPrice" id="" aria-describedby="helpId" placeholder="" />
                            </div>
                        </div>
                        <div class="form-group">
                          <label for="">Brand</label>
                          <input type="text" onChange={props.onChangeValueFilter} value={props.filter.Brand}
                            class="form-control" name="Brand" id="" aria-describedby="helpId" placeholder=""/>
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