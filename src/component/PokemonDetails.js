// PokemonDetails.js
import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

const PokemonDetails = ({ pokemon }) => {
  const [pokemonDetails, setPokemonDetails] = useState(null);

  useEffect(() => {
    if (pokemon) {
      axios.get(pokemon.url)
        .then(response => {
          setPokemonDetails(response.data);
        })
        .catch(error => {
          console.error('Error fetching Pokemon details:', error);
        });
    }
  }, [pokemon]);

  if (!pokemonDetails) {
    return <div>Loading...</div>;
  }

  const pokemonImageUrl = `https://pokeres.bastionbot.org/images/pokemon/${pokemonDetails.id}.png`;

  return (
    <div className="pokemon-details d-flex flex-column align-items-center text-center">
      <img src={pokemonImageUrl} alt={pokemonDetails.name} />
      <h2>{pokemonDetails.name}</h2>
      <p>Height: {pokemonDetails.height}</p>
      <p>Weight: {pokemonDetails.weight}</p>
      <p>Abilities: {pokemonDetails.abilities.map(ability => ability.ability.name).join(', ')}</p>
      <div className="statistics">
        {pokemonDetails.stats.map(stat => (
          <div key={stat.stat.name}>
            <p>{stat.stat.name}</p>
            <div className="progress">
              <div
                className="progress-bar"
                role="progressbar"
                style={{ width: `${stat.base_stat}%` }}
                aria-valuenow={stat.base_stat}
                aria-valuemin="0"
                aria-valuemax="100"
              >
                {stat.base_stat}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PokemonDetails;
