import React from "react";
import axios from "axios";
import download from "js-file-download";

class File extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      uploadFile: null
    };
  }

  handleChange(event) {
    this.setState({
      uploadFile: event.target.files[0]
    });
  }

  handleClick() {
    const data = new FormData();
    data.append("file", this.state.uploadFile);
    axios.post("http://localhost:8080/upload", data, {}).then(res => {
      console.log("Upload success!", res.statusText);
    });
  }

  download() {
    axios.get("http://localhost:8080/download").then(res => {
      download(res.data, "download");
      console.log("Download success", res.statusText);
    });
  }

  render() {
    return (
      <div>
        <div className="upload">
          <h1>Upload your file here!</h1>
          <input
            type="file"
            name="file"
            onChange={this.handleChange.bind(this)}
          />
          <button type="button" onClick={this.handleClick.bind(this)}>
            Upload
          </button>
        </div>
        <div className="download">
          <h1>Download your file here!</h1>
          <button type="button" onClick={this.download.bind(this)}></button>
        </div>
      </div>
    );
  }
}

export default File;
