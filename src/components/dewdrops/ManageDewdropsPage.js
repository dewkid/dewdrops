import React, { useState } from 'react';
import { connect } from 'react-redux';
import * as dewdropActions from '../../redux/actions/dewdropActions';
import * as fileActions from '../../redux/actions/fileActions';
import { bindActionCreators } from 'redux';
import DewdropForm from './DewdropForm';
import PropTypes from 'prop-types';
import { newDewdrop } from '../../../tools/mockData';
import { toast } from 'react-toastify';

export function ManageDewdropsPage({
  currentUser,
  actions,
  history,
  ...props // the rest of the props
}) {
  const [dewdrop, setDewdrop] = useState({ ...props.dewdrop });
  const [imageFile, setImageFile] = useState({});
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;
    setDewdrop(prevDewdrop => ({ ...prevDewdrop, [name]: value }));
  }

  function formIsValid() {
    const { caption } = dewdrop;
    const errors = {};

    if (!caption) errors.caption = 'Caption is required.';
    if (Object.keys(imageFile).length == 0) errors.image = 'Image is required.';

    setErrors(errors);
    // Form is valid if the errors object has no props
    return Object.keys(errors).length == 0;
  }

  function handleSave(event) {
    event.preventDefault();
    if (!formIsValid()) return;
    dewdrop.userid = currentUser.id;
    setSaving(true);

    actions
      .saveFile(imageFile)
      .then(() => {
        dewdrop.imageName = imageFile.uuid;
        actions
          .saveDewdrop(dewdrop)
          .then(() => {
            toast.success('Dewdrop saved.');
            history.push('/');
          })
          .catch(error => {
            setSaving(false);
            setErrors({ onSave: error.message });
          });
      })
      .catch(error => {
        setSaving(false);
        setErrors({ onSave: error.message });
      });
  }

  function handleFiles(acceptedFiles) {
    console.log('page files:' + acceptedFiles);
    if (acceptedFiles.length > 0) {
      const firstFile = acceptedFiles[0];
      setImageFile(firstFile);
    }
  }

  return currentUser && currentUser.loggedIn ? (
    <DewdropForm
      dewdrop={dewdrop}
      errors={errors}
      onChange={handleChange}
      onSave={handleSave}
      onFilesDrop={handleFiles}
      saving={saving}
    />
  ) : (
    <div className='alert alert-danger' role='alert'>
      Must be logged in to create new dewdrop.
    </div>
  );
}

ManageDewdropsPage.propTypes = {
  dewdrop: PropTypes.object.isRequired,
  currentUser: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    dewdrop: newDewdrop,
    users: state.users,
    currentUser: state.currentUser
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      saveDewdrop: bindActionCreators(dewdropActions.saveDewdrop, dispatch),
      saveFile: bindActionCreators(fileActions.saveFile, dispatch)
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageDewdropsPage);
