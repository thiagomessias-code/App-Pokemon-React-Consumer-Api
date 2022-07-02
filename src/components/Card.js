import React from "react";
import'./Main.css'

const Card = ({pokemon, loading, infoPokemon}) => {
console.log(pokemon)
return (
    <div >
    {loading ? <h1>loading...</h1> : pokemon.map((item) => {
        return (
            <div className="card" key={item.id} onClick={() => infoPokemon(item)}>
            <h1>{item.id}</h1>
            <img src={item.sprites.front_default} alt={item.name}/>
            <h2>{item.name}</h2>
            </div>
            
        )
    })}
    </div>
)
}

export default Card;