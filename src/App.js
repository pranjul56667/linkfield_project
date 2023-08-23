// App.js
import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import Sidebar from './component/Sidebar';
import PokemonDetails from './component/PokemonDetails';

const App = () => {
  const [pokemonList, setPokemonList] = useState([]);
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleItemClick = (pokemon) => {
    setSelectedPokemon(pokemon);
  };

  useEffect(() => {
    axios.get('https://pokeapi.co/api/v2/pokemon?limit=100')
      .then(response => {
        setPokemonList(response.data.results);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching Pokemon list:', error);
        setError(error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-3">
          <br />
          <br />
          <Sidebar
            pokemonList={pokemonList}
            onItemClick={handleItemClick}
            activePokemon={selectedPokemon}
          />
        </div>
        <div className="col-md-9">
          <br /><br />
          {loading && <p>Loading...</p>}
          {error && <p>Error fetching data.</p>}
          {!loading && !selectedPokemon && (
            <p className="d-flex flex-column align-items-center text-center">Select a Pokemon from the list</p>
          )}
          {!loading && selectedPokemon && (
            <PokemonDetails pokemon={selectedPokemon} />
          )}
        </div>
      </div>
    </div>
  );
};
export default App;
