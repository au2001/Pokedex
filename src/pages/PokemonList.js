import React from 'react';
import { Link } from 'react-router-dom';
import Pokedex from '../Pokedex';

import './PokemonList.css';

class PokemonCard extends React.Component {
    render() {
        return (
            <Link to={`/pokemon/${Pokedex.slug(this.props.pokemon)}`} class="pokemon-card">
                <img src={this.props.pokemon.img} alt={this.props.pokemon.name} title={this.props.pokemon.name} class="pokemon-image" />
                <span class="pokemon-number">#{this.props.pokemon.num}</span>
                <span class="pokemon-name">{this.props.pokemon.name}</span>
                <span class="pokemon-types">
                    {this.props.pokemon.type.map(type =>
                        <span class={`pokemon-type type-${type.toLowerCase()}`}>{type}</span>
                    )}
                </span>
            </Link>
        );
    }
}

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
                <div class="pokemon-list">
                    {this.state.pokemons.map(pokemon =>
                        <PokemonCard pokemon={pokemon} />
                    )}
                </div>
            </div>
        );
    }
}
