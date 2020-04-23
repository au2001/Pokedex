import React, { Component } from 'react';

import pokemons from './pokemons.json';

class App extends Component {

	constructor (props){
		super(props);

		this.state = { pokemon: false };

		this.start = this.start.bind(this);
	}

	render (){


		if (this.state.pokemon == false)
		{

			return this.displayPokemons();
		} else

		{
			return this.displayPokemon();
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

		this.setState(this.state)
	}

	displayPokemon() {
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
		delete this.state.pokemon;
	}

}

export default App;
