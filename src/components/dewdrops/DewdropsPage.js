import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import * as dewdropActions from '../../redux/actions/dewdropActions';
import * as userActions from '../../redux/actions/userActions';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import DewdropList from './DewdropList';
import { Redirect } from 'react-router-dom';
import Spinner from '../common/Spinner';

export function DewdropsPage({
  dewdrops,
  users,
  currentUser,
  actions,
  loading
}) {
  const [redirect, setRedirect] = useState(false);
  const [dewdropsLoaded, setDewdropsLoaded] = useState(false);

  useEffect(() => {
    if (!dewdropsLoaded) {
      actions
        .loadDewdrops()
        .then(() => setDewdropsLoaded(true))
        .catch(error => {
          alert('Loading dewdrops failed' + error);
        });
    }

    if (users.length === 0) {
      actions.loadUsers().catch(error => {
        alert('Loading users failed' + error);
      });
    }
  }, []);

  return (
    <>
      <div className='row'>
        {redirect && <Redirect to='/dewdropedit' />}
        <div className='col-md-8'>
          <h2 style={{ margin: 20 }}>Welcome!</h2>
        </div>
        <div className='col-md-4'>
          {currentUser && currentUser.loggedIn ? (
            <button
              style={{ margin: 20, float: 'right' }}
              className='btn btn-primary'
              onClick={() => setRedirect(true)}
            >
              Add Dewdrop
            </button>
          ) : (
            ''
          )}
        </div>
      </div>
      {loading ? <Spinner /> : <DewdropList dewdrops={dewdrops} />}
    </>
  );
}

DewdropsPage.propTypes = {
  dewdrops: PropTypes.array.isRequired,
  users: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
  actions: PropTypes.object.isRequired,
  currentUser: PropTypes.object
};

function mapStateToProps(state) {
  // be specific which data is exposed, because react will re-render all data it sees here
  return {
    dewdrops:
      state.users.length === 0
        ? []
        : state.dewdrops.map(dewdrop => {
            return {
              ...dewdrop,
              userName: state.users.find(a => a.id === dewdrop.userid).name
            };
          }),
    currentUser: state.currentUser,
    users: state.users,
    loading: state.apiCallsInProgress > 0
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      loadDewdrops: bindActionCreators(dewdropActions.loadDewdrops, dispatch),
      loadUsers: bindActionCreators(userActions.loadUsers, dispatch)
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(DewdropsPage);
