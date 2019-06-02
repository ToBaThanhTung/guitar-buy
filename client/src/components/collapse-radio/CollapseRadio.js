import React, { Component } from 'react'
// Icon
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import faAngleDown from '@fortawesome/fontawesome-free-solid/faAngleDown';
import faAngleUp from '@fortawesome/fontawesome-free-solid/faAngleUp';

// Material UI
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';


class CollapseRadio extends Component {

  constructor(props) {
    super(props);
    this.state = {
      open: false,
      value: '0',
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

  handleChange = (e) => {
    this.props.handleFilters(e.target.value);
    this.setState({ value: e.target.value })
  }

  renderList = () => (
    this.props.list.map(value => (
      <FormControlLabel
        key={value._id}
        value={`${value._id}`}
        control={<Radio />}
        label={value.name}
      />
    ))

  )
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
              <RadioGroup
                aria-label='prices'
                name='prices'
                value={this.state.value}
                onChange={this.handleChange}
              >
                {this.renderList()}
              </RadioGroup>
            </List>
          </Collapse>
        </List>
      </div>
    )
  }
}

export default CollapseRadio;