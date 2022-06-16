import React, { useEffect, useState } from "react";
import Style from './style.module.css';
import { Link, useNavigate, useParams } from "react-router-dom";
import { API_URL } from "../../stores/api_url";
import Card from "../../components/Card";
import { useAtomValue } from "jotai";
import {authorizationAtom} from '../../stores/auth';

const MyAdvert = () =>{

  const id = useParams().id;
  const [myadvert, setMyadvert] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const jwt = useAtomValue(authorizationAtom);

  const navigate = useNavigate();

  useEffect(
    ()=>{
      if(jwt == ""){
        navigate("/")
      }
      fetch(API_URL + 'adverts', {
        method: 'get',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then((response) => {return response.json()})
      .then((response) => {
        setMyadvert(response.filter(element => element.user_id == id))
        setIsLoading(false)
      })
    }, [MyAdvert]
  )
    

  return(
    <div className={Style.mainmyadvert}>
      <h1>Mes Annonces</h1>
      <Link to={'/customadvert/' + id} className={Style.btn}>Créer une annonce</Link>
      {isLoading ? <p><i className="fa-2x fas fa-circle-notch fa-spin"></i></p> : null}
      <div className={Style.cardlist}>
        {myadvert.length < 1 ? <p>Vous n'avez pas encore d'annonce posté sur le site !</p> : myadvert.map(advert => {return(
          <Card advert={advert} key={advert.id}/>        
        )})}
      </div>
    </div>
  )
}

export default MyAdvert;