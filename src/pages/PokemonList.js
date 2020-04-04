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

class Paginator extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            itemsPerPage: 20,
            offset: 0,
            loadedItems: 20,
            autoLoad: 200,
            sort: null,
            filter: null
        };

        this.containerRef = React.createRef();

        this._handleScroll = this._handleScroll.bind(this);
    }

    _handleScroll(event) {
        if (this.state.loadedItems >= this.props.data.length) return;

        const doc = document.documentElement;
        const scrollTop = (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0);
        const bottom = this.containerRef.current.offsetTop + this.containerRef.current.offsetHeight;

        if (this.state.autoLoad != null && bottom - scrollTop - doc.clientHeight < this.state.autoLoad) {
            this.setState(state => {
                return Object.assign({}, state, {
                    loadedItems: Math.min(state.loadedItems + state.itemsPerPage, this.props.data.length)
                });
            });
        }
    }

    componentDidMount() {
        window.addEventListener("scroll", this._handleScroll);
    }

    componentWillUnmount() {
        window.removeEventListener("scroll", this._handleScroll);
    }

    setSortAndFilter(sort, filter) {
        this.setState(state => {
            return Object.assign({}, state, {
                offset: 0,
                loadedItems: state.itemsPerPage,
                sort: sort !== undefined ? sort : state.sort,
                filter: filter !== undefined ? filter : state.filter
            });
        });
    }

    getRenderedData() {
        var data = this.props.data;

        if (this.state.filter)
            data = data.filter(this.state.filter);

        if (this.state.sort)
            data = data.sort(this.state.sort);

        data = data.slice(this.state.offset, this.state.offset + this.state.loadedItems);

        return data;
    }

    render() {
        return (
            <div ref={this.containerRef} className={this.props.className} onScroll={this.onScroll}>
                {this.getRenderedData().map(this.props.renderItem)}
            </div>
        );
    }
}

export default class PokemonList extends React.Component {
    constructor() {
        super();

        this.state = {
            pokemons: []
        };
    }

    componentDidMount() {
        this.setState(state => {
            return Object.assign({}, state, {
                pokemons: Pokedex.list()
            });
        });
    }

    render() {
        return (
            <div>
                <h1 className="page-title">
                    <img src={Logo} alt="Logo Pokédex" title="Logo Pokédex" className="page-title-logo" />
                    <span className="page-title-text">Liste des {this.state.pokemons.length} Pokémons</span>
                </h1>
                <Paginator className="pokemon-list" data={this.state.pokemons} renderItem={pokemon =>
                    <PokemonCard key={pokemon.id} pokemon={pokemon} />
                } />
            </div>
        );
    }
}
