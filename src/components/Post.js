import React from "react";
import PropTypes from "prop-types";
import CommentList from "./CommentList";

function Post(props) {
  return (
    <React.Fragment>
      <div className="container post" onClick={() => props.whenPostClicked(props.id)}>
      <div className="col-left">
          <div className="upArrow"></div>
          <div className="downArrow"></div>
        </div>
        
        <div className="col-right">
          <h5>Posted by {props.userName} {props.date}</h5>
          <h3>{props.heading}</h3>
          <p>{props.content}</p>
        </div>
        
      </div>
      {/* <CommentList/> */}
    </React.Fragment>
  )
}

Post.propTypes = {
  heading: PropTypes.string, 
  userName: PropTypes.string,
  content: PropTypes.string,
  date: PropTypes.string,
  id: PropTypes.string,
  whenPostClicked: PropTypes.func
};

export default Post;