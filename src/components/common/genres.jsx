import React, { Component } from 'react';


class Genres extends Component { 
    render() { 
        const {genres, selectedGenre, onGenreSelect} = this.props;
        return (
            <ul className="list-group">
                {genres.map(g => (
                    <li 
                        key={g._id} 
                        onClick={() => onGenreSelect(g)} 
                        className={ (selectedGenre === g)? "list-group-item active":"list-group-item" } 
                        style={{ cursor: "pointer" }}
                    >{g.name}</li>
                ))}
            </ul>
        );
    }
}
 
export default Genres;