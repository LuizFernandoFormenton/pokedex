'use client'
import axios from "axios";
import { use, useEffect, useState } from "react";

function home() {

    const [ pokemons, alteraPokemons ] = useState([]);
    const [ pesquisa, alteraPesquisa ] = useState("");

    const [ erroPesquisa, alteraErroPesquisa ] = useState(false);

    async function busca(){
      try{
          const response = await axios.get("https://pokeapi.co/api/v2/pokemon/"+pesquisa)

      
          const data = response.data;
          alteraPokemons([data])
          alteraErroPesquisa(false)  
      }catch{
        alteraErroPesquisa(true)
      }


    }


     async function buscaTodos(){
      const response = await axios.get("https://pokeapi.co/api/v2/pokemon/")
      console.log(response)
      const data = response.data.results;
      alteraPokemons(data)

    }


    useEffect(()=>{ 
      buscaTodos();
     },[])


  return ( 
    <div>

      <h1> Pokedex </h1>

      <p> Digite o nome de um pokemon: </p>
      <input onChange={(e)=> alteraPesquisa (e.target.value)} />

      <br/>

      <button onClick={()=> busca ()} > Pesquisar </button>

      {
        erroPesquisa == true && <p className="text-red-500" > Erro ao encontrar seu pokemon </p>
      }
      

      <hr/>

      {
        pokemons == 0 ?
        <p> Pokemon não encontrado </p>
        :
          pokemons.map ( (i, index)  =>
          <div className=" justify-around flex " >
              <h2> {i.name}  </h2>
              <p> <strong> ID: </strong> { i.id ? i.id : index +1 }  </p>
              <img src={
                "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/shiny/"
                +(i.id ? i.id : index +1)+
                ".gif"}/>
          </div>
        )      
      }

      


    </div>
   );
}

export default home;