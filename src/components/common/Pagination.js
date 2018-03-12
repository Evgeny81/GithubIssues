import React from 'react';
import PropTypes from 'prop-types';

const Pagination = (props) => {
    const options = [];
    if (props.pages.last) {
        for (let k = 1; k < props.pages.last; k += 1) {
            options.push(<option value={k} key={k}>{k}</option>);
        }
    } else {
        options.push(<option value={1} key={1}>1</option>);
    }

    return (
        <div className="paginationWrapper">
            <select
                onChange={props.handlePagination('per_page')}
            >
                <option value={10} key="10">10/page</option>
                <option value={20} key="20">20/page</option>
                <option value={40} key="40">40/page</option>
                <option value={50} key="50">50/page</option>
                <option value={100} key="100">100/page</option>
            </select>
            <div>
                <select
                    id="page"
                    onChange={props.handlePagination('page')}
                >
                    {options}
                </select>
                <label htmlFor="page">
                    page
                </label>
            </div>
        </div>

    );
};

export default Pagination;


Pagination.propTypes = {
    handlePagination: PropTypes.func.isRequired,
    pages: PropTypes.objectOf(PropTypes.number),
};

Pagination.defaultProps = {
    searchRequest: '',
    pages: {},
};
