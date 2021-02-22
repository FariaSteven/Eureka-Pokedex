import React, {useState} from 'react';
import {ProgressBar} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

import './GetPokemonData.css'
import pokeball from '../assets/ball.svg'

function GetPokemonData() {
    const [pokemon, setPokemon] = useState("");
    const [pokemonType, setPokemonType] = useState([]);
    const [pokemonAbility, setPokemonAbility] = useState([]);
    const [pokemonData, setPokemonData] = useState([]);

    const getPokemon = async () => { 
      const toArray = [];
    
      try {
        const url = `https://pokeapi.co/api/v2/pokemon/${pokemon}`
        const res = await axios.get(url)
        toArray.push(res.data)

        let types = res.data.types.map((data, index) => {
          return data.type.name
        })

        let abilities = res.data.abilities.map((data, index) => {
          return data.ability.name
        })

        setPokemonType(types)
        setPokemonAbility(abilities)
        setPokemonData(toArray)
      } catch (err) {
        console.log('Deu erro aqui => ' + err)
      }
    }

    const type_Colors = {
      normal: 'A8A878',
      fighting: 'C03028',
      flying: 'A890F0',
      poison: 'A040A0',
      ground: 'E0C068',
      rock: 'B8A038',
      bug: 'A8B820',
      ghost: '705898',
      steel: 'B8B8D0',
      fire: 'F08030',
      water: '6890F0',
      grass: '729F3F',
      electric: 'F8D030',
      psychic: 'F85888',
      ice: '98D8D8',
      dragon: '7038F8',
      dark: '705848',
      fairy: 'EE99AC'
    }
    
    const handleSubmit = (e) => {
      e.preventDefault();
      getPokemon();
    }

    const handleChange = (e) => {
      setPokemon(e.target.value.toLowerCase())
    }

    return (
      <div>
        <header className="header" style={{background: `#${type_Colors[pokemonType[0]]}`}}>
           <div className="header-title"> 
            <img src={pokeball}/> Pokedex
           </div>
        </header>
        <form onSubmit={handleSubmit}>
            <input className="input" 
                   type="text" 
                   onChange={handleChange} 
                   placeholder="Pesquise um pokemon"
            />
        </form>
        {pokemonData.map((data) => {
          return(
            <>
              <div className="wrapper">
                <div className="left-data-wrapper">

                  <div className="data-height">
                      <div className="title-height">Tamanho </div>
                      <div className="height"> {data.height / 10}m</div>
                  </div>

                  <div className="data-weight">
                      <div className="title-weight">Peso</div>
                      <div className="weight">{data.weight / 10} Kg</div>
                  </div>
                    
                  <div className="data-type">
                    <div className="title-type">Tipo</div>
                    <div className="types">
                      <div className="type" style={{background: `#${type_Colors[pokemonType[0]]} `, color: 'white'}}>{pokemonType[0]}</div>
                      <div className="type" style={{background: `#${type_Colors[pokemonType[1]]} `, color: 'black'}}>{pokemonType[1]}</div>
                    </div>
                  </div>

                  <div className="data-abilities">
                    <div className="title-ability">Habilidades</div> 
                    <div className="ability" style={{background: `#${type_Colors[pokemonType[0]]} `, color: 'white'}}>{pokemonAbility[0]}</div>
                    <div className="ability" style={{background: `#${type_Colors[pokemonType[1]]} `, color: 'white'}}>{pokemonAbility[1]}</div>
                    <div className="ability" style={{background: `#${type_Colors[pokemonType[2]]} `, color: 'white'}}>{pokemonAbility[3]}</div>
                    <div className="ability" style={{background: `#${type_Colors[pokemonType[3]]} `, color: 'white'}}>{pokemonAbility[4]}</div>
                  </div>

                </div> 
                 
                <div className="card-header">
                  <div className="card-title" style={{color: `#${type_Colors[pokemonType[0]]} `}}>Nº {data.id} {data.name}</div>
                  <img className="pokemonImg" src={data.sprites.other["official-artwork"]["front_default"]}/>
                </div>

                <div className="right-data-wrapper">
                  <div className="data">HP</div>
                  <ProgressBar className="data-bar" striped animated variant="success"  max={150} now={data.stats[0].base_stat} label={`${data.stats[0].base_stat}`} />
                  <div className="data">ATK</div>
                  <ProgressBar className="data-bar" striped animated variant="info" max={150} now={data.stats[1].base_stat} label={`${data.stats[1].base_stat}`} />
                  <div className="data">DEF</div>
                  <ProgressBar className="data-bar" striped animated variant="warning" max={150} now={data.stats[2].base_stat} label={`${data.stats[2].base_stat}`} />
                  <div className="data">Special Attack</div>
                  <ProgressBar className="data-bar" striped animated variant="danger" max={150} now={data.stats[3].base_stat} label={`${data.stats[3].base_stat}`} />
                  <div className="data">Special Defense</div>
                  <ProgressBar className="data-bar" striped animated variant="danger" max={150} now={data.stats[4].base_stat} label={`${data.stats[4].base_stat}`} />
                  <div className="data">Speed</div>
                  <ProgressBar className="data-bar" striped animated variant="danger" max={150} now={data.stats[5].base_stat} label={`${data.stats[5].base_stat}`} />                      
                </div>
                             
              </div>
            </>        
          )
        })}
      </div>
    )
}

export default GetPokemonData;