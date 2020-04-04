import React from 'react';
import { Link } from 'react-router-dom';
import Pokedex from '../Pokedex';

export default class PokemonList extends React.Component {
	constructor() {
        super();

        this.state = {
            pokemons: Pokedex.list()
        };
    }

    render() {
        return (
        	<div>
            	<h1>Liste de Pokémons</h1>
            	<ul>
            		{this.state.pokemons.map(pokemon => {
            			return (
            				<li key={pokemon.id}>
            					<Link to={`/pokemon/${Pokedex.slug(pokemon)}`}>{pokemon.name}</Link>
            				</li>
            			);
            		})}
            	</ul>
            </div>
        );
    }
}
