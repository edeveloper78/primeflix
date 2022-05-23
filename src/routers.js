import {BrowserRouter, Routes, Route} from 'react-router-dom'

import Header from './components/Header'
import Home from './page/home'
import Filme from './page/filmes'
import Favoritos from './page/favoritos'
import Erro from './page/erros'

function RoutesApp(){
  return(
    <BrowserRouter>
    <Header/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/filme/:id' element={<Filme/>}/>
        <Route path='/favoritos' element={<Favoritos/>}/>
        <Route path='*' element={<Erro/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default RoutesApp;