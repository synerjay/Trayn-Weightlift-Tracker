import React from 'react';

function Detail({ album, artists, name }) {
  return (
    <div className='flex flex-col gap-y-3 items-center'>
      <img className='h-48 w-48 ' src={album.images[0].url} alt={name} />
      <label htmlFor={name}>{name}</label>
      <label htmlFor={artists[0].name}>{artists[0].name}</label>
    </div>
  );
}

export default Detail;
