/**
 * Created by daohlim on 28/1/18.
 */
import React from 'react';
import './VideoList.css';
import ArticleListItem from './ArticleListItem';

const ArticleList = props => {
    if (props.videos.length === 0) {
        return (
            <div className="empty box">
                <article className="media related-card">
                    <div className="media-content">
                        <div className="content">
                            <p>
                                No Results! Try other keywords
                            </p>
                        </div>
                    </div>
                </article>
            </div>
        )
    }
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
