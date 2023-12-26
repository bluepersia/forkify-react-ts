import { useState } from 'react';
import { IRecipe } from '../../models/recipe';
import RecipePreview from './RecipePreview';

export default function Results({results}:{results:IRecipe[]}) : JSX.Element
{
    const [page, setPage] = useState (1);

    function getTotalPages () : number
    {
        return Math.ceil (results.length / 10);
    }

    function getCurrentPage (): IRecipe[]
    {
        const endIndex = page * 10;
        const startIndex = endIndex - 10;

        return results.slice (startIndex, endIndex);
    }

    return (
        <div className="search-results">
        <ul className="results">
        {getCurrentPage ().map (recipe => <RecipePreview key={recipe.id} {...recipe}/>)}     
        </ul>

        <div className="pagination">
           {page > 1 && <button className="btn--inline pagination__btn--prev" onClick={() => setPage (curr => curr - 1)}>
            <svg className="search__icon">
              <use href="src/img/icons.svg#icon-arrow-left"></use>
            </svg>
            <span>Page {page - 1}</span>
          </button>}
          {page < getTotalPages () && <button className="btn--inline pagination__btn--next" onClick={() => setPage (curr => curr + 1)}>
            <span>Page {page + 1}</span>
            <svg className="search__icon">
              <use href="src/img/icons.svg#icon-arrow-right"></use>
            </svg>
          </button>}
        </div>

        <p className="copyright">
          &copy; Copyright by
          <a
            className="twitter-link"
            target="_blank"
            href="https://twitter.com/jonasschmedtman"
            >Jonas Schmedtmann</a
          >. Use for learning or your portfolio. Don't use to teach. Don't claim
          as your own.
        </p>
      </div>
    )
}