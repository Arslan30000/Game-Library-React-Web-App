import {createContext, useState, useContext, useEffect} from "react";

const MovieContext = createContext();

export const useMovieContext = () => useContext(MovieContext);

export const MovieProvider = ({children}) => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const storedFavorites = localStorage.getItem('favorites');
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  const addtoFavorites = (movie) => {
    setFavorites((prevFavorites) => {
      const isAlreadyFavorite = prevFavorites.some(fav => fav.id === movie.id);
      if (!isAlreadyFavorite) {
        return [...prevFavorites, movie];
      }
      return prevFavorites;
    });
  };

  const removeFromFavorites = (movieId) => {
    setFavorites((prevFavorites) => prevFavorites.filter(fav => fav.id !== movieId));
  };

  return (
    <MovieContext.Provider value={{favorites, setFavorites, addtoFavorites, removeFromFavorites}}>
      {children}
    </MovieContext.Provider>
  );
}