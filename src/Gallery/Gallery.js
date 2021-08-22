import React from 'react';
import 'bootstrap/js/dist/carousel'
import './Gallery.css'
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import moment from 'moment';
class Gallery extends React.Component {

    constructor(props) {
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



        function setStatusPriQuote(hasSentMail, status) {
            if (status === "PriceQuote" && hasSentMail) {
                return <span class="badge bg-primary">Sent</span>

            }
            else if (status === "PriceQuote" && hasSentMail === false) {
                return <span class="badge bg-warning text-dark">Draft</span>

            }
            else {
                return ""
            }
        }
        
        return (
            <div className='my-own-custom-container'>
                <Carousel

                    draggable={true}
                    autoPlaySpeed={1000}
                    partialVisible={false}

                    transitionDuration={500}
                    responsive={responsive}>
                    {this.props.listData.map((quote, index) =>
                        <div className=" container-box-order pointer" >
                            <div className="box-order" style={{background: moment(moment(quote.deadline).add(7, "h").format("MM-DD-YYYY")).diff(moment(), "days") <=1 ? "#ffd91dde":""}} onClick={(e) => this.props.clickQuote(quote)}>
                                <h4 className="priceQuoteOrderNumber m-0">No.{quote.id}</h4>
                                {/* {console.log(moment(moment(quote.deadline).add(7, "h").format("MM-DD-YYYY")).diff(moment(), "days") )} */}
                                <p>Deadline:  <span>{moment(quote.deadline).add(7, "h").format("DD-MM-YYYY")}</span></p>
                                <p>Created date: {moment(quote.createdDate).add(7, "h").format("DD-MM-YYYY")}</p>
                                {quote.supplierName !== "" ? <p>Vender: {quote.supplierName}</p> : ""}
                                <p>{quote.totalProductAmount} Product</p>
                                <div className="d-flex bd-highlight">
                                    <div className="sticky-bottom me-2">  {setStatusPriQuote(quote.hasSentMail, quote.status)}</div>
                                   
                                </div>  

                            </div>
                        </div>)}





                </Carousel>
            </div>


        );


    }
}

export default Gallery


export function GalleryGoodIssue(props) {

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
    }

    return (<div className='my-own-custom-container'>
        <Carousel

            draggable={true}
            autoPlaySpeed={1000}
            partialVisible={false}

            transitionDuration={500}
            responsive={responsive}>
            {props.listData.map((quote, index) =>
                <div className="pointer container-box-order" >
                    <div className="box-order" onClick={(e) => props.clickGoodIssueRequisition(quote)}>
                        <h4 className="priceQuoteOrderNumber">No.{quote.id}</h4>
                        <p>Deadline:  <span>{moment(quote.deadline).format("DD-MM-YYYY")}</span></p>
                        <p>Created date: {moment(quote.createdDate).format("DD-MM-YYYY")}</p>
                        {/* <p>Vender: {quote.supplierName}</p>
                        <p>{quote.totalPrice} Product</p> */}
                    </div>
                </div>)}





        </Carousel>
    </div>
    )
}
// export function GalleryPurchaseOrder(props) {

//     const responsive = {

//         desktop: {
//             breakpoint: { max: 1920, min: 1500 },
//             items: 6
//         },
//         tablet: {
//             breakpoint: { max: 1500, min: 1024 },
//             items: 4
//         },
//         mobile: {
//             breakpoint: { max: 464, min: 0 },
//             items: 1
//         }
//     }

//     return (<div className='my-own-custom-container'>
//         <Carousel

//             draggable={true}
//             autoPlaySpeed={1000}
//             partialVisible={false}

//             transitionDuration={500}
//             responsive={responsive}>
//             {this.props.listData.map((quote, index) =>
//                 <div className=" container-box-order" >
//                     <div className="box-order" onClick={(e) => this.props.clickQuote(quote)}>
//                         <h4 className="priceQuoteOrderNumber">No.{quote.id}</h4>
//                         <p>Deadline:  <span>{quote.deliveryDate.split("T")[0]}</span></p>
//                         <p>Create by: {quote.createdDate.split("T")[0]}</p>
//                         <p>Vender: {quote.supplierName}</p>
//                         <div className="footer-gallery">  <p>{quote.totalPrice} Product</p>
//                             {setStatusPriQuote(quote.hasSentMail, quote.status)}
//                         </div>
//                     </div>
//                 </div>)}





//         </Carousel>
//     </div>
//     )
// }