import React, { Component } from 'react';
import _ from 'lodash';

class TableBody extends Component {

    renderCell = (item, column) => {
        if(column.content) return column.content(item)

        return _.get(item, column.path)
    };

    render() { 

        const { data, columns } = this.props;

        return (
            <tbody>
                {data.map( d => (
                    <tr key={d._id}>
                        {columns.map(c =>(
                            <td key={d._id + (c.path || c.key)}>{this.renderCell(d,c)}</td>
                        ))}
                    </tr>
                ))}
            </tbody>
        );
    }
}
 
export default TableBody;