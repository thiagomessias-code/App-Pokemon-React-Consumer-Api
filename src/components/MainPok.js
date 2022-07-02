import React, {useEffect, useState} from 'react'
import axios from 'axios'
import Card from './Card'
import'./Main.css'
import PokeInfo from './PokeInfo'


export function MainPok() {
    const [pokeData, setPokdata] = useState([])
    const [loading, setLoading] = useState(true)
    const [url, setUrl] = useState("https://pokeapi.co/api/v2/pokemon/")
    const [nextUrl, setNextUrl] = useState()
    const [prevUrl, setPrevtUrl] = useState()
    const [pokeDex, setPokedex] = useState()

    const pokFun = async () => {
        setLoading(true)
        const response = await axios.get(url)
        setNextUrl(response.data.next)
        setPrevtUrl(response.data.previous)
        getPokemon(response.data.results);
        setLoading(false)
    }

    const getPokemon = async (response) => {
        response.map(async (item) => {
            const result = await axios.get(item.url)
            setPokdata(state => {
                state = [...state,result.data]
                
                return state;
            })
        })
    }

    useEffect(() => {
        pokFun();
        console.log(pokFun)
    },[url])

    return (
    <>
       <div className="pokemon-list">
       <div className="left-content">
    <Card
        pokemon={pokeData}
        loading={loading}
        infoPokemon={poke =>setPokedex(poke)}/>
        

        <div className='btn-group'>
            <button>Previous</button>
            <button>Next</button>
        </div>
    </div>
    <div className="right-content">
        <PokeInfo data={pokeDex}/>
    </div>
</div>
    </>)
}