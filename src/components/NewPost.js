import React from "react";
import Axios from "axios";
import PostsList from "./PostsList";

class NewPost extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      text: ""
    };
  }

  handleChange(event) {
    const { id, value } = event.target;
    const newState = {
      ...this.state
    };
    newState[id] = value;
    this.setState(newState);
  }

  handleSubmit() {
    console.log("submit");
    const data = {
        ...this.state,
        userId:1
    }
    Axios.post("http://localhost:8082", data).then(res =>
      console.log(res)
    );
  }

  render() {
    return (
      <div className="new-post">
        <div className="new-Post">
          <form onSubmit={this.handleSubmit.bind(this)}>
              <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              value={this.state.title}
              className="title"
              onChange={this.handleChange.bind(this)}
            />
            <br />
            <label htmlFor="text">Text</label>
            <textarea
              name="text"
              id="text"
              cols="30"
              rows="10"
              value={this.state.text}
              onChange={this.handleChange.bind(this)}
            ></textarea>
            <input type="submit" value="Submit" />
          </form>
        </div>
      </div>
    );
  }
}

export default NewPost;
