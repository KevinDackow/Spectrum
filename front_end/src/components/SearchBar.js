import React, { Component } from 'react';
import './SearchBar.css';

export default class SearchBar extends Component {
	constructor(props) {
		super(props);

		this.state = { term: '' };
	}

	render() {
		return (
			<div className="block">
				<div className="control search-bar">
					<h1 className="title is-1">
						Spectrum
					</h1>
					<input
						className="input"
						type="text"
						placeholder="Search keywords for news articles..."
						value={this.state.term}
						onChange={event => this.onInputChange(event.target.value)}
					/>
				</div>
			</div>
		);
	}

	onInputChange(term) {
		this.setState({ term });
		this.props.onSearchTermChange(term);
	}
}
