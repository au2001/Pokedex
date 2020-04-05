import React from 'react';

export default class Paginator extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            itemsPerPage: 20,
            offset: 0,
            loadedItems: 20,
            autoLoad: 200,
            sort: this.props.sortFunction,
            filter: this.props.filterFunction
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
                return {
                    loadedItems: Math.min(state.loadedItems + state.itemsPerPage, this.props.data.length)
                };
            });
        }
    }

    componentDidMount() {
        window.addEventListener("scroll", this._handleScroll);
    }

    componentWillUnmount() {
        window.removeEventListener("scroll", this._handleScroll);
    }

    componentDidUpdate(prevProps) {
        if (this.props.sortFunction !== prevProps.sortFunction || this.props.filterFunction !== prevProps.filterFunction) {
            this.setState(state => {
                return {
                    offset: 0,
                    loadedItems: state.itemsPerPage,
                    sort: this.props.sortFunction,
                    filter: this.props.filterFunction
                };
            });
        }
    }

    getRenderedData() {
        var data = this.props.data.slice(0);

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
