import React, {Component} from "react";
import axios from "axios";
import './Main.css'

export default class Main extends Component {
    state = {
        arrayPokemons: [ ],
        pagesPokemmonsNext: { },
        pagesPokemonsPrevious: { }
    }


    componentDidMount() {
        this.loaderPokemon();
    }

    loaderPokemon = async (url = null) => {
        

        try {
            const response = await axios.get(url)
            const arrayPokemons = response.data.results;
            const pagesPokemmonsNext = {
                next: response.data.next
            }
            const pagesPokemonsPrevious = {
                previous: response.data.previous
            }
            console.log(arrayPokemons, pagesPokemmonsNext, pagesPokemonsPrevious)
            this.setState({arrayPokemons, pagesPokemmonsNext, pagesPokemonsPrevious})
        } catch  {
            const response = await axios.get("https://pokeapi.co/api/v2/pokemon/")
            const arrayPokemons = response.data.results;
            const pagesPokemmonsNext = {
                next: response.data.next
            }
            const pagesPokemonsPrevious = {
                previous: response.data.previous
            }
            console.log(arrayPokemons, pagesPokemmonsNext, pagesPokemonsPrevious)
            this.setState({arrayPokemons, pagesPokemmonsNext, pagesPokemonsPrevious})

        }

        /*const arrayPokemons = [
    {'name': 'articuno'},
    {'name': 'chicorita'}
    ]
    const pagesPokemmonsNext = {}
    const pagesPokemonsPrevious = {}
    this.setState({arrayPokemons,pagesPokemmonsNext,pagesPokemonsPrevious
    })*/

    }
    nextPage = () => {
        const {pagesPokemmonsNext} = this.state;
        if (pagesPokemmonsNext.next === null) return
        const nextPage = pagesPokemmonsNext.next;
        this.loaderPokemon(nextPage)
    }

    prevPage = () => {
        const {pagesPokemonsPrevious} = this.state;
        if (pagesPokemonsPrevious.next === null) return
        const prevPage = pagesPokemonsPrevious.next;
        this.loaderPokemon(prevPage)
    }

    render() {
        const {arrayPokemons} = this.state
        return (
            <div className="pokemon-list">
                {
                    arrayPokemons.map((pokemon, key) => (
                        <article key={pokemon.name} >
                           
                            <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`} width="120px" height="120px" alt={pokemon.id} />
                            <strong>
                                {pokemon.name}
                            </strong>
                            <small>{pokemon.id}</small>
                        </article>
                    ))
                }
                <div className="actions">
                    <button onClick={this.prevPage}>Anterior</button>
                    <button onClick={this.nextPage}>Proximo</button>
                </div>
            </div>
        )
    }
}