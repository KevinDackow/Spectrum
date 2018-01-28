import debounce from 'lodash.debounce';
import React, { Component } from 'react';
import './App.css';
import SearchBar from './components/SearchBar';
import VideoDetail from './components/VideoDetail';
import VideoList from './components/VideoList';
import YTSearch from 'youtube-api-search';
import Footer from './components/Footer';

const REACT_APP_API_KEY = 'AIzaSyANl999ACEi82UvWilvXMclcow8WbikDKY';

class App extends Component {
	constructor(props) {
		super(props);

		this.state = {
			videos: [], // holds 5 videos fetched from API
			selectedVideo: null // selected video is null, default set below ln:28
		};

		this.videoSearch('reactjs'); // default search term
	}

	// function for search term
	videoSearch(term) {
		YTSearch(
			{
				key: REACT_APP_API_KEY,
				term: term
			},
			videos => {
				this.setState({ videos: videos, selectedVideo: videos[0] }); // through states setting the default video
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
							onVideoSelect={selectedVideo => {
                                this.setState({ selectedVideo });
                            }}
						/>
					</div>
					<div className="rows moderately-left">
						<h1 id="moderately-left"> MODERATELY LEFT </h1>
						<VideoList
							videos={this.state.videos}
							onVideoSelect={selectedVideo => {
                                this.setState({ selectedVideo });
                            }}
						/>
					</div>
					<div className="rows political-center">
						<h1 id="political-center"> CENTER </h1>
						<VideoList
							videos={this.state.videos}
							onVideoSelect={selectedVideo => {
                                this.setState({ selectedVideo });
                            }}
						/>
					</div>
					<div className="rows moderately-right">
						<h1 id="moderately-right"> MODERATELY RIGHT </h1>
						<VideoList
							videos={this.state.videos}
							onVideoSelect={selectedVideo => {
                                this.setState({ selectedVideo });
                            }}
						/>
					</div>
					<div className="rows right">
						<h1 id="right"> RIGHT </h1>
						<VideoList
							videos={this.state.videos}
							onVideoSelect={selectedVideo => {
                                this.setState({ selectedVideo });
                            }}
						/>
					</div>
				</div>
			</div>
		);
	}
}

export default App;
