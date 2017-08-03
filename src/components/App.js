import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './App.css';
import Table from './Table';
import fetchData from '../actions/fetch';

class App extends Component {
    state = {
        searchRequest: '',
        inputRequest: '',
    };

    handleSearch = (e) => {
        e.preventDefault();
        this.props.dispatch(fetchData(`repos/${this.state.searchRequest}/issues`));
    };

    handleInput = (e) => {
        // fetch(`https://api.github.com/users/${this.state.inputRequest}/repos`)
        //     .then(response => response.json())
        //     .then(response => console.log(response));
        this.setState({ searchRequest: e.target.value, inputRequest: e.target.value });
    };

    render() {
        return (
            <div className="wrapper">
                <aside className="aside">
                    <h2>Find all github repo issues</h2>
                    <form className="searchForm">
                        <input
                            className="searchInput"
                            type="text"
                            placeholder="username/repo"
                            onInput={this.handleInput}
                        />
                        {this.state.searchRequest &&
                        <p className="searchHint">username/repo</p>}
                        <button className="searchButton" onClick={this.handleSearch}>Search</button>
                    </form>
                </aside>
                <main className="main">
                    <Table data={this.props.issues.data} />
                </main>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { issues } = state;
    return { issues };
}

export default connect(mapStateToProps)(App);

App.propTypes = {
    dispatch: PropTypes.func,
    issues: PropTypes.objectOf(PropTypes.array),
};

App.defaultProps = {
    dispatch: () => {},
    issues: {},
};
