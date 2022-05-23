import { useState,useEffect } from "react"
import { Link } from "react-router-dom"
import './favorito.css'
import { toast } from "react-toastify"

function Favoritos(){
  const [filmes,setFilmes]=useState([])
  
  useEffect(()=>{
    const minhaLista = localStorage.getItem("minhaLista")
    setFilmes(JSON.parse(minhaLista) || [])
    

  
  },[])
  if(filmes.length===0){
    return(
      <div className="meus-filmes">
        <h1>Você não tem nenhum filme Salvo!!</h1></div>
    )
  }

const excluir=(id)=>{
  const filmesSalvos = filmes.filter((filme)=> filme.id !== id)
  setFilmes(filmesSalvos)
  localStorage.setItem("minhaLista",JSON.stringify(filmesSalvos))
  toast.success("Filme Excluído com sucesso!!")
}


  return(
    <div className="meus-filmes">
      <h1>Meus Filmes</h1>
      <ul>
        {filmes.map((filme)=>{
          return (
            <li key={filme.id}><span>{filme.title}</span>
              <div>
                <Link to={`/filme/${filme.id}`}>Detalhe do filme</Link>
                <button onClick={()=>excluir(filme.id)} >Excluir</button>
              </div>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default Favoritos