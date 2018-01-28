/**
 * Created by daohlim on 28/1/18.
 */
import React from 'react';
import './VideoList.css';
import ArticleListItem from './ArticleListItem';

const ArticleList = props => {
    const videoItems = props.videos.map(video => {
        return (
            <ArticleListItem
                video={video}
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

export default ArticleList;
