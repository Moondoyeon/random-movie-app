import React from "react";
import "./App.css";
import Search from "./pages/Search";
import Random from "./pages/Random";
import Nav from "./components/Nav";
import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SearchListContext } from "./context/context";

function App() {
  const [searchList, setSearchList] = useState([]);

  return (
    <SearchListContext.Provider value={{ searchList, setSearchList }}>
      <BrowserRouter>
        <div className="App">
          <Nav />
          <Routes>
            <Route path="/" element={<Random />} />
            <Route path="/search" element={<Search />} />
          </Routes>
        </div>
      </BrowserRouter>
    </SearchListContext.Provider>
  );
}

export default App;
