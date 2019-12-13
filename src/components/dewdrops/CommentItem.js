import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

function LongAgo(value) {
  return moment(value).from(moment());
}

const CommentItem = ({ comment }) => (
  <>
    <div className='alert alert-dark' role='alert'>
      <div className='row'>
        <div className='col-md-9'>
          <b>{comment.userName}</b> {comment.commentText}
        </div>
        <div className='col-md-3 text-right'>
          <h6>
            <small>{LongAgo(comment.createdAt)}</small>
          </h6>
        </div>
      </div>
    </div>
  </>
);

CommentItem.propTypes = {
  comment: PropTypes.object.isRequired
};

export default CommentItem;
