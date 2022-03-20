import React from "react";
import './LogIn.css';
import Text from './Input';
import Map from './Map'


class loginPage extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            showPass: false,
            email:"",
            password:"",
            login:false
        }
    }
    
    handleSubmit(e){
        e.preventDefault();
        const details ={
            email:this.state.email,
            password:this.state.password
        }
    
        var formBody = [];
        for (var property in details) {
            var encodedKey = encodeURIComponent(property);
            var encodedValue = encodeURIComponent(details[property]);
            formBody.push(encodedKey + "=" + encodedValue);
        }   
        
        formBody = formBody.join("&");
        
        fetch("http://localhost:4444/map/signin", {
            method:"POST", 
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
              },
            body:formBody
        })
          .then(res => res.json())
          .then(
            (result) => {
                console.log(result);
                if(result){
                    this.props.onChange();
                    
                }
            },
            (error) => {
                console.log(error)
            }
          )
    }
    handleChangeUname = (evt) => {
        this.setState({
            email:evt.target.value
        });
    }

    handleChangePSW = (evt) => {
        this.setState({
            password:evt.target.value
        });
    }

    handleClickShowPSW = () => {
        if(this.state.showPass){
            this.setState({
                showPass: !this.state.showPass,
                eyePSW:"fa fa-eye"
            })
        } else {
            this.setState({
                showPass: !this.state.showPass,
                eyePSW:"fa fa-eye-slash"
            })
        }
    }
    render() {
        const h = '95px';
        const w = '200px';
        return (
            <div>

            
            {!this.state.login ?
                (
                <>
                    <div className="wrapLogin">
                        <form id="formId" onSubmit={evt => this.handleSubmit(evt)} className="login">
                        {/* <form id="formId" onSubmit={this.handleTest} className="login"> */}
                            <div className="uName">
                                <label htmlFor="email">Nom:</label>
                                <Text type={true} name="email" id="email" onChange={this.handleChangeUname}  />
                            </div>
                            <div className="psw">
                                <label htmlFor="password">Mot de passe:</label>
                                <Text type={this.state.showPass} name="password" id="password" onChange={this.handleChangePSW} />  
                            </div>
                            <div className="btnSend">
                                <input type="submit" id="send" value="Se connecter" />
                            </div>
                            <div className="showPSWchkb">
                                <i onClick={this.handleClickShowPSW} id="eye" className={this.state.eyePSW} value="test"></i>
                                <label htmlFor="eye" id="lEyePSW">Visibilité mdp</label>
                            </div>
                        </form>
                    </div>
                </>) 
                    : <Map />}
            </div>

        );
    }
}

export default loginPage;