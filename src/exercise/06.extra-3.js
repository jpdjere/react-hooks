// useEffect: HTTP requests
// http://localhost:3000/isolated/exercise/06.js

import * as React from 'react'
import { PokemonForm, fetchPokemon, PokemonInfoFallback, PokemonDataView } from '../pokemon'

function PokemonInfo({pokemonName}) {
  const [state, setState] = React.useState({status: 'idle', pokemon: null, error: null});
  React.useEffect(() => {
    if(!pokemonName) {
      setState(prevState => ({
        ...prevState,
        status: 'idle'
      }));
      return;
    };

    setState(prevState => ({
      ...prevState,
      status: 'pending'
    }));

    fetchPokemon(pokemonName).then(pokemonData => {
      setState(prevState => ({
        ...prevState,
        status: 'resolved',
        pokemon: pokemonData,
        error: null
      }));
    }).catch(error => {
      setState(prevState => ({
        ...prevState,
        status: 'rejected',
        pokemon: null,
        error: error.message
      }));
    })

  }, [pokemonName])

  switch (state.status) {
    case 'idle':
      return 'Submit a Pokemon';
    case 'pending':
      return <PokemonInfoFallback name={pokemonName} />
    case 'resolved':
      return <PokemonDataView pokemon={state.pokemon} />
    case 'rejected':
      return (
        <div role="alert">
          There was an error: <pre style={{whiteSpace: 'normal'}}>{state.error}</pre>
        </div>
      )
    default:
      break;
  }

}

function App() {
  const [pokemonName, setPokemonName] = React.useState('')

  function handleSubmit(newPokemonName) {
    setPokemonName(newPokemonName)
  }

  return (
    <div className="pokemon-info-app">
      <PokemonForm pokemonName={pokemonName} onSubmit={handleSubmit} />
      <hr />
      <div className="pokemon-info">
        <PokemonInfo pokemonName={pokemonName} />
      </div>
    </div>
  )
}

export default App
