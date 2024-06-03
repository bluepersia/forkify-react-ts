import './App.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Header from './components/Header';
import { useState } from 'react';

const queryClient = new QueryClient();

function App() {
  const [search, setSearch] = useState<string>('');
  return (
    <QueryClientProvider client={queryClient}>
      <div className='container'>
        <Header setSearch={setSearch} />
      </div>
    </QueryClientProvider>
  );
}

export default App;
