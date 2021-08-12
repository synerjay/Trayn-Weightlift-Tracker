import React from 'react';

const SetProfile = ({ set: { weight, reps }, index }) => {
  return (
    <>
      <tr key={index}>
        <td>{index + 1}</td>
        <td />
        <td />
        <td />
        <td>
          {weight} kg x {reps}
        </td>
      </tr>
    </>
  );
};

export default SetProfile;
