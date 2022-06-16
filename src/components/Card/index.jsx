import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { userAtom } from "../../stores/auth";
import { useAtomValue } from "jotai";
import Style from './style.module.css';
import { API_URL } from "../../stores/api_url";
import picture from '../../ressources/housecard.jpg'

const Card = ({advert}) => {

  const id = useAtomValue(userAtom);
  const navigate = useNavigate();
  const [number, setNumber] = useState(0);

  const [picturecard, setPicturecard] = useState('');
  const [arrayimage, setArrayimage] = useState(advert.pictures_url)

  const Modify = (e) => {
    e.preventDefault();
    navigate('/modify/' + advert.id)
  }

  const Delete = (e) => {
    e.preventDefault();
    
    if(window.confirm('êtes vous sur de supprimer votre compte ?')){
      fetch(API_URL + 'adverts/' + advert.id, {
        method: 'delete',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then((response) => {
        console.log('ici')
        navigate('/');
      })
    }
  }

  const leftimage = (e) =>{
    e.preventDefault();
    setNumber(number - 1)
  }

  const rightimage = (e) =>{
    e.preventDefault()
    setNumber(number + 1)
  }

  useEffect(
    ()=>{
      if(arrayimage){
      if(number < 0){
        setNumber(arrayimage.length - 1)
      }
      if(number > arrayimage.length - 1){
        setNumber(0)
      }
    }
    },[number]
  )

  return(
    <Link to={'/house/' + advert.id} advert={advert} className={Style.card}>

        {advert.pictures_url == null || advert.pictures_url.length < 1? 
        <img src={picture} className={Style.housepicture}></img>
        :
        
        <div className={Style.arrow}>
          <img src={advert.pictures_url[number]} className={Style.housepicture}></img>
          {arrayimage.length > 1?
          <>
            <span className={Style.left} onClick={(e) => leftimage(e)}><i className="fa-solid fa-circle-chevron-left" ></i></span>
            <span className={Style.right} onClick={(e) => rightimage(e)}><i className="fa-solid fa-circle-chevron-right"></i></span>
          </>
          
          :
          null
        }
          
        </div>
       
        }

      <div className={Style.contentcard}>
        <h4>{advert.price}€</h4>
        <h5>{advert.city} {advert.zip_code} <i className="fa-solid fa-location-dot"></i></h5>
        <div className={Style.iconcard}>
        <p>{advert.room} <i className="fa-solid fa-bed"></i></p>
        <p>|</p>
        <p>{advert.bathroom} <i className="fa-solid fa-bath"></i></p>
        <p>|</p>
        <p>&nbsp;{advert.area}m² <i className="fa-solid fa-chart-area"></i></p>
        </div>
        {advert.user_id == id? <div className={Style.flexbtn}><button onClick={Modify}>Modifier</button><button onClick={Delete}>Supprimer</button></div> : null}
      </div>
      
    </Link>
  )
}

export default Card;