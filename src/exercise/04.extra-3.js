// useState: tic tac toe
// http://localhost:3000/isolated/exercise/04.js

import * as React from 'react'
import { useLocalStorageState } from './../utils'

function Board({ selectSquare, squares, status}) {
  function renderSquare(i) {
    return (
      <button className="square" onClick={() => selectSquare(i)}>
        {squares[i]}
      </button>
    )
  }

  return (
    <div>
      <div className="board-row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="board-row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="board-row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
    </div>
  )
}

function Game() {
  const [squares, setSquares] = useLocalStorageState('savedGameState', Array(9).fill(null));
  const [history, setHistory] = useLocalStorageState('savedGameHistory', [Array(9).fill(null)])
  const [movesUIList, setMovesUIList] = useLocalStorageState('savedMovesUIList', null, {serialize: () => null, deserialize: () => null});
  const [currentPlay, setCurrentPlay] = useLocalStorageState('savedCurrentPlay', 0);

  const [nextValue, setNextValue] = React.useState(calculateNextValue(squares));
  const [winner, setWinner] = React.useState(calculateWinner(squares));
  const [status, setStatus] = React.useState(calculateStatus(winner, squares, nextValue));

  function selectSquare(square) {
    if(winner)
      return;
    if(squares[square] !== null) {
      return null;
    }
    
    const squaresCopy = [...squares];
    squaresCopy[square] = nextValue;
    setSquares(squaresCopy);
    updateHistory(history, squaresCopy);
    setCurrentPlay(currentPlay + 1);
  }


  React.useEffect(() => {
    function calculateMoves(history, setSquares, currentPlay) {
      return history.map((play, i) => {
        const disabled = currentPlay === i+1;
        return <li key={`${play}`}><button disabled={disabled} onClick={() => updateCurrentPlay(play, i+1)}>{`Go to ${i === 0 ? `start of game` : `move #${i} ${disabled ? '(current)' : ''}` }`}</button></li>
      });
    }
    function updateCurrentPlay(play, i) {
      setSquares(play);
      setCurrentPlay(i);
    }

    setNextValue(calculateNextValue(squares));
    setWinner(calculateWinner(squares));
    setStatus(calculateStatus(winner, squares, nextValue));
    setMovesUIList(calculateMoves(history, setSquares, currentPlay))
  }, [squares, nextValue, winner, history, setSquares, currentPlay, setCurrentPlay, setMovesUIList])

  function restart() {
    const restartedSquares = Array(9).fill(null);
    setSquares(restartedSquares);
    setHistory([]);
  }

  function updateHistory(history, squares) {
    const newHistory = [...history, squares];
    setHistory(newHistory);
  }

  return (
    <div className="game">
      <div className="game-board">
        <Board selectSquare={selectSquare} squares={squares} status={status} />
        <button className="restart" onClick={restart} >restart</button>
      </div>
      <div className="game-info">
        <div>{status}</div>
        <ol>{movesUIList}</ol>
      </div>
    </div>
  )
}

// eslint-disable-next-line no-unused-vars
function calculateStatus(winner, squares, nextValue) {
  return winner
    ? `Winner: ${winner}`
    : squares.every(Boolean)
    ? `Scratch: Cat's game`
    : `Next player: ${nextValue}`
}

// eslint-disable-next-line no-unused-vars
function calculateNextValue(squares) {
  const xSquaresCount = squares.filter(r => r === 'X').length
  const oSquaresCount = squares.filter(r => r === 'O').length
  return oSquaresCount === xSquaresCount ? 'X' : 'O'
}

// eslint-disable-next-line no-unused-vars
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ]
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i]
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a]
    }
  }
  return null
}

function App() {
  return <Game />
}

export default App
