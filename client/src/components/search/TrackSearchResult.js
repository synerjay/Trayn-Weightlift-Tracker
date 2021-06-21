import React from 'react';

function TrackSearchResult({ track }) {
  return (
    <div className='flex items-center'>
      <img src={track.albumUrl} className='h-16 w-16' />
      <div className='ml-3'>
        <div>{track.title}</div>
        <div className='font-bold'>{track.artist}</div>
      </div>
    </div>
  );
}

export default TrackSearchResult;
