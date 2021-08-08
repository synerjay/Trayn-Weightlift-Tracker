import React from 'react';
import SetProfile from './SetProfile';

const ExerciseProfile = ({ exercise: { name, sets } }) => {
  return (
    <div className='bg-white mb-5 w-full  p-8 rounded-lg shadow-lg relative hover:shadow-2xl transition duration-500'>
      <h1 className='text-2xl text-gray-800 font-semibold mb-3'>{name}</h1>

      <table className='table w-full'>
        <thead>
          <tr>
            <th className='md:w-2 w-2 text-center'>Set</th>
            <th className='md:w-32 w-36  text-center'>Weight x Reps</th>
          </tr>
        </thead>

        <tbody>
          {sets.map((set, index) => (
            <SetProfile key={index} set={set} index={index} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ExerciseProfile;