import React, { Component } from 'react';
import { fetchMovies } from "../actions/movieActions";
import { setMovie } from "../actions/movieActions";
import { connect } from 'react-redux';
import { Image, Nav } from 'react-bootstrap';
import { Carousel } from 'react-bootstrap';
import { BsStarFill} from 'react-icons/bs'
import {LinkContainer} from 'react-router-bootstrap';

class MovieList extends Component {
    constructor(props) {
        super(props);
        this.handleSelect = this.handleSelect.bind(this);
    }

    componentDidMount() {
        const {dispatch} = this.props;
        dispatch(fetchMovies());
    }

    handleSelect(selectedIndex, e) {
        const {dispatch} = this.props;
        dispatch(setMovie(this.props.movies[selectedIndex]));
    }

    handleClick = (movie) => {
        const {dispatch} = this.props;
        dispatch(setMovie(movie));
    }

    render() {
        const MovieListCarousel = ({movieList}) => {
            if (!movieList) {
                return <div>Loading....</div>
            }

            return (
                <Carousel onSelect={this.handleSelect}>
                    {movieList.map((movie) =>
                        <Carousel.Item key={movie._id}>
                            <div> Hello
                                <LinkContainer to={'/movie/'+movie._id} onClick={()=>this.handleClick(movie)}>
                                    <Nav.Link><Image className="image" src={movie.imageUrl} thumbnail  width={250} height={300}/></Nav.Link>
                                </LinkContainer>
                            </div>
                            <Carousel.Caption style={{
                                textShadow: '1px 1px 10px #000, 1px 1px 10px #000',
                            }}>
                                <div style={{
                                    width: '250px',
                                    display: 'inline-block',
                                    backgroundColor: 'rgba(0, 0, 0, 0.3)',
                                }}>
                                <h3>{movie.title}</h3>
                                <BsStarFill glyph={'star'} style={{
                                    fill: 'yellow',
                                }}/> {movie.avgRating} &nbsp;&nbsp; {movie.year}
                                </div>
                            </Carousel.Caption>
                        </Carousel.Item>
                    )}

                </Carousel>
            )
        }

        return (
            <MovieListCarousel movieList={this.props.movies} />
        )
    }
}

const mapStateToProps = state => {
    return {
        movies: state.movie.movies
    }
}

export default connect(mapStateToProps)(MovieList);

