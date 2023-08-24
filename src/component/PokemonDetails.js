import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { ProgressBar } from 'react-bootstrap';
import './PokemonDetails.css'
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import Card from 'react-bootstrap/Card';

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
    return <div>
      <Button variant="primary" disabled>
        <Spinner
          as="span"
          animation="grow"
          size="sm"
          role="status"
          aria-hidden="true"
        />
        Loading...
      </Button>
    </div>;
  }
  const pokemonImageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonDetails.id}.png`;

  return (
    <>
      <div className="pokemon-details align-items-center text-center">
        <div className='pokemon-image-background' >
          <Card style={{ width: '18rem' }} border="secondary" >
            <Card.Img variant="top" src={pokemonImageUrl} alt={pokemonDetails.name} />
            <Card.Body>
              <Card.Title>{pokemonDetails.name}</Card.Title>
            </Card.Body>
          </Card>
        </div>
        <div className='pokemon-details-extra' >
          <div style={{display:'flex',justifyContent:'space-around'}} >
            <p>Height : {pokemonDetails.height}</p>
            <p>Weight : {pokemonDetails.weight}</p>
          </div>
        <p>Abilities: {pokemonDetails.abilities.map(ability => ability.ability.name).join(', ')}</p>
        <div className="statistics">
            {pokemonDetails.stats.map(stat => (
              <div key={stat.stat.name}>
                <p style={{textAlign:'left'}} >{stat.stat.name} : {stat.base_stat} </p>
                <ProgressBar now={stat.base_stat}  variant="success" striped animated  />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default PokemonDetails;
