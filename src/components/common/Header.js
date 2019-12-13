import React, { useState, useEffect } from 'react';
import SelectInput from './SelectInput';
import { connect } from 'react-redux';
import * as userActions from '../../redux/actions/userActions';
import * as loginActions from '../../redux/actions/currentUserActions';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';

export function Header({ currentUser, users, actions }) {
  const navbarStyle = { background: '#bdffa9' };
  const [login, setLogin] = useState(currentUser);

  useEffect(() => {
    if (users.length === 0) {
      actions.loadUsers().catch(error => {
        alert('Loading users failed' + error);
      });
    }
  }, []);

  function handleChange(event) {
    var user = users.find(user => user.id == event.target.value);
    actions.loginUser(user);
    setLogin({ ...user, loggedIn: true });
  }

  function doLogout() {
    actions.logoutUser();
    setLogin({ loggedIn: false });
  }

  return (
    <nav className='navbar navbar-light' style={navbarStyle}>
      <a className='navbar-brand justify-content-start' href='/'>
        <img src='../../../assets/logo.png' height='50' alt='' />
      </a>

      <a className='nav-link active' href='/'>
        Home
      </a>
      <a className='nav-link' href='/about'>
        About
      </a>
      {login && login.loggedIn ? (
        <div className='row'>
          <div className='col'>
            <h5>{login.name}</h5>
          </div>
          <div className='col'>
            <button onClick={() => doLogout()}>Logout</button>
          </div>
        </div>
      ) : (
        <SelectInput
          name='userid'
          defaultOption={login.name || 'Select User'}
          options={users
            .sort((a, b) => a.name.localeCompare(b.name))
            .map(user => ({
              value: user.id,
              text: user.name
            }))}
          onChange={handleChange}
        />
      )}
    </nav>
  );
}

Header.propTypes = {
  users: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired,
  currentUser: PropTypes.object.isRequired,
  loginid: PropTypes.number
};

function mapStateToProps(state) {
  // be specific which data is exposed, because react will re-render all data it sees here
  return {
    currentUser: state.currentUser,
    users: state.users,
    loading: state.apiCallsInProgress > 0
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      loadUsers: bindActionCreators(userActions.loadUsers, dispatch),
      loginUser: bindActionCreators(loginActions.loginUser, dispatch),
      logoutUser: bindActionCreators(loginActions.logoutUser, dispatch)
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
