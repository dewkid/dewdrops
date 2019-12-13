import React from 'react';
import PropTypes from 'prop-types';
import TextInput from '../common/TextInput';

const CommentForm = ({
  comment,
  placeholder,
  onSave,
  onChange,
  saving = false,
  errors = {}
}) => {
  return (
    <form onSubmit={onSave} style={{ marginTop: 20, marginBottom: 20 }}>
      {errors.onSave && (
        <div className='alert alert-danger' role='alert'>
          {errors.onSave}
        </div>
      )}
      <div className='row'>
        <div className='col-md-10'>
          <TextInput
            name='commentText'
            noLabel
            placeholder={placeholder}
            value={comment.commentText}
            onChange={onChange}
            error={errors.commentText}
          />
        </div>
        <div className='col-md-2'>
          <button type='submit' disabled={saving} className='btn btn-primary'>
            Add
          </button>
        </div>
      </div>
    </form>
  );
};

CommentForm.propTypes = {
  comment: PropTypes.object.isRequired,
  placeholder: PropTypes.string.isRequired,
  errors: PropTypes.object,
  onSave: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  saving: PropTypes.bool
};

export default CommentForm;
