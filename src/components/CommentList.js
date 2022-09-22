import React from "react";
import Comment from "./Comment";
import PropTypes from "prop-types";
import { query, collection, where, getDocs } from 'firebase/firestore'
import { db } from './../firebase.js'

function CommentList(props) {

  

  return (
    <React.Fragment>
      <div>
        {Object.values(props.commentList).map((comment) => (
          <Comment
          // whenCommentClicked = { props.onCommentSelection }
          userName = { comment.userName }
          content = { comment.content }
          date = {comment.date }
          count = { comment.count }
          postId = { comment.postId }
          id = { comment.id }
          key={comment.id}/>
        ))}
      </div>
    </React.Fragment>
  )
}

CommentList.propTypes = {
  commentList: PropTypes.array,
  // onCommentSelection: PropTypes.func
};

export default CommentList;
