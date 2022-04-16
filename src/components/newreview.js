import React, { useState } from 'react';
import {Alert, Button, Container, Form} from "react-bootstrap";
import runtimeEnv from "@mars/heroku-js-runtime-env";


const EmployeeForm = (movie) => {
    const [enteredName, setName] = useState('');
    const [enteredRating, setRating] = useState('');
    const [enteredQuote, setQuote] = useState('');
    const env = runtimeEnv();


    const RatingChangeHandler = (event) => {
        setRating(event.target.value);
    };

    const nameChangeHandler = (event) => {
        setName(event.target.value);
    };

    const roleChangeHandler = (event) => {
        setQuote(event.target.value);
    };


    const submitHandler = (event) => {
        event.preventDefault();

        if (enteredRating < 1 || enteredRating > 5) {
            setRating('');
            return alert("Rating must be between 1 and 5.");
        }

        let reqBody = JSON.stringify({
            movie: {
                _id: movie.id
            },
            review: {
                name: `${enteredName}`,
                rating: parseInt(enteredRating),
                quote: `${enteredQuote}`,
            }
        });

        return fetch(`${env.REACT_APP_API_URL}/reviews/`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('token')
            },
            mode: 'cors',
            body: reqBody,
        }).then((response) => {
            if (!response.ok) {
                throw Error(response.statusText);
            }
            return response.json()
        }).then((res) => {
            //reset the values of input fields
            setRating('');
            setName('');
            setQuote('');
            alert('Review has been saved');

            return window.location.reload();
        }).catch((e) => console.log(e));



    };

    return (
        <Alert variant='primary'>
            <Container>
                <Form onSubmit={submitHandler}>
                    <Form.Group controlId="form.Name">
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="text"
                                      value={enteredName} onChange={nameChangeHandler}
                                      placeholder="Enter Name" required/>
                    </Form.Group>
                    <Form.Group controlId="form.Rating">
                        <Form.Label>Rating</Form.Label>
                        <Form.Control type="number"
                                      value={enteredRating} onChange={RatingChangeHandler}
                                      pattern={"[1-5"}
                                      placeholder="Enter Rating" required/>
                    </Form.Group>
                    <Form.Group controlId="form.Quote">
                        <Form.Label>Review</Form.Label>
                        <Form.Control as="textarea" value={enteredQuote} onChange={roleChangeHandler}
                                      placeholder="Enter Review" required/>
                    </Form.Group>
                    <Button type='submit'>Add Review</Button>
                </Form>
            </Container>
        </Alert>

    );
}


export default EmployeeForm;