import React from 'react';
import PropTypes from 'prop-types';

const SearchForm = props => (
    <form className="searchForm">
        <input
            value={props.searchRequest}
            className="searchInput"
            type="text"
            placeholder="username/repo"
            onChange={props.handleInput}
        />
        <p className={`searchHint ${props.searchRequest && 'show'}`}>
            username/repo
        </p>
        <button
            className="searchButton"
            onClick={props.handleSearch}
            disabled={!props.searchRequest}
        >
            Search
        </button>
    </form>
);

export default SearchForm;

SearchForm.propTypes = {
    handleInput: PropTypes.func.isRequired,
    handleSearch: PropTypes.func.isRequired,
    searchRequest: PropTypes.string,
};

SearchForm.defaultProps = {
    searchRequest: '',
};
