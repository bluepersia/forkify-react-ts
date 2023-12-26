import { useState } from "react";
import { IRecipe } from "../../models/recipe";
import {Search} from "./Search";
import Nav from "./Nav";
import Results from "./Results";

export default function Controls ()
{
    const [searchResults, setSearchResults] = useState<IRecipe[]> ([]);



    return (<>
        <header className="header">
          <img src="src/img/logo.png" alt="Logo" className="header__logo" />
          <Search setSearchResults={setSearchResults}/>
          <Nav/>
        </header>
        <Results results={searchResults}/>


      </>
      
    )
}