import React from "react";
import axios from "axios";
import Header from "./components/header";
import NewsCards from "./components/newsCards";

const Key = "4094f85c9dd346638484a5434e8310e3";

export default class App extends React.Component {
  state = {
    news: [],
  };

  componentDidMount() {
    axios
      .get(
        `https://newsapi.org/v2/everything?domains=wsj.com&pageSize=100&apiKey=${Key}`
      )
      .then((res) => {
        const news = res.data.articles;
        this.setState({ news });
        console.log(news);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    return (
      <div>
        <div className="container">
          <Header />
          <div className="row">
            <NewsCards data={this.state.news} />
          </div>
        </div>
      </div>
    );
  }
}
