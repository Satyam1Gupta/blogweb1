import React from 'react'
import './chatOnline.css'

export default function ChatOnline() {
  return (
    <div>
        <div className="chatOnline">
            <div className="chatOnlineFriend">
                <div className="chatOnlineImgContainer">
                    <img 
                      src="https://images.unsplash.com/photo-1457449940276-e8deed18bfff?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80"
                      className='chatOnlineImg' />
                      <div className="chatOnlineBadge"></div>
                </div>
                <span className="chatOnlineName">gussail pari</span>
            </div>
        </div>
    </div>
  )
}
