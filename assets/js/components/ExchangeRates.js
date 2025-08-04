// ./assets/js/components/ExchangeRates.js

import React, { Component } from 'react';
import axios from 'axios';

class ExchangeRates extends Component {
    constructor() {
        super();
        this.state = {
            rates: [],
            loading: true,
            error: false
        };
    }

    componentDidMount() {
        this.fetchRates();
    }

    fetchRates() {
        axios.get('http://telemedi-zadanie.localhost/api/rates/today')
            .then(response => {
                this.setState({
                    rates: response.data,
                    loading: false,
                    error: false
                });
            })
            .catch(error => {
                console.error('Ошибка при получении курсов валют:', error);
                this.setState({ loading: false, error: true });
            });
    }

    render() {
        const { rates, loading, error } = this.state;

        if (loading) {
            return <div className="text-center mt-5"><span className="fa fa-spinner fa-spin fa-3x"></span></div>;
        }

        if (error) {
            return <div className="text-danger text-center mt-5"><h3>An error occured while loading data</h3></div>;
        }

        return (
            <div className="container mt-5">
                <h2 className="text-center mb-4">Exchange rates for today</h2>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Currnecy</th>
                            <th>Average exchange rate</th>
                            <th>Buy</th>
                            <th>Sell</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rates.map((rate, idx) => (
                            <tr key={idx}>
                                <td>{rate.currency}</td>
                                <td>{rate.mid}</td>
                                <td>{rate.buy !== null ? rate.buy.toFixed(2) : '-'}</td>
                                <td>{rate.sell.toFixed(2)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default ExchangeRates;
