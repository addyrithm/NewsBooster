import React, { Component } from "react";
export class NewsItem extends Component {
  render() {
    let { title, description, imageUrl, newsUrl, author, date, source} = this.props;
    return (
      <div className="my-3">
        <div className="card">
          {/* style={{height:"32rem"}} */}
          <img
            src={
              imageUrl == null
                ? "https://i0.wp.com/9to5mac.com/wp-content/uploads/sites/6/2022/07/Apple-and-other-companies-reportedly-bought-gold-from-illegal-miners-in-Brazil.jpg?resize=1200%2C628&quality=82&strip=all&ssl=1"
                : imageUrl
            }
            className="card-img-top"
            alt="..."
          />
          <div className="card-body">
            <h5 className="card-title">
              {title}
              <span className="position-absolute top-0 translate-middle badge rounded-pill bg-danger" style={{left:'85%',zIndex:1}}>
                {source}
              </span>
            </h5>
            <p className="card-text">{description}</p>
            <p className="card-text">
              <small className="text-muted">
                By {author ? author : "unknown"} on{" "}
                {new Date(date).toGMTString()}
              </small>
            </p>
            <a
              rel="noreferrer"
              href={newsUrl}
              target="_blank"
              className="btn btn-sm btn-dark"
            >
              Read More
            </a>
          </div>
        </div>
      </div>
    );
  }
}
export default NewsItem;
