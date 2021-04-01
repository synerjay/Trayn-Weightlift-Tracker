import React from 'react';
import PropTypes from 'prop-types';
// import formatDate from '../../utils/formatDate';
import { format } from 'date-fns';

const ProfileExperience = ({
  experience: { company, title, location, to, from, description },
}) => {
  return (
    <div>
      <h3 className='text-dark'>{company}</h3>
      <p>
        {format(new Date(from), 'MMMM do Y')} -{' '}
        {to ? format(new Date(to), 'MMMM do Y') : 'Current'}
      </p>
      <p>
        <strong>Position: </strong>
        {title}
      </p>
      <p>
        <strong>Location: </strong> {location}
      </p>
      <p>
        <strong>Description: </strong>
        {description}
      </p>
    </div>
  );
};

ProfileExperience.propTypes = {
  experience: PropTypes.object.isRequired,
};

export default ProfileExperience;
