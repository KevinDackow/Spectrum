import debounce from 'lodash.debounce';
import React, { Component } from 'react';
import './App.css';
import SearchBar from './components/SearchBar';
import VideoList from './components/VideoList';
import YTSearch from 'youtube-api-search';

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

		this.left = new Set(['']);
		this.modleft = new Set(['']);
		this.center = new Set(['']);
        this.modright = new Set(['']);
        this.right = new Set(['']);

		this.videoSearch('reactjs'); // default search term
	}

    bucketSortVideos(articles, bias) {
		if (bias == "left") {
			this.setState({left : articles})
		}
        else if (bias == "modleft") {
            this.setState({modleft : articles})
        }
        else if (bias == "center") {
            this.setState({center : articles})
        }
        else if (bias == "modright") {
            this.setState({modright : articles})
        }
        else if (bias == "right") {
            this.setState({right : articles})
        }
    }

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
						<VideoList
							videos={this.state.videos}
						/>
					</div>
					<div className="rows moderately-left">
						<h1 id="moderately-left"> MODERATELY LEFT </h1>
						<VideoList
							videos={this.state.videos}
						/>
					</div>
					<div className="rows political-center">
						<h1 id="political-center"> CENTER </h1>
						<VideoList
							videos={this.state.videos}
						/>
					</div>
					<div className="rows moderately-right">
						<h1 id="moderately-right"> MODERATELY RIGHT </h1>
						<VideoList
							videos={this.state.videos}
						/>
					</div>
					<div className="rows right">
						<h1 id="right"> RIGHT </h1>
						<VideoList
							videos={this.state.videos}
						/>
					</div>
				</div>
			</div>
		);
	}
}

export default App;
