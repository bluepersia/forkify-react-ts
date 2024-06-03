import { Dispatch, SetStateAction } from 'react';
import SearchForm from './SearchForm';

export default function Header({
  setSearch,
}: {
  setSearch: Dispatch<SetStateAction<string>>;
}): JSX.Element {
  return (
    <header className='header'>
      <img src='src/img/logo.png' alt='Logo' className='header__logo' />

      <SearchForm setSearch={setSearch} />

      <nav className='nav'>
        <ul className='nav__list'>
          <li className='nav__item'>
            <button className='nav__btn nav__btn--add-recipe'>
              <svg className='nav__icon'>
                <use href='src/img/icons.svg#icon-edit'></use>
              </svg>
              <span>Add recipe</span>
            </button>
          </li>
          <li className='nav__item'>
            <button className='nav__btn nav__btn--bookmarks'>
              <svg className='nav__icon'>
                <use href='src/img/icons.svg#icon-bookmark'></use>
              </svg>
              <span>Bookmarks</span>
            </button>
            <div className='bookmarks'>
              <ul className='bookmarks__list'>
                <div className='message'>
                  <div>
                    <svg>
                      <use href='src/img/icons.svg#icon-smile'></use>
                    </svg>
                  </div>
                  <p>No bookmarks yet. Find a nice recipe and bookmark it :)</p>
                </div>
              </ul>
            </div>
          </li>
        </ul>
      </nav>
    </header>
  );
}
