import React from 'react';
import { Link } from 'react-router-dom';
import Pokedex from '../Pokedex';
import Logo from '../logo.svg';

import './PokemonList.css';

class PokemonCard extends React.Component {
    render() {
        return (
            <Link to={`/pokemon/${Pokedex.slug(this.props.pokemon)}`} className="pokemon-card">
                <img src={this.props.pokemon.img} alt={this.props.pokemon.name} title={this.props.pokemon.name} className="pokemon-image" />
                <span className="pokemon-number">#{this.props.pokemon.num}</span>
                <span className="pokemon-name">{this.props.pokemon.name}</span>
                <span className="pokemon-types">
                    {this.props.pokemon.type.map(type =>
                        <span key={type.toLowerCase()} className={`pokemon-type type-${type.toLowerCase()}`}>{type}</span>
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
                <h1 className="page-title">
                    <img src={Logo} alt="Logo Pokédex" title="Logo Pokédex" className="page-title-logo" />
                    <span className="page-title-text">Liste des {this.state.pokemons.length} Pokémons</span>
                </h1>
                <div className="pokemon-list">
                    {this.state.pokemons.map(pokemon =>
                        <PokemonCard key={pokemon.id} pokemon={pokemon} />
                    )}
                </div>
            </div>
        );
    }
}
