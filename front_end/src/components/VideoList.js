import React from 'react';
import './VideoList.css';
import VideoListItem from './VideoListItem';

const VideoList = props => {
	const videoItems = props.videos.map(video => {
		return (
			<VideoListItem
				key={video.etag}
				video={video}
				onVideoSelect={props.onVideoSelect}
			/>
		);
	});

	return (
		<div className="column is-2.5 video-list">
			{videoItems}
            {videoItems}
		</div>
	);
};

export default VideoList;
