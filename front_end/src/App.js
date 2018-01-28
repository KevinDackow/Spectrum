import debounce from 'lodash.debounce';
import React, { Component } from 'react';
import './App.css';
import SearchBar from './components/SearchBar';
import ArticleList from './components/ArticleList';
import fetch from 'isomorphic-fetch'


class App extends Component {
	constructor(props) {
		super(props);

		this.state = {
			videos: [], // holds 5 videos fetched from API
			left: [],
            modleft: [],
            center: [],
            modright: [],
			right:[]
		};

		this.articleSearch(''); // default search term
	}

    articleSearch(term) {
		this.componentDidMount(term, 1);
        this.componentDidMount(term, 2);
        this.componentDidMount(term, 3);
        this.componentDidMount(term, 4);
        this.componentDidMount(term, 5);
	}

	articleSearchHelper(articles, bias) {
        if (bias === 1) {
            this.setState({left : articles.articles});
        }
        else if (bias === 2) {
            this.setState({modleft : articles.articles})
        }
        else if (bias === 3) {
            this.setState({center : articles.articles})
        }
        else if (bias === 4) {
            this.setState({modright : articles.articles})
        }
        else if (bias === 5) {
            this.setState({right : articles.articles})
        }
	}

    async componentDidMount(term, bias) {
        if (term !== undefined && bias !== undefined) {
            const response = await this.callApi(term, bias);
            this.articleSearchHelper(response, bias);
        }
    }

    callApi = async (term, bias) => {
        var url = "https://104.196.56.53:8080/?topic=" + term + "&leaning=" + bias;
		// var url = "http://localhost:8080/helper/?topic=" + term + "&leaning=" + bias;
		const response = await fetch(url)
			.then(response => response.json());
		if (response.status >= 300) throw Error('sorry');
		return response;
    };

	render() {
		// for consistent ui such that it re-renders after 300ms on search
		const articleSearch = debounce(term => {
			this.articleSearch(term);
		}, 300);
		return (
			<div className="big-container">
				<SearchBar onSearchTermChange={articleSearch} />
				<div className="scale">

				</div>
				<div className="columns">
					<div className="rows left">
						<h1 id="left"> LEFT </h1>
						<ArticleList
							videos={this.state.left}
						/>
					</div>
					<div className="rows moderately-left">
						<h1 id="moderately-left"> MODERATELY LEFT </h1>
						<ArticleList
							videos={this.state.modleft}
						/>
					</div>
					<div className="rows political-center">
						<h1 id="political-center"> CENTER </h1>
						<ArticleList
							videos={this.state.center}
						/>
					</div>
					<div className="rows moderately-right">
						<h1 id="moderately-right"> MODERATELY RIGHT </h1>
						<ArticleList
							videos={this.state.modright}
						/>
					</div>
					<div className="rows right">
						<h1 id="right"> RIGHT </h1>
						<ArticleList
							videos={this.state.right}
						/>
					</div>
				</div>
			</div>
		);
	}
}

export default App;
