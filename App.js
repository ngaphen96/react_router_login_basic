import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import './App.css';

import Login from "./Login";
import QuanLyNhanVien from "./QuanLyNhanVien";
import ThemNhanVien from "./ThemNhanVien";
import SuaNhanVien from "./SuaNhanVien";

const App = () => (
    <Router>
        <div>
            <Switch>
                <Route exact path="/" component={Login} />
                <Route exact path="/QuanLyNhanVien" component={QuanLyNhanVien} />
                <Route exact path="/QuanLyNhanVien/ThemNhanVien" component={ThemNhanVien} />
                <Route exact path="/QuanLyNhanVien/SuaNhanVien/:id" component={SuaNhanVien} />
            </Switch>
        </div>
    </Router>
);

export default App;
