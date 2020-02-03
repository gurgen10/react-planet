import React, { Component } from 'react';
import { Row, Col, Spinner } from 'react-bootstrap';
import SwapiService from '../../services/SwapiService';

import './PersonDetail.css';

export default class PersonDetail extends Component {
  swapi = new SwapiService();

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
 
  getUserData = async (id) => {
    try {
      const user = await this.swapi.getUser(id );
      this.onLoadData(user)
    } catch (error) {
      this.setState({
        loading: false
      });
      throw new Error(error) 
    }
  }

  onLoadData = (user) => {
    this.setState({
      user,
      loading: false
    });
  }

  componentDidMount() {
    const { itemId } = this.props;
    if(itemId )this.getUserData(itemId);
  }

  componentDidUpdate(prevProps) {
    const { itemId } = this.props;
    if (itemId !== prevProps.itemId) {
      this.setState({
        loading: true
      });
      if(itemId) { 
        this.getUserData( itemId);
      }  
    }
  }

  render() {
    const  { user, loading }  = this.state;
    const  { itemId } = this.props;
    if(loading || !itemId) return <Spinner animation="border" variant="warning"/>

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

