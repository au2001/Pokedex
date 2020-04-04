import React from 'react';
import Pokedex from '../Pokedex';
import NotFound from './NotFound';

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
                <h1>Pokémon {this.state.pokemon.name}</h1>
            </div>
        );
    }
}
