import React from 'react';
// import axios from '../../axios';

import classes from './shop.module.css';
import Filter from '../../components/filter/Filter';
import ListItems from '../../components/list-items/ListItems';

class Shop extends React.Component {
  state = {
    items: [],
    filterTree: [],
    checkedTags: [],
  }

  componentDidMount() {
    // axios.get('item.json').then(response => {
    fetch('item.json').then(response => response.json()).then(response => ({ data: response })).then(response => {
      console.log(response.data);
      this.setState({
        items: Object.keys(response.data.data).map(key => ({
          ...response.data.data[key],
          id: key,
        })).filter(item => {
          const notInStore = item.hasOwnProperty('inStore') && !item.inStore;
          // const hideFromAll = item.hasOwnProperty('hideFromAll') && item.hideFromAll;
          const championRequired = item.hasOwnProperty('requiredChampion');
          const allyRequired = item.hasOwnProperty('requiredAlly');
          const onMap = item.maps[11];
          return !(notInStore || championRequired || allyRequired || !onMap);
        }).sort((a, b) => a.gold.total < b.gold.total ? -1 : 1),
        filterTree: Object.keys(response.data.tree).map(key => ({
          header: response.data.tree[key].header,
          tags: response.data.tree[key].tags.map(tag => ({
            name: tag,
            checked: false,
          })),
        })),
      });
    }).catch(error => {
      console.error(error);
    });
  }

  checkTagHandler = tagName => {
    let node, tag;
    let found = false;

    for (node = 0; !found && node < this.state.filterTree.length; node++) {
      for (tag = 0; !found && tag < this.state.filterTree[node].tags.length; tag++) {
        if (this.state.filterTree[node].tags[tag].name === tagName) {
          found = true;
          node--;
          tag--;
        }
      }
    }

    const filterTree = [ ...this.state.filterTree ];
    filterTree[node].tags[tag].checked = !filterTree[node].tags[tag].checked;

    let checkedTags = [ ...this.state.checkedTags ];
    if (filterTree[node].tags[tag].checked) checkedTags.push(tagName);
    else checkedTags = checkedTags.filter(tag => tag !== tagName);

    this.setState({ filterTree, checkedTags });
  }

  render() {
    return (<div className={classes.Shop}>
      <div className={classes.SearchContainer}>
        <input type="text" placeholder="[Ctrl][L] or [Ctrl][Rtn] to search"/>
      </div>
      <div className={classes.FilterContainer}>
        <Filter tree={this.state.filterTree} checkTagHandler={this.checkTagHandler}/>
      </div>
      <div className={classes.ListContainer}>
        <ListItems items={this.state.items.filter(item => {
          if (this.state.checkedTags.length === 0) return true;
          else return this.state.checkedTags.every(tag => item.tags.map(itemTag => itemTag.toLowerCase()).indexOf(tag.toLowerCase()) !== -1)
        })}/>
      </div>
    </div>);
  }
}

export default Shop;