import React, { Component } from 'react';

import pokemons from './pokemons.json';

class App extends Component {

    constructor (props){
        super(props);

        this.state = { pokemon: false };

        // pouvoir utiliser le mot-clef ​this​ dans les méthodes ​start​ et ​stop​ en callback
        this.start = this.start.bind(this);
    }

    render (){


        // Afficher conditionnellement un élément
        if (this.state.pokemon == false)
        {
        	
            return this.displayPokemons();
        } else

        {
            return this.displayPokemon()
        }

    }

	displayPokemons() {
		let listPokemon = pokemons.pokemon.map((clock, index) =>

			<li key={index}>

				<header>

					<img src={clock.img} className="App-logo" />

					<button onClick={() => {this.start(index)}}>{clock.name}</button>
				</header>

			</li>

		);

		return (<ul>{listPokemon}</ul>);
	}

	start(index) {
		this.state.pokemon = index
		
		// raffraichit la page
		this.setState(this.state)
	}

	displayPokemon() {
		// pokemon à l'index pokemon de l'état du composant
		var pokemon = pokemons.pokemon[this.state.pokemon];

		return (
			
			<div>

				<h1>{pokemon.name}</h1>

				<img src={pokemon.img} />

				<button onClick={this.fermer}>Fermer</button>

			</div>

		);
	}

	fermer ()
	{
		// enlève le pokémon stoqué de l'état du composant
		delete this.state.pokemon;
	}

}

export default App;
