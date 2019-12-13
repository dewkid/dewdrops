import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import getImagePath from '../common/componentUtils';

const DewdropItem = ({ dewdrop }) => (
  <div className='card' style={{ marginBottom: '20px', padding: '10px' }}>
    <div className='card-body'>
      <Link to={'/dewdrop/' + dewdrop.id}>
        <img
          className='img-fluid rounded-lg'
          style={{
            display: 'block',
            marginLeft: 'auto',
            marginRight: 'auto',
            marginTop: '10',
            marginBottom: '10',
            width: 'auto',
            height: '100px',
            overflow: 'hidden',
            textAlign: 'center'
          }}
          src={getImagePath(dewdrop)}
          alt={dewdrop.imageName}
        />
      </Link>
    </div>
    <div className='card-footer'>
      <h5 className='card-title'>{dewdrop.caption}</h5>
      <i className='card-text'>{dewdrop.userName}</i>
    </div>
  </div>
);

DewdropItem.propTypes = {
  dewdrop: PropTypes.object.isRequired
};

export default DewdropItem;
