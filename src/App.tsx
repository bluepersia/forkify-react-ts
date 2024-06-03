import './App.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Header from './components/Header';
import { Dispatch, SetStateAction, createContext, useState } from 'react';
import Search from './components/Search';
import MainRecipe from './components/MainRecipe';

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

  return (
    <AppContext.Provider value={{ activeId, setActiveId }}>
      <QueryClientProvider client={queryClient}>
        <div className='container'>
          <Header setSearch={setSearch} />
          <Search name={search} />
          <MainRecipe activeId={activeId} />
        </div>
      </QueryClientProvider>
    </AppContext.Provider>
  );
}

export default App;
