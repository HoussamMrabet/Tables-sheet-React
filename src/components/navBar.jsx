import React, { Component } from 'react';
import {Link, NavLink} from 'react-router-dom';

class NavBar extends Component {
    state = {  } 
    render() { 
        return (
            <nav className='navbar navbar-expand-lg navbar-light bg-light justify-content-between'>
                <Link className="navbar-brand" to="/">Vidly</Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div className="navbar-nav mr-auto">
                        <NavLink className="nav-item nav-link mx-2" to="/movies">Movies</NavLink>
                        <NavLink className="nav-item nav-link mx-2" to="/customers">Customers</NavLink>
                        <NavLink className="nav-item nav-link mx-2" to="/rentals">Rentals</NavLink>
                    </div>
                    <div className="navbar-nav">
                        {this.userState(this.props.user)}
                    </div>
                </div>
            </nav>
        );
    }

    userState = (user) => {
        if(user){
            return(
                <React.Fragment>
                    <NavLink className="nav-item nav-link mx-2" to="/profile">{user.name}</NavLink>
                    <NavLink className="nav-item nav-link mx-2" to="/logout">Logout</NavLink>
                </React.Fragment>
            );
        }else{
            return(
                <React.Fragment>
                    <NavLink className="nav-item nav-link mx-2" to="/login">Login</NavLink>
                    <NavLink className="nav-item nav-link mx-2" to="/register">Register</NavLink>
                </React.Fragment>
            );
        }
    }
}
 
export default NavBar;