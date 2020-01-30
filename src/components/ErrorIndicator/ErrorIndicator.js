import React from 'react';
import { Alert } from 'react-bootstrap';

import './ErrorIndicator.css';
import icon from './test.png';

const ErrorIndicator = ({ errMessage }) => {
  return (
    <Alert variant="warning">
      <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
      <img src={icon} alt="" />
      <p>{ errMessage }</p>
    </Alert>
  )
};

export default ErrorIndicator;