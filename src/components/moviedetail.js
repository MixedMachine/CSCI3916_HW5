import React, { Component } from 'react';
import { fetchMovie } from "../actions/movieActions";
import NewReview from "./newreview";
import {connect} from 'react-redux';
import {Card, ListGroup, ListGroupItem} from 'react-bootstrap';
import { BsStarFill } from 'react-icons/bs'
import { Image } from 'react-bootstrap';

class MovieDetail extends Component {

    componentDidMount() {
        const {dispatch} = this.props;
        if (this.props.selectedMovie == null) {
            dispatch(fetchMovie(this.props.movieId));
        }
    }

    render() {
        const DetailInfo = () => {
            if (!this.props.selectedMovie) {
                return <div>Loading....</div>
            }

            return (
                <Card>
                    <Card.Header>Movie Detail</Card.Header>
                    <Card.Body>
                        <Image className="image" src={this.props.selectedMovie.imageUrl} thumbnail width={271} height={280}/>
                    </Card.Body>
                    <ListGroup>
                        <ListGroupItem>{this.props.selectedMovie.title}</ListGroupItem>
                        <ListGroupItem>
                            {this.props.selectedMovie.actors.map((actor, i) =>
                                <p key={i}>
                                    <b>{actor.actorName}</b> {actor.characterName}
                                </p>)}
                        </ListGroupItem>
                        <ListGroupItem><h4><BsStarFill/> {this.props.selectedMovie.avgRating.toFixed(1)}</h4></ListGroupItem>
                    </ListGroup>
                    <Card.Body>
                        {this.props.selectedMovie.reviews.map((review, i) =>
                            <p key={i}>
                                <h6 style={{display:'flex', justifyContent:'left'}}>
                                    <b>{review.username}</b> &nbsp; | {review.name} |  &nbsp; <BsStarFill /> {review.rating} <br></br>
                                </h6>
                                <div  style={{display:'flex', justifyContent:'left'}}>
                                    {review.quote}
                                </div>
                                <hr></hr>
                            </p>
                        )}
                    </Card.Body>
                    <NewReview id={this.props.selectedMovie._id} />
                </Card>
            )
        }

        return (
            <DetailInfo />
        )
    }
}

const mapStateToProps = state => {
    return {
        selectedMovie: state.movie.selectedMovie
    }
}

export default connect(mapStateToProps)(MovieDetail);

