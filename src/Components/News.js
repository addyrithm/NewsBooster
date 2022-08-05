import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import InfiniteScroll from "react-infinite-scroll-component";
export class News extends Component {
  static defaultProps = {
    country: "in",
    category: "science",
  };
  // static PropsTypes = {
  //   country: PropsTypes.string,
  //   category: PropsTypes.string
  // }
  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      page: 1,
    };
    document.title = `NewsBooster - ${this.props.category}`;
  }
  async componentDidMount() {
    this.props.setProgress(10);
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apikey}&page=1&pageSize=18`;
    this.props.setProgress(30);
    let data = await fetch(url);
    this.props.setProgress(50);
    let parsedData = await data.json();
    this.props.setProgress(70);
    this.setState({ articles: parsedData.articles });
    this.props.setProgress(100);
  }
  handleNextClick = async () => {
    let url = `https://newsapi.org/v2/top-headlines?country=${
      this.props.country
    }&category=${
      this.props.category
    }&apiKey=${this.props.apikey}&page=${
      this.state.page + 1
    }&pageSize=18`;
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
      articles: parsedData.articles,
      page: this.state.page + 1,
    });
  };
  handlePreviousClick = async () => {
    let url = `https://newsapi.org/v2/top-headlines?country=${
      this.props.country
    }&category=${
      this.props.category
    }&apiKey=${this.props.apikey}&page=${
      this.state.page - 1
    }&pageSize=18`;
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
      articles: parsedData.articles,
      page: this.state.page - 1,
    });
  };

  fetchMoreData = async () => {
    this.setState({ page: this.state.page + 1 });
    const url = `https://newsapi.org/v2/top-headlines?country=${
      this.props.country
    }&category=${
      this.props.category
    }&apiKey=${this.props.apikey}&page=${
      this.state.page + 1
    }&pageSize=18`;
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
      articles: this.state.articles.concat(parsedData.articles),
      totalResults: parsedData.totalResults,
      // page: this.state.page + 1,
    });
  };
  render() {
    return (
      <>
        <h1 className="text-center" style={{margin:'70px 0px 15px'}}>NewsBooster - Top Headlines</h1>
        <InfiniteScroll
          dataLength={this.state.articles.length !== this.state.totalResults}
          next={this.fetchMoreData}
          hasMore={true}
          loader={<Spinner />}
        ><div className="container">
          <div className="row">
            {this.state.articles.map((element) => {
              return (
                <div className="col-md-4" key={element.url}>
                  <NewsItem
                    title={element.title}
                    description={element.description}
                    imageUrl={element.urlToImage}
                    newsUrl={element.url}
                    author={element.author}
                    date={element.publishedAt}
                    source={element.source.name}
                  />
                </div>
              );
            })}
          </div>
        </div>
        </InfiniteScroll>
        <div className="container d-flex justify-content-between my-4">
            <button
            disabled={this.state.page <= 1}
            onClick={this.handlePreviousClick}
            type="button"
            className="btn btn-dark btn-sm"
            >
            &larr; Previous
            </button>
            <button
            disabled={this.state.page >= 3}
            onClick={this.handleNextClick}
            type="button"
            className="btn btn-dark btn-sm"
            >
            Next &rarr;
            </button>
          </div>
      </>
    );
  }
}

export default News;


