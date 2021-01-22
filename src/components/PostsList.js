import React from "react";
import axios from "axios";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  Switch
} from "react-router-dom";
import Text from "./Text";

class PostsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: []
    };
  }

  componentDidMount() {
      const token = localStorage.getItem("token");

    axios.get("/user/1/posts",{
        headers:{
            "Authorization":`Bearer${token}`
        }
    }).then(response => {
      console.log(response, "res from backend-------------");
      this.setState({
        posts: response.data
      });
    });
  }

  handleClick() {
      console.log("yyyyyyyy");
  }

  render() {
    const posts = [...this.state.posts];
    const postsList = posts.map(post => {
      return (
        <div className={post.title}>
            <button onClick={this.handleClick.bind(this)}>click me</button>
          <Link to={"/" + post.id}>{post.title}</Link>
          <Route
            path={"/" + post.id}
            render={props => <Text {...props} post={post} />}
          />
        </div>
      );
    });
    return (
      <div>
        <Router>{postsList}</Router>
      </div>
    );
  }
}

export default PostsList;
