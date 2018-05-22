import React from 'react';
import { confirmAlert } from 'react-confirm-alert';
import axios from 'axios';
import Pagination from "react-js-pagination";
import { Link } from "react-router-dom";

class QuanLyNhanVien extends React.Component{

    constructor(props) {
        super(props);
        this.handleThem = this.handleThem.bind(this);
        this.handleXoa = this.handleXoa.bind(this);
        this.handlePageChange = this.handlePageChange.bind(this);
        this.state = {
            users: [],
            activePage : 1,
            total : 0
        }
    }

    handlePageChange(pageNumber){
        this.setState({activePage : pageNumber});
        console.log("Active page is "+pageNumber);
        axios.defaults.headers.common['Authorization'] = "Bearer " + localStorage.getItem("token") ;
        axios.get('http://13.114.242.81/api/admin/users?page='+pageNumber).then(response => {
        this.setState({users : response.data.data}); 
        }).catch(err => console.log(err));
    }
    
    componentDidMount() {
        console.log("run DidMount");
        if(localStorage.getItem("token")){
            axios.defaults.headers.common['Authorization'] = "Bearer " + localStorage.getItem("token") ;
            axios.get('http://13.114.242.81/api/admin/users?').then(response => {
            this.setState({users : response.data.data, total : response.data.total}); 
            }).catch(err => console.log(err));
        }
        else{
            this.props.history.push("./");
        }
    }
    
    handleThem(event) {
        event.preventDefault();
        this.props.history.push("/QuanLyNhanVien/ThemNhanVien");
    }
    
    handleXoa(e, index) {
        confirmAlert({
            customUI: ({onClose}) => {
               return (
                    <div className='confirmXoa confirmAlertcontainer'>
                        <h1>Ban da chac chan</h1>
                        <p>Ban muon xoa nhan vien nay?</p>
                        <button onClick={onClose}>Huy</button> &nbsp;&nbsp;
                        <button onClick={() => {
                            console.log(index);
                            var temp = this.state.users;
                            var temp2 = [];
                            for(let i = 0; i < temp.length; i++){
                                if( i === index ){
                                   continue;
                                }
                                temp2.push(temp[i]);
                            }
                            console.log(temp2);
                            this.setState({ users: temp2});
                            alert("Da xoa");
                            onClose();
                        }}>Xac nhan!</button>
                    </div>
               )
            }
        });
    }
    
    render() {
        return(
            <div className="container">
                <h2>Danh sach nhan vien</h2>
                <button onClick={this.handleThem} >Them</button>
                <table className="table table-striped">
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>HoTen</th>
                        <th>MaNhanVien</th>
                        <th>Email</th>
                        <th>ThaoTac</th>
                    </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.users.map(function(user, index) {
                                return (
                                            <tr key={index}>
                                                <td>{user.id}</td>
                                                <td>{user.name}</td>
                                                <td>{user.user_code}</td>
                                                <td>{user.email}</td>
                                                <td>
                                                    <span>
                                                            <button ><Link to={`/QuanLyNhanVien/SuaNhanVien/${user.id}`}>Sua</Link></button>&nbsp;&nbsp;
                                                            <button onClick={(e)=>{this.handleXoa(e, index);}}>Xoa</button>
                                                    </span>
                                                    </td>
                                            </tr>
                                        )
                            }.bind(this))
                        }
                    </tbody>
                </table>
                <div>
                    <Pagination activePage={this.state.activePage} 
                                itemCountPerPage={10}
                                totalItemsCount={this.state.total}
                                pageRangeDisplayed={5}
                                onChange={this.handlePageChange}
                    />
                </div>
            </div>
        )
    }
}

export default QuanLyNhanVien;