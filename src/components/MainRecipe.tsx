import { useQuery, useQueryClient } from '@tanstack/react-query';
import { IRecipe } from '../models/recipe';
import { useEffect, useState } from 'react';
import { baseURL } from '../utility';
import Spinner from './Spinner';
import ErrorDisplay from './ErrorDisplay';

export default function MainRecipe({
  activeId,
}: {
  activeId: string;
}): JSX.Element {
  const queryClient = useQueryClient();

  const { data, isFetching, error } = useQuery({
    queryKey: ['main-recipe'],
    queryFn: fetchRecipe,
  });
  const [recipe, setRecipe] = useState<IRecipe | null>(null);

  async function fetchRecipe(): Promise<IRecipe | null> {
    if (!activeId) return null;

    const res = await fetch(`${baseURL}/${activeId}`);

    if (!res.ok) throw new Error((await res.json()).message);

    return (await res.json()).data.recipe;
  }

  useEffect(() => {
    queryClient.invalidateQueries({ queryKey: ['main-recipe'] });
  }, [activeId]);

  useEffect(() => {
    setRecipe(data || null);
  }, [data]);

  let display = (
    <div className='message'>
      <div>
        <svg>
          <use href='src/img/icons.svg#icon-smile'></use>
        </svg>
      </div>
      <p>Start by searching for a recipe or an ingredient. Have fun!</p>
    </div>
  );

  if (isFetching) display = <Spinner />;
  else if (error) display = <ErrorDisplay err={error} />;
  else if (recipe) {
    const {
      title,
      publisher,
      image_url,
      source_url,
      cooking_time,
      servings,
      ingredients,
    } = recipe;

    display = (
      <>
        <figure className='recipe__fig'>
          <img src={image_url} alt={title} className='recipe__img' />
          <h1 className='recipe__title'>
            <span>{title}</span>
          </h1>
        </figure>

        <div className='recipe__details'>
          <div className='recipe__info'>
            <svg className='recipe__info-icon'>
              <use href='src/img/icons.svg#icon-clock'></use>
            </svg>
            <span className='recipe__info-data recipe__info-data--minutes'>
              {cooking_time.toFixed(0)}
            </span>
            <span className='recipe__info-text'>minutes</span>
          </div>
          <div className='recipe__info'>
            <svg className='recipe__info-icon'>
              <use href='src/img/icons.svg#icon-users'></use>
            </svg>
            <span className='recipe__info-data recipe__info-data--people'>
              {servings}
            </span>
            <span className='recipe__info-text'>servings</span>

            <div className='recipe__info-buttons'>
              <button className='btn--tiny btn--decrease-servings'>
                <svg>
                  <use href='src/img/icons.svg#icon-minus-circle'></use>
                </svg>
              </button>
              <button className='btn--tiny btn--increase-servings'>
                <svg>
                  <use href='src/img/icons.svg#icon-plus-circle'></use>
                </svg>
              </button>
            </div>
          </div>

          <div className='recipe__user-generated'>
            <svg>
              <use href='src/img/icons.svg#icon-user'></use>
            </svg>
          </div>
          <button className='btn--round'>
            <svg className=''>
              <use href='src/img/icons.svg#icon-bookmark-fill'></use>
            </svg>
          </button>
        </div>

        <div className='recipe__ingredients'>
          <h2 className='heading--2'>Recipe ingredients</h2>
          <ul className='recipe__ingredient-list'>
            {ingredients.map((ing, index) => (
              <li key={index} className='recipe__ingredient'>
                <svg className='recipe__icon'>
                  <use href='src/img/icons.svg#icon-check'></use>
                </svg>
                <div className='recipe__quantity'>{ing.quantity}</div>
                <div className='recipe__description'>
                  <span className='recipe__unit'>{ing.unit}</span>
                  {ing.description}
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className='recipe__directions'>
          <h2 className='heading--2'>How to cook it</h2>
          <p className='recipe__directions-text'>
            This recipe was carefully designed and tested by
            <span className='recipe__publisher'>{publisher}</span>. Please check
            out directions at their website.
          </p>
          <a
            className='btn--small recipe__btn'
            href={source_url}
            target='_blank'
          >
            <span>Directions</span>
            <svg className='search__icon'>
              <use href='src/img/icons.svg#icon-arrow-right'></use>
            </svg>
          </a>
        </div>
      </>
    );
  }
  return <div className='recipe'>{display}</div>;
}
