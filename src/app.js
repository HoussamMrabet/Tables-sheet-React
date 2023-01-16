import React, { Component } from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Movies from './components/movies';
import MovieDetails from './components/movieDetails';
import Customers from './components/customers';
import NotFound from './components/notFound';
import Rentals from './components/rentals';
import NavBar from './components/navBar';
import LoginForm from './components/loginForm';
import RegisterForm from './components/registerForm';
import 'react-toastify/dist/ReactToastify.css';

class App extends Component {
    render() { 
        return (
            <React.Fragment>
                <ToastContainer />
                <NavBar />
                <div className="container mt-4">
                    <Switch>
                        <Route path="/register" component={RegisterForm} />
                        <Route path="/login" component={LoginForm} />
                        <Route path="/rentals" component={Rentals} />
                        <Route path="/customers" component={Customers} />
                        <Route path="/notFound" component={NotFound} />
                        <Route path="/movies/:id" component={MovieDetails} />
                        <Route path="/movies" component={Movies} />
                        <Redirect from="/" exact to="/movies" />
                        <Redirect to="/notFound" />
                    </Switch>
                </div>
            </React.Fragment>
        );
    }
}
 
export default App;