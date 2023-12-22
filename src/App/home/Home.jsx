import React, { useContext } from 'react'
import '../style.css'
import { signOut } from "firebase/auth"
import { auth } from '../../firebase'
import { AuthContext } from '../../context/AuthContext'

export const Home = () => {
    const { currentUser } = useContext(AuthContext)
    return (
        <div className="home">
            <>
                <span>{currentUser.displayName}</span>
                <button onClick={() => signOut(auth)}>logout</button>

                <div className="chat_window">
                    <div className="top_menu">
                        <div className="buttons">
                            <div className="button close" />
                            <div className="button minimize" />
                            <div className="button maximize" />
                        </div>
                        <div className="title">Chat</div>
                    </div>
                    <div className="p_message">

                        <div className="message owner">
                            <div className="messageInfo">
                                <img src="https://images.pexels.com/photos/19560945/pexels-photo-19560945/free-photo-of-a-girl-with-long-hair-standing-by-a-window.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load" alt="" />
                            </div>
                            <div className="messageContent">
                                <p>Hello</p>
                            </div>
                        </div>
                    </div>

                    <div className="bottom_wrapper clearfix">
                        <div className="message_input_wrapper">
                            <input
                                className="message_input"
                                placeholder="Type your message here..."
                            />
                        </div>
                        <div className="send_message">
                            <div className="icon" />
                            <div className="text">Send</div>
                        </div>
                    </div>
                </div>
                <div className="message_template">
                    <li className="message">
                        <div className="avatar" />
                        <div className="text_wrapper">
                            <div className="text" />
                        </div>
                    </li>
                </div>
            </>


        </div>
    )
}
