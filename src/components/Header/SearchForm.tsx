import {
  ChangeEvent,
  Dispatch,
  FormEvent,
  SetStateAction,
  useState,
  memo,
} from 'react';

const SearchForm = memo(function ({
  setSearch,
}: {
  setSearch: Dispatch<SetStateAction<string>>;
}): JSX.Element {
  const [name, setName] = useState<string>('');

  function handleInputChange(e: ChangeEvent): void {
    setName((e.target as HTMLInputElement).value);
  }

  function handleSubmit(e: FormEvent): void {
    e.preventDefault();

    setSearch(name);
  }
  return (
    <form className='search' onSubmit={handleSubmit}>
      <input
        name='name'
        type='text'
        className='search__field'
        placeholder='Search over 1,000,000 recipes...'
        value={name}
        onChange={handleInputChange}
      />
      <button className='btn search__btn'>
        <svg className='search__icon'>
          <use href='src/img/icons.svg#icon-search'></use>
        </svg>
        <span>Search</span>
      </button>
    </form>
  );
});

export default SearchForm;
