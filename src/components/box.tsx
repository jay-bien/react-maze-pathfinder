import React from 'react'
import './box.css'


const box = ({ blocked, onBoxClick, r, c }: BoxProps) => {
  return (
    <div 
    className={`box ${blocked ? 'blocked':''}`}
    onClick={ ()=> onBoxClick(r, c)}
    >

    </div>
  )
}


export default box;


interface BoxProps {
    blocked: boolean,
    onBoxClick: clickHandler;
    r: number,
    c: number
}

type clickHandler = (row:number, col:number)=>void;