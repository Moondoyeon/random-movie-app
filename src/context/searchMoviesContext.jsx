/* eslint-disable react/jsx-no-constructed-context-values */
/* eslint-disable react/prop-types */

import { createContext, useState, useContext } from 'react';

export const SearchMoviesContext = createContext({
  searchList: [],
  setSearchList: () => {},
});
export const useSearchMovies = () => useContext(SearchMoviesContext);
function SearchListProvider({ children }) {
  const [searchList, setSearchList] = useState([]);

  return (
    <SearchMoviesContext.Provider value={{ searchList, setSearchList }}>
      {children}
    </SearchMoviesContext.Provider>
  );
}

export default SearchListProvider;
