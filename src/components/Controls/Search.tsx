import React, { useEffect, useState } from "react"
import useFetch from "../../hooks/useFetch";
import {baseURL, apiKey} from '../../utility';
import { IRecipe } from "../../models/recipe";

type Props = 
{
  setSearchResults:(results: IRecipe[]) => void ;
}
type Data =
{
  data: {
    recipes: IRecipe[]
  }
}
export const Search = React.memo (function ({setSearchResults}:Props)
{
    const [name, setName] = useState<string> ('');
    const {run, state:searchState} = useFetch ();

    function handleInputChange (e:React.ChangeEvent) : void
    {
        setName ((e.target as HTMLInputElement).value);
    }

    function handleFormSubmit (e:React.FormEvent) : void
    {
      e.preventDefault ();

      run (`${baseURL}?search=${name}&key=${apiKey}`);

    }

    useEffect (() => 
    {
      if (searchState.data)
        setSearchResults ((searchState.data as Data).data.recipes);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchState.data])

    
    return (
        <form className="search" onSubmit={handleFormSubmit}>
          <input
            name="name"
            type="text"
            className="search__field"
            placeholder="Search over 1,000,000 recipes..."
            onChange={handleInputChange}
            value={name}
          />
          <button className="btn search__btn">
            <svg className="search__icon">
              <use href="src/img/icons.svg#icon-search"></use>
            </svg>
            <span>Search</span>
          </button>
        </form>
    )
});