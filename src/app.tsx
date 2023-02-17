import { useState, useEffect } from 'preact/hooks'
import preactLogo from './assets/preact.svg'
import './app.css'

import { Node } from './components';



export function App() {
  const [count, setCount] = useState(0);
  const [grid, setGrid ] = useState<number[][]>([[]]);


  function toggleBlock(row:number, col: number):void{
    let newGrid: number[][] = [...grid];
    newGrid[row][col] = Status.blocked;
    console.log("CLICK");
    setGrid( newGrid );
  }

function bfs( matrix: number[][], r:number, c:number, memo:{[key:string]: boolean}){
  //check for out of bounds
  if( r < 0 || r >= matrix.length) return;
  if( c < 0 || c >= matrix[r].length) return;
  // check if we visited this before
  if(`${r},${c}` in memo) return;

  //check if we reached the end


  //mark as visited
  const key = `${r},${c}`;
  memo[key] = true;

  //recurse in all directions

}

  useEffect(()=>{
    const initGrid = new Array(30).fill(null).map( el => { return el = new Array(50).fill( Status.empty ) })
    initGrid[0][0] = Status.start;
    initGrid[ initGrid.length - 1][ initGrid[0].length - 1 ] = Status.end;
    setGrid( initGrid );

    return ()=>{}
  },[])
  return (
    <>
    <div className={'header'}>

    </div>
    <div className='grid'>
            {
        grid?.map( (row, rowIndex) => {
          return( 
            <div className={'row'}> 
              {
              row.map( (el, colIndex) => 
                <Node 
                  blocked={ el === Status.blocked ? true:false} 
                  onBoxClick={toggleBlock} r={rowIndex} c={colIndex}
                  start={ el === Status.start ? true: false}
                  end={ el === Status.end ? true: false }
                  />)
              }
            </div>
          )
        })
      }
    </div>

    </>
  )
}



enum Status {
  empty = 0,
  start=1,
  end=5,
  blocked = 2,
}

type Memo = {
  [key:string]: boolean
}