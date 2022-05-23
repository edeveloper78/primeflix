import {useParams, useNavigate} from 'react-router-dom'
import { useState,useEffect } from 'react';
import { toast } from 'react-toastify';
import api from '../../services/api';
import './filme.css'

function Filme(){
  const { id } = useParams()
  const [filme,setFilme] = useState()
  const [loadFilme,setLoadFilme]=useState(true)
  const navigate =  useNavigate();
  useEffect(() => {
  
      async function loadFilme(){
        await api.get(`/movie/${id}`,{ 
          params:{
            api_key:'38ec1c10e25dcef38ccd0a8868baa005',
            language: 'pt-BR',
            page: 1,
          }
         }).then((response)=>{
            console.log(response.data)
            setFilme(response.data)
            setLoadFilme(false)
         }).catch(()=>{
          navigate("/", { replace: true})
          return;
         })
      };
      loadFilme()

      return ()=>{
        console.log("Componente foi desmontado!!!")
      }
  }, [navigate,id])
  
  const salvarFilme = ()=>{
    const minhaLista = localStorage.getItem("minhaLista")
    let filmesSalvos = JSON.parse(minhaLista) || [];
    const hasFilmes = filmesSalvos.some((filmesSalvos)=> filmesSalvos.id===filme.id)
      if(hasFilmes){
        toast.warn("Esse Filme já está salvo")
        return;
      }

      filmesSalvos.push(filme)
      localStorage.setItem("minhaLista",JSON.stringify(filmesSalvos))
      toast.success("Filme Salvo com sucesso!")
  }

  if(loadFilme){
    return(
      <div>
        Carregando detalhe do filme
      </div>
    )
  }


  return(
    <section className='section'>
      <div className='imagem'>
        <img src={`https://image.tmdb.org/t/p/w500/${filme.poster_path}`} alt={filme.title}/>
      </div>
      <div className='detalhe_filme'>
        <h3>Sinopse: </h3>
        <span>{filme.overview}</span>
        <h3>Votação:</h3>
        <span> {filme.vote_average} / 10</span>
        <h3>Gênero:</h3>
        {filme.genres.map((genre)=>{
            return (
             <span key={genre.id}> {genre.name} </span>
            )
        })}
         <h4><a target="blank" rel='external' href={`https://youtube.com/results?search_query=${filme.title} trailer`} > Trailer</a> &nbsp; <button onClick={salvarFilme}>Salvar</button></h4>
      </div>

    </section>
  )
}

export default Filme;