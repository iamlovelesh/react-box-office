import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { apiGet } from "../misc/config";
const Show = () => {
  const { id } = useParams();
  const [show, setShow] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    let isMounted = true;
    apiGet(`shows/${id}?embed[]=seasons&embed[]=cast`)
      .then((result) => {
        if (isMounted) {
          setShow(result);
          setIsLoading(false);
        }
      })
      .catch((err) => {
        if (isMounted) {
          setError(err.message);
          setIsLoading(false);
        }
      });
    return () => {
      isMounted = false;
    };
  }, [id, show]);
  if (isLoading) {
    return (
      <div>
        <h2>Loading</h2>
      </div>
    );
  }
  if (error) {
    return (
      <div>
        <h3>{error}</h3>
      </div>
    );
  }
  return (
    <div>
      <h1>This is the Show Page</h1>
    </div>
  );
};

export default Show;
