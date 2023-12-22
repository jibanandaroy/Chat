import React, { useEffect, useState,useContext } from 'react'
import { db } from "../../firebase";
import '../style.css'
import { AuthContext } from '../../context/AuthContext'
import {
    collection,
    getDocs,
    query,

} from "firebase/firestore";
import { createSearchParams, useNavigate } from 'react-router-dom';

export const UserList = () => {
    const { currentUser } = useContext(AuthContext)
    const navigate = useNavigate()
    const [user, setUser] = useState([])
    const userCollectionRef = collection(db, "users");

    useEffect(() => {
        getAllUser()
    }, [])

    const getAllUser = async () => {
        const res = await getDocs(userCollectionRef);
        const users = res.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
        const updateUsers = users.filter((user)=>user.id!=currentUser.uid)
        setUser(updateUsers);
    }

   const HandleUser = (id,name)=>{
    navigate({
        pathname: "/",
        search: createSearchParams({
            id,
            name
        }).toString()
    });
   }

    return (
        <div>
            <div className="user">
                <table>
                    <thead>
                        <tr>
                            <th>name</th>
                            <th>id</th>
                        </tr>
                    </thead>
                    <tbody>
                        {user&& user.map((doc, ind) => (
                            <tr key={ind}>
                                <td>{doc.displayName}</td>
                                <td>{doc.uid}</td>
                                <td onClick={()=>HandleUser(doc.uid,doc.displayName)}><button>send</button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>


            </div>
        </div>
    )
}
