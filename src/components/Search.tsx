import { useQuery, useQueryClient } from '@tanstack/react-query';
import { IRecipe } from '../models/recipe';
import { apiKey, baseURL } from '../utility';
import { useEffect, useState } from 'react';
import Spinner from './Spinner';
import ErrorDisplay from './ErrorDisplay';
import Preview from './Preview';

const RES_PER_PAGE = 10;

export default function Search({ name }: { name: string }): JSX.Element {
  const queryClient = useQueryClient();

  const {
    data: recipes,
    isFetching,
    error,
  } = useQuery({
    queryKey: ['search'],
    queryFn: fetchRecipes,
  });

  const [page, setPage] = useState<number>(1);

  function getTotalPages(): number {
    if (!recipes) return 1;

    return Math.ceil(recipes.length / RES_PER_PAGE);
  }

  function getCurrentPage(): IRecipe[] {
    if (!recipes) return [];

    const endIndex = page * RES_PER_PAGE;
    const startIndex = endIndex - RES_PER_PAGE;
    return recipes.slice(startIndex, endIndex);
  }

  async function fetchRecipes(): Promise<IRecipe[]> {
    if (!name) return [];

    const res = await fetch(`${baseURL}?search=${name}&key=${apiKey}`);

    if (!res.ok) throw new Error((await res.json()).message);

    return (await res.json()).data.recipes;
  }

  useEffect(() => {
    queryClient.invalidateQueries({ queryKey: ['search'] });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [name]);

  return (
    <div className='search-results'>
      <ul className='results'>
        {isFetching && <Spinner />}
        {error && <ErrorDisplay err={error} />}
        {getCurrentPage().map((recipe) => (
          <Preview key={recipe.id} {...recipe} />
        ))}
      </ul>

      <div className='pagination'>
        {page > 1 && (
          <button
            className='btn--inline pagination__btn--prev'
            onClick={() => setPage((page) => page - 1)}
          >
            <svg className='search__icon'>
              <use href='src/img/icons.svg#icon-arrow-left'></use>
            </svg>
            <span>Page {page - 1}</span>
          </button>
        )}
        {page < getTotalPages() && (
          <button
            className='btn--inline pagination__btn--next'
            onClick={() => setPage((page) => page + 1)}
          >
            <span>Page {page + 1}</span>
            <svg className='search__icon'>
              <use href='src/img/icons.svg#icon-arrow-right'></use>
            </svg>
          </button>
        )}
      </div>

      <p className='copyright'>
        &copy; Copyright by
        <a
          className='twitter-link'
          target='_blank'
          href='https://twitter.com/jonasschmedtman'
        >
          Jonas Schmedtmann
        </a>
        . Use for learning or your portfolio. Don't use to teach. Don't claim as
        your own.
      </p>
    </div>
  );
}
