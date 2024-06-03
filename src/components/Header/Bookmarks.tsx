import { IRecipe } from '../../models/recipe';
import Preview from '../Preview';

export default function Bookmarks({
  bookmarks,
}: {
  bookmarks: IRecipe[];
}): JSX.Element {
  return (
    <div className='bookmarks'>
      {(bookmarks.length === 0 && (
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
      )) ||
        bookmarks.map((bm) => <Preview key={bm.id} {...bm} />)}
    </div>
  );
}
