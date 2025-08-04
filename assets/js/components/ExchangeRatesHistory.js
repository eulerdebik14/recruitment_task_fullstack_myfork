// ./assets/js/components/ExchangeRatesHistory.js

import React, { Component } from 'react';
import axios from 'axios';

class ExchangeRatesHistory extends Component {
    constructor() {
        super();
        const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD

        this.state = {
            selectedDate: today,
            history: [],
            loading: true,
            error: false
        };
    }

    componentDidMount() {
        this.fetchHistory();
    }

    fetchHistory = () => {
        const { selectedDate } = this.state;
        this.setState({ loading: true });

        axios.get(`http://telemedi-zadanie.localhost/api/rates/history?date=${selectedDate}`)
            .then(response => {
                this.setState({
                    history: response.data,
                    loading: false,
                    error: false
                });
            })
            .catch(error => {
                console.error('An error occured while loading history:', error);
                this.setState({ loading: false, error: true });
            });
    };

    handleDateChange = (e) => {
        this.setState({ selectedDate: e.target.value }, this.fetchHistory);
    };

    render() {
        const { selectedDate, history, loading, error } = this.state;

        return (
            <div className="container mt-5">
                <h2 className="text-center mb-4">History of exchange rates (14 days)</h2>

                <div className="form-group text-center">
                    <label>Pick a date:</label><br />
                    <input
                        type="date"
                        value={selectedDate}
                        max={new Date().toISOString().split('T')[0]}
                        onChange={this.handleDateChange}
                        className="form-control w-25 d-inline"
                    />
                </div>

                {loading && (
                    <div className="text-center mt-4">
                        <span className="fa fa-spinner fa-spin fa-3x"></span>
                    </div>
                )}

                {error && (
                    <div className="text-danger text-center mt-4">
                        <h4>An error occured while loading data.</h4>
                    </div>
                )}

                {!loading && !error && history.length > 0 && (
                    <div className="mt-4">
                        {history.map((day, idx) => (
                            <div key={idx} className="mb-4">
                                <h5 className="text-center">Date: {day.date}</h5>
                                <table className="table table-bordered">
                                    <thead>
                                        <tr>
                                            <th>Currency</th>
                                            <th>Average exchange rate</th>
                                            <th>Buy</th>
                                            <th>Sell</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {day.rates.map((rate, i) => (
                                            <tr key={i}>
                                                <td>{rate.currency}</td>
                                                <td>{rate.mid.toFixed(2)}</td>
                                                <td>{rate.buy !== null ? rate.buy.toFixed(2) : '-'}</td>
                                                <td>{rate.sell.toFixed(2)}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        );
    }
}

export default ExchangeRatesHistory;