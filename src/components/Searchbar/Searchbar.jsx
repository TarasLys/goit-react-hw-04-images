import React from 'react';
import css from './Searchbar.module.css';

const Searchbar = ({ onSubmit }) => {
  const handleSubmit = event => {
    event.preventDefault();

    onSubmit(event.target.elements.searchPost.value);
    event.currentTarget.reset();
  };

  return (
    <div>
      <header className={css.searchbar}>
        <form onSubmit={handleSubmit} className={css.searchForm}>
          <button type="submit" className={css.searchFormButton}>
            <span className={css.searchFormButtonLabel}>Search</span>
          </button>

          <input
            className={css.searchFormInput}
            type="text"
            name="searchPost"
            placeholder="Search images and photos"
          />
        </form>
      </header>
    </div>
  );
};
export default Searchbar;
