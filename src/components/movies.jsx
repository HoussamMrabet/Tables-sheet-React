import React, { Component } from 'react';
import MoviesTable from './moviesTable';
import Pagination from './common/pagination';
import Genres from './common/genres';
import { getMovies } from "../services/fakeMovieService";
import { getGenres } from "../services/fakeGenreService";
import { paginate } from '../utils/paginate';
import _ from 'lodash';

class Movies extends Component {

    state = {
        movies : [],
        genres : [],
        pageSize : 5,
        currentPage : 1,
        sortColumn: {
            path: '',
            order: 'asc'
        }
    };

    componentDidMount(){
        const genres = [{ _id: '', name: 'All Genres' }, ...getGenres()];
        this.setState({ movies: getMovies(), genres});
    }

    handleDelete = (movie) => {
        let movies = this.state.movies.filter(m => m._id !== movie._id);
        this.setState({movies});
    };

    handleLike = (movie) => {
        const movies = this.state.movies
        .map(
            m => {
                if(m._id === movie._id)
                    m.liked = (m.liked)? false : true;
                return m;    
            });
        this.setState({movies});
    };

    handlePageChange = (page) => {
        this.setState({currentPage: page});
    };

    handleGenreSelect = (genre) =>{
        this.setState({selectedGenre: genre, currentPage: 1});
    };

    handleSort = (sortColumn) => {
        this.setState({sortColumn});
    };

    getPageData = () => {
        const { pageSize, currentPage, movies: allMovies, selectedGenre, sortColumn} = this.state;

        const filtredMovies = (selectedGenre && selectedGenre._id)? allMovies.filter(m => m.genre._id === selectedGenre._id): allMovies;

        const sorted = _.orderBy(filtredMovies, [sortColumn.path], [sortColumn.order]);

        const movies = paginate(sorted, currentPage, pageSize);

        return { filtredMovies, movies };
    };

    render() {

        const { pageSize, currentPage, genres: allGenres, selectedGenre, sortColumn} = this.state;
        const { filtredMovies, movies } = this.getPageData();

        return (
            <div className="row justify-content-around">
                <div className="col-2">
                    <Genres 
                        genres = {allGenres}
                        selectedGenre = {selectedGenre}
                        onGenreSelect = {this.handleGenreSelect}
                    />
                </div>
                <div className="col">
                    <h4 className='m-2'>
                        { (filtredMovies.length === 0)? "There are no movies in the database.":"Showing "+filtredMovies.length+" movies in the database."}
                    </h4>
                    <MoviesTable 
                        movies = {movies}
                        sortColumn = {sortColumn}
                        onLike = {this.handleLike}
                        onDelete = {this.handleDelete}
                        onSort = {this.handleSort}
                    />
                    <Pagination 
                        itemsCount = {filtredMovies.length} 
                        pageSize = {pageSize} 
                        currentPage = {currentPage} 
                        onPageChange = {this.handlePageChange} 
                    />
                </div>
            </div>
        );
    }
}
 
export default Movies;