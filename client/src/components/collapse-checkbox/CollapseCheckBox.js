import React, { Component } from 'react'

// Icon
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import faAngleDown from '@fortawesome/fontawesome-free-solid/faAngleDown';
import faAngleUp from '@fortawesome/fontawesome-free-solid/faAngleUp';

// Material UI
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import CheckBox from '@material-ui/core/Checkbox';
import Collapse from '@material-ui/core/Collapse';


class CollapseCheckBox extends Component {

  constructor(props) {
    super(props);
    this.state = {
      open: false,
      checked: [],
    };
  }

  componentDidMount() {
    if (this.props.initState) {
      this.setState({
        open: this.props.initState,
      })
    }
  }

  handleClickAngle = () => {
    this.setState({ open: !this.state.open });
  }

  handleAngle = () => {
    return (
      this.state.open ?
        <FontAwesomeIcon
          icon={faAngleUp}
        />
        :
        <FontAwesomeIcon
          icon={faAngleDown}
        />
    )
  }

  handleToggle = value => () => {
    const { checked } = this.state;
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    this.setState(
      { checked: newChecked },
      () => this.props.handleFilters(newChecked)
    );
  }

  renderListBrands = () => (
    this.props.list.map(value => (
      <ListItem key={value._id} style={{ padding: '10px 0' }}>
        <ListItemText primary={value.name} />
        <ListItemSecondaryAction>
          <CheckBox
            color='primary'
            onChange={this.handleToggle(value._id)}
            checked={this.state.checked.indexOf(value._id) !== -1}
          />
        </ListItemSecondaryAction>
      </ListItem>
    ))
  );

  render() {

    return (
      <div>
        <List>
          <ListItem onClick={this.handleClickAngle} style={{ padding: '10px 23px 10px 0' }}>
            <ListItemText
              primary={this.props.title}
            />
            {this.handleAngle()}
          </ListItem>
          <Collapse
            in={this.state.open}
            timeout='auto'
            unmountOnExit
          >
            <List component='div' disablePadding >
              {this.renderListBrands()}
            </List>
          </Collapse>
        </List>
      </div>
    )
  }
}


export default CollapseCheckBox;