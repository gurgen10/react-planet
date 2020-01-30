import React, { Component } from 'react';
import { Row, Col, Spinner } from 'react-bootstrap';

import ErrorIndicator from '../ErrorIndicator';

import SwapiService from '../../services/SwapiService';

import './RandomPlanet.css';

class RandomPlanet extends Component{

  swapi = new SwapiService();

  state = {
    planet: {
      id: null,
      name: null,
      population: null,
      rotationPereiud: null,
      diameter: null,
    },
    loading: true,
    error: {
      type: false,
      message: null
    }
  }

  constructor() {
    super();
    
  }
  componentDidMount() {
    this.getPlanetData();
    this.intervalId = setInterval(this.getPlanetData, 2500);
  }
  componentWillUnmount() {
    clearInterval(this.intervalId);
  }

  onLoadPlanet = (planet) => {
    this.setState({
      planet,
      loading: false
    });
  }

  catchError = (err) => {
    this.setState({
      error: {
        type: true,
        message: err.message
      },
      loading: false
    });
  };

  getPlanetData = async () => {
    try {
      const id = Math.floor(Math.random() * 22 + 2);
      const data = await this.swapi.getPlanet(id);
  
      this.onLoadPlanet(data);
    } catch (e) {
      this.catchError(e);
    }
  }
  
  render () {
    const  {
      planet,
      loading,
      error
    } = this.state;

    const errBlock = error.type ? <ErrorIndicator errMessage={error.message} />: null;
    const content = !loading && !error.type ? <RandomPlanetScreen planet={planet} />: null;
    const spinner = loading ? <Spinner animation="border" variant="warning" />: null;

    return (
      <Row className="random-planet">
        { errBlock }
        { content }
        { spinner }
      </Row>
    );
  }
};

const RandomPlanetScreen = ({ planet }) => {
  const {
    id,
    name,
    population,
    rotationPereiud,
    diameter,
  } = planet;

  return (
    <>
      <Col md="3">
        <img src={`https://starwars-visualguide.com/assets/img/planets/${id}.jpg`} alt="" className="w-100" />
      </Col>

      <Col md="9">
        <h2>{name}</h2>
        <ul>
          <li>Population: {population}</li>
          <li>Rotation Pereiud: {rotationPereiud}</li>
          <li>Diameter: {diameter}</li>
        </ul>
      </Col>
    </>
  );
};

export default RandomPlanet;
