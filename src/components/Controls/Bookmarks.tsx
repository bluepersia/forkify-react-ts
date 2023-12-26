 import React from 'react';
import { useContext } from 'react';
import { AppContext } from '../../App';
import RecipePreview from './RecipePreview';

 const Bookmarks = React.memo (function ()
{ 
    const {bookmarks} = useContext (AppContext);

    return (
        <div className="bookmarks">
                <ul className="bookmarks__list">
                  {bookmarks.length == 0 && <div className="message">
                    <div>
                      <svg>
                        <use href="src/img/icons.svg#icon-smile"></use>
                      </svg>
                    </div>
                    <p>
                      No bookmarks yet. Find a nice recipe and bookmark it :)
                    </p>
                  </div> || bookmarks.map (bm => <RecipePreview key={bm.id} {...bm} />)}
                </ul>
              </div>
    )
});

export default Bookmarks;