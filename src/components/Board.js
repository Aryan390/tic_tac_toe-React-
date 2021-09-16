// the below is not a component but a implementaion of the minimax algorithm
import FindOptimalMove from '../FindOptimalMove';

import classes from './Board.module.css'

const Board = (props) => {

  const clickHandler = (e) => {
    // if props.mode is true, then single player mode, else multiplayer mode
    if(props.mode){
      singlePlayer(e);
      return    
    }
    multiPlayer(e)   
  }

  // singleplayer mode function
  const singlePlayer = (e) => {
    const {player, currentPosition, board} = getBoardParams(e);

    if(currentPosition !== undefined){
      // updates the current board and app state if the position is not taken already
      let {i, j} = getCoords(currentPosition)

      if(board[i][j] === ''){
        board[i][j] = player;
        let status = checkGameStatus(player, currentPosition, board);

        if(status) props.onStatusChange(status)
        
        props.onBoardChange(board);
      }
    }else return
    const {row, col} = FindOptimalMove(board)
    if(row!== -1 && col!== -1){
      board[row][col] = 'o'
      let status = checkGameStatus(player, currentPosition, board);

      if(status) props.onStatusChange(status)

      props.onBoardChange(board);
    }
  }

  // gets the current player, the position of the cell and also the copy of the board
  const getBoardParams = (e) =>{
    // copy of the state player
    const player = props.player ? 'x' : 'o';
    // position of the clicked cell in the board
    let currentPosition = undefined;
    // get a copy of the state board
    let board = [...props.board.map(elem => [...elem])]

    for(let k = 0 ; k < 9; k++){
      if(e.target.dataset.item === k.toString()) currentPosition = k;
    }

    return {
      player,
      currentPosition,
      board
    }
  }

  // multiplayer mode function
  const multiPlayer = (e) => {
    const {player, currentPosition, board} = getBoardParams(e);

    // this is needed because if the user clicks in the gap of the board, currentPosition or e.target.dataset.item will be undefined which will crash the app, so this check is necessary
    if(currentPosition !== undefined){
      // updates the current board and app state if the position is not taken already
      let {i, j} = getCoords(currentPosition)

      if(board[i][j] === ''){
        board[i][j] = player;
        let status = checkGameStatus(player, currentPosition, board);

        if(status) props.onStatusChange(status)
        
        props.onBoardChange(board);
        props.onPlayerChange();
        
      }
    }else return

    // if the code comes till here and there is no winner yet , then automatically it is a draw
    if(props.boardCount === 8) props.onFull();
  }

  // getting coordinates of the array derived from the number position
  const getCoords = (currentPosition) => {
    return {
      i : Math.floor(currentPosition / 3),
      j : currentPosition % 3
    }
  }       

  // return 'win' , 'loss' status depending on the condition of the state board
  // here the draw position is implied as this function will return false , which will continue the game instead of quitting eventually leading to a draw
  const checkGameStatus = (player, position, board) => {
    const {i: x, j: y} = getCoords(position); 
    let win = false;
    // check for columns
    if(x===0){
      if(board[x+1][y] === player && board[x+2][y] === player) win=true;
    }else if(x===1){
      if(board[x-1][y] === player && board[x+1][y] === player) win=true;
    }else if(x===2){
      if(board[x-1][y] === player && board[x-2][y] === player) win=true;  
    }

    // check for rows
    if(y===0){
      if(board[x][y+1] === player && board[x][y+2] === player) win=true;
    }else if(y===1){
      if(board[x][y-1] === player && board[x][y+1] === player) win=true;
    }else if(y===2){
      if(board[x][y-2] === player && board[x][y-1] === player) win=true;
    }

    // check for diagonals
    if(x===0){
      if(board[x+1][x+1] === player && board[x+2][x+2] === player) win = true;
      if(board[x+1][x+1] === player && board[x+2][x] === player) win = true;
    }else if(x===1){
      if(board[x-1][x-1] === player && board[x+1][x+1] === player) win = true;
      if(board[x-1][x+1] === player && board[x+1][x-1] === player) win = true;

    }else if(x===2){
      if(board[x-1][x-1] === player && board[x-2][x-2] === player) win = true;
      if(board[x-1][x-1] === player && board[x-2][x] === player) win = true;
    }


    if(player === 'x' && win) return 'win'
    else if(player === 'o' && win) return 'lose'

    return false;
  }

  return (
    <div className={classes.board} onClick={clickHandler}>
      <div className={classes.cell} data-item='0'>{props.board[0][0].toString()}</div>
      <div className={classes.cell} data-item='1'>{props.board[0][1].toString()}</div>
      <div className={classes.cell} data-item='2'>{props.board[0][2].toString()}</div>
      <div className={classes.cell} data-item='3'>{props.board[1][0].toString()}</div>
      <div className={classes.cell} data-item='4'>{props.board[1][1].toString()}</div>
      <div className={classes.cell} data-item='5'>{props.board[1][2].toString()}</div>
      <div className={classes.cell} data-item='6'>{props.board[2][0].toString()}</div>
      <div className={classes.cell} data-item='7'>{props.board[2][1].toString()}</div>
      <div className={classes.cell} data-item='8'>{props.board[2][2].toString()}</div>
    </div>
  )
}

export default Board;