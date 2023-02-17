import React from 'react'
import './node.css'


const node = ({ blocked, onBoxClick, r, c, start, end, visited }: NodeProps) => {

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
    onClick={ ()=> onBoxClick(r, c)}
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
    onBoxClick: clickHandler;
    r: number,
    c: number
}

type clickHandler = (row:number, col:number)=>void;