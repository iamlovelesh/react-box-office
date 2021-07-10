import React, { useState } from "react";
import ActorGrid from "../components/actor/ActorGrid";
import MainPageLayout from "../components/MainPageLayout";
import ShowGrid from "../components/show/ShowGrid";
import { apiGet } from "../misc/config";
const Home = () => {
  const [input, setInput] = useState("");
  const [results, setResults] = useState(null);
  const [searchOption, setSearchOption] = useState("shows");
  const isShows = searchOption === "shows";
  const onInputChange = (e) => {
    setInput(e.target.value);
  };
  const onSearch = () => {
    apiGet(`search/${searchOption}?q=${input}`).then((result) => {
      setResults(result);
    });
  };
  const onKeyDown = (e) => {
    if (e.keyCode === 13) {
      onSearch();
    }
  };
  const renderResult = () => {
    if (results && results.length === 0) {
      return (
        <div>
          <h2>No Result</h2>
        </div>
      );
    } else if (results && results.length > 0) {
      return results[0].show ? (
        <ShowGrid data={results} />
      ) : (
        <ActorGrid data={results} />
      );
    } else {
      return null;
    }
  };
  const onRadioChange = (e) => {
    setSearchOption(e.target.value);
  };
  return (
    <MainPageLayout>
      <input
        type="text"
        placeholder="Search for something"
        onChange={onInputChange}
        onKeyDown={onKeyDown}
        value={input}
      />
      <div>
        <label htmlFor="shows-search">
          <input
            type="radio"
            id="shows-search"
            value="shows"
            checked={isShows}
            onChange={onRadioChange}
          />
          Shows
        </label>
        <label htmlFor="actors-search">
          <input
            type="radio"
            id="actors-search"
            value="people"
            checked={!isShows}
            onChange={onRadioChange}
          />
          Actors
        </label>
      </div>
      <button type="button" onClick={onSearch}>
        Search
      </button>
      {renderResult()}
    </MainPageLayout>
  );
};

export default Home;
