import React from 'react';
import Joi from 'joi-browser';
import Form from './common/forms/form';
import { getMovie, saveMovie } from '../services/movieService';
import { getGenres } from '../services/genreService';

class MovieDetails extends Form {
    state = {
        data: {
            title: "",
            genreId: "",
            numberInStock: "",
            dailyRentalRate: "",
        },
        genres: [],
        errors: {}
    };

    schema = {
        _id: Joi.string(),
        title: Joi.string().required().min(5).max(50).label("Title"),
        genreId: Joi.string().required().label("Genre"),
        numberInStock: Joi.number().required().integer().min(0).max(100).label("Number in Stock"),
        dailyRentalRate: Joi.number().required().min(0).max(10).label("Daily Rental Rate"),
    };

    async setGenres(){
        const {data: genres} = await getGenres();
        this.setState({genres});
    }

    async setMovie(){      
        try {
            const movieId = this.props.match.params.id;
            if(movieId === "new") return;
            const {data: movie} = await getMovie(movieId);
            this.setState({data: this.mapToViewModel(movie)});            
        } catch (error) {            
            if (error.response && error.response.status === 404) return this.props.history.replace("/notFound");
        }      
    }

    async componentDidMount(){
        await this.setGenres();
        await this.setMovie();
    };

    mapToViewModel(movie) {
        return {
            _id: movie._id,
            title: movie.title,
            genreId: movie.genre._id,
            numberInStock: movie.numberInStock,
            dailyRentalRate: movie.dailyRentalRate
        };
    };

    doSubmit = async () => {
        await saveMovie(this.state.data);
        this.props.history.push('/movies');
    };

    render() { 
        return (
            <div className="col-6 mt-2">
                <h1>Movie Form</h1>
                <form onSubmit={this.handleSubmit}>
                    {this.renderInput("title", "Title")}
                    {this.renderSelect("genreId", "Genre", this.state.genres)}
                    {this.renderInput("numberInStock", "Number in Stock")}
                    {this.renderInput("dailyRentalRate", "Rate")}
                    {this.renderButton("Save")}
                </form>
            </div>
        );
    }
}
 
export default MovieDetails;