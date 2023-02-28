import { useState, useEffect } from 'preact/hooks'
import preactLogo from './assets/preact.svg'
import './app.css'

import { Node } from './components';



export function App() {
  const [count, setCount] = useState(0);
  const [grid, setGrid ] = useState<number[][]>([[]]);
  const [ history, setHistory ] = useState<{r:number, c:number}[]>([]);


  function toggleBlock(row:number, col: number):void{
    let newGrid: number[][] = [...grid];
    newGrid[row][col] = Status.blocked;
    console.log("CLICK");
    setGrid( newGrid );
  }

  
  function search(){
    dfs( [...grid], 0, 0, {}, [])
  }

function dfs( matrix: number[][], r:number, c:number, memo:{[key:string]: boolean}, path:{r:number, c:number}[]){
  //check for out of bounds
  if( r < 0 || r >= matrix.length) {
    path.pop();
    return
  } ;
  if( c < 0 || c >= matrix[r].length) {
    path.pop();
    return
  };
  // check if we visited this before
  if(`${r},${c}` in memo) {
    path.pop(); 
    return;
  };
  //check if path is blocked
  if(matrix[r][c] === Status.blocked) {
    path.pop();
    return;
  };

  //add curr node to path history

  //check if we reached the end
  if( matrix[r][c] === Status.end ) {
    // end code
    if( !history.length) setHistory( path );
    if(path.length < history.length) setHistory( path );
    console.log("found")
    return;
  }

  //mark as visited
  const key = `${r},${c}`;
  memo[key] = true;
  matrix[r][c] = Status.explored;
  path.push({r, c});
  setGrid( matrix );

  //recurse in all directions
  dfs( matrix, r+1, c, memo, [...path]);
  dfs( matrix, r-1, c, memo, [...path]);
  dfs( matrix, r, c+1, memo, [...path]);
  dfs( matrix, r, c-1, memo, [...path]);
  return;
}
function attachDragListener( el: Element ){
  console.log( el )
  el.addEventListener( 'dragover', (event)=> {
    console.log( el );
    let r =parseInt( el.getAttribute('data-r')! );
    let c = parseInt( el.getAttribute('data-c')! );
    toggleBlock( r, c);
    console.log(r, c )
    

  })
}

function onNodeDrag(r: number, c:number){

}

  useEffect(()=>{
    const initGrid = new Array(30).fill(null).map( el => { return el = new Array(50).fill( Status.empty ) })
    initGrid[0][0] = Status.start;
    initGrid[ initGrid.length - 1][ initGrid[0].length - 1 ] = Status.end;
    setGrid( initGrid );


    const nodes = document.querySelectorAll('.node');
    nodes.forEach(attachDragListener);

    return ()=>{}
  },[])
  return (
    <>
    <div className={'header'}>

      <button onClick={()=>{ search()}}> Start Searrch </button>
      {/* {history && history.length && history.map( (entry, index)=>{
        return<p>{JSON.stringify( entry )}</p>
      })} */}
      { history.length }
      
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
                  onNodeClick={toggleBlock} r={rowIndex} c={colIndex}
                  onNodeDrag={onNodeDrag}
                  start={ el === Status.start ? true: false}
                  end={ el === Status.end ? true: false }
                  visited={ el === Status.explored ? true : false}
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
  explored=3,
}

type Memo = {
  [key:string]: boolean
}