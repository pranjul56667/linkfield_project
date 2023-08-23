import React from 'react';
import './Sidebar.css';

const Sidebar = ({ pokemonList, onItemClick, activePokemon }) => {
  return (
    <div className="sidebar">
      <ul className="list-group">
        {pokemonList.map(pokemon => (
          <li
            key={pokemon.name}
            className={`list-group-item ${activePokemon === pokemon ? 'active' : ''}`}
            onClick={() => onItemClick(pokemon)}
          >
            {pokemon.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
