import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAtomValue } from "jotai";
import { userAtom, authorizationAtom } from "../../stores/auth";
import { API_URL } from "../../stores/api_url";
import Style from './style.module.css';
import picturehouse from '../../ressources/house.png';


const Modify = () => {

  const jwt = useAtomValue(authorizationAtom);

  const navigate = useNavigate();
  const id = useParams().id;
  const idAtom = useAtomValue(userAtom);
  const [house, setHouse] = useState('');

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

  const[isLoading,setIsLoading] = useState(true);
  const [picture, setPicture] = useState(picturehouse);

  

  useEffect(
    () => {
      if(jwt == ""){
        navigate("/")
      }
    }, []
  )

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
        if(response.user_id != idAtom){
          navigate('/');
        } 
        setTitle(response.title);
        setPrice(response.price);
        setDescription(response.description);
        setCategory(response.category);
        setRoom(response.room);
        setBathroom(response.bathroom);
        setArea(response.area);
        setAddress(response.address);
        setCity(response.city);
        setZipCode(response.zip_code);
        setGarden(response.garden);
        setGarage(response.garage);
        setPictures_Url(response.pictures_url);
        setIsLoading(false)
        setPicture(response.pictures_url[0]);
      })

    }, []
  )

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

    fetch(API_URL + 'adverts/' + id, {
      method: 'put',
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
      navigate(`/myadvert/${idAtom}`);
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
      <h1>Modifiez votre annonce</h1>
      {isLoading? 
      <p><i className="fa-2x fas fa-circle-notch fa-spin"></i></p>
      :
      <div className={Style.flex}>
        <form onSubmit={createadvert}>

          <input type="text" placeholder='titre annonce' id="title" value={title} onChange={(e) => setTitle(e.target.value)}></input>
          <input type="number" placeholder='prix' id="price" value={price} onChange={(e) => setPrice(e.target.value)}></input>
          <input type="textarea" placeholder='description' id="description" value={description} onChange={(e) => setDescription(e.target.value)}></input>
          <select name="category" onChange={(e) => setCategory(e.target.value)}>
            <option value="">Type...</option>
            {category == "House"?
              <>
                <option value="House" selected>Maison</option>
                <option value="Flat">Appartement</option>
              </>
            :
              <>
                <option value="House">Maison</option>
                <option value="Flat" selected>Appartement</option>
              </>
            }
            
          </select>
          <input type="number" placeholder='nb chambre' id="room" value={room} onChange={(e) => setRoom(e.target.value)}></input>
          <input type="number" placeholder='nb salle de bain' id="bathroom" value={bathroom} onChange={(e) => setBathroom(e.target.value)}></input>
          <input type="number" placeholder='superficie en m²' id="area" value={area} onChange={(e) => setArea(e.target.value)}></input>
          <input type="text" placeholder='adresse' id="address" value={address} onChange={(e) => setAddress(e.target.value)}></input>
          <input type="text" placeholder='ville' id="city" value={city} onChange={(e) => setCity(e.target.value)}></input>
          <input type="text" placeholder='code postal' id="zip_code" value={zip_code} onChange={(e) => setZipCode(e.target.value)}></input>
          <label htmlFor="garden">Jardin</label>
          <input type="checkbox" id="garden" checked={garden} onChange={(e) => setGarden(e.target.checked)}></input><br></br>
          <label htmlFor="garage">Garage</label>
          <input type="checkbox" id="garage" checked={garage} onChange={(e) => setGarage(e.target.checked)}></input>
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
    }
    </div>
  )
}

export default Modify