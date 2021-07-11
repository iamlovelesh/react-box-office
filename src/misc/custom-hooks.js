import { useReducer, useEffect } from "react";
function showsReducer(pervState, action) {
  switch (action.type) {
    case "ADD": {
      return [...pervState, action.showId];
    }
    case "REMOVE": {
      return pervState.filter((showId) => showId !== action.showId);
    }
    default:
      return pervState;
  }
}
function usePersistedReducer(reducer, initialState, key) {
  const [state, dispatch] = useReducer(reducer, initialState, (intial) => {
    const persisted = localStorage.getItem(key);
    return persisted ? JSON.parse(persisted) : intial;
  });
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state));
  }, [state, key]);
  return [state, dispatch];
}

export function useShows(key = "shows") {
  return usePersistedReducer(showsReducer, [], key);
}
