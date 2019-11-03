import React from 'react';

import classes from './Filter.module.css';

const filter = props => {
  return (<ul>
    {props.tree.map(node => <li key={node.header}>
      <span className={classes.Header}>{node.header}</span>
      <ul className={classes.Tags}>
        {node.tags.map(tag => <li key={tag.name}>
          <span className="name">{tag.name}</span>
          <input type="checkbox" name="filter" value={tag.name} checked={tag.checked} onChange={event => props.checkTagHandler(tag.name)}/>
        </li>)}
      </ul>
    </li>)}
  </ul>)
};

export default filter;