import React, {useEffect} from 'react'
import './node.css'


const node = ({ blocked, onNodeClick, onNodeDrag, r, c, start, end, visited }: NodeProps) => {

  function generateClassnames(){
    let classnames = `node `;
    blocked ? classnames+= 'blocked ': null;
    start ? classnames += 'start ': null;
    end ? classnames += 'end ': null;
    visited ? classnames += 'visited ': null;

    return classnames
  }




  return (
    <div 
    className={generateClassnames()}
    onClick={ ()=> onNodeClick(r, c)}
    onDrag={ ()=> onNodeDrag(r, c)}
    data-r={r}
    data-c={c}
    >
    </div>
  )
}


export default node;


interface NodeProps {
    blocked: boolean,
    visited: boolean,
    start: boolean,
    end: boolean,
    onNodeClick: clickHandler;
    onNodeDrag: dragHandler,
    r: number,
    c: number
}

type clickHandler = (row:number, col:number)=>void;
type dragHandler = (row:number, col:number) => void;