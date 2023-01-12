import React, { Component } from 'react';

class MovieDetails extends Component {

    handleClick = () => {
        this.props.history.replace("/movies");
    };

    render() { 
        return (
            <div>
                <h1>Movie form {this.props.match.params.id}</h1>
                <button onClick={this.handleClick} className='btn btn-primary'>Save</button>
            </div>
        );
    }
}
 
export default MovieDetails;