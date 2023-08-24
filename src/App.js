import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import Sidebar from './component/Sidebar';
import PokemonDetails from './component/PokemonDetails';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';

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
    <>
      <Container>
        <Row>
          <Col md={3}>
            <br /><br />
            <Sidebar pokemonList={pokemonList} onItemClick={handleItemClick} activePokemon={selectedPokemon}/>
          </Col>
          <Col md={9}>
            <br /><br />
            {loading && <div>
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
              </div>
            }
            {error && <p>...Error fetching data...</p>}
            {!loading && !selectedPokemon && (
              <p className="d-flex flex-column align-items-center text-center">...Select a Pokemon from the list...</p>
              )
            }
            {!loading && selectedPokemon && (
              <PokemonDetails pokemon={selectedPokemon} />
              )
            }
          </Col>
        </Row>
      </Container>    
    </>    
  );
};

export default App;
