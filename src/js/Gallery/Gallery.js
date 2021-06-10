import React from 'react';
import 'bootstrap/js/dist/carousel'
import './Gallery.css'
import { connect } from 'react-redux'
import { getListQuote } from './action'
import { clickQuoteOrder } from '../purchase-order/action'
import { GET_PRICE_QUOTE_REQUESTING } from './contants'
import CaroselItem from './carousel-item';
import { withRouter } from 'react-router-dom';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

class Gallery extends React.Component {

    constructor(props) {
        super(props)

        this.props.getListQuote();
        this.clickQuote = this.clickQuote.bind(this)
    }
    clickQuote(priceQuoteOrderNumber) {
        this.props.history.push('/homepage/purchase/DetailPurhcaseOrder', { priceQuoteOrderNumber });
    }

    render() {
        const responsive = {

            desktop: {
                breakpoint: { max: 1920, min: 1500 },
                items: 6
            },
            tablet: {
                breakpoint: { max: 1500, min: 1024 },
                items: 4
            },
            mobile: {
                breakpoint: { max: 464, min: 0 },
                items: 1
            }
        };
        const {
            listPriceQuote: {
                requesting,
                successful,
                messages,
                errors,
                listQuote,
            },
        } = this.props

        return (
            <div className='my-own-custom-container'>
                <Carousel
                  
                    draggable={true}
                    autoPlaySpeed={1000}
                    partialVisible={false}
                   
                    transitionDuration={500}
                    responsive={responsive}>
                    {listQuote.map((quote, index) =>
                        <div className=" container-box-order" >
                            <div className="box-order" onMouseUp={() => this.clickQuote(quote.priceQuoteOrderNumber)}>
                                <h3 className="priceQuoteOrderNumber">No.{quote.priceQuoteOrderNumber}</h3>
                                <p>Deadline:  <span>{quote.deadline}</span></p>
                                <p>Create by: {quote.createdDate}</p>
                                <p>Vender: {quote.supplierName}</p>
                                <p>{quote.numberOfProduct} Product</p>
                            </div>
                        </div>)}





                </Carousel>
            </div>
            // <div className="container">
            //     <div className="row" >


            //         <div className="col-md-12" >
            //             <div id="carouselExampleIndicators" class="carousel slide" data-bs-ride="carousel">

            //                 <div class="carousel-inner">


            //                     {/* {listQuote.map(quote => <span key={quote.id} >{quote.id}</span>)} */}

            //                     {listQuote.map((quote, index) => {
            //                         if ((index + 1) % 3 == 0) {
            //                             return (<div class={"carousel-item " + (index == 2 ? "active" : "")}>
            //                                 <div className="row">
            //                                     <div className="col-md-4 container-box-order" >
            //                                         <div className="box-order" onClick={() =>this.clickQuote(listQuote[index - 2].priceQuoteOrderNumber)}>
            //                                             <h3>No.{listQuote[index - 2].priceQuoteOrderNumber}</h3>
            //                                             <p>Deadline:  <span>{listQuote[index - 2].deadline}</span></p>
            //                                             <p>Create by: {listQuote[index - 2].createdDate}</p>
            //                                             <p>Vender: {listQuote[index - 2].supplierName}</p>
            //                                             <p>{listQuote[index-2].orderQuantity} Product</p>
            //                                         </div>
            //                                     </div>
            //                                     <div className="col-md-4 container-box-order" >
            //                                     <div className="box-order" onClick={() => this.clickQuote(listQuote[index - 1].priceQuoteOrderNumber)}>
            //                                             <h3>No.{listQuote[index - 1].priceQuoteOrderNumber}</h3>
            //                                             <p>Deadline:  <span>{listQuote[index - 1].deadline}</span></p>
            //                                             <p>Create by: {listQuote[index - 1].createdDate}</p>
            //                                             <p>Vender: {listQuote[index - 1].supplierName}</p>
            //                                             <p>{listQuote[index - 1].orderQuantity} Product</p>
            //                                         </div>
            //                                     </div>
            //                                     <div className="col-md-4 container-box-order" >
            //                                     <div className="box-order" onClick={ () =>this.clickQuote(listQuote[index].priceQuoteOrderNumber)}>
            //                                             <h3>No.{listQuote[index].priceQuoteOrderNumber}</h3>
            //                                             <p>Deadline:  <span>{listQuote[index].deadline}</span></p>
            //                                             <p>Create by: {listQuote[index ].createdDate}</p>
            //                                             <p>Vender: {listQuote[index].supplierName}</p>
            //                                             <p>{listQuote[index].orderQuantity} Product</p>
            //                                         </div>
            //                                     </div>

            //                                 </div>
            //                             </div>)
            //                         }

            //                     }
            //                     )}




            //                     {/* <CaroselItem/> */}

            //                     {/* <div class="carousel-item active">
            //                         <div className="row">
            //                             <div className="col-md-4 container-box-order" >
            //                                 <div className="box-order" onClick={this.clickQuote}>
            //                                     <h3>No. SGH12006</h3>
            //                                     <p>Deadline:  <span>05/22/2021</span></p>
            //                                     <p>Create by: Mrs Hoa</p>
            //                                     <p>Vender: TNHH ABC</p>
            //                                     <p>4 Product</p>
            //                                 </div>
            //                             </div>
            //                             <div className="col-md-4 container-box-order" >
            //                                 <div className="box-order">
            //                                     <h3>No. SGH12006</h3>
            //                                     <p>Deadline:  <span>05/22/2021</span></p>
            //                                     <p>Create by: Mrs Hoa</p>
            //                                     <p>Vender: TNHH ABC</p>
            //                                     <p>4 Product</p>
            //                                 </div>
            //                             </div>
            //                             <div className="col-md-4 container-box-order" >
            //                                 <div className="box-order">
            //                                     <h3>No. SGH12006</h3>
            //                                     <p>Deadline:  <span>05/22/2021</span></p>
            //                                     <p>Create by: Mrs Hoa</p>
            //                                     <p>Vender: TNHH ABC</p>
            //                                     <p>4 Product</p>
            //                                 </div>
            //                             </div>
            //                         </div>
            //                     </div> */}
            //                 </div>
            //                 <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
            //                     <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            //                     <span class="visually-hidden">Previous</span>
            //                 </button>
            //                 <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
            //                     <span class="carousel-control-next-icon" aria-hidden="true"></span>
            //                     <span class="visually-hidden">Next</span>
            //                 </button>
            //             </div>
            //         </div>
            //     </div>
            // </div>

        );
    }
}
const mapStateToProps = state => ({

    listPriceQuote: state.listPriceQuote
})
const connected = connect(mapStateToProps, { getListQuote, clickQuoteOrder })(Gallery)
export default withRouter(connected)