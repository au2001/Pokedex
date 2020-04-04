import React from 'react';
import { Link } from 'react-router-dom';
import Pokedex from '../Pokedex';
import NotFound from './NotFound';
import Logo from '../logo.svg';

import './PokemonDetails.css';

export default class PokemonDetails extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            pokemon: Pokedex.search(props.match.params.pokemonName)
        };
    }

    render() {
        if (!this.state.pokemon) {
            return (
                <NotFound />
            );
        }

        return (
            <div>
                <Link to="/" className="back">Retour</Link>
                <h1 className="page-title">
                    <img src={Logo} alt="Logo Pokédex" title="Logo Pokédex" className="page-title-logo" />
                    <span className="page-title-text">{this.state.pokemon.name}</span>
                </h1>
            </div>
        );
    }
}
