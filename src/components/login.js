import React, { Component } from 'react';
import { submitLogin } from '../actions/authActions';
import { connect } from 'react-redux';
import { Form, Button } from 'react-bootstrap';

class Login extends Component {

    constructor(props) {
        super(props);
        this.updateDetails = this.updateDetails.bind(this);
        this.login = this.login.bind(this);

        this.state = {
            details:{
                username: '',
                password: ''
            }
        };
    }

    updateDetails(event){
        let updateDetails = Object.assign({}, this.state.details);

        updateDetails[event.target.id] = event.target.value;
        this.setState({
            details: updateDetails
        });
    }

    login() {
        const {dispatch} = this.props;
        dispatch(submitLogin(this.state.details));
    }

    render(){
        return (
            <Form className='form-horizontal'>
                <Form.Group controlId="username">
                    <Form.Label>Email</Form.Label>
                    <Form.Control onChange={this.updateDetails} value={this.state.details.username} type="email" placeholder="Enter email" />
                </Form.Group>

                <Form.Group controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control onChange={this.updateDetails} value={this.state.details.password}  type="password" placeholder="Password" />
                </Form.Group>
                <Button onClick={this.login}>Sign in</Button>
            </Form>
        )
    }
}

const mapStateToProps = state => {
    return {
    }
}

export default connect(mapStateToProps)(Login);