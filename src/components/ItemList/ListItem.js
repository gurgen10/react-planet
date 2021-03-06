import React, { Component } from 'react';
import { ListGroup, Spinner } from 'react-bootstrap';
import SwapiService from '../../services/SwapiService';
import './ListItem.css';

export default class ListItem extends Component {
  swapi = new SwapiService();
  state= {
    items: null,
    loading: false,
    activeId: '1'
  }
  
  componentDidMount() {
    this.getUsers();
  }

  onClickItemData = (id) => {
    this.setState({ activeId: id })
    this.props.getActiveId(id)
  }

  getUsers = async () => {
    try {
      const items = await this.swapi.getUsers();
      this.setState({items});
      if(items[0].id) this.props.getActiveId(items[0].id)
  
    } catch (e) {
     console.log(e);
     
    }
  }

  componentDidCatch() {
    return (<h1>Error!!!!!!</h1>)
  }

  render() {
    const { items, activeId } = this.state;
   
    if(!items) return <Spinner  animation="border" variant="warning"/>
    const users = items.map((item, index) => {
      return (
        <ListGroup.Item onClick={()=> this.onClickItemData(item.id)} variant="dark" action active={activeId === item.id} key={item.id}>
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
