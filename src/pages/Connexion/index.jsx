import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useAtom } from 'jotai';
import {userAtom, authorizationAtom} from '../../stores/auth';
import { API_URL } from '../../stores/api_url';
import Style from './style.module.css';
import connexionhouse from '../../ressources/connexionhouse.png';
import Cookies from 'js-cookie';


const Authentification = () => {

  const navigate = useNavigate();

  const [userapp, setUserapp] = useAtom(userAtom);
  const [emailapp, setEmailapp] = useState();
  const [passwordapp, setPasswordapp] = useState();
  const [authorizationapp, setAuthorizationapp] = useAtom(authorizationAtom);


  function FetchData(e){
    e.preventDefault();
 
    const data = {
      "user" :{
        "email": emailapp,
        "password": passwordapp
     }
    };

    fetch(API_URL + 'users/sign_in', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then((response) => {   
      console.log([...response.headers.get('authorization')].join('').split(" ")[1])
      setAuthorizationapp([...response.headers.get('authorization')].join(''));
      Cookies.set('token', [...response.headers.get('authorization')].join(''))
      return response.json()
    })
    .then((response) => {
      console.log(response)
      setUserapp(response.user.id);
      Cookies.set('id', response.user.id)
      navigate('/')
    })
  }

  return(
    <div className={Style.mainconnexion}>
      <h1>Se Connecter</h1>
      <form onSubmit={FetchData}>
        <input type="text" placeholder='email' id="email" onChange={(e) => setEmailapp(e.target.value)}></input>
        <input type="password" placeholder='password' id="password" onChange={(e) => setPasswordapp(e.target.value)}></input>
        <button type='submit' >Envoyer</button>

      </form>
      <div className={Style.imgconnexion}>
        <img src={connexionhouse}></img>
      </div>
    </div>
    
  )
}

export default Authentification;