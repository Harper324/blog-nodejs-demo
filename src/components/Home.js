import React from "react";
import { Link } from "react-router-dom";



class Home extends React.Component {
  constructor(props) {
    super(props);
  }

  handleClick() {
      console.log("yes");
  }

  render() {
    return (
      <div>
          <button onClick={this.handleClick.bind(this)}>Get data</button>
        <Link to="/">Home</Link>
        <Link to="/login">Login</Link>
        <Link to="/posts">PostList</Link>
      </div>
    )
  }
}

export default Home;
