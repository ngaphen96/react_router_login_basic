import React from 'react';
import axios from 'axios';

class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
          email: "",
          password: "",
          token: ""
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
    }

    componentDidMount(){
        if(localStorage.getItem("token")){
            this.props.history.push("./QuanLyNhanVien");
        }
    }

    handleEmailChange(e){
        this.setState({email:e.target.value});
    }
    handlePasswordChange(e){
        this.setState({password:e.target.value});
    }
    handleSubmit() {
        var scope = this;
        axios.post('http://13.114.242.81/api/login', {
            email: this.state.email,
            password: this.state.password
          })
          .then(function (response) {
            console.log(response);
            alert("Dang nhap thanh cong !!!");
            localStorage.setItem("token", response.data.token);
            scope.props.history.push("./QuanLyNhanVien");

          })
          .catch(function (error) {
            console.log(error);
            alert("Dang Nhap that bai !!!");
          });
        
    }

    render() {
            return (
                <div className = "container">
                    <form className="form-signin" >
                            <h2 className="form-signin-heading"> Dang Nhap </h2>
                            <label htmlFor="inputEmail" className="sr-only"> Email address</label>
                            <input type="email" id="inputEmail" className="form-control" placeholder="Email address" required autoFocus onChange={this.handleEmailChange}/>
                            <label htmlFor="inputPassword" className="sr-only"> Password</label>
                            <input type="password" id="inputPassword" className="form-control" placeholder="Password" required onChange={this.handlePasswordChange}/>
                            <button className="btn btn-lg btn-primary btn-block" type="button" onClick={this.handleSubmit}> Log in
                            </button>
                    </form>
                </div>
            )
        }
       
}


export default Login;