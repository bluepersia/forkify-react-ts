import React from 'react';
import Bookmarks from './Bookmarks';

const Nav = React.memo (function ()
{
    return (
        <nav className="nav">
          <ul className="nav__list">
            <li className="nav__item">
              <button className="nav__btn nav__btn--add-recipe">
                <svg className="nav__icon">
                  <use href="src/img/icons.svg#icon-edit"></use>
                </svg>
                <span>Add recipe</span>
              </button>
            </li>
            <li className="nav__item">
              <button className="nav__btn nav__btn--bookmarks">
                <svg className="nav__icon">
                  <use href="src/img/icons.svg#icon-bookmark"></use>
                </svg>
                <span>Bookmarks</span>
              </button>
              <Bookmarks/>
            </li>
          </ul>
        </nav>
    )
});

export default Nav;