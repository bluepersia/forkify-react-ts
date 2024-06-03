import './App.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Header from './components/Header';
import {
  Dispatch,
  SetStateAction,
  createContext,
  useEffect,
  useState,
} from 'react';
import Search from './components/Search';
import MainRecipe from './components/MainRecipe';
import { IRecipe } from './models/recipe';

const queryClient = new QueryClient();

type AppContextType = {
  activeId: string;
  setActiveId: Dispatch<SetStateAction<string>>;
};

export const AppContext = createContext<AppContextType>({
  activeId: '',
  setActiveId: () => {},
});

function App() {
  const [search, setSearch] = useState<string>('');

  const [activeId, setActiveId] = useState<string>('');
  const [bookmarks, setBookmarks] = useState<IRecipe[]>(() => {
    const json = localStorage.getItem('bookmarks');

    if (json) return JSON.parse(json);

    return [];
  });

  function bookmark(bookmark: IRecipe): void {
    setBookmarks((bookmarks) => {
      if (bookmarks.find((bm) => bm.id === bookmark.id))
        return bookmarks.filter((bm) => bm.id !== bookmark.id);
      else return [...bookmarks, bookmark];
    });
  }

  useEffect(() => {
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  }, [bookmarks]);

  return (
    <AppContext.Provider value={{ activeId, setActiveId }}>
      <QueryClientProvider client={queryClient}>
        <div className='container'>
          <Header setSearch={setSearch} bookmarks={bookmarks} />
          <Search name={search} />
          <MainRecipe activeId={activeId} bookmark={bookmark} />
        </div>
      </QueryClientProvider>
    </AppContext.Provider>
  );
}

export default App;
