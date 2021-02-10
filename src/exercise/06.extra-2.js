// useEffect: HTTP requests
// http://localhost:3000/isolated/exercise/06.js

import * as React from 'react'
import { PokemonForm, fetchPokemon, PokemonInfoFallback, PokemonDataView } from '../pokemon'

function PokemonInfo({pokemonName}) {

  const [pokemon, setPokemon] = React.useState(null);
  const [requestState, setRequestState] = React.useState('idle');
  React.useEffect(() => {
    if(!pokemonName) {
      setRequestState('idle');
      return
    };

    fetchPokemon(pokemonName).then(pokemonData => {
      setPokemon(pokemonData)
    }).catch(error => {
      setRequestState('rejected');
      setPokemon(error.message)
    })

  }, [pokemonName])

  switch (requestState) {
    case 'idle':
      return 'Submit a Pokemon';
    case 'pending':
      return <PokemonInfoFallback name={pokemonName} />
    case 'resolved':
      return <PokemonDataView pokemon={pokemon} />
    case 'rejected':
      return (
        <div role="alert">
          There was an error: <pre style={{whiteSpace: 'normal'}}>{pokemon}</pre>
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
