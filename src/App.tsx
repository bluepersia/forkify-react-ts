
import './App.css'
import Controls from './components/Controls/Controls'
import { MainRecipe } from './components/MainRecipe'
import { createContext, useState, Dispatch, SetStateAction, useCallback, useEffect} from 'react'
import { IRecipe } from './models/recipe'

type AppContextType = 
{
  activeId:string,
  setActiveId: Dispatch<SetStateAction<string>>,
  bookmarks: IRecipe[]
}
const AppContext = createContext<AppContextType> ({
  activeId: '',
  setActiveId: () => {},
  bookmarks: []
})

function App() {

  const [activeId, setActiveId] = useState<string> ('');
  const [bookmarks, setBookmarks] = useState<IRecipe[]> (() => {
    const bms = localStorage.getItem ('bms');

    return bms ? JSON.parse (bms) : [];
  });

  useEffect (() => {
    localStorage.setItem ('bms', JSON.stringify (bookmarks));
  }, [bookmarks])

  const bookmark = useCallback (function  (recipe:IRecipe)
  {
      if (bookmarks.find (r => r.id == recipe.id))
        setBookmarks (curr => curr.filter (r => r.id != recipe.id));
      else 
        setBookmarks (curr => ([...curr, recipe]));

  }, [bookmarks, setBookmarks]);

  return (
    <AppContext.Provider value={{activeId, setActiveId, bookmarks}}>
      <div className='container'>
        <Controls/>
        <MainRecipe activeId={activeId} bookmark={bookmark}/>
      </div>
    </AppContext.Provider>
  )
}

export default App

export {AppContext};
