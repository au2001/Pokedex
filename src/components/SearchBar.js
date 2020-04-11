import React from 'react';

import './SearchBar.css';

export default class SearchBar extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            sort: props.defaultSort || "",
            order: props.defaultOrder || "",
            filter: props.defaultFilter || ""
        };

        this.autoSubmitTimeout = null;
        this.formRef = React.createRef();

        this._reset = this._reset.bind(this);
        this._submit = this._submit.bind(this);
        this._autoSubmit = this._autoSubmit.bind(this);
        this._changeField = this._changeField.bind(this);
    }

    _reset(event) {
        this._autoSubmit();

        this.setState({
            sort: "",
            order: "",
            filter: ""
        }, () => {
            this._autoSubmit();
        });
    }

    _submit(event) {
        event.preventDefault();
        event.stopPropagation();

        this._autoSubmit();

        return false;
    }

    _autoSubmit(delay) {
        if (this.autoSubmitTimeout != null)
            clearTimeout(this.autoSubmitTimeout);

        if (typeof this.props.onChange !== "function") return;

        if (delay > 0) {
            this.autoSubmitTimeout = setTimeout(() => {
                this.props.onChange(this.state.sort || null, this.state.order || null, this.state.filter || null);
            }, delay);
        } else if (!delay) {
            this.props.onChange(this.state.sort || null, this.state.order || null, this.state.filter || null);
        }
    }

    _changeField(event) {
        const textfield = event.target.type === "text";

        var value = event.target.value;
        if (event.target.type === "checkbox") value = event.target.checked;
        if (event.target.name === "order") value = value ? "asc" : "desc";

        this.setState({
            [event.target.name]: value
        }, () => {
            this._autoSubmit(textfield ? 300 : 0);
        });
    }

    render() {
        return (
            <form ref={this.formRef} onSubmit={this._submit} onReset={this._reset} className="search">
                <div className="filter-container">
                    <input type="text" name="filter" placeholder="Rechercher un Pokémon..." value={this.state.filter} onChange={this._changeField} className="filter" />
                    <label htmlFor="search-reset" className="reset-label">
                        <img src="/clear.png" alt="Clear" />
                    </label>
                    <input type="reset" id="search-reset" hidden />
                </div>
                <select name="sort" value={this.state.sort} onChange={this._changeField} className="sort">
                    <option value="">Numéro (par défaut)</option>
                    <option value="name">Nom</option>
                    <option value="rarity">Rareté</option>
                    <option value="height">Hauteur</option>
                    <option value="weight">Poids</option>
                </select>
                <label htmlFor="search-order" className="order-label">
                    {(this.state.order == null || this.state.order.charAt(0).toLowerCase() !== "d") &&
                        <img src="/order-ascending.png" alt="Ascending order" />
                    }
                    {(this.state.order != null && this.state.order.charAt(0).toLowerCase() === "d") &&
                        <img src="/order-descending.png" alt="Descending order" />
                    }
                </label>
                <input type="checkbox" name="order" id="search-order" checked={this.state.order == null || this.state.order.charAt(0).toLowerCase() !== "d"} onChange={this._changeField} className="order" />
            </form>
        );
    }
}
