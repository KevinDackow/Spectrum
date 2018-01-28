/**
 * Created by daohlim on 28/1/18.
 */
import React from 'react';
import './VideoListItem.css';

const ArticleListItem = ({ video, onVideoSelect }) => {
    const imageUrl = video.urlToImage;
    const title = video.title;
    const url = video.url;
    // const source = video.sourceName;

    return (
        <a href={url} target="_blank">
            <div className="box related-list">
                <article className="media related-card">
                    <div className="media-left">
                        <figure className="image">
                            <img src={imageUrl} alt=""/>
                        </figure>
                    </div>
                    &nbsp;
                    <div className="media-content">
                        <div className="content">
                            <p>
                                {title}
                            </p>
                        </div>
                    </div>
                </article>
            </div>
        </a>
    );
};

export default ArticleListItem;
