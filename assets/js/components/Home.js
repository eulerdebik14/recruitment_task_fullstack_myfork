// ./assets/js/components/Home.js

import React, {Component} from 'react';
import {Route, Redirect, Switch, Link} from 'react-router-dom';


import ExchangeRatesHistory from "./ExchangeRatesHistory";

class Home extends Component {

    render() {
        return (
            <div>
                <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                    <Link className={"navbar-brand fw-bold"} to={"#"}> Telemedi Zadanko </Link>
                    <div id="navbarText">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item">
                                <Link className={"nav-link"} to={"/history"}> Exchange rates history </Link>
                            </li>
                            

                        </ul>
                    </div>
                </nav>
                <Switch>
                    <Redirect exact from="/" to="/history" />
                    <Route path="/history" component={ExchangeRatesHistory} />
                </Switch>
            </div>
        )
    }
}

export default Home;
