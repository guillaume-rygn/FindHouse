import React, { useEffect, useState } from "react";
import { API_URL } from "../../stores/api_url";
import Style from './style.module.css';
import house from '../../ressources/house.png';
import Card from "../../components/Card";

const Home = () =>{

  const [advert, setAdvert] = useState([]);
  const [filteradvert, setFilteradvert] = useState([]);
  const [localisation, setLocalisation] = useState('');
  const [type, setType] = useState('');
  const [price, setPrice] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(
    () => {
      fetch(API_URL + 'adverts', {
        method: 'get',
        headers: {
         'Content-Type': 'application/json'
        }
      })
      .then((response) => response.json())
      .then((response) => {
        setAdvert(response);
        setFilteradvert(response);
        setIsLoading(false)
      })
    }, []

  )

  const filter = (e) => {
    e.preventDefault();
    setFilteradvert(advert);
      if(type !== ""){
        setFilteradvert(advert.filter(element => element.category == type))
      }

      if(price !== "" && filteradvert.length == 0){
        setFilteradvert(advert.filter(element => element.price < (Number(price) + 30000 ) && element.price > (Number(price) - 30000 )))
      } else if (price !== "" && filteradvert.length > 0) {
        setFilteradvert(filteradvert.filter(element => element.price < (Number(price) + 30000 ) && element.price > (Number(price) - 30000 )))
      }

      if(localisation !== "" && filteradvert.length == 0){
        setFilteradvert(advert.filter(element => element.city.toLowerCase().includes(localisation.toLowerCase())))
      } else if (localisation !== "" && filteradvert.length > 0) {
        setFilteradvert(filteradvert.filter(element => element.city.toLowerCase().includes(localisation.toLowerCase())))
      }
    }

    const resetform = () => {
      setFilteradvert(advert);
      setLocalisation("");
      setType("");
      setPrice("");
    }



  return(
    <>
      <div className={Style.mainhome}>
        <div className={Style.textflex}>
          <h2>Trouvez votre maison de rêve</h2>
          <p>Nous recherchons pour vous le bien idéal afin de réaliser tous vos projets</p>

        </div>
        <img src={house} width="500px"></img>      
      </div>
      <div className={Style.searchbar}>
        <div className={Style.contentsearchbar}>
          <h3>Trouvez la propriété qui vous correspond</h3>
          <form className={Style.flexinput} onSubmit={filter}>
            <div className={Style.inputbar}>
              <input type="text" placeholder="Ville..." value={localisation} onChange={(e) => setLocalisation(e.target.value)}></input>
              <i className="fa-solid fa-location-dot"></i>
            </div>

            <div className={Style.inputbar}>
              <select name="type" value={type} onChange={(e) => setType(e.target.value)}>
                <option value="">Type...</option>
                <option value="House">Maison</option>
                <option value="Appartment">Appartement</option>
              </select>
              <i className="fa-solid fa-house"></i>
            </div>

            <div className={Style.inputbar}>
              <input type="text" placeholder="Prix..." value={price} onChange={(e) => setPrice(e.target.value)}></input>
              <i className="fa-solid fa-money-bill"></i>
            </div>
            <button type="submit" className={Style.searchbtn}>Rechercher</button>
            {type == "" && localisation == "" && price == ""? <p>&nbsp;&nbsp;&nbsp;&nbsp;</p> : <p className={Style.icondelete} onClick={resetform}><i className="fa-solid fa-circle-xmark"></i></p>}
          </form>
        </div>
      </div>
      <div className={Style.cardlist}>
        {isLoading? <p><i className="fa-2x fas fa-circle-notch fa-spin"></i></p> : null}
        {filteradvert.map(advert => <Card advert={advert} key={advert.id}/>)}
      </div>
    </>
  )
}

export default Home;