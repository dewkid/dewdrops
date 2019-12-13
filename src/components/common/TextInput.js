import React from 'react';
import PropTypes from 'prop-types';

const TextInput = ({ name, label, onChange, placeholder, value, error }) => {
  let wrapperClass = 'form-group';
  if (error && error.length > 0) {
    wrapperClass += ' ' + 'has-error';
  }

  return (
    <div className={wrapperClass}>
      {label ? (
        <label
          htmlFor={name}
          style={{ marginTop: 20, fontSize: 18, fontWeight: 'bold' }}
        >
          {label}
        </label>
      ) : (
        ''
      )}
      <div className='field'>
        <input
          type='text'
          name={name}
          className='form-control'
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
        {error && <div className='alert alert-danger'>{error}</div>}
      </div>
    </div>
  );
};

TextInput.propTypes = {
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  error: PropTypes.string
};

export default TextInput;
