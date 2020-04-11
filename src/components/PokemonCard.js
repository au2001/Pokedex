import React from 'react';
import { Link } from 'react-router-dom';
import Pokedex from '../Pokedex';

import './PokemonCard.css';

export default class PokemonCard extends React.Component {
    render() {
        return (
            <Link to={`/pokemon/${Pokedex.slug(this.props.pokemon)}`} className={"pokemon-card " + this.props.className}>
                <img src={this.props.pokemon.img} alt={this.props.pokemon.name} className="pokemon-card-image" />
                <span className="pokemon-card-number">#{this.props.pokemon.num}</span>
                <span className="pokemon-card-name">{this.props.pokemon.name}</span>
                <span className="pokemon-card-types">
                    {this.props.pokemon.type.map(type =>
                        <span key={type.toLowerCase()} className={`pokemon-type type-${type.toLowerCase()}`}>{type}</span>
                    )}
                </span>
            </Link>
        );
    }
}
