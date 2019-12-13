import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { newComment } from '../../../tools/mockData';
import * as currentDewdropActions from '../../redux/actions/currentDewdropActions';
import * as commentActions from '../../redux/actions/commentActions';
import * as userActions from '../../redux/actions/userActions';
import getImagePath from '../common/componentUtils';
import CommentForm from './CommentForm';
import CommentItem from './CommentItem';

export function ViewDewdropPage({
  currentDewdrop,
  comments,
  users,
  currentUser,
  actions,
  history,
  ...props // the rest of the props
}) {
  const [pendingComment, setPendingComment] = useState({ ...newComment });
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);
  const [dewdropLoaded, setDewdropLoaded] = useState(false);
  const [commentsLoaded, setCommentsLoaded] = useState(false);

  useEffect(() => {
    if (!dewdropLoaded) {
      actions
        .loadCurrentDewdrop(props.match.params.id)
        .then(() => {
          setDewdropLoaded(true);
        })
        .catch(error => {
          setDewdropLoaded(true);
          alert('Loading current dewdrop failed' + error);
        });
    }

    if (dewdropLoaded && !commentsLoaded) {
      actions
        .loadCommentsFor(currentDewdrop.id)
        .then(() => {
          setCommentsLoaded(true);
        })
        .catch(error => {
          setCommentsLoaded(true);
          alert('Loading comments failed' + error);
        });
    }

    if (users.length === 0) {
      actions.loadUsers().catch(error => {
        alert('Loading users failed' + error);
      });
    }
  });

  function handleChange(event) {
    const { name, value } = event.target;
    setPendingComment(prevComment => ({ ...prevComment, [name]: value }));
  }

  function formIsValid() {
    const { commentText } = pendingComment;
    const errors = {};

    if (!commentText) errors.commentText = 'Comment is required.';

    setErrors(errors);
    // Form is valid if the errors object has no props
    return Object.keys(errors).length == 0;
  }

  function handleSave(event) {
    event.preventDefault();
    if (!formIsValid()) return;
    setSaving(true);
    setCommentsLoaded(false);

    pendingComment.dewdropid = currentDewdrop.id;
    pendingComment.userid = currentUser.id;
    pendingComment.userName = currentUser.name;

    actions
      .saveComment(pendingComment)
      .then(() => {
        setPendingComment({ ...newComment });
        setSaving(false);
      })
      .catch(error => {
        setSaving(false);
        setErrors({ onSave: error.message });
      });
  }

  function changeDewdrop(dewdropid) {
    setDewdropLoaded(false);
    setCommentsLoaded(false);
    history.push('/dewdrop/' + dewdropid);
  }

  return (
    <div>
      <div className='row'>
        <div className='col-md-8'>
          <i>{currentDewdrop.userName} said,</i>
        </div>
        <div className='col-md-2'>
          {currentDewdrop.previd > 0 ? (
            <button
              className='btn btn-link'
              onClick={() => changeDewdrop(currentDewdrop.previd)}
            >
              Previous
            </button>
          ) : (
            ''
          )}
        </div>
        <div className='col-md-2'>
          {currentDewdrop.nextid > 0 ? (
            <button
              className='btn btn-link'
              onClick={() => changeDewdrop(currentDewdrop.nextid)}
            >
              Next
            </button>
          ) : (
            ''
          )}
        </div>
      </div>
      <h1>{currentDewdrop.caption}</h1>

      <img
        className='img-fluid rounded-lg'
        style={{
          display: 'block',
          marginLeft: 'auto',
          marginRight: 'auto',
          marginTop: '10',
          marginBottom: '10',
          overflow: 'hidden',
          textAlign: 'center'
        }}
        src={getImagePath(currentDewdrop)}
        alt={currentDewdrop.imageName}
      />
      <b>{comments.length} Comments:</b>
      {currentUser.loggedIn ? (
        <CommentForm
          comment={pendingComment}
          placeholder='New Comment'
          onChange={handleChange}
          onSave={handleSave}
          saving={saving}
          errors={errors}
        />
      ) : (
        <div>
          <i>Login to add comments!</i>
        </div>
      )}
      {commentsLoaded
        ? comments.map(comment => (
            <CommentItem key={comment.id} comment={comment} />
          ))
        : 'loading comments...'}
    </div>
  );
}

ViewDewdropPage.propTypes = {
  currentDewdrop: PropTypes.object.isRequired,
  comments: PropTypes.array.isRequired,
  users: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  currentUser: PropTypes.object,
  match: PropTypes.object.isRequired
};

function getUserNameById(users, id) {
  const user = users.find(user => user.id == id) || { name: '' };
  return user.name;
}

function mapStateToProps(state) {
  return {
    comments:
      state.users.length === 0 || state.comments.length === 0
        ? []
        : state.comments.map(comment => {
            return {
              ...comment,
              userName: getUserNameById(state.users, comment.userid)
            };
          }),
    users: state.users,
    currentDewdrop:
      state.users.length === 0 || !state.currentDewdrop.id
        ? state.currentDewdrop
        : {
            ...state.currentDewdrop,
            userName: getUserNameById(state.users, state.currentDewdrop.id)
          },

    currentUser: state.currentUser
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      loadCurrentDewdrop: bindActionCreators(
        currentDewdropActions.loadCurrentDewdrop,
        dispatch
      ),
      loadComments: bindActionCreators(commentActions.loadComments, dispatch),
      loadCommentsFor: bindActionCreators(
        commentActions.loadCommentsFor,
        dispatch
      ),
      saveComment: bindActionCreators(commentActions.saveComment, dispatch),
      loadUsers: bindActionCreators(userActions.loadUsers, dispatch)
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ViewDewdropPage);
