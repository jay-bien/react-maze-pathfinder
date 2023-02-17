import React from 'react'
import './node.css'


const node = ({ blocked, onBoxClick, r, c }: NodeProps) => {
  return (
    <div 
    className={`node ${blocked ? 'blocked':''}`}
    onClick={ ()=> onBoxClick(r, c)}
    >

    </div>
  )
}


export default node;


interface NodeProps {
    blocked: boolean,
    onBoxClick: clickHandler;
    r: number,
    c: number
}

type clickHandler = (row:number, col:number)=>void;