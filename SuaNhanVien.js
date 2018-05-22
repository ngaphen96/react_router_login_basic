import React from 'react';
import axios from "axios";
import "./QuanLyNhanVien";

class SuaNhanVien extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            post:{  
                    id: '',
                    email: '',
                    hoten: '',
                    manhanvien: '',
                    role: '',
                    member_type: ''
                }
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    
    componentDidMount() {
        console.log("run DidMount receive post update");
        console.log(this.props.match.params.id);

        axios.defaults.headers.common['Authorization'] = "Bearer " + localStorage.getItem("token") ;
        axios.get('http://13.114.242.81/api/admin/users/'+this.props.match.params.id)
            .then(response => {
                var user = {...this.state.post};
                user.id = response.data.id;
                user.email = response.data.email;
                user.hoten = response.data.name;
                user.role = response.data.role;
                user.member_type = response.data.member_type;
                user.manhanvien = response.data.id;
                this.setState({post : user}); 
                console.log(this.state.post);
            }).catch(err => console.log(err));
    }

    handleChange(event) {
        this.setState({
            post: {
                ...this.state.post,
                [event.target.name]: event.target.value
            }
        });
    }

    handleSubmit(){
        var scope = this;
        axios.defaults.headers.common['Authorization'] = "Bearer " + localStorage.getItem("token") ;
        axios.put("http://13.114.242.81/api/admin/users/"+this.state.post.id,{
            email: this.state.post.email,
            name: this.state.post.hoten,
            user_code: this.state.post.manhanvien,
            role: this.state.post.role,
            member_type: this.state.post.member_type,
        })
        .then(function (response) {
            console.log(response);
            alert("Success !!!");
            scope.props.history.push("/QuanLyNhanVien");
          })
          .catch(function (error) {
            console.log(error);
            alert("Fail !!!");
          });
    }

    render(){
        return(
            <div className = "container">
                <form className="form-themnhanvien"  >
                        <h2 className="form-themnhanvien-heading"> Thong tin nhan vien </h2>
                        <label htmlFor="inputEmail" className="sr-only"> Ten</label>
                        <input name="email" type="email" id="inputEmail" className="form-control" placeholder="Email address" value={this.state.post.email} required autoFocus onChange={this.handleChange} />
                        <label htmlFor="inputHoTen" className="sr-only"> Ho</label>
                        <input name="hoten" type="text" id="inputHoTen" className="form-control" placeholder="Fullname" value={this.state.post.hoten} required  onChange={this.handleChange}/>
                        <label htmlFor="inputMaNhanVien" className="sr-only">Email</label>
                        <input name="manhanvien" type="text" id="inputMaNhanVien" className="form-control" placeholder="Identify" value={this.state.post.manhanvien} required  onChange={this.handleChange}/>
                        <br></br><br></br>
                        <label>Vai tro </label>
                            <select name="role" value={this.state.post.role} onChange={this.handleChange} >
                                <option value="admin">Admin</option>
                                <option value="leader">Leader</option>
                                <option value="user">User</option>
                            </select>
                        <br></br><br></br>
                        <label>Loai nhan vien </label>
                            <select name="member_type" value={this.state.post.member_type} onChange={this.handleChange}>
                                <option value="part-time">Parttime</option>
                                <option value="probation1">Thu viec mot thang</option>
                                <option value="probation2">Thu viec hai thang</option>
                                <option value="full-time">Chinh thuc</option>
                            </select>
                        <br></br><br></br>
                        <button className="btn btn-lg btn-primary btn-block" type="button" onClick={this.handleSubmit}> Submit
                        </button>
                </form>
            </div>
        );
    }
}
 export default SuaNhanVien;