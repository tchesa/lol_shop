import React from 'react';
import classes from './ListItems.module.css';

const listItems = props => {
  console.log(props.items)
  return (<ol className={classes.ListItems}>
    {props.items.map((item, index) => <li key={item.id}>
      <img alt={item.name} src={`https://ddragon.leagueoflegends.com/cdn/9.21.1/img/item/${item.id}.png`}/>
      <span className={classes.Name}>{item.name}</span>
      {/*<span className={classes.Price}>{item.gold.total}</span>*/}
      <span className={classes.Price}>{index}</span>
    </li>)}
  </ol>);
}

export default listItems;