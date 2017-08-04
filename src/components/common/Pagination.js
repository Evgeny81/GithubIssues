import React from 'react';

const Pagination = (props) => {
    let options = [];
    if (props.pages.last) {
        for (let k = 1; k < props.pages.last; k += 1) {
            options.push(<option value={k} key={k}>{k}</option>);
        }
    } else {
        options.push(<option value={1} key={1}>1</option>);
    }
    return (
        <div className="paginationWrapper">
            <select>
                <option value={10} key="10">10/page</option>
                <option value={20} key="20">20/page</option>
                <option value={40} key="40">40/page</option>
                <option value={50} key="50">50/page</option>
                <option value={100} key="100">100/page</option>
            </select>
            <ul className="pagesWrapper">
                <li className="last">
                    <a href={props.pages.first}>{String.fromCharCode(12296)}</a>
                </li>
                <li className="last">
                    <a href={props.pages.last}>{String.fromCharCode(12297)}</a>
                </li>
            </ul>
            <select>
                {options}
            </select>
        </div>

    );
};

export default Pagination;
