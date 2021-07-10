import React, { useState } from "react";
import MainPageLayout from "../components/MainPageLayout";
import { apiGet } from "../misc/config";
const Home = () => {
  const [input, setInput] = useState("");
  const [results, setResults] = useState(null);
  const onInputChange = (e) => {
    setInput(e.target.value);
  };
  const onSearch = () => {
    apiGet(`search/shows?q=${input}`).then((result) => {
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
      return (
        <div>
          {results.map((item) => {
            return (
              <div key={item.show.id}>
                <h4>{item.show.name}</h4>
              </div>
            );
          })}
        </div>
      );
    } else {
      return null;
    }
  };
  return (
    <MainPageLayout>
      <input
        type="text"
        onChange={onInputChange}
        onKeyDown={onKeyDown}
        value={input}
      />
      <button type="button" onClick={onSearch}>
        Search
      </button>
      {renderResult()}
    </MainPageLayout>
  );
};

export default Home;
