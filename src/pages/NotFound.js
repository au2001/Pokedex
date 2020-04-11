import React from 'react';
import { Link } from 'react-router-dom';

import './NotFound.css';

export default class NotFound extends React.Component {
    render() {
        return (
            <div>
                <h1 className="page-title">
                    <img src="/logo.png" alt="Logo Pokédex" title="Logo Pokédex" className="page-title-logo" />
                    <span className="page-title-text">Erreur 404 &ndash; Page introuvable</span>
                </h1>

                <p className="error-description">
                    La page que vous cherchez n'existe pas.
                </p>

                <Link to="/" className="home">Cliquez ici pour retourner à l'accueil.</Link>
            </div>
        );
    }
}
