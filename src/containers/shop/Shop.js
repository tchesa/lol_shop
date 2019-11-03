import React from 'react';
import axios from '../../axios';

import classes from './shop.module.css';
import Filter from '../../components/filter/Filter';
import ListItems from '../../components/list-items/ListItems';

class Shop extends React.Component {
  state = {
    items: [],
    filterTree: [],
  }

  componentDidMount() {
    axios.get('item.json').then(response => {
      console.log(response.data);
      this.setState({
        items: Object.keys(response.data.data).map(key => ({
          ...response.data.data[key],
          id: key,
        })).sort((a, b) => a.gold.total < b.gold.total ? -1 : 1),
        filterTree: response.data.tree,
      });
    }).catch(error => {
      console.error(error);
    });
  }

  render() {
    return (<div className={classes.Shop}>
      <div className={classes.SearchContainer}>
        <input type="text" placeholder="[Ctrl][L] or [Ctrl][Rtn] to search"/>
      </div>
      <div className={classes.FilterContainer}>
        <Filter tree={this.state.filterTree}/>
      </div>
      <div className={classes.ListContainer}>
        <ListItems items={this.state.items}/>
      </div>
    </div>);
  }
}

export default Shop;