import React, { useState, useCallback, useMemo } from 'react';
import { useDropzone } from 'react-dropzone';
import PropTypes from 'prop-types';

const baseStyle = {
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '20px',
  height: '200px',
  borderWidth: 2,
  borderRadius: 2,
  borderColor: '#eeeeee',
  borderStyle: 'dashed',
  backgroundColor: '#fafafa',
  color: '#bdbdbd',
  outline: 'none',
  transition: 'border .24s ease-in-out'
};

const activeStyle = {
  borderColor: '#2196f3'
};

const acceptStyle = {
  borderColor: '#00e676'
};

const rejectStyle = {
  borderColor: '#ff1744'
};

function ImageDropzone({ onFilesDrop, name, label, error }) {
  const [file, setFile] = useState({});
  const onDrop = useCallback(acceptedFiles => {
    previewDrop(acceptedFiles);
    onFilesDrop(acceptedFiles);
  }, []);
  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject
  } = useDropzone({
    onDrop,
    multiple: false,
    accept: 'image/*',
    autoProcessQueue: false
  });

  function previewDrop(acceptedFiles) {
    if (acceptedFiles.length > 0) {
      let firstFile = acceptedFiles[0];
      firstFile.preview = URL.createObjectURL(firstFile);
      setFile(firstFile);
      console.log('name:' + firstFile.name + ' preview:' + firstFile.preview);
    }
  }

  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isDragActive ? activeStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {})
    }),
    [isDragActive, isDragReject]
  );

  return (
    <div>
      <label
        htmlFor={name}
        style={{ marginTop: 20, fontSize: 18, fontWeight: 'bold' }}
      >
        {label}
      </label>
      <div {...getRootProps({ style })}>
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop the photo here ...</p>
        ) : (
          <p>Drag-n-drop photo here, or click to select photo</p>
        )}
        {file.preview ? (
          <img
            alt='Preview'
            key={file.preview}
            src={file.preview}
            style={{ display: 'inline', width: 'auto', height: '100px' }}
          />
        ) : (
          <div />
        )}
      </div>
      {error && <div className='alert alert-danger'>{error}</div>}
    </div>
  );
}
ImageDropzone.propTypes = {
  onFilesDrop: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  error: PropTypes.string
};
export default ImageDropzone;
