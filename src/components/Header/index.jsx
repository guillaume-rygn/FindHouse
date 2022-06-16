import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAtom } from 'jotai';
import {userAtom, authorizationAtom} from '../../stores/auth';
import { API_URL } from "../../stores/api_url";
import './style.module.css';
import Cookies from 'js-cookie';


const Header = () => {

  const [authorizationapp, setAuthorizationapp] = useAtom(authorizationAtom);
  const [id, setId] = useAtom(userAtom);
  const navigate = useNavigate()

  const logout = () =>{
    fetch(API_URL + 'users/sign_out', {
      method: 'delete',
      headers: {
        'Authorization': authorizationapp,
        'Content-Type': 'application/json'
      }
    })
    .then((response) => {return response.json()})
    .then((response) => {
      setAuthorizationapp('');
      setId('');
      Cookies.set('id', "")
      Cookies.set('token', "")
      navigate('/')
    })
  }

  return(
    <header>
      <h1><Link to='/'><strong>Find</strong>House</Link></h1>
      <ul>
        <li><Link to='/'>Home</Link></li>
        {authorizationapp === ''?
        <>
          <li><Link to='/register'>S'inscrire</Link></li>
          <li><Link to='/login'>Se Connecter</Link></li> 
        </>
        :
        <>
          <li><Link to={'/myadvert/' + id}>Mes Annonces</Link></li>
          <li><Link to={'/profil/' + id}>Danger Zone</Link></li>
          <li onClick={logout}>Se Déconnecter</li>
        </>
         
      }

      </ul>
    </header>
  )
}

export default Header;