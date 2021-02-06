// useEffect: persistent state
// http://localhost:3000/isolated/exercise/02.js

import * as React from 'react'

// function getLocalStorageItem(key, initialValue) {
//   const localStorageItem = window.localStorage.getItem(key);
//   console.log({localStorageItem})
//   if(!localStorageItem) {
//     console.log("NOLOCALSTORAGE", { initialValue})
//     return initialValue;
//   }

//   return localStorageItem
// }

// function useLocalStorageState(key, initialValue) {
//   const [item, setItem] = React.useState(() => getLocalStorageItem(key, initialValue))

//   React.useEffect(() => {
//     window.localStorage.setItem(key, JSON.stringify(item));
//   }, [item])

//   try {
//     parsedItem = JSON.parse(item)
//   } catch (error) {
//     console.log(error)
//     return [item, setItem];
//   }

//   return [parsedItem, setItem];
// }
// //////

// function useLocalStorageState(key, initialValue) {
//   React.useEffect(() => window.localStorage.setItem(key), [input]);
//   const initialState = window.localStorage.getItem(key) || initialValue;
//   try {
//     return JSON.parse(initialState);
//   } catch (error) {
//     return initialState;
//   }
// }

function Greeting({initialName = ''}) {
  // const [name, setName] = useLocalStorageState('name', initialName);
let name =2;

  function handleChange(event) {
    // setName(event.target.value)
    // setTestItem(event.target.value)
  }
  return (
    <div>
      <form>
        <label htmlFor="name">Name: </label>
        <input onChange={handleChange} id="name" />
      </form>
      {name ? <strong>Hello {name}</strong> : 'Please type your name'}

    </div>
  )
}

function App() {
  return <Greeting />
}

export default App
