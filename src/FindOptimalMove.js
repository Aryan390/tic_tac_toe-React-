const player = 'o' , opponent = 'x';
// get the best move
const FindOptimalMove = (board) => {
  let bestVal = Number.MIN_VALUE;
  let bestMove = {
    row: -1,
    col: -1
  }
  
  // Traverse all cells, evaluate
  // minimax function for all empty
  // cells. And return the cell
  // with optimal value.
  for(let i = 0; i < 3; i++){
    for(let j = 0; j < 3; j++){
          
      if (board[i][j] === ''){
            
        board[i][j] = player;

        // compute evaluation function for move
        let moveVal = miniMax(board, 0, false);

        board[i][j] = '';

        // If the value of the current move
        // is more than the best value, then
        // update best
        if (moveVal > bestVal){
          bestMove.row = i;
          bestMove.col = j;
          bestVal = moveVal;
        }
      }
    }
  }
  return bestMove;
}


// function for performing the minimax algorithm
const miniMax = (board, depth, isMax) => {
  let score = evaulateBoard(board)

  if(score === 10) return score

  if(score === -10) return score

  if(!isMovesLeft(board)) return 0

  if(isMax){
    let best = Number.MIN_VALUE;

    for(let i = 0; i < 3; i++){
      for(let j = 0; j < 3; j++){
            
          if (board[i][j] === ''){
                
            board[i][j] = player;

            best = Math.max(best, miniMax(board,depth + 1, !isMax));

            board[i][j] = '';
          }
      }
    }
    return best;
  }else{
    let best = Number.MAX_VALUE;
  
    for(let i = 0; i < 3; i++) {
      for(let j = 0; j < 3; j++){
            
        if (board[i][j] === ''){
              
          board[i][j] = opponent;

          best = Math.min(best, miniMax(board,depth + 1, !isMax));

          board[i][j] = '';
        }
      }
    }
    return best;
  }  
}



// to check if no moves left on the board
const isMovesLeft = (board) => {
  for(let i = 0; i<3; i++){
    for(let j = 0; j< 3; j++){
      if(board[i][j] === '') return true
    }
  }
  return false;
}

const evaulateBoard = (board) => {
  // check for rows
  for(let i = 0 ; i< 3; i++){
    if(board[i][0]=== 'x' && board[i][1]==='x' && board[i][2]==='x') return 10;
    else if(board[i][0]=== 'o' && board[i][1]==='o' && board[i][2]==='o') return -10
  }

  // check for columns
  for(let i = 0 ; i< 3; i++){
    if(board[0][i]=== 'x' && board[1][i]==='x' && board[2][i]==='x') return 10;
    if(board[0][i]=== 'x' && board[1][i]==='x' && board[2][i]==='x') return -10
  }

  // check for diagonals
  if (board[0][0] === board[1][1] && board[1][1] === board[2][2]){
    if (board[0][0] === 'x') return 10;
    else if (board[0][0] === 'o') return -10;
  }

  if (board[0][2] === board[1][1] && board[1][1] === board[2][0]){
    if (board[0][2] === 'x') return 10;   
    else if (board[0][2] === 'o') return -10;
  }

  // if none of them have won
  return 0;
}

export default FindOptimalMove