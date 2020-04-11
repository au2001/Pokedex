import React from 'react';
import { Link } from 'react-router-dom';
import Pokedex from '../Pokedex';
import NotFound from './NotFound';
import PokemonCard from '../components/PokemonCard';

import './PokemonDetails.css';

export default class PokemonDetails extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            pokemon: null,
            prev_evolution: undefined,
            next_evolution: undefined
        }
    }

    static getDerivedStateFromProps(props, state) {
        const pokemon = Pokedex.search(props.match.params.pokemonName);
        if (pokemon !== state.pokemon) {
            return {
                pokemon: pokemon,
                prev_evolution: pokemon.prev_evolution !== undefined ? pokemon.prev_evolution.map(evolution =>
                    Pokedex.search(evolution.num + " " + evolution.name)
                ) : undefined,
                next_evolution: pokemon.next_evolution !== undefined ? pokemon.next_evolution.map(evolution =>
                    Pokedex.search(evolution.num + " " + evolution.name)
                ) : undefined
            };
        }
    }

    render() {
        if (!this.state.pokemon) {
            return (
                <NotFound />
            );
        }

        return (
            <div>
                <h1 className="page-title">
                    <Link to="/" className="back">
                        <img src="/back.png" alt="Retour" />
                    </Link>
                    <img src="/logo.png" alt="Logo Pokédex" className="page-title-logo" />
                    <span className="page-title-text">{this.state.pokemon.name} #{this.state.pokemon.num}</span>
                </h1>

                <div className="pokemon-details">
                    <div className="pokemon-details-photo-container">
                        <img src={this.state.pokemon.img} alt={this.state.pokemon.name} className="pokemon-details-photo" />
                    </div>
                    <div className="pokemon-details-info">
                        <span className="pokemon-details-label">Types&nbsp;:</span>
                        <span className="pokemon-details-value">
                            {this.state.pokemon.type.map(type =>
                                <span key={type.toLowerCase()} className={`pokemon-type type-${type.toLowerCase()}`}>{type}</span>
                            )}
                        </span><br/>

                        <span className="pokemon-details-label">Hauteur&nbsp;:</span>
                        <span className="pokemon-details-value">{this.state.pokemon.height}</span><br/>

                        <span className="pokemon-details-label">Poids&nbsp;:</span>
                        <span className="pokemon-details-value">{this.state.pokemon.weight}</span><br/>

                        {this.state.pokemon.candy !== "None" && (
                            <span>
                                <span className="pokemon-details-label">Bonbon&nbsp;:</span>
                                <span className="pokemon-details-value">{this.state.pokemon.candy}</span><br/>
                            </span>
                        )}

                        {this.state.pokemon.candy_count !== undefined && (
                            <span>
                                <span className="pokemon-details-label">Nombre de bonbons&nbsp;:</span>
                                <span className="pokemon-details-value">{this.state.pokemon.candy_count}</span><br/>
                            </span>
                        )}

                        {this.state.pokemon.egg !== "Not in Eggs" && (
                            <span>
                                <span className="pokemon-details-label">Œuf&nbsp;:</span>
                                <span className="pokemon-details-value">{this.state.pokemon.egg}</span><br/>
                            </span>
                        )}

                        <span className="pokemon-details-label">Apparitions moyennes&nbsp;:</span>
                        <span className="pokemon-details-value">{this.state.pokemon.avg_spawns}</span><br/>

                        {this.state.pokemon.spawn_time !== "N/A" && (
                            <span>
                                <span className="pokemon-details-label">Temps d'apparition&nbsp;:</span>
                                <span className="pokemon-details-value">{this.state.pokemon.spawn_time}</span><br/>
                            </span>
                        )}

                        {this.state.pokemon.multipliers !== null && (
                            <span>
                                <span className="pokemon-details-label">Multiplicateurs&nbsp;:</span>
                                <span className="pokemon-details-value">
                                    {this.state.pokemon.multipliers.map(mult => "x" + mult).join(" / ")}
                                </span><br/>
                            </span>
                        )}

                        <span className="pokemon-details-label">Faiblesses&nbsp;:</span>
                        <span className="pokemon-details-value">
                            {this.state.pokemon.weaknesses.map(type =>
                                <span key={type.toLowerCase()} className={`pokemon-type type-${type.toLowerCase()}`}>{type}</span>
                            )}
                        </span><br/>
                    </div>
                </div>

                <div className="pokemon-details-evolutions">
                    {this.state.prev_evolution !== undefined && this.state.prev_evolution.map(evolution =>
                        <PokemonCard key={evolution.id} pokemon={evolution} className="pokemon-details-evolutions-card pokemon-details-evolutions-prev" />
                    )}
                    <PokemonCard pokemon={this.state.pokemon} className="pokemon-details-evolutions-card pokemon-details-evolutions-current" />
                    {this.state.next_evolution !== undefined && this.state.next_evolution.map(evolution =>
                        <PokemonCard key={evolution.id} pokemon={evolution} className="pokemon-details-evolutions-card pokemon-details-evolutions-next" />
                    )}
                </div>
            </div>
        );
    }
}
