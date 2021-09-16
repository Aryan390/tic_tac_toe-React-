import { Fragment, useState } from 'react';

import Board from './components/Board'
import Modal from './components/UI/Modal'
import Backdrop from './components/UI/Backdrop'
import Button from './components/UI/Button'

import './App.css';

const initState = [
  ['','',''],
  ['','',''],
  ['','','']
]

function App() {
  const [board, setBoard] = useState(initState);
  const [boardCount, setBoardCount] = useState(0);
  const [gameStatus, setGameStatus] = useState('');
  const [isFull, setIsFull] = useState(false);
  const [player, setPlayer] = useState(true);
  // state for single(true) vs multi(false) player mode
  const [mode, setMode] = useState(false)

  // this function handles updating the board state and also resetting it and also changing isFull and PlayerStatus if a reset is done
  const changeBoardHandler = (newBoard) => {
    setBoard(newBoard)
    if(newBoard !== initState) setBoardCount(prevState => prevState+=1)
    else {
      setIsFull(false)
      setPlayer(true)
      setBoardCount(0);
      setGameStatus('')
    }
  }

  const gameStatusHandler = (status) => {
    setGameStatus(status);
  }

  const boardIsFullHandler = () => {
    setIsFull(true)
  }

  const changePlayerHandler = () => {
    setPlayer(prevState => !prevState)
  }

  // console.log('app is being called');

  const changeModeHandler = () => {
    setMode(prevState => !prevState)
    changeBoardHandler(initState);
  }

  return (
    <div className="App">
      {isFull ? 
        <Fragment>
          <Backdrop onClick={() => changeBoardHandler(initState)} />
          <Modal>The game ended in a draw, try again!</Modal>
        </Fragment> : null
      }
      {gameStatus ? 
        <Fragment>
          <Backdrop onClick={() => changeBoardHandler(initState)} />
          <Modal>you {gameStatus} the game!</Modal>
        </Fragment> : null
      }

      <Board 
        board={board} 
        onBoardChange={changeBoardHandler}
        player = {player}
        onPlayerChange = {changePlayerHandler}
        isFull = {isFull}
        onFull = {boardIsFullHandler}
        boardCount = {boardCount}
        onStatusChange = {gameStatusHandler}
        mode = {mode}
      />
      <p>Current Player = {player? 'X': 'O'}</p>
      <p>Current Mode = {mode ? 'Single Player Mode' : 'Multi Player Mode'}</p>
      <div className="btn-container">
        <Button clickHandler = {() => changeBoardHandler(initState)}>Reset</Button>
        <Button clickHandler = {changeModeHandler}>
          ChangeMode
        </Button>
      </div>
    </div>
  );
}

export default App;
