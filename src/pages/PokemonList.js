import React from 'react';
import { Link } from 'react-router-dom';
import Pokedex from '../Pokedex';
import Paginator from '../components/Paginator';
import SearchBar from '../components/SearchBar';

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
    constructor(props) {
        super(props);

        this.state = {
            pokemons: [],
            sort: null,
            order: null,
            filter: null
        };

        this._updateSearch = this._updateSearch.bind(this);
    }

    _updateSearch(sort, order, filter) {
        this.setState({
            sort,
            order,
            filter
        });
    }

    componentDidMount() {
        this.setState({
            pokemons: Pokedex.list()
        });
    }

    getSortFunction() {
        const sortFunctions = {
            "name": (pokemon1, pokemon2) => pokemon1.name > pokemon2.name ? 1 : pokemon1.name < pokemon2.name ? -1 : 0,
            "rarity": (pokemon1, pokemon2) => pokemon2.avg_spawns - pokemon1.avg_spawns,
            "height": (pokemon1, pokemon2) => parseFloat(pokemon1.height) - parseFloat(pokemon2.height),
            "weight": (pokemon1, pokemon2) => parseFloat(pokemon1.weight) - parseFloat(pokemon2.weight)
        };

        var sortFunction = null;
        if (this.state.sort != null && this.state.sort.toLowerCase() in sortFunctions)
            sortFunction = sortFunctions[this.state.sort.toLowerCase()];

        if (this.state.order != null && this.state.order.charAt(0).toLowerCase() === "d") {
            if (sortFunction == null)
                sortFunction = (pokemon1, pokemon2) => pokemon1.id - pokemon2.id;

            return (pokemon1, pokemon2) => -sortFunction(pokemon1, pokemon2);
        } else {
            return sortFunction;
        }
    }

    getFilterFunction() {
        if (!this.state.filter) return null;

        const keywords = this.state.filter.replace(/\W+/g, " ").replace(/(^ | $)/g, "").toLowerCase().split(" ");

        return (pokemon) => {
            for (var i = 0; i < keywords.length; i++) {
                const keyword = keywords[i];

                if (!pokemon.name.toLowerCase().includes(keyword) && !pokemon.type.join(" ").toLowerCase().includes(keyword))
                    return false;
            }

            return true;
        };
    }

    render() {
        return (
            <div>
                <h1 className="page-title">
                    <img src="/logo.png" alt="Logo Pokédex" title="Logo Pokédex" className="page-title-logo" />
                    <span className="page-title-text">
                        {!!this.state.filter && `Recherche de Pokémon : “${this.state.filter}”`}
                        {!this.state.filter && `Liste des ${this.state.pokemons.length} Pokémons`}
                    </span>
                </h1>
                <SearchBar history={this.props.history} defaultSort={this.state.sort} defaultOrder={this.state.order} defaultFilter={this.state.filter} onChange={this._updateSearch} />
                <Paginator className="pokemon-list" data={this.state.pokemons} sortFunction={this.getSortFunction()} filterFunction={this.getFilterFunction()} renderItem={pokemon =>
                    <PokemonCard key={pokemon.id} pokemon={pokemon} />
                } />
            </div>
        );
    }
}
