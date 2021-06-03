
import React from 'react'
import './notification-component.css'
class NotificationBell extends React.Component{
    constructor(props){
        super(props)
    }
    render(){
        return(
            <div className={"notification-bell notification-" + this.props.active}>
                <div className="header-notification" >
                    <p>List notification (3)</p>
                </div>
                <div className="list-notification" >
                <ul>
                        <li><img src="..\src\js\images\manufacture-2.png"/>
                        <div><span>Good Issue by AKC</span> <p>Last:2/6/2020</p></div>
                        </li>
                        <li><img src="..\src\js\images\manufacture-2.png"/>
                        <div><span>Good Issue by AKC</span> <p>Last:2/6/2020</p></div>
                        </li>
                        <li><img src="..\src\js\images\manufacture-2.png"/>
                        <div><span>Good Issue by AKC</span> <p>Last:2/6/2020</p></div>
                        </li>
                        <li><img src="..\src\js\images\manufacture-2.png"/>
                        <div><span>Good Issue by AKC</span> <p>Last:2/6/2020</p></div>
                        </li>
                        <li><img src="..\src\js\images\manufacture-2.png"/>
                        <div><span>Good Issue by AKC</span> <p>Last:2/6/2020</p></div>
                        </li>
                        <li><img src="..\src\js\images\manufacture-2.png"/>
                        <div><span>Good Issue by AKC</span> <p>Last:2/6/2020</p></div>
                        </li>
                        <li><img src="..\src\js\images\manufacture-2.png"/>
                        <div><span>Good Issue by AKC</span> <p>Last:2/6/2020</p></div>
                        </li>
                        <li><img src="..\src\js\images\manufacture-2.png"/>
                        <div><span>Good Issue by AKC</span> <p>Last:2/6/2020</p></div>
                        </li>
                        <li><img src="..\src\js\images\manufacture-2.png"/>
                        <div><span>Good Issue by AKC</span> <p>Last:2/6/2020</p></div>
                        </li>
                        <li><img src="..\src\js\images\manufacture-2.png"/>
                        <div><span>Good Issue by AKC</span> <p>Last:2/6/2020</p></div>
                        </li>
                        {/* <li><img src="..\src\js\images\manufacture-2.png"/><span>User Huynhq create new supplier at 10:25AM 05/18/2021</span> </li>
                        <li><img src="..\src\js\images\manufacture-2.png"/><span>User Huynhq create new supplier at 10:25AM 05/18/2021</span> </li>
                        <li><img src="..\src\js\images\manufacture-2.png"/><span>User Huynhq create new supplier at 10:25AM 05/18/2021</span> </li>
                        <li><img src="..\src\js\images\manufacture-2.png"/><span>User Huynhq create new supplier at 10:25AM 05/18/2021</span> </li>
                        <li><img src="..\src\js\images\manufacture-2.png"/><span>User Huynhq create new supplier at 10:25AM 05/18/2021</span> </li>
                        <li><img src="..\src\js\images\manufacture-2.png"/><span>User Huynhq create new supplier at 10:25AM 05/18/2021</span> </li>
                        <li><img src="..\src\js\images\manufacture-2.png"/><span>User Huynhq create new supplier at 10:25AM 05/18/2021</span> </li>
                        <li><img src="..\src\js\images\manufacture-2.png"/><span>User Huynhq create new supplier at 10:25AM 05/18/2021</span> </li>
                        <li><img src="..\src\js\images\manufacture-2.png"/><span>User Huynhq create new supplier at 10:25AM 05/18/2021</span> </li> */}
                    </ul>
                </div>
                <div className="footer-notification" > <p>See all</p></div>
            </div>
        );

    }
}
export default NotificationBell