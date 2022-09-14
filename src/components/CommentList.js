import React from "react";
import Comment from "./Comment";
import PropTypes from "prop-types";

function CommentList(props) {
  return (
    <React.Fragment>
      <div>
        {Object.values(props.commentList).map((comment) => (
          <Comment
          whenCommentClicked = { props.onCommentSelection }
          userName = { comment.userName }
          content = { comment.content }
          date = {comment.date }
          id = { comment.id }
          key={comment.id}/>
        ))}
      </div>
    </React.Fragment>
  )
}

CommentList.propTypes = {
  commentList: PropTypes.object,
  onCommentSelection: PropTypes.func
};

export default CommentList;
