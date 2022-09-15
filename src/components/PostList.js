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
          onUpVote = { props.onUpVote }
          onDownVote = { props.onDownVote }
          heading = { post.heading }
          userName = { post.userName }
          content = { post.content }
          date = {post.date }
          count = {post.count}
          id = { post.id }
          key={post.id}/>
        ))}
      </div>
    </React.Fragment>
  )
}

PostList.propTypes = {
  postList: PropTypes.object,
  onPostSelection: PropTypes.func,
  onUpVote: PropTypes.func,
  onDownVote: PropTypes.func,
};

export default PostList;
