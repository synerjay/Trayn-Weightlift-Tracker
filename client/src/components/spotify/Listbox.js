import React from 'react';

function Listbox(props) {
  const clicked = (e) => {
    e.preventDefault();
    props.clicked(e.target.id);
  };
  return (
    <div className='flex flex-col gap-y-5'>
      {props.items.map((item, idx) => (
        <button key={idx} onClick={clicked} id={item.track.id}>
          {item.track.name}
        </button>
      ))}
    </div>
  );
}

export default Listbox;
