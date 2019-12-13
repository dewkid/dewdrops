import React from 'react';
import PropTypes from 'prop-types';
import DewdropItem from './DewdropItem';

function mostRecentFirst(a, b) {
  return b.id - a.id;
}

const DewdropList = ({ dewdrops }) => (
  <div className='row'>
    {dewdrops.sort(mostRecentFirst).map(dewdrop => (
      <div key={dewdrop.id} className='col-md-3'>
        <DewdropItem dewdrop={dewdrop} />
      </div>
    ))}
  </div>
);

DewdropList.propTypes = {
  dewdrops: PropTypes.array.isRequired
};

export default DewdropList;
