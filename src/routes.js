import React from 'react';
import { Switch, Route } from 'react-router-dom';

import PokemonList from './pages/PokemonList';
import PokemonDetails from './pages/PokemonDetails';
import NotFound from './pages/NotFound';

export default class Routes extends React.Component {
    render() {
        return (
            <Switch>
                <Route path="/" exact component={PokemonList} />
                <Route path="/pokemon/:pokemonName" exact component={PokemonDetails} />
                <Route component={NotFound} />
            </Switch>
        );
    }
}
