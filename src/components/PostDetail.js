import React from "react";
import PropTypes from "prop-types";

function PostDetail(props){
  
  const { post, onClickingEdit, onClickingDelete } = props;
  
  return (
    <React.Fragment>
      <h1>Post Detail</h1>
      <hr/>
      <h3>{ post.heading }</h3>
      <h6>By: { post.userName }</h6>
      <p>{ post.date} </p>
      <hr/>
      <p>{ post.content} </p>
    </React.Fragment>
  );
}

PostDetail.propTypes = {
  post: PropTypes.object,
  onClickingEdit: PropTypes.func,
  onClickingDelete: PropTypes.func,
}

export default PostDetail;