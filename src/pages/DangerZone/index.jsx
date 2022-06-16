import React, { useEffect } from "react";
import Style from './style.module.css';
import { useNavigate, useParams } from "react-router-dom";
import { useAtomValue } from "jotai";
import {authorizationAtom, userAtom} from '../../stores/auth';
import { API_URL } from "../../stores/api_url";

const DangerZone = () =>{

  const navigate = useNavigate();  
  const jwt = useAtomValue(authorizationAtom);
  const id = useAtomValue(userAtom);
  const idparams = useParams().id;

  useEffect(
    () =>{
      if(jwt == "" || id != idparams){
        navigate("/")
      }
    },[]
  )


  const deleteaccount = () =>{

    fetch(API_URL + 'users', {
      method: 'delete',
      headers: {
        'Authorization': jwt,
        'Content-Type': 'application/json'
      }
    })
    .then((response) => {return response.json()})
    .then((response) => {
      console.log(response);
      navigate('/');
    })
  }


  return(
    <div className={Style.dangerzonemain}>
      <h1>Danger Zone</h1>
      <p className={Style.danger} onClick={() => {
        if(window.confirm('êtes vous sur de supprimer votre compte ?'))
        {deleteaccount()};
      }}>Supprimer mon compte</p>
    </div>
  )
}

export default DangerZone;