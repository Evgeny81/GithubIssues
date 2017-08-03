import React from 'react';
import PropTypes from 'prop-types';

const Table = (props) => {
    return (
        <div>
            {
                !!props.data.length && <table className="table">
                    <thead>
                        <tr>
                            <th>Номер</th>
                            <th>Название</th>
                            <th>Дата открытия</th>
                        </tr>
                    </thead>
                    <tbody>
                        {props.data.map((row) => {
                            return (
                                <tr key={row.id}>
                                    <td className="tableCell">{row.number}</td>
                                    <td className="tableCell">{row.title}</td>
                                    <td className="tableCell">{row.created_at}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            }
        </div>
    );
};

export default Table;

Table.propTypes = {
    data: PropTypes.arrayOf(PropTypes.object).isRequired,
};
