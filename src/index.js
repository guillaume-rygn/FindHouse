import React from 'react';
import ReactDOM from 'react-dom';
import Home from './pages/Home';
import Authentification from './pages/Authentification';
import Connexion from './pages/Connexion';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import './style.css';
import Houseadvert from './pages/Houseadvert';
import DangerZone from './pages/DangerZone';
import MyAdvert from './pages/MyAdvert';
import Createadvert from './pages/Createadvert';
import Modify from './pages/Modify';
import Footer from './components/Footer';

const App = () => {
  return(

    <BrowserRouter>
        <Header/>
        <main>

        <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/register' element={<Authentification/>}/>
            <Route path='/login' element={<Connexion/>}/>
            <Route exact path='/house/:id' element={<Houseadvert/>}/>
            <Route path='/profil/:id' element={<DangerZone/>}/>
            <Route path='/myadvert/:id' element={<MyAdvert/>}/>
            <Route path='/modify/:id' element={<Modify/>}/>
            <Route path='/customadvert/:id' element={<Createadvert/>}/>
            <Route path='/*' element={<Home/>}/>
          
        </Routes>
        </main>

        <Footer/>
    </BrowserRouter>
  )
}

ReactDOM.render(<App/>, document.getElementById("root"));