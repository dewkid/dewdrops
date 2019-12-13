import React from 'react';
import PropTypes from 'prop-types';
import TextInput from '../common/TextInput';
import ImageDropZone from '../common/ImageDropZone';

const DewdropForm = ({
  dewdrop,
  onSave,
  onChange,
  onFilesDrop,
  saving = false,
  errors = {}
}) => {
  return (
    <form onSubmit={onSave}>
      <h2>{dewdrop.id ? 'Edit' : 'Add'} Dewdrop</h2>
      {errors.onSave && (
        <div className='alert alert-danger' role='alert'>
          {errors.onSave}
        </div>
      )}

      <div className='row'>
        <div className='col-md-4'>
          <ImageDropZone
            name='image'
            label='Image'
            onFilesDrop={onFilesDrop}
            error={errors.image}
          />
        </div>
      </div>
      <div className='row'>
        <div className='col-md-8'>
          <TextInput
            name='caption'
            label='Caption'
            value={dewdrop.caption}
            onChange={onChange}
            error={errors.caption}
          />
        </div>
      </div>

      <button type='submit' disabled={saving} className='btn btn-primary'>
        {saving ? 'Saving...' : 'Save'}
      </button>
    </form>
  );
};

DewdropForm.propTypes = {
  dewdrop: PropTypes.object.isRequired,
  errors: PropTypes.object,
  onSave: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  onFilesDrop: PropTypes.func.isRequired,
  saving: PropTypes.bool
};

export default DewdropForm;
