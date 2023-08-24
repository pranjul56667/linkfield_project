import React from 'react';
import { ListGroup } from 'react-bootstrap';
import './Sidebar.css';

const Sidebar = ({ pokemonList, onItemClick, activePokemon }) => {
  return (
    <>
      <div className="sidebar">
        <ListGroup as="ol" numbered >
          {pokemonList.map(pokemon => (
            <ListGroup.Item
              key={pokemon.name}
              action
              active={activePokemon === pokemon}
              onClick={() => onItemClick(pokemon)}
              variant="success"
            >
              {pokemon.name}
            </ListGroup.Item>
          ))}
        </ListGroup>
      </div>
    </>
  );
};

export default Sidebar;
