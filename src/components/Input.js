import React from "react";
import './Input.css';

class textBox extends React.Component {
    constructor(props){
        super(props);
    }

    render(){
        return (
            <div className="inpDiv">
<input  type={this.props.type ? "text" : "password"} name={this.props.name} id={this.props.id}  onChange={this.props.onChange} />
            </div>
            
        );
    }
}

export default textBox; 