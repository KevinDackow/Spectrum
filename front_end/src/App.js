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

		this.videoSearch('reactjs'); // default search term
	}

    bucketSortVideos(articles, bias) {
		if (bias === 1) {
			this.setState({left : articles})
		}
        else if (bias === 2) {
            this.setState({modleft : articles})
        }
        else if (bias === 3) {
            this.setState({center : articles})
        }
        else if (bias === 4) {
            this.setState({modright : articles})
        }
        else if (bias === 5) {
            this.setState({right : articles})
        }
    }

    articleSearch(term) {
		// multiple searches with sql database at bias 1,2,3,4,5

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
