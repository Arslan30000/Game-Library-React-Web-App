import MovieCard from '../components/MovieCard';
import { useState, useEffect } from "react";
import '../css/Home.css';

const API_KEY = 'd3ea0712ffd44086b4780c680aed441d';


const defaultGameTitles = [
  "Grand Theft Auto V",
  "Assassin's Creed",
  "Need for Speed: Most Wanted",
  "The Witcher 3: Wild Hunt",
  "Red Dead Redemption 2"
];

function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [games, setGames] = useState([]);

 
  useEffect(() => {
    async function fetchDefaultGames() {
      const gamePromises = defaultGameTitles.map(async (title) => {
        const response = await fetch(
          `https://api.rawg.io/api/games?key=${API_KEY}&search=${encodeURIComponent(title)}`
        );
        const data = await response.json();
        // Get the first result for each search
        const game = data.results[0];
        return {
          id: game.id,
          title: game.name,
          release_date: game.released,
          url: game.background_image
        };
      });
      const gamesData = await Promise.all(gamePromises);
      setGames(gamesData);
    }
    fetchDefaultGames();
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    const response = await fetch(
      `https://api.rawg.io/api/games?key=${API_KEY}&search=${encodeURIComponent(searchQuery)}`
    );
    const data = await response.json();
    setGames(
      data.results.map(game => ({
        id: game.id,
        title: game.name,
        release_date: game.released,
        url: game.background_image
      }))
    );
  };

  return (
    <div className="home">
      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          placeholder="Search for games..."
          className="search-input"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button type="submit" className="search-button">Search</button>
      </form>
      <div className="movies-grid">
        {games.map(game =>
          <MovieCard movie={game} key={game.id} />
        )}
      </div>
    </div>
  );
}

export default Home;