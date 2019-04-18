import React, { Component } from "react";
import axios from "axios";

class SinglePost extends Component {
  constructor() {
    super();
    this.state = {
      singlePost: [],
      singlePostComments: []
    };
  }
  componentDidMount() {
    this.getPost();
    this.getCommentsForSinglePost();
  }

  getPost = () => {
    axios
      .get("/posts/1")
      .then(res => {
        this.setState({
          singlePost: res.data.post
        });
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
  };

  getCommentsForSinglePost = () => {
    axios
      .get("/comments/post/1")
      .then(res => {
        this.setState({
          singlePostComments: res.data.comment
        });
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
  };

  displayComments = () => {
    console.log("hooray it posted");
    let comments = this.state.singlePostComments.map((comment, i) => {
      return <li key={i + 1}>
      User_id{comment.user_id}
      <br />
      {comment.comment_body}
      </li>;
    });
    return (
      <>
        <ul>{comments}</ul>
      </>
    );
  };

  displaySinglePost = () => {
    // console.log("did something happen");
    let { singlePost, singlePostComments } = this.state;

    return (
      <div>
        <h1>{singlePost.title}</h1>
        <h1>Pet Type: {singlePost.pet_type}</h1>
        <h1>{singlePostComments.comment_body}</h1>
        <div>Comments:{this.displayComments()}</div>
      </div>
    );
  };

  // displaySinglePostComments =()=>{
  //   let { singlePostComments } = this.state
  //   return (
  //     <div>
  //     </div>
  //   )
  // }

  render() {
    console.log(this.state);

    return (
      <div>
        <h3>hi</h3>
        {this.displaySinglePost()}
      </div>
    );
  }
}
export default SinglePost;