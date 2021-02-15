// useEffect: HTTP requests
// http://localhost:3000/isolated/exercise/06.js

import * as React from 'react'
import { PokemonForm, fetchPokemon, PokemonInfoFallback, PokemonDataView } from '../pokemon'
import { ErrorBoundary } from 'react-error-boundary';

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
      throw new Error(state.error.message)
    default:
      break;
  }

}

function App() {
  const [pokemonName, setPokemonName] = React.useState('')

  function handleSubmit(newPokemonName) {
    setPokemonName(newPokemonName)
  }

  function onResetError() {
    setPokemonName(null);
  }

  return (
    <div className="pokemon-info-app">
      <PokemonForm pokemonName={pokemonName} onSubmit={handleSubmit} />
      <hr />
      <ErrorBoundary 
        FallbackComponent={ErrorFallback}
        onReset={onResetError}
      >
        <div className="pokemon-info">
          <PokemonInfo pokemonName={pokemonName} />
        </div>
      </ErrorBoundary>
    </div>
  )
}

function ErrorFallback({ error, resetErrorBoundary}) {
  return (
    <div>
      <div role="alert" onClick={resetErrorBoundary}>
        There was an error: <pre style={{whiteSpace: 'normal'}}>No pokemon with that name found.</pre>
      </div>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>

  )
}

export default App
