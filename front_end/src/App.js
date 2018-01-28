import debounce from 'lodash.debounce';
import React, { Component } from 'react';
import './App.css';
import SearchBar from './components/SearchBar';
import VideoList from './components/VideoList';
import ArticleList from './components/ArticleList';
import YTSearch from 'youtube-api-search';
import fetch from 'isomorphic-fetch'


const REACT_APP_API_KEY = 'AIzaSyANl999ACEi82UvWilvXMclcow8WbikDKY';

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

		this.videoSearch('reactjs'); // default search term
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
			console.log(this.state.left);
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
		const response = await this.callApi(term, bias);
		this.articleSearchHelper(response, bias);
    }

    callApi = async (term, bias) => {
		var url = "http://localhost:8080/helper/?topic=" + term + "&leaning=" + bias;
		const response = await fetch(url)
			.then(response => response.json());
			// .then(response =>
			// console.log(response);
		if (response.status >= 300) throw Error('sorry');

		//console.log((response.json()));
		return response;
    };

    // function for search term
	videoSearch(term) {
		YTSearch(
			{
				key: REACT_APP_API_KEY,
				term: term
			},
			results => {
                this.setState({videos: results}); // through states setting the default video
			}
		);
		this.articleSearch(term);
	}

	render() {
		// for consistent ui such that it re-renders after 300ms on search
		const videoSearch = debounce(term => {
			this.videoSearch(term);
		}, 300);
		return (
			<div className="big-container">
				<SearchBar onSearchTermChange={videoSearch} />
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
