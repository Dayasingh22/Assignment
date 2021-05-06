import React from "react";
import axios from "axios";
import Header from "./components/header";
import NewsCards from "./components/newsCards";

const Key = "4094f85c9dd346638484a5434e8310e3";

export default class App extends React.Component {
  componentDidMount() {
    axios
      .get(
        `https://newsapi.org/v2/everything?domains=wsj.com&pageSize=100&apiKey=${Key}`
      )
      .then((res) => {
        const news = res.data.articles;
        this.setState({ news });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  state = {
    news: [],
  };
  constructor(props) {
    super(props);
    var defaultSortBy = "date";
    var defaultSortOrder = "desc";
    var sortedItems = this.sortData(
      defaultSortBy,
      defaultSortOrder,
      this.state.news
    );
    this.state = {
      news: this.state.news,
      data: {
        ...this.state.news,
        rows: sortedItems,
      },
      sortBy: defaultSortBy, // default sort column
      sortOrder: defaultSortOrder, // default sort oder
    };
  }

  sortData(sortBy, sortOrder, rows) {
    var itemsToSort = JSON.parse(JSON.stringify(this.state.news));
    var sortedItems = itemsToSort;
    var compareFn = null;
    switch (sortBy) {
      case "date":
        compareFn = (i, j) => {
          if (i.publishedAt < j.publishedAt) {
            return sortOrder === "asc" ? -1 : 1;
          } else {
            if (i.publishedAt > j.publishedAt) {
              return sortOrder === "asc" ? 1 : -1;
            } else {
              return 0;
            }
          }
        };
        break;
      default:
        break;
    }
    console.log(sortedItems);
    this.setState({
      news: sortedItems,
    });
    sortedItems = itemsToSort.sort(compareFn);
    return sortedItems;
  }
  requestSort(pSortBy) {
    var sortBy = this.state.sortBy;
    var sortOrder = this.state.sortOrder;
    return (event) => {
      if (pSortBy === this.state.sortBy) {
        sortOrder = sortOrder === "asc" ? "desc" : "asc";
      } else {
        sortBy = pSortBy;
        sortOrder = "asc";
      }
      var sortedItems = this.sortData(sortBy, sortOrder);
      this.setState({
        sortOrder: sortOrder,
        sortBy: sortBy,
        data: {
          ...this.state.news,
          rows: sortedItems,
        },
      });
    };
  }

  render() {
    return (
      <div>
        <div className="container">
          <Header />
          <div className="row">
            <NewsCards
              data={this.state.news}
              requestSort={this.requestSort.bind(this)}
              sortOrder={this.state.sortOrder}
              sortBy={this.state.sortBy}
            />
          </div>
        </div>
      </div>
    );
  }
}
