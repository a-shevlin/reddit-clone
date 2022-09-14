import React from "react";
import PropTypes from "prop-types";

function Comment(props) {
  return (
    <React.Fragment>
      <div className="container" onClick={() => props.whenPostClicked(props.id)}>
        <h4>{props.content}</h4>
        <h5>By {props.userName} at {props.date}</h5>
      </div>
    </React.Fragment>
  )
}

Comment.propTypes = { 
  userName: PropTypes.string,
  content: PropTypes.string,
  date: PropTypes.string,
  id: PropTypes.string,
  whenPostClicked: PropTypes.func
};

export default Comment;