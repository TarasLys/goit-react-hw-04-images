import React from 'react';
import css from './Button.module.css';

export const Button = ({ onClick }) => {
  const handleChange = event => {
    onClick(event.target.value);
  };

  return (
    <div className={css.general}>
      <button className={css.button} onClick={handleChange} type="submit">
        Load more
      </button>
    </div>
  );
};
