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
  const [allmessage, setAllmessage] = useState([]);
  const [sender, setSender] = useState("");
  const [senderid, setSenderid] = useState("");
  const [contentsender, setContentsender] = useState("");

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
          setSend(response)
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
        setReceive(response)
      })
    },[]
  )

  const show = (e) =>{
    fetch(API_URL + 'user/' + e.sender, {
      method: 'get',
      headers: {
        'Authorization': jwt,
        'Content-Type': 'application/json'
      }
    })
    .then((response) => {return response.json()})
    .then((response) => {
      setSender(response.email);
      setSenderid(response.id);
       
    })
  }
  

  return(
    <>
      <div className={Style.dangerzonemain}>
        <h1>Danger Zone</h1>
        <p className={Style.danger} onClick={() => {
          if(window.confirm('êtes vous sur de supprimer votre compte ?'))
          {deleteaccount()};
        }}>Supprimer mon compte</p>
      </div>
      <div>
        <h1>Messagerie</h1>
        <div className={Style.messagetab}>
          <div className={Style.usertab}>
          {receive.map(element =>{
            if(element.user_id == Number(id)){
              return(
                <>
                  <p key={element.id} className={Style.cardrecapmessage} id={element.sender} onClick={() => {
                    setContentsender(element.content);
                    show(element);
                    }}>{element.content.length > 15? element.content.slice(0,15) + "..." : element.content}</p>
                </>
                
              )
            }
            
          })}
          </div>
          <div className={Style.contenttab}>
            <p><u>mail :</u> {sender}</p>
            <p><u>content :</u></p>
            {contentsender == ""? 
              null
            :
              <p className={Style.messagereceive}>{contentsender}</p>
            }
          <div>

            </div>
          </div>
        </div>

      </div>
    </>
  )
}

export default DangerZone;