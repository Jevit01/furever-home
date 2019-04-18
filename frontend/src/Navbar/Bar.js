import React from 'react';
import { NavLink } from 'react-router-dom';
import { Link as RouterLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { AppBar, Tabs, Tab, Typography, Paper } from '@material-ui/core';
import { MyContext } from '../provider/MyProvider';

import '../css/navbar.css';
let logo = require('../assets/logo.png');

function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
});

class Bar extends React.Component {
  state = {
    value: 2,
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { classes } = this.props;
    const { value } = this.state;

    return (



<MyContext.Consumer>
        {context => {
          return (
            <div className={classes.root}>
              <AppBar position="static">
                <Tabs
                  value={value}
                  onChange={this.handleChange}
                  className="navbar"
                >
                  <div className="logoContainer">
                    <NavLink to={'/'} className="logoLink">
                      <img src={logo} alt="" className="logo" />
                    </NavLink>
                  </div>

                  <div className="fureverHome">furever home</div>
                  <Tab
                    label="BREEDS"
                    style={{ color: '#001049' }}
                    className="iLinks"
                  />

                  <Tab
                    label="COMMUNITY"
                    style={{ color: '#001049' }}
                    className="iLinks"
                  />

                  {context.state.currentUser.username ? (
                    <div>
                      <NavLink to={'/profile'}>
                        {context.state.currentUser.username}
                      </NavLink>
                    </div>

                  ) : (

                    <div className='loginCont'>
                      <NavLink to={'/login'}>LOG IN / REGISTER</NavLink>
                    </div>
                  )}
                </Tabs>
              </AppBar>

              <div className="navlinks">
                <div className='dogs'>
                  {value === 2 && <TabContainer>DOGS</TabContainer>}
                </div>
                <div className='cats'>
                  {value === 2 && <TabContainer>CATS</TabContainer>}
                </div>
              </div>
              <div className="navlinks">
                <div className='subBar'>
                  {value === 3 && <TabContainer>DOG CARE</TabContainer>}
                  {value === 3 && <TabContainer>CAT CARE</TabContainer>}
                  {value === 3 && <TabContainer>SHELTERS & RESCUES</TabContainer>}
                </div>
              </div>
            </div>

          );
        }}
      </MyContext.Consumer>
    );
  }
}

Bar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Bar);
