import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getMovies, deleteMovie } from "../services/movieService";
import { getGenres } from "../services/genreService";
import MoviesTable from './moviesTable';
import Pagination from './common/tables/pagination';
import Genres from './common/genres';
import SearchBox from './common/searchBox';
import { paginate } from '../utils/paginate';
import _ from 'lodash';

class Movies extends Component {

    state = {
        movies : [],
        genres : [],
        pageSize : 5,
        currentPage : 1,
        searchQuery : "",
        selectedGenre : null,
        sortColumn: {
            path: '',
            order: 'asc'
        }
    };

    async componentDidMount(){
        const {data} = await getGenres();
        const genres = [{ _id: '', name: 'All Genres' }, ...data];

        const {data: movies} = await getMovies();

        this.setState({ movies, genres});
    }

    handleDelete = async(movie) => {
        const originalMovies = this.state.movies;
        let movies = originalMovies.filter(m => m._id !== movie._id);
        this.setState({movies});

        try {
            await deleteMovie(movie._id);            
        } catch (error) {
            if (error.response && error.response.status === 404)
            toast.error('This movie has already been deleted.');

            this.setState({movies: originalMovies});
        }
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

    handleSearch = (query) => {
        this.setState({ searchQuery: query, selectedGenre: null, currentPage: 1 });
    };

    handleSort = (sortColumn) => {
        this.setState({sortColumn});
    };

    getPageData = () => {
        const { pageSize, currentPage, movies: allMovies, selectedGenre, sortColumn, searchQuery} = this.state;

        let filtredMovies = allMovies;
        if(searchQuery){
            filtredMovies = allMovies.filter(m => m.title.toLowerCase().startsWith(searchQuery.toLocaleLowerCase()));
        }else if(selectedGenre && selectedGenre._id){
            filtredMovies = allMovies.filter(m => m.genre._id === selectedGenre._id);
        };

        const sorted = _.orderBy(filtredMovies, [sortColumn.path], [sortColumn.order]);

        const movies = paginate(sorted, currentPage, pageSize);

        return { filtredMovies, movies };
    };

    render() {

        const { pageSize, currentPage, genres: allGenres, searchQuery, selectedGenre, sortColumn} = this.state;
        const { filtredMovies, movies } = this.getPageData();

        return (
            <div className="row justify-content-around">
                <div className="col-3 text-center">
                    <Genres 
                        genres = {allGenres}
                        selectedGenre = {selectedGenre}
                        onGenreSelect = {this.handleGenreSelect}
                    />
                </div>
                <div className="col">
                    <Link to="/movies/new"><button className='btn btn-primary my-2'>New Movie</button></Link>
                    <h4 className='my-2'>
                        { (filtredMovies.length === 0)? "There are no movies in the database.":"Showing "+filtredMovies.length+" movies in the database."}
                    </h4>
                    <SearchBox value={searchQuery} onChange={this.handleSearch} />
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