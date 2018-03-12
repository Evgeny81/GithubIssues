import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import 'moment/locale/ru';

const Table = props =>
    (
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
                        {props.data.map(row =>
                            (<tr key={row.id}>
                                <td className="tableCell">{row.number}</td>
                                <td className="tableCell">{row.title}</td>
                                <td className="tableCell">{moment(row.created_at).format('LLL')}</td>
                            </tr>),
                        )}
                    </tbody>
                </table>
            }
            {
                props.error && <div className="error">
                    {props.error.message}
                </div>
            }
        </div>
    );


export default Table;

Table.propTypes = {
    data: PropTypes.arrayOf(PropTypes.object).isRequired,
    error: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.objectOf(PropTypes.any),
    ]).isRequired,
};
