import React, { Component } from 'react';
import { ListGroup, Spinner } from 'react-bootstrap';
import SwapiService from '../../services/SwapiService';
import './ListItem.css';

export default class ListItem extends Component {
  swapi = new SwapiService();
  state= {
    items: null,
    loading: false
  }
  componentDidMount() {
    this.getUsers();

  }
  getUsers = async () => {
    try {
      const items = await this.swapi.getUsers();
      this.setState({items});
  
    } catch (e) {
      this.catchError(e);
    }
  }
  componentDidCatch() {
    return (<h1>Error!!!!!!</h1>)
  }

  render() {
    const { items } = this.state;
    const { onClickItem } = this.props;
    
    if(!items) return <Spinner  animation="border" variant="warning"/>
   
    const users = items.map((item, index) => {
      return (
        <ListGroup.Item onClick={()=> onClickItem(item.id)} variant="dark" action key={item.id}>
           {item.name}
          </ListGroup.Item>
      )
    })
      return (
        <ListGroup>
         { users }
        </ListGroup>
      );
  }
};
