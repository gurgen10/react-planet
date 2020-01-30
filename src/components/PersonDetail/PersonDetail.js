import React, { Component } from 'react';
import { Row, Col, Spinner } from 'react-bootstrap';
import SwapiService from '../../services/SwapiService';

import './PersonDetail.css';

export default class PersonDetail extends Component {

  state = {
    user: {
      id: null,
      name:'',
      gender: '',
      birthYear: null,
      eyeColor: ''
    },
    loadong: true,
    hasError: false
  }
  swapi = new SwapiService();
 
  getUserData = async (id) => {
    
    try {
      const user = await this.swapi.getUser(id );

      if(this.state.user.id !== id) this.setState({user})
    } catch (error) {
      
      throw new Error(error)
      
    }
  }
  componentDidMount() {
    this.getUserData(1);
    console.log('user', this.state.user);

  }
  componentDidCatch() {
    this.setState({hasError: true})
    return <h1>nhakjncscnskcnskcjsn</h1>
  }
  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  render() {
    
    const { itemId } = this.props;

    if(itemId)  this.getUserData( itemId);
    
    const  { user }  = this.state;
    if(!user) return <Spinner animation="border" variant="warning"/>

    return (
      <Row className="detail">
        <Col md="3">
          <img src="/planet.jpg" alt="" className="w-100" />
        </Col>
  
        <Col md="9">
          <h2>{user.name}</h2>
          <ul>
            <li>Gender: {user.gender}</li>
            <li>BirthYear: {user.birthYear}</li>
            <li>Eye Color: {user.eyeColor}</li>
          </ul>
        </Col>
      </Row>
    );
  }
};

