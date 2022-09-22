import React from "react";
import Post from "./Post";
import PropTypes from "prop-types";
import  { db } from './../firebase.js'
import { query, orderBy, onSnapshot, collection, getDocs } from "firebase/firestore";  




function PostList(props) {

  return (
    <React.Fragment>
      <div>
      {Object.values(props.postList).map((post) => (
          <Post
            whenPostClicked = { props.onPostSelection }
            whenCommentClicked = { props.addComment }
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
  addComment: PropTypes.func,
  postList: PropTypes.object,
  onPostSelection: PropTypes.func,
  onUpVote: PropTypes.func,
  onDownVote: PropTypes.func,
};

export default PostList;
