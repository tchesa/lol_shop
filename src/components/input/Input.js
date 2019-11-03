import React from 'react';
import classes from './Input.module.css';

const input = props => {
  return (<input type={props.type} value={props.value} onChange={event => props.onChange(event)} placeholder={props.placeholder} className={classes.Input}/>);
}

export default input;