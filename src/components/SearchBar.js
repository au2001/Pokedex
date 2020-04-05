import React from 'react';

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

        this._submit = this._submit.bind(this);
        this._autoSubmit = this._autoSubmit.bind(this);
        this._changeField = this._changeField.bind(this);
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
            <form ref={this.formRef} onSubmit={this._submit}>
                <input type="text" name="filter" value={this.state.filter} onChange={this._changeField} />
                <select name="sort" value={this.state.sort} onChange={this._changeField}>
                    <option value="">Numéro (par défaut)</option>
                    <option value="name">Nom</option>
                    <option value="rarity">Rareté</option>
                    <option value="height">Hauteur</option>
                    <option value="weight">Poids</option>
                </select>
                <input type="checkbox" name="order" checked={this.state.order == null || this.state.order.charAt(0).toLowerCase() !== "d"} onChange={this._changeField} />
            </form>
        );
    }
}
