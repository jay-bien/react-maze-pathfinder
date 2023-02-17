import { useState, useEffect } from 'preact/hooks'
import preactLogo from './assets/preact.svg'
import './app.css'

import { Box } from './components';



export function App() {
  const [count, setCount] = useState(0);
  const [grid, setGrid ] = useState<number[][]>([[]]);


  function blockBox(row:number, col: number):void{

    let newGrid: number[][] = [...grid];
    newGrid[row][col] = Status.blocked;
    console.log("CLICK");
    setGrid( newGrid );
  }

  useEffect(()=>{
    const initGrid = new Array(80).fill(null).map( el => { return el = new Array(50).fill( Status.empty ) })
    setGrid( initGrid );
    return ()=>{}
  },[])
  return (
    <>
    <div className='grid'>
            {
        grid?.map( (row, rowIndex) => {
          return( 
            <div className={'row'}> 
              {
              row.map( (el, colIndex) => 
                <Box blocked={ el === Status.blocked ? true:false} onBoxClick={blockBox} r={rowIndex} c={colIndex}/>)
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
  blocked = 2,
}