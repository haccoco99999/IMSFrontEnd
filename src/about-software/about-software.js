import React from 'react'
import './about-software.css'
import logo from '../images/Logo.png'
export default function AboutSoftware() {
    return (

        <div className="home_content wrapper">
            <div className="space-top-heading wrapper">
                {/* title  */}
                <div className="title-heading mt-2">
                    <span>About</span>
                </div>
            </div>
            <div className="row">
                <div className="col-md-2 d-flex align-items-end flex-column">
                    <img src={logo} width="100" height="50" />
                    <p className="mb-0">Stable SPR0527214</p>
                    <p className="mb-0">OSX11.0.0</p>
                </div>
                <div className="col-md-10">
                    <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolore beatae explicabo ea sapiente sit aliquam, sequi ducimus fugiat accusantium quidem tenetur, modi, possimus quos deleniti? Impedit autem voluptas aspernatur est. Lorem ipsum, dolor sit amet consectetur adipisicing elit. Itaque atque odit nostrum, possimus nesciunt quia vel, reiciendis quod, eaque voluptates earum quisquam accusamus corporis et dolores voluptatem asperiores recusandae. Et.</p>
                    <h4>Change log</h4>
                    <h4>Ver SPR052721</h4>
                    <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolore beatae explicabo ea sapiente sit aliquam, sequi ducimus fugiat accusantium quidem tenetur, modi, possimus quos deleniti? Impedit autem voluptas aspernatur est. Lorem ipsum, dolor sit amet consectetur adipisicing elit. Itaque atque odit nostrum, possimus nesciunt quia vel, reiciendis quod, eaque voluptates earum quisquam accusamus corporis et dolores voluptatem asperiores recusandae. Et.</p>


                </div>
            </div>
            {/* <div className="text">
                <div>
                    <h2>About</h2>
                    <div className="about">
                        <div class="about-contain">
                            <div className=" about-left">
                                <img src="..\src\js\images\Logo.png" className="about-left-logo" />
                                <p>Stable SPR0527214</p>
                                <p>OSX11.0.0</p>
                                <button type="button" name="" id="" class="btn btn-primary btn-customize" >Check Update</button>
                            </div>
                            <div className="about-right">
                                <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolore beatae explicabo ea sapiente sit aliquam, sequi ducimus fugiat accusantium quidem tenetur, modi, possimus quos deleniti? Impedit autem voluptas aspernatur est. Lorem ipsum, dolor sit amet consectetur adipisicing elit. Itaque atque odit nostrum, possimus nesciunt quia vel, reiciendis quod, eaque voluptates earum quisquam accusamus corporis et dolores voluptatem asperiores recusandae. Et.</p>
                                <h4>Change log</h4>
                                <h4>Ver SPR052721</h4>
                                <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolore beatae explicabo ea sapiente sit aliquam, sequi ducimus fugiat accusantium quidem tenetur, modi, possimus quos deleniti? Impedit autem voluptas aspernatur est. Lorem ipsum, dolor sit amet consectetur adipisicing elit. Itaque atque odit nostrum, possimus nesciunt quia vel, reiciendis quod, eaque voluptates earum quisquam accusamus corporis et dolores voluptatem asperiores recusandae. Et.</p>

                            </div>
                        </div>
                    </div>
                </div>



            </div> */}
        </div>


    )
}