import React, { useContext, useEffect, useRef, useState } from 'react'
import '../style.css'
import { signOut } from "firebase/auth"
import { auth } from '../../firebase'
import { AuthContext } from '../../context/AuthContext'
import { db } from "../../firebase";
import {
    collection,
    addDoc,
    query,
    orderBy,
    limit,
    onSnapshot,
    serverTimestamp
} from "firebase/firestore";
import { useNavigate,  useSearchParams } from 'react-router-dom'


export const Home = () => {
    const navigate = useNavigate()
    const [param]=useSearchParams()
    const id= param.get('id')
    const name= param.get('name')
    
    const [message, setMessage] = useState([]);
    const { currentUser } = useContext(AuthContext)
    const messageCollectionRef = collection(db, "messages");
    const [data, setData] = useState({
        uid: currentUser.uid,
        text: '',
        senderid: id,
        createdAt: serverTimestamp()
    })


    useEffect(() => {
        getAllMessage()
    }, [])

    const HandleSend = async () => {
        addDoc(messageCollectionRef, data)
        setData((prev) => ({ ...prev, text: '' }))
    }

    const getAllMessage = async () => {
        const q = query(collection(db, "messages"), orderBy("createdAt"), limit(50));
        onSnapshot(q, (snapshot) => {
            const a = []
            snapshot.forEach((doc) => {
                a.push({ ...doc.data(), id: doc.id })

            })
            setMessage(a)
        })
    };


    const ref = useRef();

    useEffect(() => {
        ref.current?.scrollIntoView({ behavior: "smooth" });
    }, [message]);

    const handleuser = ()=>{
        navigate('/user')
    }
    return (
        <div  className="home">

            <>
                
                <button className='btn' onClick={() => signOut(auth)}>logout</button>
                <button className='btn' onClick={handleuser}>userList</button>
                <span>{currentUser.displayName}</span>

                <div className="chat_window">
                    <div className="top_menu">
                        <span>{name}</span>
                        <div className="title">Live Chat</div>
                        
                       
                    </div>

                    <div className="p_message" >
                        {message.map((doc, index) => (
                            <div key={doc.id}>
                                {
                                    (doc.uid === id) ?
                                        <div className="user_message" >
                                            <div className="user_messageInfo">
                                                <img src="https://images.pexels.com/photos/19560945/pexels-photo-19560945/free-photo-of-a-girl-with-long-hair-standing-by-a-window.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load" alt="" />
                                            </div>
                                            <div className="user_messageContent">
                                                <p>{doc.text}</p>
                                            </div>
                                        </div> :
                                        (doc.uid === currentUser.uid)?
                                        < div className="message owner" >
                                            <div className="messageInfo">
                                                <img src="https://images.pexels.com/photos/19486301/pexels-photo-19486301/free-photo-of-model-in-a-blue-coat-on-the-terrace.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load" alt="" />
                                            </div>
                                            <div ref={ref} className="messageContent">
                                                <p>{doc.text}</p>
                                            </div>
                                        </div>:''
                                }
                            </div>

                        ))}
                    </div>

                    <div className="bottom_wrapper clearfix">
                        <div className="message_input_wrapper">
                            <input
                                className="message_input"
                                type='text'
                                placeholder="Type your message here..."
                                value={data.text}
                                onChange={(e) => setData((prev) => ({ ...prev, text: e.target.value }))}
                            />
                        </div>
                        <div className="send_message" onClick={HandleSend}>
                            <div className="icon" />
                            <div className="text" >Send</div>
                        </div>
                    </div>
                </div>
                {/* <div className="message_template">
                    <li className="message">
                        <div className="avatar" />
                        <div className="text_wrapper">
                            <div className="text" />
                        </div>
                    </li>
                </div> */}
            </>


        </div >
    )
}
