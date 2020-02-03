import React, { Component } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';

import './App.css';

import Header from '../Header';
import RandomPlanet from '../RandomPlanet';
import ListItem from '../ItemList';
import PersonDetail from '../PersonDetail';

class App extends Component{

  state = {
    toggleRandomPlanet: false,
    itemId: null
  }
  onClickItem = (id) => {
    console.log(id);
    
    this.setState({itemId: id})

  }

  onTogglePlanet = () => {
    this.setState(({ toggleRandomPlanet }) => {
      return {
        toggleRandomPlanet: !toggleRandomPlanet
      }
    });
  }
  
  render () {
    const {
      toggleRandomPlanet,
      itemId
    } = this.state;

    const randomPlanet = !toggleRandomPlanet? <RandomPlanet />: null;

    return (
      <Container fluid>
        <Header />
        { randomPlanet }
        <Button variant="warning" onClick={ this.onTogglePlanet }>Toggle Random Planet</Button>
  
        <Row className="main-container">
          <Col md="3">
            <ListItem onClickItem={this.onClickItem} itemId={itemId}/>
          </Col>
  
          <Col md="9">
            <PersonDetail itemId={itemId} />
          </Col>
        </Row>
      </Container>
    );
  }
};

export default App;
