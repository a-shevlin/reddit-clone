import React from "react";
import Post from "./Post";
import PropTypes from "prop-types";

function PostList(props) {
  return (
    <React.Fragment>
      <div>
        {Object.values(props.postList).map((post) => (
          <Post
          whenPostClicked = { props.onPostSelection }
          name = { post.name }
          userName = { post.userName }
          content = { post.content }
          date = {post.date }
          />  
        ))}
      </div>
    </React.Fragment>
  )
}

PostList.propTypes = {
  postList: PropTypes.object,
  onPostSelection: PropTypes.func
};

export default PostList;
