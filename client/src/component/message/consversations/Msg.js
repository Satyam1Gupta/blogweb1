import React from 'react'
import "./msg.css"
import {format} from "timeago.js"
export default function Msg({message,own}) {
  return (
    <div className={own? "msg own":"msg"}>
        <div className="msgTop">
            <img
            className='msgImg'
             src="https://images.unsplash.com/photo-1457449940276-e8deed18bfff?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80"
             alt="img" />
            <p className='msgText'>{message?.text}</p>
        </div>
        <div className="msgBottom">{format(message?.createdAt)}</div>
    </div>
  )
}
