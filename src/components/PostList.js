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
            onClickingEdit = { props.onClickingEdit }
            onClickingDelete = { props.onClickingDelete }
            whenCommentClicked = { props.addComment }
            onUpVote = { props.onUpVote }
            onDownVote = { props.onDownVote }
            heading = { post.heading }
            userName = { post.userName }
            content = { post.content }
            date = {post.date }
            commentCount = { post.commentCount }
            count = {post.count}
            id = { post.id }
            key={post.id}/>
        ))}
      </div>
    </React.Fragment>
  )
}

PostList.propTypes = {
  addComment: PropTypes.func,
  onClickingEdit: PropTypes.func,
  onClickingDelete: PropTypes.func,
  postList: PropTypes.array,
  onPostSelection: PropTypes.func,
  onUpVote: PropTypes.func,
  onDownVote: PropTypes.func,
};

export default PostList;
