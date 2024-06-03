import { Dispatch, SetStateAction } from 'react';
import SearchForm from './SearchForm';
import Bookmarks from './Bookmarks';
import { IRecipe } from '../../models/recipe';

export default function Header({
  setSearch,
  bookmarks,
}: {
  setSearch: Dispatch<SetStateAction<string>>;
  bookmarks: IRecipe[];
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
            <Bookmarks bookmarks={bookmarks} />
          </li>
        </ul>
      </nav>
    </header>
  );
}
