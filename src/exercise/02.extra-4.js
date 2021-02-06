// useEffect: persistent state
// http://localhost:3000/isolated/exercise/02.js

import * as React from 'react'

function conditionallyParse(input) {
  let parsed;
  try {
    parsed = JSON.parse(input);
  } catch (error) {
    console.log({ error })
  }
  return parsed ?? input;
}

function conditionallyParseLocalStorageItem(key) {
  console.log("conditionallyParseLocalStorageItem RUNS");
  const savedItem = window.localStorage.getItem(key);
  return conditionallyParse(savedItem);
}

function useLocalStorageState(key, initialState) {
  console.log("useLocalStorageState RUNS");
  const [state, setState] = React.useState(() => conditionallyParseLocalStorageItem(key) || initialState)

  React.useEffect(() => {
    console.log("useEffect RUNS");
    window.localStorage.setItem(key, state);
    console.log(window.localStorage.getItem(key), state, typeof state, Array.isArray(state))
  });

  return [state, setState];
}

function Greeting({initialState = [1,2,3]}) {
  const [name, setName] = useLocalStorageState('genericState', initialState);

  function handleChange(event) {
    console.log("handleChange RUNS")
    setName(conditionallyParse(event.target.value))
  }
  return (
    <div>
      <form>
        <label htmlFor="name">Name: </label>
        <input onChange={handleChange} id="name" />
      </form>
      {name ? <strong>Hello {name}</strong> : 'Please type your name'}
      <p style={{marginTop:"300px"}}>Type: {typeof name}</p>
      <p>Is Array?: { `${Array.isArray(name)}`}</p>
    </div>
  )
}

function App() {
  return <Greeting />
}

export default App
