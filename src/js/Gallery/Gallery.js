import React from 'react';
import 'bootstrap/js/dist/carousel'
import './Gallery.css'
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

class Gallery extends React.Component {

    constructor(props){
        super(props)
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
       
        
        return (
            <div className='my-own-custom-container'>
                <Carousel
                  
                    draggable={true}
                    autoPlaySpeed={1000}
                    partialVisible={false}
                   
                    transitionDuration={500}
                    responsive={responsive}>
                    {this.props.listData.map((quote, index) =>
                        <div className=" container-box-order" >
                            <div className="box-order" onClick={(e) => this.props.clickQuote(quote)}>
                                <h3 className="priceQuoteOrderNumber">No.{quote.id}</h3>
                                <p>Deadline:  <span>{quote.deliveryDate.split("T")[0]}</span></p>
                                <p>Create by: {quote.createdDate.split("T")[0]}</p>
                                <p>Vender: {quote.supplierName}</p>
                                <p>{quote.totalPrice} Product</p>
                            </div>
                        </div>)}





                </Carousel>
            </div>
           

        );
    }
}

export default Gallery