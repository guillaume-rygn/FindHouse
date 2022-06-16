import React, { useEffect, useState } from "react";
import Style from './style.module.css';
import { useNavigate, useParams } from "react-router-dom";
import { useAtomValue } from "jotai";
import {authorizationAtom, userAtom} from '../../stores/auth';
import { API_URL } from "../../stores/api_url";
import { createPortal } from "react-dom";

const DangerZone = () =>{

  const navigate = useNavigate();  
  const jwt = useAtomValue(authorizationAtom);
  const id = useAtomValue(userAtom);
  const idparams = useParams().id;
  const [receive, setReceive] = useState([]);
  const [send, setSend] = useState([]);
  const [alluser, setAlluser] = useState([]);

  const [displaymessage, setDisplaymessage] = useState([]);

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

  useEffect(
    () =>{
      fetch(API_URL + 'sends', {
        method: 'get',
        headers: {
          'Authorization': jwt,
          'Content-Type': 'application/json'
        }
      })
      .then((response) => {return response.json()})
      .then((response) => {
        setSend(response);
        console.log(response)
      })
    },[]
  )

  useEffect(
    () =>{
      fetch(API_URL + 'receives', {
        method: 'get',
        headers: {
          'Authorization': jwt,
          'Content-Type': 'application/json'
        }
      })
      .then((response) => {return response.json()})
      .then((response) => {
        setReceive(response);
        console.log(response)
      })
    },[]
  )

  const fetchuser = () =>{
    fetch(API_URL + 'users', {
      method: 'get',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then((response) => {return response.json()})
    .then((response) => {
      setAlluser(response);
      console.log(response)
    })
  }
  console.log("fojfeofe")
  console.log(displaymessage)
  console.log("fojfeofe")

  return(
    <>
      <div className={Style.dangerzonemain}>
        <h1>Danger Zone</h1>
        <p className={Style.danger} onClick={() => {
          if(window.confirm('êtes vous sur de supprimer votre compte ?'))
          {deleteaccount()};
        }}>Supprimer mon compte</p>
      </div>

    </>
  )
}

export default DangerZone;