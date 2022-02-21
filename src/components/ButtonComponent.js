import React from "react";
import Button from "react-bootstrap/esm/Button";
import "./ButtonComponent.css"

export default function ButtonComponent(props){

    function handleSubmit(e) {
        e.preventDefault();
        console.log('You clicked submit.');
      }

    return(
        <div  className="icon">
            <Button className="button" style={{backgroundColor: `${props.color}`}}
                onClick={handleSubmit}
            >
                <img src={props.icon}/>
            </Button>
        </div>
    )
}