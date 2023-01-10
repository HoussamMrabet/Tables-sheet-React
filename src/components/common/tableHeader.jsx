import React, { Component } from 'react';

class TableHeader extends Component {

    raiseSort = (path) => {
        const sortColumn = {...this.props.sortColumn};
        if(sortColumn.path === path){
            sortColumn.order = (sortColumn.order === 'asc') ? 'desc':'asc';
        }else{
            sortColumn.path = path;
            sortColumn.order = 'asc';
        }
        this.props.onSort(sortColumn);
    };

    renderSortIcon = (column) => {
        if(column.path !== this.props.sortColumn.path) return null;
        if(this.props.sortColumn.order === 'asc') return <i className="fa fa-sort-asc" aria-hidden="true"></i>;
        return <i className="fa fa-sort-desc" aria-hidden="true"></i>;
    }

    render() { 
        return (
            <thead>
                <tr>
                    {this.props.columns.map(c => 
                        <th key={c.path || c.key} onClick={() => this.raiseSort(c.path)} style={{ cursor: 'pointer' }}>{c.label} {this.renderSortIcon(c )}</th>                    
                    )}
                </tr>
            </thead>

        );
    }
}
 
export default TableHeader;