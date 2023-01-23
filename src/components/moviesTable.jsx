import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import Table from './common/tables/table';
import Like from './common/like';
import auth from '../services/authService';

class MoviesTable extends Component {
    columns = [
        { path: "title", label: 'Title', content: movie => (auth.getCurrentUser()? <Link className='nav-link' to={"/movies/"+movie._id}>{movie.title}</Link> : movie.title)},
        { path: 'genre.name', label: 'Genre'},
        { path: 'numberInStock', label: 'Stock'},
        { path: 'dailyRentalRate', label: 'Rate'},
    ];

    deleteColumnHigh = {
        key: 'delete', content: movie => (<button onClick={() => this.props.onDelete(movie)} className='btn btn-danger'>Delete</button>)
    };

    deleteColumn = {
        key: 'like', content: movie => (<Like liked = {movie.liked} onClick = {() => this.props.onLike(movie)}/>),
    };

    constructor(){
        super();
        const user = auth.getCurrentUser();
        if(user) this.columns.push(this.deleteColumn);
        if(user && user.isAdmin) this.columns.push(this.deleteColumnHigh);
    }

    render() { 
        const { movies, onSort, sortColumn } = this.props; 
        return (
            <Table 
                columns = {this.columns}
                data = {movies}
                sortColumn = {sortColumn}
                onSort = {onSort}
            />
        );
    }
}
 
export default MoviesTable;