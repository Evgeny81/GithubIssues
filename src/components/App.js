import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './App.css';
import SearchForm from './SearchForm';
import Table from './Table';
import fetchData from '../actions/fetch';
import Pagination from './common/Pagination';

class App extends Component {
    state = {
        searchRequest: '',
        pagination: {
            per_page: 10,
            page: 1,
        },
    };

    handleSearch = (e) => {
        e.preventDefault();
        const { searchRequest, pagination } = this.state;
        const { dispatch } = this.props;

        this.setState({
            perPageTouched: false,
        });

        if (searchRequest) {
            dispatch(fetchData(`repos/${searchRequest}/issues`, pagination));
        }
    };

    handleInput = (e) => {
        this.setState({ searchRequest: e.target.value });
    };

    handlePagination = type => (e) => {
        this.setState({
            perPageTouched: type === 'per_page',
            pagination: {
                ...this.state.pagination,
                page: type === 'per_page' && 1,
                [type]: e.target.value,
            },
        });
    };

    render() {
        const { searchRequest, perPageTouched } = this.state;
        const { issues } = this.props;
        return (
            <div className="wrapper">
                <aside className="aside">
                    <h2>Find all github repo issues</h2>
                    <SearchForm
                        searchRequest={searchRequest}
                        handleSearch={this.handleSearch}
                        handleInput={this.handleInput}
                    />
                    <Pagination
                        pages={perPageTouched ? {} : issues.pagination}
                        handlePagination={this.handlePagination}
                    />
                </aside>
                <main className="main">
                    <Table
                        data={issues.data}
                        error={issues.error}
                    />
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
    dispatch: PropTypes.func.isRequired,
    issues: PropTypes.objectOf(PropTypes.any),
};

App.defaultProps = {
    issues: {},
};
