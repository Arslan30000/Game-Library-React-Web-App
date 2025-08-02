import "../css/Favorites.css";
import MovieCard from "../components/MovieCard";
import { useMovieContext } from "../contexts/MovieContext";

function Favorites() {
  const { favorites } = useMovieContext();

  if (!favorites.length) {
    return (
      <div className="favorites-empty">
        <h2>No favorites yet</h2>
        <p>Start adding favorite games and they will appear here.</p>
      </div>
    );
  }

  return (
    <div className="favorites">
      <h2>Your Favorite Games</h2>
      <div className="movies-grid">
        {favorites.map((game) => (
          <MovieCard movie={game} key={game.id} />
        ))}
      </div>
    </div>
  );
}

export default Favorites;