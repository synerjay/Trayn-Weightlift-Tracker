import React, { useState, useEffect } from 'react';

const Editable = ({
  text,
  type,
  placeholder,
  children,
  childRef,
  smallLetters,
  ...props
}) => {
  const [isEditing, setEditing] = useState(false);

  useEffect(() => {
    if (childRef && childRef.current && isEditing === true) {
      childRef.current.focus();
    }
  }, [isEditing, childRef]);

  const handleKeyDown = (event, type) => {
    const { key } = event;
    const keys = ['Escape', 'Tab'];
    const enterKey = 'Enter';
    const allKeys = [...keys, enterKey];
    if (
      (type === 'textarea' && keys.indexOf(key) > -1) ||
      (type !== 'textarea' && allKeys.indexOf(key) > -1)
    ) {
      setEditing(false);
    }
  };

  return (
    <section {...props}>
      {isEditing ? (
        <div
          onBlur={() => setEditing(false)}
          onKeyDown={(e) => handleKeyDown(e, type)}
        >
          {children}
        </div>
      ) : (
        <div
          className={`flex items-center rounded p-1 -ml-4 text-gray-700 leading-tight whitespace-pre-wrap hover:shadow-outline editable-${type}`}
          onClick={() => setEditing(true)}
        >
          <span
            className={`${
              smallLetters
                ? 'text-2xl text-gray-800 font-semibold'
                : 'text-4xl font-semibold'
            } ${text ? 'text-black' : 'text-gray-500'}`}
          >
            {text || placeholder || 'Choose a name'}
          </span>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            onClick={() => setEditing(true)}
            className='ml-3 h-5 w-5 text-indigo-600 cursor-pointer'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z'
            />
          </svg>
        </div>
      )}
    </section>
  );
};

export default Editable;
