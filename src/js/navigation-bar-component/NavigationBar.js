import React from 'react'
import './navigation-bar.css'
export default function NavigationBar(props) {
 
   
    return (
        <div className="navigation-bar" >
            <div className="navigation-bar-left">
                <h3 onClick={props.actionGoBack}>&lt;</h3>
                <h3>{props.titleBar}</h3>
            </div>
            <div className="navigation-bar-right">
                {props.listButton.map(button => {
                    if(button == null){
                        return ""
                    }
                    let classButton = button.class == null? "btn-primary": button.class
                    if(button.isShow == false){
                      
                       return ""
                    }
                    else{
                       
                        return <button onClick={button.action} type="button" style={button.style} class={"navigation-bar-right-button btn "  + classButton }>{button.title}</button> 
                    }
                })}
     

            </div>

        </div>
    );
}

// const listButton = [
//     {
//         title: "Cancel",
//         action:() => this.cancelClick(),
//         style:{
//             background: "red"
//         }
//     },
//     {
//         title: "Confirm",
//         action: () => this.confirmClick(),
//         style:{
//             background: "blue"
//         }
//     }
// ]

{/* <NavigationBar actionGoBack={() => this.goBackClick()}
listButton={listButton}
/> */}