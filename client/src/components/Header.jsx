import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../context/UserContext";

export default function Header() {
    // const [username, setUsername] = useState(null);
    const{setUserInfo, userInfo} = useContext(UserContext);
    useEffect(() => {
        fetch('http://localhost:4000/profile', {
            credentials: 'include',
        }).then(response => {
            response.json().then(userInfo => {
                // setUsername(userInfo.username);
                setUserInfo(userInfo);
            })
        });
    }, []);

    function Logout() {
        fetch('http://localhost:4000/logout', {
            credentials: 'include',
            method: 'POST',
        });
        setUserInfo(null);
    };
    
    const username = userInfo?.username;

    return (
        <header>
            <Link to="/" className="logo">Blog</Link>
            
            <nav>
                {username && (
                    <>
                        <Link to="/create">Create new post</Link>
                        <a href="" onClick={Logout}>Logout</a>
                    </>
                )}
                {!username && (
                    <> 
                        <Link to="/login">Login</Link>
                        <Link to="/register">Register</Link>
                    </>
                )}
                
            </nav>
        </header>
    )
};
