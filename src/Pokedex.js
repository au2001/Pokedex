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

            if (id === pokemon.id || name === pokemon.name.toLowerCase() || name === this.slug(pokemon))
                return pokemon;
        }

        return null;
    }

    slug(pokemon) {
        return pokemon.name.replace(/\W+/g, "-").replace(/(^-|-$)/g, "").toLowerCase();
    }
}

export default new Pokedex(pokedexData);
