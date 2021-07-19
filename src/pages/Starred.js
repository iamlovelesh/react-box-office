import React, { useEffect, useState } from "react";
import { useShows } from "../misc/custom-hooks";
import { apiGet } from "../misc/config";
import MainPageLayout from "../components/MainPageLayout";
import ShowGrid from "../components/show/ShowGrid";

const Starred = () => {
  const [starred] = useShows();
  const [shows, setShows] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  useEffect(() => {
    if (starred && starred.length > 0) {
      const promises = starred.map((showId) => apiGet(`shows/${showId}`));
      Promise.all(promises)
        .then((data) => data.map((show) => ({ show })))
        .then((result) => {
          setShows(result);
          setIsLoading(false);
        })
        .catch((err) => {
          setError(err.message);
          setIsLoading(false);
        });
    } else {
      setIsLoading(false);
    }
  }, [starred]);
  return (
    <MainPageLayout>
      {isLoading && <div>Shows are still loading</div>}
      {error && <div>Error Occured:{error} </div>}
      {!isLoading && !shows && <div>No Shows were added</div>}
      {!isLoading && !error && shows && <ShowGrid data={shows} />}
    </MainPageLayout>
  );
};

export default Starred;
