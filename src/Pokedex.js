import pokedexData from './pokedexData.json';

class Pokedex {

    constructor(data) {
        this.data = data;
    }

    list() {
        return this.data.pokemon;
    }

    search(name) {
        name = ("" + name).toLowerCase();
        var id = parseInt(name);

        for (var i = 0; i < this.data.pokemon.length; ++i) {
            const pokemon = this.data.pokemon[i];
            if (id === pokemon.id || name === pokemon.name.toLowerCase())
                return pokemon;
        }

        return null;
    }

}

export default new Pokedex(pokedexData);
