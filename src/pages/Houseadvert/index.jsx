import React, {useEffect, useRef, useState} from "react";
import Style from './style.module.css';
import { useNavigate, useParams } from "react-router-dom";
import { API_URL } from "../../stores/api_url";
import housepicture from '../../ressources/housecard.jpg';
import { Link } from "react-router-dom";
import { useAtomValue } from "jotai";
import {authorizationAtom, userAtom} from '../../stores/auth';
import Card from "../../components/Card";

const Houseadvert = () => {

  const id = useParams().id;
  const [house, setHouse] = useState("");
  const [owner, setOwner] = useState("");
  const jwt = useAtomValue(authorizationAtom);

  const iduser=  useAtomValue(userAtom);
  const [isLoading,setIsLoading] = useState(true);
  const [recommandation, setRecommandation] = useState("");
  const navigate = useNavigate();
  const [picture, setPicture] = useState('');

  const[message, setMessage] = useState('');


  useEffect(
    () => {
      fetch(API_URL + 'adverts/' + id, {
        method: 'get',
        headers: {
         'Content-Type': 'application/json'
        }
      })
      .then((response) => response.json())
      .then((response) => {
        setHouse(response); 
        setPicture(response.pictures_url[0])
        console.log(response)  

        fetch(API_URL + 'user/' + Number(response.user_id), {
          method: 'get',
          headers: {
           'Content-Type': 'application/json'
          }
        })
        .then((response) => response.json())
        .then((response) => {
          setOwner(response)
          console.log(response)
          fetch(API_URL + 'adverts', {
            method: 'get',
            headers: {
             'Content-Type': 'application/json'
            }
          })
          .then((response) => response.json())
          .then((response) => {
            setRecommandation(response)
            setIsLoading(false)
          })
        })
      })

    }, [id]
  )

  const newimage = (e) =>{
    setPicture(e.target.src)
  }


  const sendMessage = (e) =>{
    e.preventDefault();

    if(message === ""){
      document.getElementById('error').textContent = "Merci de compléter le champ texte"
    } else {

 
      const data = {
        "send" :{
          "content": message,
          "receiver": owner.id,
          'user_id': iduser,
          'advert_id': house.id
       }
      };

      fetch(API_URL + '/sends', {
        method: 'post',
        headers: {
         'Authorization': jwt,
         'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
      .then((response) => response.json())
      .then((response) => {
        console.log(response)
        console.log("message créé");
        document.getElementById('error').textContent = "Votre message a bien été envoyé";
        setMessage("");
      })
    }

  }
  
  return(
    <>
    {isLoading?
      <p className={Style.icon}><i className="fa-2x fas fa-circle-notch fa-spin"></i></p>
    :
    <>
        <div className={Style.housebanner}>
          { house.pictures_url == null || house.pictures_url.length < 1?         
            <img src={housepicture}></img>
          :
            <img src={picture}></img>
          }
        </div>
        <div className={Style.mainminiimage}>
          {house.pictures_url !== null && house.pictures_url.length > 0?
            house.pictures_url.map((element,index) =>{
              if(picture == element){
                return(
                  <img src={house.pictures_url[index]} className={Style.miniimageselected}></img>
                )
              } else{
                return(
                  <img src={house.pictures_url[index]} className={Style.miniimage} onClick={newimage}></img>
                )
              }
              
            })           
          :
            null
          }
        </div>
        <div className={Style.contentcard}>
          <h3>{house.description}</h3>
          <h4>{house.price}€</h4>
          <h5>{house.address} {house.city} {house.zip_code} <span className={Style.dot}><i className="fa-solid fa-location-dot"></i></span></h5>
          <div className={Style.flex}>
            <div className={Style.iconcard}>
            <p>{house.room} <i className="fa-solid fa-bed"></i></p>
            <p>|</p>
            <p>{house.bathroom} <i className="fa-solid fa-bath"></i></p>
            <p>|</p>
            <p>&nbsp;{house.area}m² <i className="fa-solid fa-chart-area"></i></p>
          </div>
          </div>
          
        
        <h4><u>Les <span className={Style.dot}>+</span> du bien :</u></h4>
        {house.garage? <p>Garage inclus</p> : null}
        {house.garden? <p>Un grand jardin</p> : null}

        <p>Mail du vendeur : {jwt == ""? <span>Merci de vous <Link to="/login"><span className={Style.dot}>connecter</span></Link> pour voir cette information</span> : owner.email}</p>
        <br></br>
        <p>Envoyer un message instanné au vendeur : {jwt == ""? <span>Merci de vous <Link to="/login"><span className={Style.dot}>connecter</span></Link> pour voir envoyer votre message</span> : 
        
        <>
          <form id="formmessage" onSubmit={sendMessage} className={Style.flexinputmessage}>
            <textarea rows="5" cols="30" placeholder="Votre message..." value={message} onChange={(e) => setMessage(e.target.value)}></textarea>
            <button className={Style.searchbtn}>Envoyer mon message</button>
          </form>
          <p id="error"></p>
        </>

        }</p>
        <br></br>         
      </div>
      <h3 className={Style.center}>Vous aimerez aussi :</h3>
      <div className={Style.flexcard}>
          {recommandation.filter(element => (element.price < house.price + 80000 && element.price > house.price - 80000 && element.id !== house.id) || (element.type == house.type && element.id !== house.id)).slice(0,3).map(advert => {
          return(<Card advert={advert} key={advert.id}/>)
          })}
      </div>
    </>
    }

    </>
  )
}

export default Houseadvert;