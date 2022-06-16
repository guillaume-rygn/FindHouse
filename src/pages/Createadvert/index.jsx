import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import { useAtomValue } from 'jotai';
import { API_URL } from '../../stores/api_url';
import Style from './style.module.css';
import {authorizationAtom, userAtom} from '../../stores/auth';
import picturehouse from '../../ressources/house.png';
import housepicture from '../../ressources/housecard.jpg';


const Createadvert = () => {

  const jwt = useAtomValue(authorizationAtom);

  const navigate = useNavigate();
  const id = useParams().id;
  const idAtom = useAtomValue(userAtom);

  const [picture, setPicture] = useState(picturehouse);


  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [room, setRoom] = useState("");
  const [bathroom, setBathroom] = useState("");
  const [area, setArea] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [zip_code, setZipCode] = useState("");
  const [garden, setGarden] = useState("");
  const [garage, setGarage] = useState("");
  const [pictures_url, setPictures_Url] = useState([]);



  useEffect(
    () => {
      if(jwt == "" || id != idAtom){
        navigate("/")
      }
    }, []
  )

  console.log(pictures_url)

  const createadvert = (e) =>{
    e.preventDefault();
 
    const data = {
      "advert" :{
        "title": title,
        "price": price,
        "description": description,
        "category": category,
        "room": room,
        "bathroom": bathroom,
        "area": area,
        "address": address,
        "city": city,
        "zip_code": zip_code,
        "garden": garden,
        "garage": garage,
        "pictures_url": pictures_url,
        "user_id": idAtom
     }
    };

    fetch(API_URL + 'adverts', {
      method: 'post',
      headers: {
        'Authorization': jwt,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then((response) => {return response.json()})
    .then((response) => {
      console.log(response);
      console.log("créé")
      navigate(`/myadvert/${id}`);
    })
  }


  const pushphoto = () =>{
    if(document.getElementById('pictures_url').value.length > 0){
      setPictures_Url([...pictures_url, document.getElementById('pictures_url').value])
      document.getElementById('pictures_url').value = "";
    }
  }


  const deleteimage = (e) =>{
    if(picture == pictures_url[e.target.parentElement.attributes.class.nodeValue]){
      setPicture(picturehouse);
    }
    setPictures_Url(pictures_url.filter((element, index) => index != Number(e.target.parentElement.attributes.class.nodeValue)));
  }

  const changepicture = (e) =>{
    setPicture(pictures_url[e.target.className])
  }

  const defaulturl = (e) =>{
    setPicture(picturehouse);
  }

  return(
    <div className={Style.maincreateadvert}>
      <h1>Créez votre annonce</h1>
      <div className={Style.flex}>
        <form onSubmit={createadvert}>

          <input type="text" placeholder='titre annonce' id="title" onChange={(e) => setTitle(e.target.value)}></input>
          <input type="number" placeholder='prix' id="price" onChange={(e) => setPrice(e.target.value)}></input>
          <input type="textarea" placeholder='description' id="description" onChange={(e) => setDescription(e.target.value)}></input>
          <select name="category" onChange={(e) => setCategory(e.target.value)}>
            <option value="">Type...</option>
            <option value="House">Maison</option>
            <option value="Flat">Appartement</option>
          </select>
          <input type="number" placeholder='nb chambre' id="room" onChange={(e) => setRoom(e.target.value)}></input>
          <input type="number" placeholder='nb salle de bain' id="bathroom" onChange={(e) => setBathroom(e.target.value)}></input>
          <input type="number" placeholder='superficie en m²' id="area" onChange={(e) => setArea(e.target.value)}></input>
          <input type="text" placeholder='adresse' id="address" onChange={(e) => setAddress(e.target.value)}></input>
          <input type="text" placeholder='ville' id="city" onChange={(e) => setCity(e.target.value)}></input>
          <input type="text" placeholder='code postal' id="zip_code" onChange={(e) => setZipCode(e.target.value)}></input>
          <label htmlFor="garden">Jardin</label>
          <input type="checkbox" id="garden" onChange={(e) => setGarden(e.target.checked)}></input><br></br>
          <label htmlFor="garage">Garage</label>
          <input type="checkbox" id="garage" onChange={(e) => setGarage(e.target.checked)}></input>
          <div className={Style.flexinput}>
            <input type="text" placeholder='url photo' id="pictures_url"></input>
            <i className="fa-solid fa-circle-plus" onClick={pushphoto}></i>
          </div>
          <div id="listphoto">
            {pictures_url.map((element,index) =>{
                return(<p className={index}><u onClick={changepicture} className={index}>image{index}.png</u> <i className="fa-solid fa-trash-can" onClick={deleteimage}></i></p>)
            })}
          </div>

          <button type='submit' >Envoyer</button>
        </form>
        <img onError={defaulturl} src={picture}></img>
      </div>
    </div>
    
  )
}

export default Createadvert