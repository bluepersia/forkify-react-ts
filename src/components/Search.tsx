import { useQuery, useQueryClient } from '@tanstack/react-query';
import { IRecipe } from '../models/recipe';
import { apiKey, baseURL } from '../utility';
import { useEffect } from 'react';
import Spinner from './Spinner';
import ErrorDisplay from './ErrorDisplay';
import Preview from './Preview';

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
        {recipes &&
          recipes.map((recipe) => <Preview key={recipe.id} {...recipe} />)}
      </ul>

      <div className='pagination'>
        <button className='btn--inline pagination__btn--prev'>
          <svg className='search__icon'>
            <use href='src/img/icons.svg#icon-arrow-left'></use>
          </svg>
          <span>Page 1</span>
        </button>
        <button className='btn--inline pagination__btn--next'>
          <span>Page 3</span>
          <svg className='search__icon'>
            <use href='src/img/icons.svg#icon-arrow-right'></use>
          </svg>
        </button>
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
